import { useState, useEffect } from "react";
import CreateForm from "./CreateForm";
import TodoItem from "./TodoItem";
import { useDeviceDetection } from "../hooks/useDeviceDetection";

function TodoWrapper() {
  // 设备检测
  const deviceInfo = useDeviceDetection();
  
  // 从localStorage读取初始数据，如果没有则使用默认数据
  const getInitialTodos = () => {
    try {
      const savedTodos = localStorage.getItem('todos');
      if (savedTodos) {
        return JSON.parse(savedTodos);
      }
    } catch (error) {
      console.error('读取本地存储失败:', error);
    }
    
    // 默认数据
    return [
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
    ];
  };

  const [todos, setTodos] = useState(getInitialTodos);

  // 每当todos变化时，保存到localStorage
  useEffect(() => {
    try {
      localStorage.setItem('todos', JSON.stringify(todos));
    } catch (error) {
      console.error('保存到本地存储失败:', error);
    }
  }, [todos]);
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

  // 清空所有待办事项
  const clearAllTodos = () => {
    if (window.confirm('确定要清空所有待办事项吗？')) {
      setTodos([]);
    }
  };

  // 统计数据
  const completedCount = todos.filter(todo => todo.isCompleted).length;
  const totalCount = todos.length;

  return (
    <div className={`wrapper device-${deviceInfo.deviceType}`}>
      <h1>待办事项</h1>
      
      {/* 数据统计 */}
      <div className="stats">
        <p>共 {totalCount} 项任务，已完成 {completedCount} 项</p>
      </div>
      
      <CreateForm addTodo={addTodo} />
      {todos.length === 0 ? (
        <p className="empty-message">暂无待办事项，来添加一个吧！</p>
      ) : (
        <>
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
          
          {/* 清空所有按钮放在清单尾部 */}
          <div className="clear-all-container">
            <button onClick={clearAllTodos} className="clear-all-btn">
              清空所有
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default TodoWrapper;
