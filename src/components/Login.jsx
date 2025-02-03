import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CButton, CCol, CContainer, CFormInput, CRow } from "@coreui/react";
import "./Login.css"; // Importa los estilos
import RegisterModal from "./RegisterModal";
import { getUsers, setIdUser } from "./database";
let users = getUsers();
console.log(users);
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState(""); // Estado para el correo electrónico
  const [password, setPassword] = useState(""); // Estado para la contraseña
  const [errorLogin, setErrorLogin] = useState("");

  const handleLogin = () => {
    for (let i = 0; i < users.length; i++) {
      if (email === users[i].email && password === users[i].password) {
        console.log("Se presionó inicio de sesión");
        setIdUser(users[i].id);
        navigate("/main");
      } else {
        setErrorLogin("Estas creedenciales no existen");
      }
    }
    if (email === "" || password === "") {
      setErrorLogin("Ingrese datos por favor");
    }
  };
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  return (
    <div className="login-container">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol>
            <div className="login-box">
              <h2 className="text-center mb-4" style={{ color: "black" }}>
                Inicia Sesión
              </h2>
              <CFormInput
                type="text"
                id="staticEmail"
                placeholder="email@example.com"
                label="Correo Electrónico"
                className="mb-3"
                value={email} // Asigna el valor del estado
                onChange={(e) => setEmail(e.target.value)} // Actualiza el estado al escribir
              />
              <CFormInput
                type="password"
                id="inputPassword"
                placeholder="********"
                label="Contraseña"
                className="mb-4"
                value={password} // Asigna el valor del estado
                onChange={(e) => setPassword(e.target.value)} // Actualiza el estado al escribir
              />
              <h2
                style={{
                  color: "red",
                  fontSize: 15,
                  textAlign: "center",
                  marginBottom: 20,
                  backgroundColor: "rgba(255, 2, 2, 0.12)",
                  borderRadius: 30,
                }}
              >
                {errorLogin}
              </h2>
              <CButton color="primary" className="w-100" onClick={handleLogin}>
                Inicia Sesión
              </CButton>
              <div>
                <RegisterModal
                  show={showModal}
                  handleClose={handleClose}
                  className="w-100"
                />
                <p style={{ color: "black", textAlign: "center" }}>
                  No tienes cuenta?{" "}
                  <a onClick={handleShow} href="#">
                    Crea una cuenta
                  </a>
                </p>
              </div>
            </div>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
}

export default Login;
