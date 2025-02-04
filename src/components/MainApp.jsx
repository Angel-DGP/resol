import React, { useState, useEffect } from "react";
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
  CFormLabel,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CBadge,
} from "@coreui/react";
import "./MainApp.css";
import { useNavigate } from "react-router-dom";
import { PDFDownloadLink } from "@react-pdf/renderer";
import MyDocument from "./MyDocument";
import {
  getIdUser,
  findUserById,
  getGradeById,
  usersInGradeById,
  teaGradeById,
  getUsers,
  grades,
  getNotaGradeById,
  getNotaEditGradeById,
  getPeticiones,
  addPeticion,
  getPeticionesById,
  setStatePeticion,
} from "./database";

// Modal de ingreso de notas (vista del Profesor)
import ModalIngresoNotas from "./ModalIngresoNotas";

function MainApp() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [visibleNoteModal, setVisibleNoteModal] = useState(false);
  const [adminModalVisible, setAdminModalVisible] = useState(false);
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const [selectGrade, setSelectGrade] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [peticionesState, setPeticionesState] = useState(getPeticiones());
  const [selectedUser, setSelectedUser] = useState(null);
  const [editNombre, setEditNombre] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editRole, setEditRole] = useState("");
  const [editMaterias, setEditMaterias] = useState("");
  const [editIntentosI, setEditIntentosI] = useState("");
  const [editIntentosD, setEditIntentosD] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [mejora, setMejora] = useState("");

  let cuenta = findUserById(getIdUser());
  let roleUser = cuenta.role;
  const leido = (pet) => {
    if (pet.estado === "Aceptada") {
      return true;
    } else {
      return false;
    }
  };
  const msg = (pet) => {
    if (roleUser === "Profesor") {
      return `Nueva solicitud de mejora en ${
        getGradeById(pet.idM).nombre
      } por el representante del estudiante ${
        findUserById(pet.idRep).nombreCompleto
      } del ${findUserById(pet.idRep).grado} "${
        findUserById(pet.idRep).paralelo
      }"`;
    } else if (roleUser === "admin") {
      return `Nueva solicitud de mejora realizada de la materia de ${
        getGradeById(pet.idM).nombre
      } por ${findUserById(pet.idRep).nombreCompleto} del ${
        findUserById(pet.idRep).grado
      } "${findUserById(pet.idRep).paralelo}" hacia el profesor ${
        findUserById(pet.idTea).nombreCompleto
      } `;
    } else if (roleUser === "Representante") {
      if (pet.estado === "Aceptada") {
        return `Solicitud aceptada de mejora ${
          pet.mejora
        } de calfificación de la materia de ${
          getGradeById(pet.idM).nombre
        } por la nota ${pet.nota} en la evaluación del ${
          findUserById(pet.idRep).grado
        } "${findUserById(pet.idRep).paralelo}" hacia el profesor ${
          findUserById(pet.idTea).nombreCompleto
        } `;
      } else {
        return `Solicitud enviada de mejora ${pet.mejora} de la materia de ${
          getGradeById(pet.idM).nombre
        } por la nota ${pet.nota} en la evaluación del ${
          findUserById(pet.idRep).grado
        } "${findUserById(pet.idRep).paralelo}" hacia el profesor ${
          findUserById(pet.idTea).nombreCompleto
        } `;
      }
    }
  };

  // Cargar notificaciones al iniciar
  useEffect(() => {
    const loadNotifications = () => {
      const peticiones = getPeticionesById(cuenta.id);
      const nuevasNotificaciones = peticiones.map((peticion) => ({
        id: peticion.id,
        message: msg(peticion),
        read: leido(peticion),
        fecha: peticion.fecha,
        estado: peticion.estado,
      }));
      setNotifications(nuevasNotificaciones);
    };
    loadNotifications();
  }, [peticionesState]);

  const handleFileChange = (event) => setSelectedFile(event.target.files[0]);
  const handleFileUpload = () => {
    if (selectedFile) {
      console.log("Archivo subido:", selectedFile.name);

      alert("Archivo subido exitosamente");
    } else {
      alert("Por favor, seleccione un archivo antes de subirlo.");
    }
  };
  const handleLogout = () => {
    console.log("Cerrando sesión...");
    navigate("/");
  };

  const markNotificationAsRead = (id) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const can = (gradeId, userId) => {
    let nota = getNotaGradeById(gradeId, userId);
    let hecan = false;
    if (
      nota.notaEvaluacion >= 7 &&
      nota.notaEvaluacion <= 8.99 &&
      cuenta.intentosD < 3
    ) {
      hecan = true;
    } else if (
      nota.notaEvaluacion <= 6.99 &&
      nota.notaEvaluacion >= 0.01 &&
      cuenta.intentosI < 6
    ) {
      hecan = true;
    }
    return !hecan;
  };

  const handleConfirmImprovement = (tea) => {
    if (mejora === "Directa") {
      cuenta.intentosD++;
    } else {
      cuenta.intentosI++;
    }
    alert("Mejora confirmada, intento asignado.");
    setVisible(false);
    const nuevaPeticion = {
      idM: selectGrade.id,
      idTea: tea.id,
      idRep: cuenta.id,
      fecha: new Date().toLocaleString(),
      nota: getNotaGradeById(selectGrade.id, cuenta.id).notaEvaluacion,
      estado: "Pendiente",
      mejora: mejora,
    };
    addPeticion(nuevaPeticion);
    setPeticionesState(getPeticiones());
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setEditNombre(user.nombreCompleto);
    setEditEmail(user.email);
    setEditRole(user.role);
    setEditMaterias(user.materias.join(", "));
    setEditIntentosD(user.intentosD);
    setEditIntentosI(user.intentosD);
    setAdminModalVisible(true);
  };

  const updateUserInDatabase = (updatedUser) => {
    const index = users.findIndex((u) => u.id === updatedUser.id);
    if (index !== -1) {
      users[index] = updatedUser;
      setRefresh(!refresh);
    }
  };

  const deleteUserFromDatabase = (userId) => {
    const index = users.findIndex((u) => u.id === userId);
    if (index !== -1) {
      users.splice(index, 1);
      setRefresh(!refresh);
    }
  };

  const handleSaveAdminChanges = () => {
    if (!selectedUser) return;

    // Convertir las materias de string a array de IDs
    const materiasArray = editMaterias
      .split(",")
      .map((m) => parseInt(m.trim())) // Convertir cada ID a número
      .filter((m) => !isNaN(m)); // Filtrar cualquier valor no numérico

    // Crear el objeto actualizado con los nuevos valores
    const updatedUser = {
      ...selectedUser,
      nombreCompleto: editNombre,
      email: editEmail,
      role: editRole,
      materias: materiasArray,
      intentosD: parseInt(editIntentosD),
      intentosI: parseInt(editIntentosI), // Convertir los intentos a número
    };

    // Actualizar el usuario en la base de datos
    updateUserInDatabase(updatedUser);

    // Cerrar el modal de edición
    setAdminModalVisible(false);
    // Mostrar una notificación de éxito
    alert("Usuario actualizado correctamente.");
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm("¿Está seguro de eliminar este usuario?")) {
      deleteUserFromDatabase(userId);
      alert("Usuario eliminado.");
    }
  };
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [notificationModalVisible, setNotificationModalVisible] =
    useState(false);
  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
    setNotificationModalVisible(true);
  };
  const handleAcceptNotification = () => {
    if (selectedNotification) {
      // Cambiar el estado de la petición a "Aceptada"
      const updatedPeticiones = peticionesState.map(() => {
        setStatePeticion(selectedNotification.id, "Aceptada");
      });
      setPeticionesState(updatedPeticiones);
    }
    setNotificationModalVisible(false);
  };

  const users = getUsers();
  let gradeMap = [];
  for (let i = 0; i < cuenta.materias.length; i++) {
    gradeMap.push(getGradeById(cuenta.materias[i]));
  }
  const promedio = (idM, idC) => {
    let totalNotas = 0;
    let cantidadNotas = 0;

    for (let i = 0; i < users.length; i++) {
      let notaObj = getNotaGradeById(idM, users[i].id);

      // Verificar si la nota existe y es un número válido
      if (
        notaObj &&
        !isNaN(notaObj.notaFinal) &&
        notaObj.notaFinal !== "No ingresado"
      ) {
        totalNotas += parseFloat(notaObj.notaFinal);
        cantidadNotas++;
      }
    }

    // Evitar dividir por 0
    return cantidadNotas > 0
      ? (totalNotas / cantidadNotas).toFixed(2)
      : "Sin notas";
  };

  return (
    <div className="main-container">
      <CModal
        visible={notificationModalVisible}
        onClose={() => setNotificationModalVisible(false)}
      >
        <CModalHeader closeButton>
          <h5>Detalles de la notificación</h5>
        </CModalHeader>
        <CModalBody>
          {selectedNotification ? (
            <div>
              <p>{selectedNotification.message}</p>
              <p>Fecha: {selectedNotification.fecha}</p>
              <p>Estado: {selectedNotification.estado}</p>
            </div>
          ) : (
            <p>No hay detalles disponibles.</p>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => setNotificationModalVisible(false)}
          >
            Cerrar notificación
          </CButton>
          {cuenta.role === "Profesor" && (
            <CButton color="primary" onClick={handleAcceptNotification}>
              Aceptar
            </CButton>
          )}
        </CModalFooter>
      </CModal>

      {/* Barra Superior */}
      <div className="top-bar">
        <h2 style={{ color: "white" }}>Sistema de Gestión Académica</h2>
        <div className="notification-area">
          <CDropdown>
            <CDropdownToggle color="primary">
              Notificaciones
              <CBadge color="danger">
                {notifications.filter((n) => !n.read).length}
              </CBadge>
            </CDropdownToggle>
            <CDropdownMenu>
              {notifications.map((notif) => (
                <CDropdownItem
                  key={notif.id}
                  onClick={() => {
                    markNotificationAsRead(notif.id);
                    handleNotificationClick(notif);
                  }}
                >
                  {notif.message}{" "}
                  {!notif.read && <CBadge color="info">Nuevo</CBadge>}
                </CDropdownItem>
              ))}
            </CDropdownMenu>
          </CDropdown>
          <CButton color="danger" onClick={handleLogout}>
            Cerrar Sesión
          </CButton>
        </div>
      </div>
      <CContainer>
        <CRow>
          {/* Vista Admin: Panel de Gestión de Usuarios */}
          {roleUser === "admin" ? (
            <CCol lg={12} md={12} sm={12}>
              <div className="admin-section">
                <h3 className="mb-4">
                  Panel de Administrador - Gestión de Usuarios
                </h3>
                <CListGroup>
                  {users.map((user) => {
                    // Filtrar las peticiones según el rol del usuario
                    const peticionesRecibidas = getPeticiones().filter(
                      (p) => p.idTea === user.id
                    ).length; // Cantidad de peticiones para profesores

                    return (
                      <CListGroupItem key={user.id} className="admin-item">
                        <p>
                          <strong>ID:</strong> {user.id}
                        </p>
                        <p>
                          <strong>Nombre:</strong> {user.nombreCompleto}
                        </p>
                        <p>
                          <strong>Email:</strong> {user.email}
                        </p>
                        <p>
                          <strong>Rol:</strong> {user.role}
                        </p>

                        {/* Si el usuario es Representante, mostrar sus intentos */}
                        {user.role === "Representante" && (
                          <>
                            <p>
                              <strong>Intentos de mejora indirecta:</strong>{" "}
                              {user.intentosI}
                            </p>
                            <p>
                              <strong>Intentos de mejora directa:</strong>{" "}
                              {user.intentosD}
                            </p>
                          </>
                        )}

                        {/* Si el usuario es Profesor, mostrar la cantidad de peticiones recibidas */}
                        {user.role === "Profesor" && (
                          <p>
                            <strong>Peticiones recibidas:</strong>{" "}
                            {peticionesRecibidas}
                          </p>
                        )}

                        <CButton
                          color="primary"
                          onClick={() => {
                            handleEditUser(user);
                          }}
                          className="m-1"
                        >
                          Editar
                        </CButton>
                        <CButton
                          color="danger"
                          onClick={() => handleDeleteUser(user.id)}
                          className="m-1"
                        >
                          Eliminar
                        </CButton>
                      </CListGroupItem>
                    );
                  })}
                </CListGroup>
              </div>
            </CCol>
          ) : roleUser === "Representante" ? (
            // Vista Representante
            <>
              <CCol lg={8} md={8} sm={12}>
                <div className="left-section">
                  <h3 className="mb-4">Materias</h3>
                  <CListGroup>
                    {gradeMap.map((materia) => (
                      <CListGroupItem key={materia.id} className="materia-item">
                        <div className="materia-info">
                          <strong>{materia.nombre}</strong>
                          <p>Docente/s: {teaGradeById(materia.id)}</p>
                          <p>
                            Nota Evaluación:{" "}
                            {
                              getNotaGradeById(materia.id, cuenta.id)
                                .notaEvaluacion
                            }
                          </p>
                          <p>
                            Nota Final:{" "}
                            {getNotaGradeById(materia.id, cuenta.id).notaFinal}
                          </p>
                        </div>
                        <CButton
                          color="primary"
                          onClick={() => {
                            let notaEva = getNotaGradeById(
                              materia.id,
                              cuenta.id
                            ).notaEvaluacion;
                            if (
                              cuenta.intentosD < 3 &&
                              notaEva >= 7 &&
                              notaEva < 9
                            ) {
                              setMejora("Directa");
                              setVisible(true);
                              setSelectGrade(materia);
                            } else if (cuenta.intentosD > 3) {
                              alert(
                                "Has alcanzado el límite de intentos para solicitar mejoras directas."
                              );
                            }
                            if (
                              cuenta.intentosI < 6 &&
                              notaEva >= 0.01 &&
                              notaEva <= 6.99
                            ) {
                              setMejora("Indirecta");
                              setVisible(true);
                              setSelectGrade(materia);
                            } else if (cuenta.intentosI > 6) {
                              alert(
                                "Has alcanzado el límite de intentos para solicitar mejoras indirectas."
                              );
                            }
                          }}
                          disabled={can(materia.id, cuenta.id)}
                        >
                          Pedir Mejora
                        </CButton>
                      </CListGroupItem>
                    ))}
                  </CListGroup>
                </div>
              </CCol>
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
                    <p>
                      <strong>Intentos de mejoras directas usados:</strong>{" "}
                      {cuenta.intentosD} de 3
                    </p>
                    <p>
                      <strong>Intentos de mejoras indirectas usados:</strong>{" "}
                      {cuenta.intentosI} de 6
                    </p>
                  </div>
                </div>
              </CCol>
            </>
          ) : (
            // Vista Profesor
            <>
              <CCol lg={8} md={8} sm={12}>
                <div className="left-section">
                  <h3 className="mb-4">Materias que Enseña</h3>
                  <CListGroup>
                    {gradeMap.map((materia) => (
                      <CListGroupItem key={materia.id} className="materia-item">
                        <div className="materia-info">
                          <strong>{materia.nombre}</strong>
                          <p>
                            Estudiantes Registrados:{" "}
                            {usersInGradeById(materia.id)}
                          </p>
                          <p>
                            Recuperaciones:{" "}
                            {getPeticionesById(cuenta.id).length}
                          </p>
                          <p>
                            Promedio General: {promedio(materia.id, cuenta.id)}
                          </p>
                        </div>
                      </CListGroupItem>
                    ))}
                  </CListGroup>
                  <CButton
                    color="success"
                    className="mt-3"
                    onClick={() => setVisibleNoteModal(true)}
                  >
                    Ingresar Nota
                  </CButton>
                </div>
              </CCol>
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

      {/* Modal para Representante: Pedir Mejora de Calificación */}
      {roleUser === "Representante" && (
        <CModal visible={visible} onClose={() => setVisible(false)}>
          <CModalHeader>Pedir Mejora {mejora} de Calificación</CModalHeader>
          <CModalBody>
            Descargue el PDF para firmarlo (digitalmente/manualmente). <br />
            <PDFDownloadLink
              document={
                <MyDocument
                  dataUser={cuenta}
                  grade={selectGrade}
                  teacher={findUserById(
                    getNotaEditGradeById(selectGrade.id, cuenta.id)
                  )}
                  mejora={mejora}
                />
              }
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
            {/*}
            <CButton
              color="success"
              onClick={handleFileUpload}
              className="mt-2"
            >
              Subir Documento
            </CButton>{*/}
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisible(false)}>
              Cancelar
            </CButton>
            <CButton
              color="primary"
              onClick={() => {
                handleConfirmImprovement(
                  findUserById(getNotaEditGradeById(selectGrade.id, cuenta.id))
                );
              }}
            >
              Confirmar Envío
            </CButton>
          </CModalFooter>
        </CModal>
      )}

      {/* Modal de ingreso de notas (vista 1 del Profesor) */}
      {roleUser === "Profesor" && (
        <ModalIngresoNotas
          isOpen={visibleNoteModal}
          onClose={() => setVisibleNoteModal(false)}
          users={users}
          grades={grades}
          profesorId={cuenta.id}
        />
      )}

      {/* Modal Admin: Editar Usuario */}
      {roleUser === "admin" && adminModalVisible && (
        <CModal
          visible={adminModalVisible}
          onClose={() => setAdminModalVisible(false)}
        >
          <CModalHeader>Editar Usuario</CModalHeader>
          <CModalBody>
            <CFormLabel>Nombre</CFormLabel>
            <CFormInput
              type="text"
              value={editNombre}
              onChange={(e) => setEditNombre(e.target.value)}
            />
            <CFormLabel>Email</CFormLabel>
            <CFormInput
              type="email"
              value={editEmail}
              onChange={(e) => setEditEmail(e.target.value)}
            />
            <CFormLabel>Rol</CFormLabel>
            <CFormInput
              type="text"
              value={editRole}
              onChange={(e) => setEditRole(e.target.value)}
            />
            <CFormLabel>Materias (IDs separados por comas)</CFormLabel>
            <CFormInput
              type="text"
              value={editMaterias}
              onChange={(e) => setEditMaterias(e.target.value)}
            />
            {editRole !== "Profesor" && (
              <>
                <CFormLabel>Intentos Indirectos</CFormLabel>
                <CFormInput
                  type="number"
                  value={editIntentosI}
                  onChange={(e) => setEditIntentosI(e.target.value)}
                />
                <CFormLabel>Intentos Directos</CFormLabel>
                <CFormInput
                  type="number"
                  value={editIntentosD}
                  onChange={(e) => setEditIntentosD(e.target.value)}
                />
              </>
            )}
          </CModalBody>
          <CModalFooter>
            <CButton
              color="secondary"
              onClick={() => setAdminModalVisible(false)}
            >
              Cancelar
            </CButton>
            <CButton color="primary" onClick={handleSaveAdminChanges}>
              Guardar Cambios
            </CButton>
          </CModalFooter>
        </CModal>
      )}

      {/* Modal Admin: Ver Reportes */}
      {roleUser === "admin" && reportModalVisible && (
        <CModal
          visible={reportModalVisible}
          onClose={() => setReportModalVisible(false)}
          size="lg"
        >
          <CModalHeader>Reportes de Peticiones</CModalHeader>
          <CModalBody>
            {peticionesState.length === 0 ? (
              <p>No hay peticiones registradas.</p>
            ) : (
              <CListGroup>
                {peticionesState.map((p) => {
                  const rep = findUserById(p.idRep);
                  const materia = getGradeById(p.idM);
                  const profesor = findUserById(p.idTea);
                  return (
                    <CListGroupItem key={p.id}>
                      <p>
                        <strong>ID:</strong> {p.id}
                      </p>
                      <p>
                        <strong>Representante:</strong>{" "}
                        {rep ? rep.nombreCompleto : "Desconocido"}
                      </p>
                      <p>
                        <strong>Materia:</strong>{" "}
                        {materia ? materia.nombre : "Desconocido"}
                      </p>
                      <p>
                        <strong>Profesor:</strong>{" "}
                        {profesor ? profesor.nombreCompleto : "Desconocido"}
                      </p>
                      <p>
                        <strong>Fecha:</strong> {p.fecha}
                      </p>
                      <p>
                        <strong>Nota :</strong> {p.nota}
                      </p>
                      <p>
                        <strong>Mejora </strong> {p.mejora}
                      </p>
                    </CListGroupItem>
                  );
                })}
              </CListGroup>
            )}
          </CModalBody>
          <CModalFooter>
            <CButton
              color="secondary"
              onClick={() => setReportModalVisible(false)}
            >
              Cerrar
            </CButton>
          </CModalFooter>
        </CModal>
      )}

      {/* Botón adicional en panel admin para ver reportes */}
      {roleUser === "admin" && (
        <CContainer className="mt-3">
          <CButton
            color="info"
            className="m-2"
            onClick={() => setReportModalVisible(true)}
          >
            Ver Reportes
          </CButton>
        </CContainer>
      )}
    </div>
  );
}

export default MainApp;
