import React from "react";
import "../../styles/index.css";
import { useContext, createContext, useState } from "react";
import { Context } from "../store/appContext";
import Tasks from "./tasks.js";
//Inputs is the name of the js where you enter the data, rename later

export const Home = () => {
	//Set Context
	const {store, actions} = useContext(Context);

	//Initialize States
	const [textEntered, setTextEntered] = useState("");
	const [tasks, setTasks] = useState(store.list);

	//Input value: This function will allow you to add text to the to do list == COME BACK AND EXPLAIN THIS BETTER 
	function inputValue(e) {
		const itemValue = e.target.value;
		setTextEntered(itemValue);
	}

	//Add task: This function will add a task to the list when the event (e) happens (in this case when you hit the Enter key)
	function addNewTask(e) {
		if (e.key ==="Enter") {
			setTasks (actions.todoList(textEntered))
			setTextEntered("");
		}
	}

	//Delete task: This function will delete a task by id value
	//BIG PROJECT NOTE: figure out how to move this task to a 'done' list (store) rather than removing it from the list (store) 
	function deleteTask(id)  {
			setTasks(actions.deleteTask(id))
		}
	

	//ContextWrapper: This is the context wrapper that wraps the To Do List so that all children components will have access to Context
	return (
		<Context.Provider value ={{textEntered, tasks, deleteTask, addNewTask, inputValue}} >
			<ToDos />
		</Context.Provider>
  );
};


//This is what actually renders the HTML for the website and pulls in the above actions for the (1) input value; (2) add new task; (3) deletes a task

export const ToDos = () => {
	const value = useContext(Context);
		  
	return (
		<div>
		  	<h1 className="todo-header">To Do List</h1>
			<div className="todo-container d-flex flex-column">
			  	<div className="todo-container-header d-flex flex-row">
					<span className="me-3">Tasks</span>
					<input type="text" onChange={value.inputValue} onKeyDown={value.addNewTask} value={value.textEntered} />
				  </div>
		  
				<div className="todo-container-body flex-grow-1">
					<ul>
					  {value.tasks.map((task, index) => (
						<Tasks key={index} id={index} task={task} onDelete={value.deleteTask} />
					  ))}
					</ul>
				</div>
		  
				<div className="flex-grow-1">
					 {value.tasks.length === 0 ? "where your tasks at?" : `things to do: ${value.tasks.length}`}
				</div>
			</div>
		</div>
		  );
	  };
