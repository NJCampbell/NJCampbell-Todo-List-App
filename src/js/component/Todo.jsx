import React, { useState } from "react";
import TodoList from "./TodoList";
import TodoFooter from "./TodoFooter";

const Todo = () => {
  const [task, setTask] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [count, setCount] = useState(0);

  function handleAddTask() {
    const newTaskItem = {
      count: count,
      content: newTask,
    };
    setTask((previousTask) => [...previousTask, newTaskItem]);
    setNewTask("");
    setCount((count) => count + 1);
  }
  function handleDeleteTask(count) {
    let setTasks = (previousTask) =>
      previousTask.filter((task) => task.count !== count);
    setTask(setTasks);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      handleAddTask();
    }
  }

  return (
    <>
      <div className="todo-wrapper">
        <div className="todo-header">
          <h1>todos</h1>
        </div>
        <div className="todo-body">
          <input
            className="controlled-input"
            type="text"
            placeholder="What needs to be done?"
            value={newTask}
            onChange={(event) => setNewTask(event.target.value)}
            onKeyDown={handleKeyDown}
          ></input>
          <div className="list-container">
            <ul>
              {task.map((task) => (
                <TodoList
                  key={task.count}
                  task={task}
                  handleDeleteTask={handleDeleteTask}
                />
              ))}
            </ul>
            <TodoFooter task={task} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
