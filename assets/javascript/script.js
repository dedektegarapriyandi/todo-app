const input = document.querySelector(".todo-input");
const submit = document.querySelector(".submit-btn");
const todoList = document.querySelector(".todo-list");
const filterBtn = document.querySelector(".todo-filter");

createElement = (todo) => {
    // div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo-item");

    // item name
    const itemName = document.createElement("li");
    itemName.classList.add("item-name");
    itemName.innerText = todo;
    todoDiv.appendChild(itemName);
    
    // button check
    const checkBtn = document.createElement("button");
    checkBtn.classList.add("check-btn");
    checkBtn.innerHTML = "<i class='fa fa-check'></i>";
    todoDiv.appendChild(checkBtn);

    // button delete
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.innerHTML = "<i class='fa fa-trash'></i>";
    todoDiv.appendChild(deleteBtn);

    if(todoDiv.style.maxHeight > "50vh") {
        todoDiv.style.overflowY = "scroll";
    }

    // merged list to todo list
    todoList.insertBefore(todoDiv, todoList.childNodes[0]);
}

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
        createElement(item);

        todos.push(item);
        localStorage.setItem("todos", JSON.stringify(todos));
        input.value = "";
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
        createElement(todo);
    });
}

actionTodo = (e) => {
    const element = e.target;
    if(element.classList.contains("delete-btn")) {
        todos = JSON.parse(localStorage.getItem("todos"));

        const items = element.parentElement;
        const itemIndex = items.children[0].innerText;

        const deleteBtn = e.target;

        if(deleteBtn.classList.contains("delete-btn")) {
            const parent = deleteBtn.parentElement;
            parent.classList.add("removed");
            parent.addEventListener("transitionend", () => {
                parent.remove();
            })
        }
        
        todos.splice(todos.indexOf(itemIndex), 1);
        localStorage.setItem("todos", JSON.stringify(todos));
    } else if(element.classList.contains("check-btn")) {
        itemChecked = element.parentElement.children[0];
        itemChecked.classList.toggle("completed");
    }
}

filterTodo = (e) => {
    const items = todoList.childNodes;
    items.forEach((item) => {
        const filter = e.target.value;
        const itemName = item.children[0];

        switch(filter) {
            case "all" :
                item.style.display = "flex";
                break;
            case "completed":
                if(itemName.classList.contains("completed")) {
                    item.style.display = "flex";
                }else {
                    item.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!itemName.classList.contains("completed")) {
                    item.style.display = "flex";
                }else {
                    item.style.display = "none";
                }
                break;
        }
    });
}

document.addEventListener("DOMContentLoaded", getTodo);
submit.addEventListener("click", addTodo);
todoList.addEventListener("click", actionTodo);
filterBtn.addEventListener("change", filterTodo);