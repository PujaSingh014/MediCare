// Navigation.js
import React from "react";
import { menuItems } from "../utils/menuItems";
import logo from "../img/logo.png"
function Navigation({ active, setActive }) {
  return (
    <nav className="w-1/5 p-8 h-full shadow-md">
      <div className="flex items-center mb-6">
        <img src={logo} alt="loading" className="w-1/5"/>
        <h1 className="text-4xl p-2 font-bold text-teal-900">MediCare</h1>
      </div>
      <ul className="space-y-4">
        {menuItems.map((item) => (
          <li
            key={item.id}
            onClick={() => setActive(item.id)}
            className={`flex items-center p-2 rounded-lg cursor-pointer ${
              active === item.id ? "text-teal-900 text-2xl font-bold" : "text-teal-700 text-2xl font-semibold"
            }`}
          >
            {item.icon}
            <span className="ml-2">{item.title}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;
