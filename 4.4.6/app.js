const todoForm = document.querySelector("#todo-form")
const textInput = document.querySelector("input[type='text']")
const addBtn = document.querySelector("input[type='submit']")
const todoList = document.querySelector("#todoList")

addBtn.addEventListener('click', function (e) {
    e.preventDefault();
    const newValue = textInput.value;
    textInput.value = ""
    if (newValue != "") {
        const newTodo = document.createElement("li")
        const newBtn = document.createElement("button")
        newTodo.innerText = newValue
        newBtn.innerText = "Remove"
        newTodo.appendChild(newBtn)
        todoList.appendChild(newTodo)
    }
})

todoList.addEventListener('click', function (e) {
    console.log(e.target.type)
    if (e.target.type == "submit") {
        e.target.parentNode.remove();
    }
    else {
        e.target.classList.toggle("done");
    }
})