import { MdDelete, MdEdit } from "react-icons/md";
import EditForm from "./EditForm";

function TodoItem({ todo, deleteTodo, toggleCompleted, toggleIsEditing, editTodo }) {
  return todo.isEditing ? (
    <EditForm todo={todo} editTodo={editTodo} />
  ) : (
    <div className={`todo ${todo.isCompleted ? "completed" : ""}`}>
      <p onClick={() => toggleCompleted(todo.id)}>{todo.content}</p>
      <div>
        <MdEdit onClick={() => {toggleIsEditing(todo.id)}}
        style={{ cursor: "pointer" }} />
        <MdDelete
          onClick={() => deleteTodo(todo.id)}
          style={{ cursor: "pointer", marginLeft: "5px" }}
        />
      </div>
    </div>
  );
}

export default TodoItem;
