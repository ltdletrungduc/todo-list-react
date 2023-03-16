import React, { useState } from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { TodoInterface } from './interfaces/Todo';

function App() {
  const [todos, setTodos] = useState<TodoInterface[]>([]);

  // Creating new todo item
  const handleTodoCreate = (todo: TodoInterface) => {
    // Prepare new todos state
    const newTodosState: TodoInterface[] = [...todos];

    // Update new todos state
    newTodosState.push(todo);

    // Update todos state
    setTodos(newTodosState);
  };

  // Update existing todo item
  const handleTodoUpdate = (event: React.ChangeEvent<HTMLInputElement>, id: string) => {
    // Prepare new todos state
    const newTodosState: TodoInterface[] = [...todos];

    // Find correct todo item to update
    newTodosState.find((todo: TodoInterface) => todo.id === id)!.text = event.target.value;

    // Update todos state
    setTodos(newTodosState);
  };

  // Remove existing todo item
  const handleTodoRemove = (id: string) => {
    // Prepare new todos state
    const newTodosState: TodoInterface[] = todos.filter((todo: TodoInterface) => todo.id !== id);

    // Update todos state
    setTodos(newTodosState);
  };

  // Check existing todo item as completed
  const handleTodoComplete = (id: string) => {
    // Copy current todos state
    const newTodosState: TodoInterface[] = [...todos];

    // Find the correct todo item and update its 'isCompleted' key
    newTodosState.find((todo: TodoInterface) => todo.id === id)!.isCompleted = !newTodosState.find(
      (todo: TodoInterface) => todo.id === id
    )!.isCompleted;

    // Update todos state
    setTodos(newTodosState);
  };

  // Check if todo item has title
  const handleTodoBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length === 0) {
      event.target.classList.add('todo-input-error');
    } else {
      event.target.classList.remove('todo-input-error');
    }
  };

  return (
    <div className='todo-list-app'>
      <TodoForm todos={todos} handleTodoCreate={handleTodoCreate} />

      <TodoList
        todos={todos}
        handleTodoUpdate={handleTodoUpdate}
        handleTodoRemove={handleTodoRemove}
        handleTodoComplete={handleTodoComplete}
        handleTodoBlur={handleTodoBlur}
      />
    </div>
  );
}

export default App;
