import React, { useState } from "react";
import Navigation from "./Components/Navigation";
import Home from "./Components/Home";
import SymptomAnalysis from "./Components/SymptomAnalysis/SymptomAnalysis";
import MentalWellness from "./Components/MentalWellness";
import ConsultDoctor from "./Components/Doctors/ConsultDoctor";
import './index.css'; 


function App() {
  const [active, setActive] = useState(1);

  const displayData = () => {
    switch (active) {
      case 1:
        return <Home updateActive={setActive} />;
      case 2:
        return <SymptomAnalysis updateActive={setActive} />;
      case 3:
        return <MentalWellness />;
      case 4:
        return <ConsultDoctor />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="bg-[url('img/bg1.jpg')] bg-cover bg-center flex h-screen">
      <Navigation active={active} setActive={setActive} />
      <main className="flex-1 h-full p-4">
        {displayData()}
      </main>
    </div>
  );
}

export default App;
