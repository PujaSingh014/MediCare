import React, { useState, useContext } from "react";
import AIConsult from "./AIConsult";
import { notes } from "../../utils/Icons";
import {DiseaseMapping, symptoms} from "../../utils/disease_data"


function SymptomAnalysis({ updateActive }) {

  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [diagnosis, setDiagnosis] = useState("undefined");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSymptoms, setFilteredSymptoms] = useState([]);
  const [consultAI, setConsultAI] = useState(false);

  // Function to handle selection of symptoms
  const handleSelectSymptom = (symptom) => {
    if (!selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  // Function to handle removal of selected symptom
  const handleRemoveSymptom = (symptomToRemove) => {
    const updatedSymptoms = selectedSymptoms.filter(
      (symptom) => symptom !== symptomToRemove
    );
    setSelectedSymptoms(updatedSymptoms);
  };

  // Function to handle submission
  const handleSubmit = () => {
    console.log("Selected symptoms:", selectedSymptoms);

    const data = {
      symptoms: selectedSymptoms,
    };

    const url = "http://127.0.0.1:5000/predict";

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Response:", data);
        setDiagnosis(data.prediction);
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
      });

    setSubmitted(true);
  };

  const handleConsultDoctor = () => {
    updateActive(4);
  };
  const handleConsultAI = () => {
    setConsultAI(true);
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
    const filtered = symptoms.filter((symptom) =>
      symptom.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredSymptoms(filtered);
  };

  // Mocked symptom data
  return (
    <div className="max-w-full h-full mx-auto p-6 bg-teal-50 rounded-lg shadow-lg">
      {!submitted && (
        <div>
          <div className="mb-6 text-center">
            <h2 className="text-3xl font-bold text-teal-800">Symptom Analysis</h2>
          </div>
          <div className="mb-6 text-center">
            <p className="text-teal-700 text-lg font-normal">
            Take control of your health with instant insights—simply input your symptoms and let our analysis guide you toward the right care and specialist recommendations.
            </p>
          </div>
          <div className="bg-gray-100 p-8 rounded-lg shadow-md">
            <input
              type="text"
              placeholder="Search your symptoms"
              value={searchQuery}
              onChange={handleSearchInputChange}
              className="w-full p-3 mb-6 border border-teal-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 text-xl"
            />
            {searchQuery.length > 1 && (
              <div className="mb-6">
                {filteredSymptoms.map((symptom, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelectSymptom(symptom)}
                    className="mr-2 mb-2 px-3 py-1 bg-teal-100 text-teal-900 rounded-full hover:bg-teal-300 transition duration-300"
                  >
                    {symptom}
                  </button>
                ))}
              </div>
            )}
            <div className="mb-6">
              {selectedSymptoms.map((symptom, index) => (
                <div key={index} className="inline-block mr-2 mb-2 px-3 py-1 bg-teal-500 text-white text-lg font-semibold rounded-full">
                  {symptom}
                  <button onClick={() => handleRemoveSymptom(symptom)} className="ml-2 text-teal-100 font-bold hover:text-white">
                    X
                  </button>
                </div>
              ))}
            </div>
            <button
              className="w-full bg-teal-500 hover:bg-teal-700 text-white font-bold py-3 px-4 text-2xl rounded-full transition duration-300"
              onClick={handleSubmit}
            >
              Generate Prediction
            </button>
          </div>
        </div>
      )}
      {submitted && !consultAI && (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="mb-12 text-center">
            <h3 className="text-3xl font-semibold text-teal-800">Analysis Report:</h3>
          </div>
          <div className="mb-8 flex flex-col justify-center items-center">
            <p className="text-teal-700 mb-2">{notes}</p>
            {diagnosis !== "undefined" ? (
              <>
                <p className="text-teal-700 mb-4 text-xl">
                  It seems like you may be experiencing symptoms of{" "}
                  <strong className="text-teal-900 text-2xl">{diagnosis}</strong>.
                </p>
                <p className="text-teal-700 text-xl">Please consult a <span className="text-teal-900 font-bold text-xl">{DiseaseMapping[diagnosis]}</span>.</p>
              </>
            ) : (
              <p className="text-teal-700 text-xl">Your symptoms do not match any disease. Please consult a doctor.</p>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-teal-100 p-6 rounded-lg">
              <p className="text-teal-800 mb-2 text-lg">Would you like assistance in finding a nearby doctor?</p>
              <button 
                onClick={handleConsultDoctor}
                className="w-full bg-teal-500 hover:bg-teal-700 text-white font-bold text-lg py-2 px-4 rounded-full transition duration-300"
              >
                Yes, please find me a doctor
              </button>
            </div>
            <div className="bg-teal-100 p-6 rounded-lg">
              <p className="text-teal-800 mb-2 text-lg">Would you like any AI assistance regarding your symptoms?</p>
              <button 
                onClick={handleConsultAI}
                className="w-full bg-teal-500 hover:bg-teal-700 text-white font-bold text-lg py-2 px-4 rounded-full transition duration-300"
              >
                Yes, get me AI assistance
              </button>
            </div>
          </div>
        </div>
      )}
      {consultAI && (
        <AIConsult
          symptoms={selectedSymptoms}
          diagnosis={diagnosis}
        />
      )}
    </div>
  );
}


export default SymptomAnalysis;
