import { useState } from "react";

function EditForm({ todo, editTodo }) {
  const [content, setContent] = useState(todo.content);
  const handleSubmit = (e) => {
    e.preventDefault();
    editTodo(content, todo.id);
  };

  return (
    <form className="create-form" onSubmit={handleSubmit}>
      <input type="text" placeholder="编辑代办事项" 
      value={content} 
      onChange={(e)=>{setContent(e.target.value)}}/>
      <button type="submit">更新</button>
    </form>
  );
}

export default EditForm