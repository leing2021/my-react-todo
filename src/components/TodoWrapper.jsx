import { useState } from "react";
import CreateForm from "./CreateForm";
import TodoItem from "./TodoItem";

function TodoWrapper() {
  const [todos, setTodos] = useState([
    {
      content: "跑步",
      id: Math.random(),
      isCompleted: false,
      isEditing: false,
    },
    {
      content: "写作业",
      id: Math.random(),
      isCompleted: false,
      isEditing: false,
    },
  ]);
  const addTodo = (content) => {
    setTodos([...todos, { content: content, id: Math.random(), isCompleted: false, isEditing: false }]);
  };
  const deleteTodo = (id) => {
    setTodos(
      todos.filter((todo) => {
        return todo.id !== id;
      })
    );
  };

  const toggleCompleted = (id) => {
    setTodos(
      todos.map((todo) => {
        return todo.id === id
          ? { ...todo, isCompleted: !todo.isCompleted }
          : todo;
      })
    );
  };

  const toggleIsEditing = (id) => {
        setTodos(
      todos.map((todo) => {
        return todo.id === id
          ? { ...todo, isEditing: !todo.isEditing }
          : todo;
      })
    ); 
  };

  const editTodo = (content, id) => {
    setTodos(
      todos.map((todo) => {
        return todo.id === id
          ? { ...todo, content: content, isEditing: false }
          : todo;
      })
    );
  };

  return (
    <div className="wrapper">
      <h1>Ethan待办事项</h1>
      <CreateForm addTodo={addTodo} />
      {todos.map((todo) => {
        return (
          <TodoItem
            toggleCompleted={toggleCompleted}
            toggleIsEditing={toggleIsEditing}
            todo={todo}
            key={todo.id}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
          />
        );
      })}
    </div>
  );
}

export default TodoWrapper;
