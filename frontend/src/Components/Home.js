// Home.js
import React from "react";
import doctor from '../img/doctor_home.png'

const Home = ({ updateActive }) => {
  return (
    <div className="h-full p-6 rounded-lg shadow-lg">
      <div className="flex justify-evenly ">
        <div className="w-1/2 text-center flex flex-col justify-center items-center">
          <p className="text-3xl font-semibold text-teal-800">
          Your well-being, our priority. Trust <span className="text-5xl font-bold text-teal-800"> MediCare </span> to be there for you.
          </p>
          <p className="mt-4 text-lg font-medium text-teal-600">
          Not sure what's going on with your health? MediCare's here to lend a hand, offering care and clarity when you need it most!
          </p>
        </div>
        <div className="w-[450px] py-2.5 mx-8">
          <img src={doctor} className="rounded-full"></img>
        </div>
      </div>
      <div className="flex my-8 ml-16 mr-32 items-end justify-around h-1/4 space-y-4">
        <div className="bg-teal-600 w-1/5 h-1/2 flex justify-center items-center rounded-lg shadow-lg">
          <button onClick={() => updateActive(2)} className="text-xl h-full text-gray-50 text-center font-semibold hover:bg-teal-700 transition duration-300">
            Analyze Your Symptoms
          </button>
        </div>
        
        <div className="bg-teal-600 w-1/5 h-1/2 flex justify-center items-center rounded-lg shadow-lg">
          <button onClick={() => updateActive(3)} className="text-xl h-full text-gray-50 font-semibold text-center rounded hover:bg-teal-700 transition duration-300">
            Talk to Mental Health Buddy
          </button>
        </div>

        <div onClick={() => updateActive(4)} className="bg-teal-600 w-1/5 h-1/2 flex justify-center items-center rounded-lg shadow-lg">
            <button className="text-xl w-full h-full text-gray-50 text-center font-semibold rounded hover:bg-teal-700 transition duration-300">
                Consult Doctor
            </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
