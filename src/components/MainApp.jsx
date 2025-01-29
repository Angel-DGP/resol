import React, { useState } from "react";
import {
  CContainer,
  CRow,
  CCol,
  CListGroup,
  CListGroupItem,
  CButton,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CFormInput,
} from "@coreui/react";
import "./MainApp.css";
import { useNavigate } from "react-router-dom";
import { PDFDownloadLink } from "@react-pdf/renderer";
import MyDocument from "./MyDocument";
import { getIdUser, findUserById } from "./database";
function MainApp() {
  const navigate = useNavigate();
  // Estados para el modal
  const [visible, setVisible] = useState(false);
  const [selectGrade, setSelectGrade] = useState(0);

  // Datos simulados
  const materiasEstudiantes = [
    { id: 1, nombre: "Matemáticas", docente: "Juan Pérez", nota: 8.5 },
    { id: 2, nombre: "Lenguaje", docente: "María Gómez", nota: 6.5 },
    { id: 3, nombre: "Ciencias", docente: "Luis Torres", nota: 7.2 },
    { id: 4, nombre: "Historia", docente: "Ana López", nota: 5.8 },
  ];

  const materiasProfesores = [
    {
      id: 1,
      nombre: "Matemáticas",
      estudiantesRegistrados: 25,
      recuperaciones: 3,
      promedio: 7.5,
    },
    {
      id: 2,
      nombre: "Lenguaje",
      estudiantesRegistrados: 20,
      recuperaciones: 5,
      promedio: 6.8,
    },
    {
      id: 3,
      nombre: "Ciencias",
      estudiantesRegistrados: 18,
      recuperaciones: 2,
      promedio: 8.0,
    },
  ];

  // Simulación del usuario actual
  let cuenta = findUserById(getIdUser());
  let roleUser = cuenta.role; // "estudiante" o "profesor"
  console.log(cuenta.id + " - " + roleUser);
  // Función para manejar el modal
  const handleModal = () => setVisible(!visible);
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleFileUpload = () => {
    if (selectedFile) {
      console.log("Archivo subido:", selectedFile.name);
      alert("Archivo subido exitosamente");
    } else {
      alert("Por favor, seleccione un archivo antes de subirlo.");
    }
  };

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    console.log("Cerrando sesión...");
    navigate("/");
  };

  return (
    <div className="main-container">
      {/* Barra Superior */}
      <div className="top-bar">
        <h2 style={{ color: "white" }}>Sistema de Gestión Académica</h2>
        <CButton color="danger" onClick={handleLogout}>
          Cerrar Sesión
        </CButton>
      </div>

      <CContainer>
        <CRow>
          {/* Condicional para mostrar vista de estudiante o profesor */}
          {roleUser === "Representante" ? (
            <>
              {/* Sección Izquierda: Vista del Estudiante */}
              <CCol lg={8} md={8} sm={12}>
                <div className="left-section">
                  <h3
                    className="mb-4"
                    style={{
                      color: "white",
                    }}
                  >
                    Materias
                  </h3>
                  <CListGroup>
                    {materiasEstudiantes.map((materia) => (
                      <CListGroupItem
                        key={materia.id}
                        className={`materia-item ${
                          materia.nota < 7 ? "low-grade" : ""
                        }`}
                      >
                        <div className="materia-info">
                          <strong
                            style={{
                              color: "white",
                            }}
                          >
                            {materia.nombre}
                          </strong>
                          <p
                            style={{
                              color: "white",
                            }}
                          >
                            Docente: {materia.docente}
                          </p>
                          <p
                            style={{
                              color: "white",
                            }}
                          >
                            Nota: {materia.nota}
                          </p>
                        </div>
                        <CButton
                          color="primary"
                          onClick={() => {
                            handleModal();
                            setSelectGrade(materia);
                          }}
                        >
                          Pedir Mejora
                        </CButton>
                      </CListGroupItem>
                    ))}
                  </CListGroup>
                </div>
              </CCol>

              {/* Sección Derecha: Datos del Estudiante */}
              <CCol lg={4} md={4} sm={12}>
                <div className="right-section">
                  <h4>Datos de la Cuenta</h4>
                  <div className="account-details">
                    <p>
                      <strong>Cédula de su representante:</strong>{" "}
                      {cuenta.representanteCedula}
                    </p>
                    <p>
                      <strong>Nombre:</strong> {cuenta.nombreCompleto}
                    </p>
                    <p>
                      <strong>Grado:</strong> {cuenta.grado}
                    </p>
                    <p>
                      <strong>Paralelo:</strong> {cuenta.paralelo}
                    </p>
                    <p>
                      <strong>Representante:</strong>{" "}
                      {cuenta.representanteNombre}
                    </p>
                    <p>
                      <strong>Jornada:</strong> {cuenta.jornada}
                    </p>
                  </div>
                </div>
              </CCol>
            </>
          ) : (
            <>
              {/* Sección Izquierda: Vista del Profesor */}
              <CCol lg={8} md={8} sm={12}>
                <div className="left-section">
                  <h3
                    className="mb-4"
                    style={{
                      color: "white",
                    }}
                  >
                    Materias que Enseña
                  </h3>
                  <CListGroup>
                    {materiasProfesores.map((materia) => (
                      <CListGroupItem key={materia.id} className="materia-item">
                        <div className="materia-info">
                          <strong
                            style={{
                              color: "white",
                            }}
                          >
                            {materia.nombre}
                          </strong>
                          <p
                            style={{
                              color: "white",
                            }}
                          >
                            Estudiantes Registrados:{" "}
                            {materia.estudiantesRegistrados}
                          </p>
                          <p
                            style={{
                              color: "white",
                            }}
                          >
                            Recuperaciones: {materia.recuperaciones}
                          </p>
                          <p
                            style={{
                              color: "white",
                            }}
                          >
                            Promedio General: {materia.promedio.toFixed(1)}
                          </p>
                        </div>
                      </CListGroupItem>
                    ))}
                  </CListGroup>
                </div>
              </CCol>

              {/* Sección Derecha: Datos del Profesor */}
              <CCol lg={4} md={4} sm={12}>
                <div className="right-section">
                  <h4>Datos de la Cuenta</h4>
                  <div className="account-details">
                    <p>
                      <strong>Nombre:</strong> {cuenta.nombreCompleto}
                    </p>
                    <p>
                      <strong>Email:</strong> {cuenta.email}
                    </p>
                  </div>
                </div>
              </CCol>
            </>
          )}
        </CRow>
      </CContainer>

      {/* Modal para estudiantes */}
      {roleUser === "Representante" && (
        <CModal visible={visible} onClose={handleModal}>
          <CModalHeader>Pedir Mejora de Calificación</CModalHeader>
          <CModalBody>
            Descargue el PDF para firmarlo digitalmente. <br />
            <PDFDownloadLink
              document={<MyDocument dataUser={cuenta} grade={selectGrade} />}
              fileName="Solicitud_Mejora.pdf"
            >
              {({ loading }) =>
                loading ? (
                  <CButton color="primary">Cargando...</CButton>
                ) : (
                  <CButton color="primary">Descargar PDF</CButton>
                )
              }
            </PDFDownloadLink>
            <br />
            Cuando ya esté firmado, suba el documento:
            <CFormInput
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="mt-2"
            />
            <CButton
              color="success"
              onClick={handleFileUpload}
              className="mt-2"
            >
              Subir Documento
            </CButton>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={handleModal}>
              Cancelar
            </CButton>
          </CModalFooter>
        </CModal>
      )}
    </div>
  );
}

export default MainApp;
