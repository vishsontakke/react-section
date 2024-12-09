import React, { useState } from "react";

function AddTask({ addTask }) {
    const [newTask, setNewTask] = useState({
        title: "",
        discription: "",
        is_completed: false,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTask((prevTask) => ({
            ...prevTask,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://127.0.0.1:8000/apis/todolist/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newTask),
            });

            if (response.ok) {
                const createdTodo = await response.json();
                addTask(createdTodo); 
                setNewTask({ title: "", discription: "", is_completed: false });
            } else {
                console.error("Failed to create task:", response.statusText);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <form className="mt-4" onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">
                    Title
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={newTask.title}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">
                    Description
                </label>
                <textarea
                    className="form-control"
                    id="discription"
                    name="discription"
                    value={newTask.discription}
                    onChange={handleInputChange}
                    required
                ></textarea>
            </div>
            <button type="submit" className="btn btn-success">
                Add Task
            </button>
        </form>
    );
}

export default AddTask;
