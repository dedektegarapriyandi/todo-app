const input = document.querySelector(".todo-input");
const submit = document.querySelector(".submit-btn");

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
    }
}

submit.addEventListener("click", addTodo);