import React from 'react';
import ReactDOM from 'react-dom/client';
import "bootstrap/dist/css/bootstrap.min.css"
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {LandingPage} from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import {AuthProvider} from "./context/AuthContext";
import {NotFound} from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Prediction from "./pages/Prediction";
import AdversarialImageGenerator from "./pages/AdversarialImageGenerator";
import Defense from "./pages/Defense";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <AuthProvider>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<LandingPage/>}/>
              <Route path="/login" element={<Login/>} />
              <Route path="/register" element={<Register/>}/>
              <Route path="/dashboard" element={<Dashboard/>} />
              <Route path="/prediction" element={<Prediction/>} />
              <Route path="/ig" element={<AdversarialImageGenerator/>}/>
              <Route path="/defense" element={<Defense/>}/>
              <Route path="*" element={<NotFound/>} />
          </Routes>
      </BrowserRouter>
      </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
