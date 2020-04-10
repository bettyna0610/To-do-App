import uuidv4 from 'uuid/v4'

import moment from 'moment';



let todos = []

// Fetch existing todos from localStorage
const loadTodos = () => {
    const todosJSON = localStorage.getItem('todos')

    try {
        todos = todosJSON ? JSON.parse(todosJSON) : []
    } catch (e) {
        todos = []
    }
}

// Save todos to localStorage
const saveTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos))
}

const getTodos = () => todos

const createTodo = (text) => {
    const timestamp = moment().format("MMMM Do YYYY")
    const timeValue = moment().valueOf()
    todos.push({
        id: uuidv4(),
        text,
        completed: false,
        createdAt: timestamp,
        timeValue
    })
    saveTodos()
}
const sortTodos = (sortBy) => {
    const todos = getTodos()
    console.log(todos)
    
    if(sortBy ==='byCreated') {
      return todos.sort(function(a,b) {
          if(a.timeValue > b.timeValue) {
              return -1
          } else if(a.timeValue < b.timeValue) {
              return 1
          } else {
              return 0
          }
      })

    } else if(sortBy ==='byAlpha') {
      return todos.sort(function(a,b) {
          if(a.text.toLowerCase() < b.text.toLowerCase()) {
              return -1
          } else if(a.text.toLowerCase() > b.text.toLowerCase()) {
              return 1
          } else {
              return 0
          }
      })

    } 
    else {
        return todos
    }

}

const removeTodo = (id) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id)

    if (todoIndex > -1) {
        todos.splice(todoIndex, 1)
        saveTodos()
    }
}

// Toggle the completed value for a given todo
const toggleTodo = (id) => {
    const todo = todos.find((todo) => todo.id === id)

    if (todo) {
        todo.completed = !todo.completed
        saveTodos()
    }
}

loadTodos()

export { loadTodos, getTodos, createTodo, removeTodo, toggleTodo,sortTodos }