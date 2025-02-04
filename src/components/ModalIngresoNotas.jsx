import React, { useState } from "react";
import {
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CFormSelect,
  CFormInput,
  CButton,
} from "@coreui/react";
import "./ModalIngresosNotas.css";

const ModalIngresoNotas = ({ isOpen, onClose, users, grades, profesorId }) => {
  const [materiaSeleccionada, setMateriaSeleccionada] = useState("");
  const [estudianteSeleccionado, setEstudianteSeleccionado] = useState("");
  const [notaClase, setNotaClase] = useState("");
  const [notaEvaluacion, setNotaEvaluacion] = useState("");
  const [notaProyecto, setNotaProyecto] = useState("");
  const [gradoSeleccionado, setGradoSeleccionado] = useState("");
  const [paraleloSeleccionado, setParaleloSeleccionado] = useState("");
  const [jornadaSeleccionada, setJornadaSeleccionada] = useState(""); // Nuevo estado para la jornada

  // Calculamos la nota final en tiempo real
  const calcularNotaFinal = () => {
    const clase = parseFloat(notaClase) || 0;
    const evaluacion = parseFloat(notaEvaluacion) || 0;
    const proyecto = parseFloat(notaProyecto) || 0;
    return (clase * 0.7 + evaluacion * 0.2 + proyecto * 0.1).toFixed(2);
  };

  const profesor = users.find((user) => user.id === profesorId);
  const materiasProfesor = profesor ? profesor.materias : [];

  const estudiantes = users.filter(
    (user) =>
      user.role === "Representante" &&
      user.materias.includes(Number(materiaSeleccionada)) &&
      user.grado === gradoSeleccionado && // Filtra por grado
      user.paralelo === paraleloSeleccionado && // Filtra por paralelo
      user.jornada === jornadaSeleccionada // Filtra por jornada
  );

  const handleGuardarNota = () => {
    if (
      !materiaSeleccionada ||
      !estudianteSeleccionado ||
      !notaClase ||
      !notaEvaluacion ||
      !notaProyecto
    ) {
      alert("Por favor, complete todos los campos");
      return;
    }
    if (
      notaClase < 0 ||
      notaClase > 10 ||
      notaEvaluacion < 0 ||
      notaEvaluacion > 10 ||
      notaProyecto < 0 ||
      notaProyecto > 10
    ) {
      alert("Por favor, ingrese notas entre los valores 0-10");
      return;
    }

    const estudianteIndex = users.findIndex(
      (user) => user.id === Number(estudianteSeleccionado)
    );
    if (estudianteIndex !== -1) {
      const estudiante = users[estudianteIndex];
      const notaExistenteIndex = estudiante.notas.findIndex(
        (n) => n.id === Number(materiaSeleccionada)
      );
      const notaFinal = calcularNotaFinal();

      if (notaExistenteIndex !== -1) {
        estudiante.notas[notaExistenteIndex] = {
          ...estudiante.notas[notaExistenteIndex],
          notaClase: parseFloat(notaClase),
          notaEvaluacion: parseFloat(notaEvaluacion),
          notaProyecto: parseFloat(notaProyecto),
          notaFinal: parseFloat(notaFinal),
          edit: profesorId,
        };
        alert("Notas actualizadas correctamente");
      } else {
        estudiante.notas.push({
          id: Number(materiaSeleccionada),
          notaClase: parseFloat(notaClase),
          notaEvaluacion: parseFloat(notaEvaluacion),
          notaProyecto: parseFloat(notaProyecto),
          notaFinal: parseFloat(notaFinal),
          edit: profesorId,
        });
        alert("Notas guardadas correctamente");
      }
      console.log(estudiante.notas);
    }

    setMateriaSeleccionada("");
    setNotaClase("");
    setNotaEvaluacion("");
    setNotaProyecto("");
    setEstudianteSeleccionado("");
    setJornadaSeleccionada(""); // Limpiar la jornada seleccionada
    onClose();
  };

  return (
    <CModal visible={isOpen} onClose={onClose}>
      <CModalHeader>Ingresar Notas</CModalHeader>
      <CModalBody>
        <label>Materia</label>
        <CFormSelect
          value={materiaSeleccionada}
          onChange={(e) => setMateriaSeleccionada(e.target.value)}
        >
          <option value="">Seleccione una materia</option>
          {materiasProfesor.map((materiaId) => {
            const materia = grades.find((g) => g.id === materiaId);
            return (
              <option key={materiaId} value={materiaId}>
                {materia?.nombre}
              </option>
            );
          })}
        </CFormSelect>

        <label className="mt-2">Grado</label>
        <CFormSelect
          value={gradoSeleccionado}
          onChange={(e) => setGradoSeleccionado(e.target.value)}
        >
          <option value="">Seleccione un grado</option>
          {[...new Set(users.map((user) => user.grado).filter(Boolean))].map(
            (grado) => (
              <option key={grado} value={grado}>
                {grado}
              </option>
            )
          )}
        </CFormSelect>

        <label className="mt-2">Paralelo</label>
        <CFormSelect
          value={paraleloSeleccionado}
          onChange={(e) => setParaleloSeleccionado(e.target.value)}
        >
          <option value="">Seleccione un paralelo</option>
          {[...new Set(users.map((user) => user.paralelo).filter(Boolean))].map(
            (paralelo) => (
              <option key={paralelo} value={paralelo}>
                {paralelo}
              </option>
            )
          )}
        </CFormSelect>

        <label className="mt-2">Jornada</label>
        <CFormSelect
          value={jornadaSeleccionada}
          onChange={(e) => setJornadaSeleccionada(e.target.value)}
        >
          <option value="">Seleccione una jornada</option>
          <option value="Matutina">Matutina</option>
          <option value="Vespertina">Vespertina</option>
        </CFormSelect>

        <label className="mt-2">Estudiante</label>
        <CFormSelect
          value={estudianteSeleccionado}
          onChange={(e) => setEstudianteSeleccionado(e.target.value)}
        >
          <option value="">Seleccione un estudiante</option>
          {estudiantes.map((est) => (
            <option key={est.id} value={est.id}>
              {est.nombreCompleto}
            </option>
          ))}
        </CFormSelect>

        <label className="mt-2">Nota de Actividades en Clase</label>
        <CFormInput
          type="number"
          value={notaClase}
          onChange={(e) => setNotaClase(e.target.value)}
        />

        <label className="mt-2">Nota de Evaluación</label>
        <CFormInput
          type="number"
          value={notaEvaluacion}
          onChange={(e) => setNotaEvaluacion(e.target.value)}
        />

        <label className="mt-2">Nota de Proyecto</label>
        <CFormInput
          type="number"
          value={notaProyecto}
          onChange={(e) => setNotaProyecto(e.target.value)}
        />

        <label className="mt-3 fw-bold">
          Nota Final: {calcularNotaFinal()}
        </label>
      </CModalBody>
      <CModalFooter>
        <CButton color="primary" onClick={handleGuardarNota}>
          Guardar Notas
        </CButton>
        <CButton color="secondary" onClick={onClose}>
          Cancelar
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default ModalIngresoNotas;