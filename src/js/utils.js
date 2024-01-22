import { checkStorage, updateTodoState, deleteTodo, updateTodo } from "./store";

// Selectores
const selectorAll = document.querySelector('footer ul li a[href="#/"]');
const selectorPending = document.querySelector(
  'footer ul li a[href="#/pending"]'
);
const selectorCompleted = document.querySelector(
  'footer ul li a[href="#/completed"]'
);

const app = {
  footer: document.querySelector(".footer"),
  main: document.querySelector(".main"),
};

export const showTag = () => {
  app.footer.style.display = "block";
  app.main.style.display = "block";
};

export const hideTag = () => {
  app.footer.style.display = "none";
  app.main.style.display = "none";
};

const createElement = (el, index, data) => {
  const li = document.createElement("li");
  const div = document.createElement("div");

  const input = document.createElement("input");
  input.addEventListener("click", () => {
    updateTodoState(index);
  });
  div.classList.add("view");

  input.classList.add("toggle");
  input.setAttribute("type", "checkbox");

  if (el.completed) {
    li.classList.add("completed");
    input.checked = true;
  } else {
    data.itemLeft++;
  }

  const label = document.createElement("label");
  const button = document.createElement("button");

  label.addEventListener("dblclick", () => {
    li.classList.add("editing");
  });
  label.innerHTML = el.title;
  button.classList.add("destroy");

  button.addEventListener("click", () => {
    deleteTodo(index);
  });
  div.append(input, label, button);

  const inputToEdit = document.createElement("input");

  inputToEdit.addEventListener("keyup", (e) => {
    if (e.key === "Enter" && !!e.target.value.trim().length) {
      updateTodo(index, e.target.value.trim());
    }
  });
  inputToEdit.classList.add("edit");
  inputToEdit.setAttribute("value", el.title);
  li.append(div, inputToEdit);
  return li;
};

export const render = (type = "all") => {
  showTag();

  const list = document.querySelector(".todo-list");
  list.innerHTML = ""; // Limpia la lista actual

  const storage = checkStorage();
  let itemLeft = 0;

  storage.forEach((item, index) => {
    if (
      type === "all" ||
      (type === "pending" && !item.completed) ||
      (type === "completed" && item.completed)
    ) {
      list.appendChild(createElement(item, index, { itemLeft }));
    }
    if (!item.completed) itemLeft++;
  });

  document.querySelector(".todo-count").children[0].innerHTML = itemLeft;
};

// Función para manejar cambios de hash
export const handleHashChange = () => {
  const hash = window.location.hash;
  [selectorPending, selectorAll, selectorCompleted].forEach((sel) => {
    if (sel) sel.classList.remove("selected");
  });

  switch (hash) {
    case "#/pending":
      selectorPending.classList.add("selected");
      render("pending");
      break;
    case "#/completed":
      selectorCompleted.classList.add("selected");
      render("completed");
      break;
    default:
      selectorAll.classList.add("selected");
      render();
      break;
  }
};
