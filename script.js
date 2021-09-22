const input = document.querySelector(".todo-input");
const submit = document.querySelector(".submit-btn");
const todoList = document.querySelector(".todo-list")

addTodo = (e) => {
    e.preventDefault();

    // local storage check
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    let item = input.value;
    if (item === "") {
        alert("tidak boleh kosong");
    }else {
        todos.push(item);
        localStorage.setItem("todos", JSON.stringify(todos));
        input.value = "";

        document.location.reload();
    }
}

getTodo = () => {
    // local storage check
    if(localStorage.getItem("todos") === null) {
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach((todo) => {
        // div
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo-item");

        // item name
        const itemName = document.createElement("li");
        itemName.classList.add("item-name");
        itemName.innerText = todo;
        todoDiv.appendChild(itemName);

        // button 
        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.innerText = "delete";

        // merged list to todo list
        todoList.appendChild(todoDiv);
    });
}

document.addEventListener("DOMContentLoaded", getTodo);
submit.addEventListener("click", addTodo);