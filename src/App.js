
import './App.css';
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; 
import Todolist from './components/todolists';
import AddTask from './components/Addtask';
import Button from './components/Button';
import EditTask from './components/Edittask';

function App() {
    const [todos, setTodos] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingTask, setEditingTask] = useState(null); 

    useEffect(() => {
        fetch("http://127.0.0.1:8000/apis/todolist/")
            .then((response) => response.json())
            .then((data) => setTodos(data))
            .catch((error) => console.error("Error fetching tasks:", error));
    }, []);

  

    const addTask = (newTask) => {
        setTodos((prevTodos) => [...prevTodos, newTask]); 
    };

    const toggleForm = () => {
        setShowForm((prevState) => !prevState);
    };

    const deleteTask = async (taskId) =>{
        try {
            const response = await fetch(
                `http://127.0.0.1:8000/apis/todolist/${taskId}/`,
                { method: "DELETE" }
            )
            if (response.ok) {
                setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== taskId));
                alert("task deleted succeessfully");
            } else {
                console.error("Failed to delete task.");
            }
        } catch(error){
            console.error("Failed to delete task.");
        }
    }

    const updateTask = (updatedTask) => {
        setTodos((prevTodos) => 
            prevTodos.map((todo) => 
                todo.id === updatedTask.id ? updatedTask : todo
            )
        );
    };


    const handleEditClick = (task) => {
        setEditingTask(task); 
    };

    return (
        <div className="container">
            <h1 className="my-4">Todo List</h1>
            <Button onClick={toggleForm} text={showForm ? "Close Form" : "Add Task"} />
            {showForm && <AddTask addTask={addTask} />}
            <div className="row mt-4">
                {todos.map((todo) => (
                    <Todolist key={todo.id} todo={todo} onDelete={deleteTask} onEdit={handleEditClick} />
                ))}
            </div>
            {editingTask && (
                <EditTask task={editingTask} updateTask={updateTask}  onEdit={handleEditClick}  />
            )}
        </div>
    );
}

export default App;
