import React from 'react';
import { BrowserRouter } from "react-router-dom";
import './App.css';
import Router from './routes';
import { AuthProvider } from './contexts/AuthContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

function App() {
  return (
    <PayPalScriptProvider options={{ "clientId": "AX5fN20pvSlmF5Z6HhULm9MZCXRmxMeU2t73Um4cNbuSUss_Q412Rnvdasvupm4qGiJEigxl9DpbNVCv", "currency": "USD", "intent": "capture" }}>
      <AuthProvider>
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </GoogleOAuthProvider>
      </AuthProvider>
    </PayPalScriptProvider>
  );
}

export default App;