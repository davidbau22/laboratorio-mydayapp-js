import { render, hideTag } from "./utils";

const keyLocalStorage = "mydayapp-js";

// Función para obtener la lista de tareas desde localStorage
export const getStoredList = () => {
  const storagedList = JSON.parse(localStorage.getItem(keyLocalStorage)) || [];
  return storagedList;
};

// Función para guardar la lista de tareas en localStorage
const saveToLocalStorage = (storagedList) => {
  localStorage.setItem(keyLocalStorage, JSON.stringify(storagedList));
};

export const checkStorage = () => {
  return getStoredList();
};

export const addNewTodo = (todo) => {
  const storagedList = getStoredList();
  storagedList.push(todo);
  saveToLocalStorage(storagedList);
};

export const checkCompletedTasks = () => {
  return getStoredList().some((todo) => todo.completed);
};

// Actualiza el estado de una tarea y renderiza según el hash actual
const updateAndRender = (path) => {
  switch (path) {
    case "#/pending":
      render("pending");
      break;
    case "#/completed":
      render("completed");
      break;
    default:
      render();
      break;
  }
};

export const updateTodoState = (index) => {
  const storagedList = getStoredList();
  storagedList[index].completed = !storagedList[index].completed;
  saveToLocalStorage(storagedList);

  updateAndRender(window.location.hash);
};

export const updateTodo = (index, value) => {
  const storagedList = getStoredList();
  storagedList[index].title = value;
  saveToLocalStorage(storagedList);

  updateAndRender(window.location.hash);
};

export const deleteTodo = (index) => {
  const storagedList = getStoredList();
  storagedList.splice(index, 1); // Usar splice para eliminar
  saveToLocalStorage(storagedList);

  if (!storagedList.length) hideTag();
  updateAndRender(window.location.hash);
};

export const deleteAll = () => {
  const newStorage = getStoredList().filter((item) => !item.completed);
  saveToLocalStorage(newStorage);

  if (!newStorage.length) hideTag();
  updateAndRender(window.location.hash);
};
