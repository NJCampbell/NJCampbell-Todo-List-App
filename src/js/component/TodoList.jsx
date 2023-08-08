import React from "react";

const TodoList = ({ task, setTask, handleDeleteTask, count }) => {
  return (
    <>
      <div className="list-items">
        <li key={task.count}>
          {task.content}

          <button
            className="delete-button"
            onClick={() => handleDeleteTask(task.count)}
          >
            X
          </button>
        </li>
      </div>
    </>
  );
};

export default TodoList;
