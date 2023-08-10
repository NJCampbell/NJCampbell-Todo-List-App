import React, { useEffect, useState } from "react";
import TodoList from "./TodoList";
import TodoFooter from "./TodoFooter";

const Todo = () => {
  const [task, setTask] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [count, setCount] = useState(1);

  function handleAddTask() {
    const newTaskItem = {
      count: count,
      content: newTask,
    };
    setTask((previousTask) => [...previousTask, newTaskItem]);
    setNewTask("");
    setCount((count) => count + 1);
    assignNewTask();
  }
  // assignNewTask() added into object initiation
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

  function assignNewTask() {
    fetch("https://playground.4geeks.com/apis/fake/todos/user/njcamp", {
      method: "PUT",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) throw Error(res.statusText);
        return res.json();
      })
      .then((response) => console.log("Success:", response))
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    fetch("https://playground.4geeks.com/apis/fake/todos/user/njcamp")
      .then((response) => response.json())
      .then((data) => setTask(data));
  }, []);
  // removing dependency array allowed the tasks to be added but not rendering
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

// fetch('https://example.com/users', {
//   method: 'PUT', // or 'POST'
//   body: JSON.stringify(data), // data can be a `string` or  an {object} which comes from somewhere further above in our application
//   headers:{
//     'Content-Type': 'application/json'
//   }
// })
// .then(res => {
// 	if (!res.ok) throw Error(res.statusText);
// 	return res.json();
// })
// .then(response => console.log('Success:', response))
// .catch(error => console.error(error));
