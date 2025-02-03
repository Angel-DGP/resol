// Definición de usuarios
let users = [
  {
    id: 1,
    email: "tea@tea.com",
    password: "tea",
    representanteNombre: "",
    representanteCedula: "",
    nombreCompleto: "Pedro Perez Estupiñan",
    grado: "",
    paralelo: "",
    jornada: "",
    materias: [1],
    role: "Profesor",
    notas: [],
    intentosI: 0,
    intentosD: 0,
  },
  {
    id: 2,
    email: "rep@rep.com",
    password: "rep",
    representanteNombre: "David Fernandez Arroyo",
    representanteCedula: "1234567890",
    nombreCompleto: "Luis Fernandez Torres",
    grado: "3ro Ciencias",
    paralelo: "B",
    jornada: "Vespertina",
    materias: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    role: "Representante",
    notas: [
      {
        id: 1,
        notaClase: "No ingresado",
        notaEvaluacion: "No ingresado",
        notaProyecto: "No ingresado",
        notaFinal: "No ingresado",
        edit: 0,
      },
      {
        id: 2,
        notaClase: "No ingresado",
        notaEvaluacion: "No ingresado",
        notaProyecto: "No ingresado",
        notaFinal: "No ingresado",
        edit: 0,
      },
      {
        id: 3,
        notaClase: "No ingresado",
        notaEvaluacion: "No ingresado",
        notaProyecto: "No ingresado",
        notaFinal: "No ingresado",
        edit: 0,
      },
      {
        id: 4,
        notaClase: "No ingresado",
        notaEvaluacion: "No ingresado",
        notaProyecto: "No ingresado",
        notaFinal: "No ingresado",
        edit: 0,
      },
      {
        id: 5,
        notaClase: "No ingresado",
        notaEvaluacion: "No ingresado",
        notaProyecto: "No ingresado",
        notaFinal: "No ingresado",
        edit: 0,
      },
      {
        id: 6,
        notaClase: "No ingresado",
        notaEvaluacion: "No ingresado",
        notaProyecto: "No ingresado",
        notaFinal: "No ingresado",
        edit: 0,
      },
      {
        id: 7,
        notaClase: "No ingresado",
        notaEvaluacion: "No ingresado",
        notaProyecto: "No ingresado",
        notaFinal: "No ingresado",
        edit: 0,
      },
      {
        id: 8,
        notaClase: "No ingresado",
        notaEvaluacion: "No ingresado",
        notaProyecto: "No ingresado",
        notaFinal: "No ingresado",
        edit: 0,
      },
      {
        id: 9,
        notaClase: "No ingresado",
        notaEvaluacion: "No ingresado",
        notaProyecto: "No ingresado",
        notaFinal: "No ingresado",
        edit: 0,
      },
    ],
    intentosI: 0,
    intentosD: 0,
  },
  {
    id: 3,
    email: "admin@admin.com",
    password: "admin",
    representanteNombre: "David Fernandez Arroyo",
    representanteCedula: "1234567890",
    nombreCompleto: "Luis Fernandez Torres",
    grado: "3ro Ciencias",
    paralelo: "B",
    jornada: "Vespertina",
    materias: [],
    role: "admin",
    notas: [],
    intentosI: 0,
    intentosD: 0,
  },
  {
    id: 4,
    email: "teac@teac.com",
    password: "teac",
    representanteNombre: "",
    representanteCedula: "",
    nombreCompleto: "Lerdo Perez Estupiñan",
    grado: "",
    paralelo: "",
    jornada: "",
    materias: [1],
    role: "Profesor",
    notas: [],
    intentosI: 0,
    intentosD: 0,
  },
  {
    id: 4,
    email: "res@res.com",
    password: "res",
    representanteNombre: "Arruay Rer Saer",
    representanteCedula: "1234567890",
    nombreCompleto: "Eser Acar Rer",
    grado: "3ro Ciencias",
    paralelo: "A",
    jornada: "Vespertina",
    materias: [],
    role: "Representante",
    notas: [
      {
        id: 1,
        notaClase: "No ingresado",
        notaEvaluacion: "No ingresado",
        notaProyecto: "No ingresado",
        notaFinal: "No ingresado",
        edit: 0,
      },
      {
        id: 2,
        notaClase: "No ingresado",
        notaEvaluacion: "No ingresado",
        notaProyecto: "No ingresado",
        notaFinal: "No ingresado",
        edit: 0,
      },
      {
        id: 3,
        notaClase: "No ingresado",
        notaEvaluacion: "No ingresado",
        notaProyecto: "No ingresado",
        notaFinal: "No ingresado",
        edit: 0,
      },
      {
        id: 4,
        notaClase: "No ingresado",
        notaEvaluacion: "No ingresado",
        notaProyecto: "No ingresado",
        notaFinal: "No ingresado",
        edit: 0,
      },
      {
        id: 5,
        notaClase: "No ingresado",
        notaEvaluacion: "No ingresado",
        notaProyecto: "No ingresado",
        notaFinal: "No ingresado",
        edit: 0,
      },
      {
        id: 6,
        notaClase: "No ingresado",
        notaEvaluacion: "No ingresado",
        notaProyecto: "No ingresado",
        notaFinal: "No ingresado",
        edit: 0,
      },
      {
        id: 7,
        notaClase: "No ingresado",
        notaEvaluacion: "No ingresado",
        notaProyecto: "No ingresado",
        notaFinal: "No ingresado",
        edit: 0,
      },
      {
        id: 8,
        notaClase: "No ingresado",
        notaEvaluacion: "No ingresado",
        notaProyecto: "No ingresado",
        notaFinal: "No ingresado",
        edit: 0,
      },
      {
        id: 9,
        notaClase: "No ingresado",
        notaEvaluacion: "No ingresado",
        notaProyecto: "No ingresado",
        notaFinal: "No ingresado",
        edit: 0,
      },
    ],
    intentosI: 0,
    intentosD: 0,
  },
];

