from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from routes.gemini import gemini_bp
import pickle
from dotenv import load_dotenv
import os
from constants.const import symptoms
from pymongo import MongoClient
from scrape.read_doctors import read_doctors_from_excel


app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

load_dotenv()
#MongoDB Connection
mongoDB_URI = os.getenv('MONGODB_URI')
mongo_client = MongoClient(mongoDB_URI)
db = mongo_client['medical_assistant']
print(db)

def checkdb_connection():
    print("Checking MongoDB connection...")
    try:
        mongo_client.admin.command('ping')  # Sends a ping to check if the connection is alive
        print("MongoDB connection established.")
    except Exception as e:
        print("Failed to connect to MongoDB. Exiting application.", e)
        exit(1)  # Exit the application if the connection fails


def add_doctors_to_db():
    try:
        doctors_data = read_doctors_from_excel()
        if doctors_data:
            # Check existing doctor names to avoid duplicates
            existing_doctors = db.doctors.find({}, {"name": 1})
            existing_doctor_names = {doctor["name"] for doctor in existing_doctors}

            new_doctors = [
                doctor for doctor in doctors_data
                if doctor["name"] not in existing_doctor_names
            ]

            if new_doctors:
                db.doctors.insert_many(new_doctors)
                print(f"{len(new_doctors)} new doctors added to the database.")
            else:
                print("No new doctors to add; all are already in the database.")
        else:
            print("No doctor data found.")
    except Exception as e:
        print("Exception:", e)
        exit(1)


#Model for prediction
with open('assets/model.pkl', 'rb') as f:
    model = pickle.load(f)
# Create a dictionary mapping symptoms to values from 0 to len(symptoms)-1
symptoms_index_mapping = {symptom: idx for idx, symptom in enumerate(symptoms)}


app.register_blueprint(gemini_bp, url_prefix = '/gemini')

# Welcome GET Request API
@app.route('/', methods=['GET'])
@cross_origin()
def status():
    return jsonify({'service': 'diagnose-disease-api', 'status': 'active'}), 200

#GET ALL DOCTORS INFO
@app.route('/doctors', methods=['GET'])
@cross_origin()
def get_doctors():
    doctors = list(db.doctors.find({}, {'_id': 0}))  # Exclude the MongoDB ID field
    return jsonify({'doctors': doctors}), 200

# Prediction POST Request API
@app.route('/predict', methods=['POST'])
@cross_origin()
def predict():
    data = request.json
    features = [0] * len(symptoms)
    y_pred = None

    try:
        user_symptoms = data["symptoms"]
        for symptom in user_symptoms:
            if symptom in symptoms_index_mapping:
                features[symptoms_index_mapping[symptom]] = 1
            else:
                return jsonify({'error': f'Unknown symptom: {symptom}'}), 400
        y_pred = model.predict([features])
        print("Features:", features)
        print("Prediction:", y_pred)
        y_pred_list = y_pred.tolist()

    except KeyError:
        return jsonify({'error': 'Invalid JSON format'}), 400

    except Exception as e:
        return jsonify({'error': str(e)}), 400

    return jsonify({'prediction': y_pred_list[0]}), 200


if __name__ == '__main__':
    checkdb_connection()
    add_doctors_to_db()
    app.run(debug=True)