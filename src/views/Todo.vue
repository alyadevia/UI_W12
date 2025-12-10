<template>
  <h3>To-Do ⏳</h3>

  <!-- Form Input -->
  <form class="todo-form" @submit.prevent="storeTodo(todo)">
    <input 
      v-model="todo.text" 
      type="text" 
      name="text" 
      placeholder="Tambahkan tugas..."
    />

    <!-- DROPDOWN PRIORITY -->
    <select v-model="todo.priority">
      <option value="high">High 🔴</option>
      <option value="medium">Medium 🟡</option>
      <option value="low">Low 🟢</option>
    </select>

    <button :disabled="!todo.text" type="submit">Add</button>
  </form>

  <!-- List Todo -->
  <div>
    <ul class="todo-list">
      <li v-for="pendingTodo in pendingTodos" :key="pendingTodo.id" class="todo-item">

        <!-- Text + Priority Badge -->
        <span class="todo-text">
          {{ pendingTodo.text }}
          <span class="priority" :class="pendingTodo.priority">
            {{ pendingTodo.priority }}
          </span>
        </span>

        <!-- Buttons -->
        <div class="actions">
          <button @click="updateTodo({ ...pendingTodo, isCompleted: true })">✔️</button>
          <button @click="destroyTodo(pendingTodo.id)">🗑️</button>
        </div>

      </li>
    </ul>
  </div>
</template>

<script>
import { useTodos } from '@/stores/todos';
import { mapActions, mapState } from 'pinia';

export default {
  computed: {
    ...mapState(useTodos, ['pendingTodos'])
  },
  data: () => ({
    todo: {
      text: null,
      priority: 'medium',   // <-- tambahin priority default
      isCompleted: false,
    }
  }),
  methods: {
    ...mapActions(useTodos, [
      'storeTodo',
      'updateTodo',
      'destroyTodo',
    ]),
  }
}
</script>

<style>
/* FORM */
.todo-form {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-bottom: 20px;
}

/* LIST */
.todo-list {
  list-style: none;
  padding: 0;
}

.todo-item {
  background: #f5f5f5;
  padding: 10px 14px;
  margin-bottom: 10px;
  border-radius: 6px;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* PRIORITY BADGES */
.priority {
  margin-left: 10px;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
}

.priority.high {
  color: white;
  background: red;
}

.priority.medium {
  color: black;
  background: gold;
}

.priority.low {
  color: white;
  background: green;
}

/* BUTTONS */
.actions button {
  margin-left: 8px;
  cursor: pointer;
}
</style>
