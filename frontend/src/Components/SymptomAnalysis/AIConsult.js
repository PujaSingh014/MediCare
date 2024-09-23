import React, { useContext, useEffect, useRef, useState } from "react";
import send_icon from "../../img/send_icon.png";
import user_icon from "../../img/user_icon.png";
import gemini_icon from "../../img/gemini_icon.png";
import { AIContext } from "../../context/aiContext";

function AIConsult({ symptoms, diagnosis }) {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(AIContext);

  const messagesEndRef = useRef(null);

  let symp = "";
  for (let sym in symptoms) {
    symp = symp + " " + symptoms[sym];
  }

  let prompt = `
  My current symptoms are: ${symp}.\n

  My possible disease is: ${diagnosis}.\n

  What preliminary measures should I take now?
`;

  useEffect(() => {
    setInput(prompt);
    onSent(prompt);
  }, []);

  // Scroll to bottom when chat is updated
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [showResult, loading]);

  return (
    <div className="flex flex-col h-full bg-teal-50 rounded-lg shadow-md">
      <div className="bg-teal-600 text-white p-4">
        <h3 className="text-3xl text-center font-semibold">AI Consultation</h3>
      </div>
      <div className="flex-grow p-4 overflow-y-auto">
        {!showResult ? (
          <div className="max-w-3xl mx-auto text-center mt-10">
            <p className="text-2xl font-bold text-teal-600 mb-2">Hi, there!</p>
            <p className="text-lg text-gray-700">How are you feeling today?</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-start space-x-2">
              <img src={user_icon} alt="user" className="w-8 h-8" />
              <div className="rounded-lg p-3 max-w-[75%] bg-teal-100">
                <p className="text-gray-800 text-lg">{recentPrompt}</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <img src={gemini_icon} alt="bot" className="w-8 h-8" />
              <div className="rounded-lg p-3 max-w-[75%] bg-gray-50 shadow">
                {loading ? (
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-teal-600 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-teal-600 rounded-full animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
                ) : (
                  <p
                    className="text-gray-800 text-lg"
                    dangerouslySetInnerHTML={{ __html: resultData }}
                  ></p>
                )}
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Send bar */}
      <div className="bg-white border-t border-gray-200 p-4 sticky bottom-0">
        <div className="flex items-center bg-gray-100 rounded-full p-2">
          <input
            className="flex-grow bg-transparent outline-none px-4"
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="Share your queries here"
          />
          <button
            onClick={() => onSent(input)}
            className="bg-teal-600 text-white p-2 rounded-full hover:bg-teal-700 transition duration-200"
          >
            <img src={send_icon} alt="Send" className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default AIConsult;
