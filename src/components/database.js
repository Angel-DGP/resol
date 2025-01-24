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
    materia: "Matemáticas",
    role: "Profesor",
  },
  {
    id: 2,
    email: "stu@stu.com",
    password: "stu",
    representanteNombre: "David Fernandez Arroyo",
    representanteCedula: "1234567890",
    nombreCompleto: "Luis Fernandez Torres",
    grado: "3ro Ciencias",
    paralelo: "B",
    jornada: "Vespertina",
    materia: "",
    role: "Estudiante",
  },
];
let userLogin = 0;
export const getUsers = () => {
  return users;
};
export const findUserById = (id) => {
  for (let i = 0; i < users.length; i++) {
    if (users[i].id === id) {
      return users[i];
    }
  }
};
export const addUser = (newUser) => {
  users.push(newUser);
};
export const setIdUser = (id) => {
  userLogin = id;
};
export const getIdUser = () => {
  return userLogin;
};
export const getRoleUser = (id) => {
  for (let i = 0; i < users.length; i++) {
    if (users[i].id === id) {
      return users.role[i];
    }
  }
};
