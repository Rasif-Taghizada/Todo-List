const input = document.querySelector('.todo-input');
const form = document.querySelector('form');
const todoContainer = document.querySelector('.todo_tasks');
let deleteBtns;
let checkboxes;

const addHtml = (TodoList) => {
    const TodoDiv = document.createElement('div');
    TodoDiv.classList.add('todo-list');

    const leftDiv = document.createElement('div');
    leftDiv.classList.add('todo-left')

    const todoInput = document.createElement('input');
    todoInput.type = 'checkbox';
    todoInput.checked = TodoList.isCompleted;
    todoInput.classList.add('check');

    const todoTxt = document.createElement('span');
    todoTxt.textContent = TodoList.text
    todoTxt.classList.add('todoTxt');

    const todoBtn = document.createElement('button')
    todoBtn.classList.add('delete');
    todoBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';

    //Add appendChild
    leftDiv.appendChild(todoInput);
    leftDiv.appendChild(todoTxt);
    TodoDiv.appendChild(leftDiv);
    TodoDiv.appendChild(todoBtn);
    todoContainer.appendChild(TodoDiv);
}

const startConf = () => {
    const todos = JSON.parse(localStorage.getItem('todos'))
    if(!todos) {
        localStorage.setItem('todos', JSON.stringify([]));
    }
    else{
        todos.forEach(TodoList => {
            addHtml(TodoList);
        });
        deleteBtns = document.querySelectorAll('.delete');
        checkboxes = document.querySelectorAll('.check');
    }
};
startConf();

const addTodo = (e) => {
    e.preventDefault();

    const todoText = input.value;

    const TodoList = {
        text: todoText,
        isCompleted: false,
    }

    //Todos'a push etmek
    const todos = JSON.parse(localStorage.getItem('todos'));
    todos.push(TodoList);
    localStorage.setItem('todos' , JSON.stringify(todos));

    addHtml(TodoList);
    form.reset();
}

const deleteTodo = (e) => {
    const todo = e.target.parentElement.parentElement;
    const text = todo.firstChild.children[1].textContent;
    
    let todos = JSON.parse(localStorage.getItem('todos'));
    todos = todos.filter(td => td.text != text)
    
    localStorage.setItem('todos' , JSON.stringify(todos))
    todo.remove();
}

const completeTodoCheck = (e) => {
    // console.log(e.target);
    const todo = e.target.parentElement.parentElement; // this class = todo-list    
    const text = todo.firstChild.children[1].textContent;
    
    let todos = JSON.parse(localStorage.getItem('todos'));
    todos.forEach(e => {
        if(e.text === text) e.isCompleted = !e.isCompleted;
    });
    localStorage.setItem('todos' , JSON.stringify(todos))
}
form.addEventListener('submit', addTodo);

deleteBtns.forEach(btn => btn.addEventListener('click' , deleteTodo))
checkboxes.forEach(btn => btn.addEventListener('click' , completeTodoCheck))