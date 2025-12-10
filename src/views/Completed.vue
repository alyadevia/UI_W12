<template>
  <h3>Completed ✅</h3>

  <div>
    <ul class="todo-list">
      <li v-for="completedTodo in completedTodos" 
          :key="completedTodo.id" 
          class="todo-item">

        <!-- Text + Priority Badge -->
        <span class="todo-text">
          {{ completedTodo.text }}
          <span class="priority" :class="completedTodo.priority">
            {{ completedTodo.priority }}
          </span>
        </span>

      </li>
    </ul>
  </div>
</template>

<script>
import { useTodos } from '@/stores/todos'
import { mapState } from 'pinia'

export default {
  computed: {
    ...mapState(useTodos, ['completedTodos'])
  }
}
</script>

<style>
.todo-list {
  list-style: none;
  padding: 0;
}

.todo-item {
  background: #e8ffe8;
  padding: 10px 14px;
  border-radius: 6px;
  margin-bottom: 10px;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Badge Priority */
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
</style>
