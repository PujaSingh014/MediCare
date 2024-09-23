import React, { useContext, useState, useEffect, useRef } from 'react';
import send_icon from '../img/send_icon.png';
import user_icon from '../img/user_icon.png';
import gemini_icon from '../img/gemini_icon.png';
import { Context } from '../context/Context2';

function MentalWellness() {
  const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context);

  return (
    <div className="flex flex-col h-full bg-teal-50 rounded-lg shadow-md">
      <div className="bg-teal-600 text-white p-4">
        <h2 className="text-3xl font-semibold text-center">Mental Health Bot</h2>
      </div>

      <div className="flex-grow p-4 overflow-y-auto">
        {!showResult ? (
          <div className="text-center mt-10">
            <p className="text-2xl font-bold text-teal-600 mb-2">Hi, there!</p>
            <p className="text-lg text-gray-700">How are you feeling today?</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-start space-x-2">
              <img src={user_icon} alt="User" className="w-8 h-8" />
              <div className="bg-teal-100 rounded-lg p-3 shadow-md max-w-[75%]">
                <p className="text-gray-800 text-lg">{recentPrompt}</p>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <img src={gemini_icon} alt="Mind-Bot" className="w-8 h-8" />
              <div className="bg-white rounded-lg p-3 shadow-md max-w-[75%]">
                {loading ? (
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                  </div>
                ) : (
                  <p className="text-gray-800 text-lg" dangerouslySetInnerHTML={{ __html: resultData }}></p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Always at the bottom */}
      <div className="mt-auto p-4 bg-gray-100">
        <div className="flex items-center bg-white rounded-full p-2 shadow-md">
          <input
            className="flex-grow bg-transparent outline-none px-4"
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="Share your thoughts here"
          />
          <button
            onClick={() => onSent()}
            className="bg-teal-600 text-white text-lg rounded-full p-2 hover:bg-teal-700 transition duration-200"
          >
            <img src={send_icon} alt="Send" className="w-6 h-6" />
          </button>
        </div>
        <p className="text-md text-gray-600 text-center mt-2">
          Guiding You to Better Health - But Remember, Professional Medical Advice Is Essential.
        </p>
      </div>
    </div>
  );
}

export default MentalWellness;



// function MentalWellness() {
//   const {onSent,recentPrompt,showResult,loading,resultData,setInput,input} = useContext(Context)

//   return (
//     <div>
//       <div className='main'>
//         <div className='nav'>
//           <h2>Mind-Bot</h2>
//         </div>
//         <div className="main-container">
//           {!showResult
//           ?<>
//             <div className='greet'>
//             <p><span>Hi, there!</span></p>
//             <p>How are you feeling today?</p>
//             </div>
//           </>
//           :<div className='result'>
//               <div className='result-title'>
//                 <img src={user_icon} alt=""/>
//                 <p>{recentPrompt}</p>
//               </div>
//               <div className='result-data'>
//                 <img src={gemini_icon} alt=""></img>
//                 {loading
//                 ?<div className='loader'>
//                     <hr/>
//                     <hr/>
//                     <hr/>
//                 </div>
//                 :<p dangerouslySetInnerHTML={{__html:resultData}}></p>
//                 }
//               </div>
//             </div>
//           }
//           <div className='main-bottom'>
//             <div className='search-box'>
//               <input onChange={(e)=>setInput(e.target.value)} value={input} type="text" placeholder='Share your thoughts here'/>
//               <div>
//                 <img onClick={()=>onSent()} src = {send_icon} alt=""/>

//               </div>
//             </div>
//             <p className='bottom-info'>
//               Mind-Bot cannot replace professional help. If you need it, it will guide you towards qualified mental health resources.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>  
//   )
// }

// export default MentalWellness;