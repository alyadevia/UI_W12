import { defineStore } from "pinia"

export const useTodos = defineStore('useTodos', {
  state: () => ({
    nextId: 0,
    todos: [],
  }),

  getters: {
    pendingTodos: (state) => state.todos.filter(todo => !todo.isCompleted),
    completedTodos: (state) => state.todos.filter(todo => todo.isCompleted),
  },

  actions: {
    storeTodo(payload) {
      this.todos.push({
        id: this.nextId++,
        text: payload.text,
        isCompleted: false,
        priority: payload.priority || "medium",
      })
    },

    updateTodo(payload) {
      const index = this.todos.findIndex(item => item.id === payload.id)
      if (index !== -1) {
        this.todos[index] = {
          ...this.todos[index],
          ...payload, // otomatis update text, isCompleted, priority
        }
      }
    },

    destroyTodo(id) {
      this.todos = this.todos.filter(todo => todo.id !== id)
    }
  },
})
