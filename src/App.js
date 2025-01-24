import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "@coreui/coreui/dist/css/coreui.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login.jsx"; // Ruta del componente Login
import MainApp from "./components/MainApp.jsx"; // Ruta del componente MainApp

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta para la pantalla de Login */}
        <Route path="/" element={<Login />} />

        {/* Ruta para la pantalla principal de la app */}
        <Route path="/main" element={<MainApp />} />
      </Routes>
    </Router>
  );
}

export default App;
