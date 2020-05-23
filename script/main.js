const todoInputName = document.querySelector("#todo-name")
const addButton = document.querySelector("#add-todo")
const todoItemsContainer = document.querySelector("#todo-items")

addButton.addEventListener("click", addTodo)
document.addEventListener("DOMContentLoaded", getFromLocalStorage)

function addTodo() {
  const todoName = todoInputName.value
  
  if (!validInput(todoName)) return
  
  const todosObject = {
    name: todoName,
    completed: false
  }
  
  if (localStorage.getItem('todos') === null) {
    postLocalStorage(todosObject)
  } else {
    putLocalStorage(todosObject)
  }
  
  todoInputName.value = ''
  appendOnDom(todoName)
}

function validInput(todoName) {
  const regex = /[#*$&:;/?%]/
  
  if (!todoName) return alert('Name is not mention!!')
  if (todoName.match(regex)) return alert('Special character is not allowed!!')
  if ((todoName.length) <= 5) return alert('Given name is very short!!')
  return true
}

function postLocalStorage(todosObject) {
  let todosArray = []
    todosArray.push(todosObject)
    
  localStorage.setItem('todos', JSON.stringify(todosArray))
}

function putLocalStorage(todosObject) {
  let todosArray = JSON.parse(localStorage.getItem('todos'))
  todosArray.push(todosObject)
  
  localStorage.setItem('todos', JSON.stringify(todosArray))
}

function getFromLocalStorage() {
  const checkCompleted = (name, status) => {
    if (status === true) {
      return `<li class="completed-todo">${name}</li>`
    } else {
      return `<li>${name}</li>`
    }
  }
  
  let todosArray = JSON.parse(localStorage.getItem('todos'))
  
  todosArray.forEach(item => {
    todoItemsContainer.innerHTML += 
    `<div class="todo-item">
      ${checkCompleted(item.name, item.completed)}
      <span>
        <a href="#" class="complete-todo" onclick="toggleCompleted('${item.name}')">✔
        </a>
        <a href="#2" class="delete-todo" onclick="deleteTodo('${item.name}')">❌
        </a>
      </span>
    </div>`
  })
}

function appendOnDom(todoName) {
  const div = document.createElement('div')
  const li = document.createElement('li')
  const span = document.createElement('span')
  
  div.setAttribute('class', 'todo-item')
  li.textContent = todoName
  span.innerHTML = 
  `<a href="#" class="complete-todo" onclick="toggleCompleted('${todoName}')">✔
   </a> 
   <a href = "#2"class = "delete-todo" onclick="deleteTodo('${todoName}')">❌
   </a>`
  div.appendChild(li)
  div.appendChild(span)
  todoItemsContainer.appendChild(div)
}

function toggleCompleted(todoName) {
  const todoItem = document.querySelectorAll(".todo-item")
  
  todoItem.forEach(item => {
    const domTodoName = item.querySelectorAll("li")
    domTodoName.forEach(name => {
      if (name.textContent === todoName) {
        name.classList.toggle('completed-todo')
      }
    })
  })
  
  let todosArray = JSON.parse(localStorage.getItem('todos'))
  
  todosArray.forEach(item => {
    if (item.name === todoName) {
      item.completed = !item.completed
    }
  })
  
  localStorage.setItem('todos', JSON.stringify(todosArray))
}

function deleteTodo(todoName) {
  const todoItem = document.querySelectorAll(".todo-item")
  
  todoItem.forEach(item => {
    const domTodoName = item.querySelectorAll("li")
    domTodoName.forEach(name => {
      if (name.textContent === todoName) {
        item.style.display = 'none'
      }
    })
  })
  
  let todosArray = JSON.parse(localStorage.getItem('todos'))
  
  todosArray.forEach(item => {
    if (item.name === todoName) {
      todosArray.splice(todosArray.indexOf(item), 1)
    }
  })
  
  if (todosArray.length === 0) return localStorage.clear()
  
  localStorage.setItem('todos', JSON.stringify(todosArray))

}