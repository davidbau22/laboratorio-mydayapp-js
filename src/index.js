import "./css/base.css";
import {
  checkStorage,
  addNewTodo,
  deleteAll,
  checkCompletedTasks,
} from "./js/store";
import { render, hideTag, handleHashChange } from "./js/utils";

// Selectores
const buttonClean = document.querySelector(".clear-completed");

// Obtener datos almacenados
const storagedData = checkStorage();
const data = {
  totalTodos: storagedData.length,
  todos: storagedData,
};

// Evento para limpiar todos los elementos
document.querySelector(".clear-completed").addEventListener("click", deleteAll);
// Inicialización de la visibilidad de los elementos
if (!data.totalTodos) {
  hideTag();
} else {
  buttonClean.style.visibility = checkCompletedTasks() ? "visible" : "hidden";
}

// Evento para agregar nuevas tareas
document.querySelector(".new-todo").addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    const taskTitle = e.target.value.trim();
    if (taskTitle) {
      const newTodo = { title: taskTitle, completed: false };
      addNewTodo(newTodo);
      e.target.value = "";

      const path = window.location.hash.match(/[a-zA-z]+/);
      render(path ? path[0] : "");
    }
  }
});

// Escuchador de eventos para cambios en el hash
window.addEventListener("hashchange", handleHashChange);
handleHashChange(); // Llamar al iniciar para configurar el estado inicial
