import React, { useState } from "react";

function Header() {
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editedValue, setEditedValue] = useState(""); 
  const [editIndex, setEditIndex] = useState(null); 

  const addTaskHandler = () => {
    if (inputValue.trim() !== "") {
      setTasks([...tasks, inputValue]);
      setInputValue("");
    }
  };

  const editButtonHandler = (index) => {
    setEditIndex(index);
    setEditedValue(tasks[index]);
  };

  const saveButtonHandler = () => {
    const updatedTasks = [...tasks];
    updatedTasks[editIndex] = editedValue;
    setTasks(updatedTasks);
    setEditIndex(null);
  };

  return (
    <div className="header-style">
      <h2 className="header-name">Task List 2021</h2>
      <div>
        <input
          className="input-style"
          placeholder="What do you have planned?"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button className="add-task-button" onClick={addTaskHandler}>
          Add task
        </button>
        <h2 className="h2-css-fortask">Tasks</h2>
        <Tasks
          tasks={tasks}
          setTasks={setTasks}
          editIndex={editIndex}
          editedValue={editedValue}
          setEditedValue={setEditedValue}
          editButtonHandler={editButtonHandler}
          saveButtonHandler={saveButtonHandler}
        />
      </div>
    </div>
  );
}

function Tasks({
  tasks,
  editIndex,
  editedValue,
  setEditedValue,
  editButtonHandler,
  saveButtonHandler,
  setTasks
}) {

  const deleteButtonHandler = (index)=>{
    setTasks(tasks.filter((_,el)=>el !== index))
  }

  return (
    <div className="task-container">
      {tasks.map((element, index) => (
        <div key={index} className="task-item">
          {editIndex === index ? (
            <input
              className="edited-task-input"
              value={editedValue}
              onChange={(e) => setEditedValue(e.target.value)}
            />
          ) : (
            <p className="added-tasks">{element}</p>
          )}
          <div>
            {editIndex === index ? (
              <button className="save-button" onClick={saveButtonHandler}>
                SAVE
              </button>
            ) : (
              <button
                className="edit-button"
                onClick={() => editButtonHandler(index)}
              >
                EDIT
              </button>
            )}
            <button className="delete-button" onClick={()=>deleteButtonHandler(index)}>DELETE</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Header;