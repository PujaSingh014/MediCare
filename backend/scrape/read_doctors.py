import pandas as pd
import os

def read_doctors_from_excel():
    file_path = os.path.abspath('./scrape/doctors_data.xlsx')
    df = pd.read_excel(file_path)
    doctors_data = []

    for _, row in df.iterrows():
        doctor = {
            "name": row['Doctor_Name'],
            "specialization": row['Specialization'],
            "degree": row['Degree'],
            "location": row['Location']
        }
        doctors_data.append(doctor)

    return doctors_data