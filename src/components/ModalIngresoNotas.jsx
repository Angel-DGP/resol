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

const ModalIngresoNotas = ({ isOpen, onClose, users, grades, profesorId }) => {
  const [materiaSeleccionada, setMateriaSeleccionada] = useState("");
  const [nota, setNota] = useState("");
  const [estudianteSeleccionado, setEstudianteSeleccionado] = useState("");

  // Buscamos al profesor para extraer las materias que enseña
  const profesor = users.find((user) => user.id === profesorId);
  const materiasProfesor = profesor ? profesor.materias : [];

  // Filtramos a los estudiantes (usuarios de rol "Representante") que están inscritos en la materia seleccionada
  const estudiantes = users.filter(
    (user) =>
      user.role === "Representante" &&
      user.materias.includes(Number(materiaSeleccionada))
  );

  const handleGuardarNota = () => {
    if (!materiaSeleccionada || !estudianteSeleccionado || !nota) {
      alert("Por favor, complete todos los campos");
      return;
    }
    // Buscamos al estudiante en la lista de usuarios
    const estudianteIndex = users.findIndex(
      (user) => user.id === Number(estudianteSeleccionado)
    );
    if (estudianteIndex !== -1) {
      const estudiante = users[estudianteIndex];
      // Buscamos si ya existe una nota para la materia seleccionada
      const notaExistenteIndex = estudiante.notas.findIndex(
        (n) => n.id === Number(materiaSeleccionada)
      );
      if (notaExistenteIndex !== -1) {
        // Actualizamos la nota existente e indicamos quién la editó
        estudiante.notas[notaExistenteIndex] = {
          ...estudiante.notas[notaExistenteIndex],
          nota: parseFloat(nota),
          edit: profesorId, // Se guarda el id del profesor que edita la nota
        };
        alert("Nota actualizada correctamente");
      } else {
        // Si no existe, se agrega una nueva entrada incluyendo el editor
        estudiante.notas.push({
          id: Number(materiaSeleccionada),
          nota: parseFloat(nota),
          edit: profesorId, // Se guarda el id del profesor que puso la nota
        });
        alert("Nota guardada correctamente");
      }
      console.log(estudiante.notas);
    }
    // Reiniciamos los estados y cerramos el modal
    setMateriaSeleccionada("");
    setNota("");
    setEstudianteSeleccionado("");
    onClose();
  };

  return (
    <CModal visible={isOpen} onClose={onClose}>
      <CModalHeader>Ingresar Nota</CModalHeader>
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

        <label className="mt-2">Nota</label>
        <CFormInput
          type="number"
          value={nota}
          onChange={(e) => setNota(e.target.value)}
        />
      </CModalBody>
      <CModalFooter>
        <CButton color="primary" onClick={handleGuardarNota}>
          Guardar Nota
        </CButton>
        <CButton color="secondary" onClick={onClose}>
          Cancelar
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default ModalIngresoNotas;
