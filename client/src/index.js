import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ContactsContextProvider } from './context/ContactContext';
import { AuthContextProvider } from './context/AuthContext';
import { FontSizeProvider } from "./context/FontSizeContext"; // Import the provider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ContactsContextProvider >
      <FontSizeProvider>
       <App />
       </FontSizeProvider>
      </ContactsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);


