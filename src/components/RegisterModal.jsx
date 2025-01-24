import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

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
    materias: [],
  });

  const materiasList = [
    "Lengua y Literatura",
    "Matemáticas",
    "Ciencias Naturales",
    "Química",
    "Física",
    "Estudios Sociales",
    "Historia",
    "Filosofía",
    "Biología",
  ];

  // Manejador de cambio para inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "materias") {
      // Para manejar las materias seleccionadas
      const selectedMaterias = formData.materias.includes(value)
        ? formData.materias.filter((materia) => materia !== value)
        : [...formData.materias, value];

      setFormData((prevData) => ({
        ...prevData,
        [name]: selectedMaterias,
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
    // Aquí puedes manejar el envío de los datos del formulario
    console.log(formData);
  };

  return (
    <Modal show={show} onHide={handleClose}>
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
            />
          </Form.Group>

          <Form.Group controlId="formRole">
            <Form.Label>Rol</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => setRole(e.target.value)}
              value={role}
            >
              <option value="">Seleccionar rol</option>
              <option value="estudiante">Estudiante</option>
              <option value="profesor">Profesor</option>
            </Form.Control>
          </Form.Group>

          {role === "estudiante" && (
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
                  <Col key={materia} md={4}>
                    <Form.Check
                      type="checkbox"
                      label={materia}
                      name="materias"
                      value={materia}
                      checked={formData.materias.includes(materia)}
                      onChange={handleChange}
                    />
                  </Col>
                ))}
              </Row>
            </>
          )}

          {role === "profesor" && (
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
                  <Col key={materia} md={4}>
                    <Form.Check
                      type="checkbox"
                      label={materia}
                      name="materias"
                      value={materia}
                      checked={formData.materias.includes(materia)}
                      onChange={handleChange}
                    />
                  </Col>
                ))}
              </Row>
            </>
          )}

          <Button variant="primary" type="submit">
            Registrar
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RegisterModal;