// Definición de materias
let grades = [
  { id: 1, nombre: "Lengua y literatura" },
  { id: 2, nombre: "Química" },
  { id: 3, nombre: "Historia" },
  { id: 4, nombre: "Matemáticas" },
  { id: 5, nombre: "Física" },
  { id: 6, nombre: "Fílosfía" },
  { id: 7, nombre: "Ciencias Naturales" },
  { id: 8, nombre: "Estudios Sociales" },
  { id: 9, nombre: "Biología" },
];

// Array de peticiones (solicitudes de mejora)
// Cada petición registra: id, idM (materia), idTea (profesor que ingresa la nota), idRep (representante que solicita la mejora), fecha y nota (solicitada)
let peticiones = [
  {
    id: 1,
    idM: 1,
    idTea: 1,
    idRep: 2,
    fecha: "2023-01-01 10:00",
    nota: 5.5,
    mejora: "Indirecta",
    estado: "Pendiente",
  },
  {
    id: 2,
    idM: 1,
    idTea: 1,
    idRep: 3,
    fecha: "2023-01-01 10:00",
    nota: 7.5,
    mejora: "Directa",
    estado: "Pendiente",
  },
];

let userLogin = 0;

// Funciones auxiliares

export const getPeticiones = () => peticiones;
export const getPeticionesById = (id) => {
  let pet = [];
  for (let i = 0; i < peticiones.length; i++) {
    if (peticiones[i].idTea === id || peticiones[i].idRep === id) {
      pet.push(peticiones[i]);
    }
  }
  return pet;
};

export const addPeticion = (peticion) => {
  peticion.id = peticiones.length + 1;
  peticiones.push(peticion);
};

export const usersInGradeById = (idGrade) => {
  let matriculados = 0;
  for (let i = 0; i < users.length; i++) {
    // Se asume que el arreglo de materias en cada usuario es completo
    if (
      users[i].role === "Representante" &&
      users[i].materias.includes(idGrade)
    ) {
      matriculados++;
    }
  }
  return matriculados;
};

export const teaGradeById = (idGrade) => {
  let profesores = [];
  for (let i = 0; i < users.length; i++) {
    if (users[i].role === "Profesor" && users[i].materias.includes(idGrade)) {
      profesores.push(users[i].nombreCompleto);
    }
  }
  return profesores;
};

export const getGradeById = (id) => {
  return grades.find((g) => g.id === id);
};

export const getUsers = () => users;

export const findUserById = (id) => users.find((u) => u.id === id);

export const addUser = (newUser) => {
  newUser.id = users.length + 1;
  users.push(newUser);
};

export const setIdUser = (id) => {
  userLogin = id;
};

export const getIdUser = () => userLogin;

export const getRoleUser = (id) => {
  let user = findUserById(id);
  return user ? user.role : null;
};

export const getNotaGradeById = (idGrade, idU) => {
  let user = findUserById(idU);
  if (!user) return null;
  let notaObj = user.notas.find((n) => n.id === idGrade);
  return notaObj ? notaObj : null;
};

export const getNotaEditGradeById = (idGrade, idU) => {
  let user = findUserById(idU);
  if (!user) return null;
  let notaObj = user.notas.find((n) => n.id === idGrade);
  return notaObj ? notaObj.edit : null;
};

export const setStatePeticion = (idP, estadoN) => {
  for (let i = 0; i < peticiones.length; i++) {
    if (peticiones[i].id === idP) {
      peticiones[i].estado = estadoN;
    }
  }
};

export { grades };
