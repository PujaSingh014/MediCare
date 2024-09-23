import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AIContextProvider from './context/aiContext';
import ContextProvider from './context/Context2';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ContextProvider>
        <AIContextProvider>
            <App />
        </AIContextProvider>
    </ContextProvider>
);

