import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import "./RegisterModal.css";
import { addUser, getUsers } from "./database"; // Asegúrate de importar estas funciones

const RegisterModal = ({ show, handleClose }) => {
  const [role, setRole] = useState(""); // Estado para guardar el rol
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    representanteNombre: "",
    representanteCedula: "",
    nombreCompleto: "",
    grado: "",
    paralelo: "",
    jornada: "",
    materias: [], // Ahora guardará solo IDs
    notas: [],
    intentos: 0,
  });

  const materiasList = [
    { id: 1, nombre: "Lengua y Literatura" },
    { id: 2, nombre: "Química" },
    { id: 3, nombre: "Historia" },
    { id: 4, nombre: "Matemáticas" },
    { id: 5, nombre: "Física" },
    { id: 6, nombre: "Filosofía" },
    { id: 7, nombre: "Ciencias Naturales" },
    { id: 8, nombre: "Estudios Sociales" },
    { id: 9, nombre: "Biología" },
  ];

  // Manejador de cambio para inputs
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "materias") {
      const selectedId = parseInt(value, 10);
      const selectedMaterias = formData.materias.includes(selectedId)
        ? formData.materias.filter((id) => id !== selectedId)
        : [...formData.materias, selectedId];

      setFormData((prevData) => ({
        ...prevData,
        materias: selectedMaterias, // Solo guarda IDs
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Manejador para cuando el formulario es enviado
  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      id: getUsers().length + 1, // Generar un nuevo ID
      ...formData,
      role, // Agregar el rol seleccionado
    };

    addUser(newUser); // Agregar el usuario a la base primitiva
    console.log("Usuario registrado:", newUser);
    handleClose(); // Cerrar el modal después de guardar
  };

  return (
    <Modal show={show} onHide={handleClose} className="modal-dark" size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Registrar Usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingrese su email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ingrese su contraseña"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formRole">
            <Form.Label>Rol</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => setRole(e.target.value)}
              value={role}
              required
            >
              <option value="">Seleccionar rol</option>
              <option value="Representante">Representante</option>
              <option value="Profesor">Profesor</option>
            </Form.Control>
          </Form.Group>

          {role === "Representante" && (
            <>
              <Form.Group controlId="formRepresentanteNombre">
                <Form.Label>Nombre del Representante</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nombre del representante"
                  name="representanteNombre"
                  value={formData.representanteNombre}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formRepresentanteCedula">
                <Form.Label>Cédula del Representante</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Cédula del representante"
                  name="representanteCedula"
                  value={formData.representanteCedula}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formNombreCompleto">
                <Form.Label>Nombre Completo del Estudiante</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nombre completo del estudiante"
                  name="nombreCompleto"
                  value={formData.nombreCompleto}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formGrado">
                <Form.Label>Grado</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Grado"
                  name="grado"
                  value={formData.grado}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formParalelo">
                <Form.Label>Paralelo</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Paralelo"
                  name="paralelo"
                  value={formData.paralelo}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formJornada">
                <Form.Label>Jornada</Form.Label>
                <Form.Control
                  as="select"
                  name="jornada"
                  value={formData.jornada}
                  onChange={handleChange}
                >
                  <option value="matutina">Matutina</option>
                  <option value="vespertina">Vespertina</option>
                </Form.Control>
              </Form.Group>

              <Form.Label>Materias que cursa</Form.Label>
              <Row>
                {materiasList.map((materia) => (
                  <Col key={materia.id} md={4}>
                    <Form.Check
                      type="checkbox"
                      label={materia.nombre}
                      name="materias"
                      value={materia.id}
                      checked={formData.materias.includes(materia.id)}
                      onChange={handleChange}
                    />
                  </Col>
                ))}
              </Row>
            </>
          )}

          {role === "Profesor" && (
            <>
              <Form.Group controlId="formNombreCompletoProfesor">
                <Form.Label>Nombre Completo</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nombre completo del profesor"
                  name="nombreCompleto"
                  value={formData.nombreCompleto}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Label>Materias que enseña</Form.Label>
              <Row>
                {materiasList.map((materia) => (
                  <Col key={materia.id} md={4}>
                    <Form.Check
                      type="checkbox"
                      label={materia.nombre}
                      name="materias"
                      value={materia.id}
                      checked={formData.materias.includes(materia.id)}
                      onChange={handleChange}
                    />
                  </Col>
                ))}
              </Row>
            </>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Registrar
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RegisterModal;
