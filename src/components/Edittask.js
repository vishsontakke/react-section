import React, { useState, useEffect } from 'react';

const EditTask = ({ task, updateTask }) => {
    const [editedTask, setEditedTask] = useState({ ...task });

    useEffect(() => {
        setEditedTask({ ...task });
    }, [task]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedTask((prevTask) => ({
            ...prevTask,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://127.0.0.1:8000/apis/todolist/${editedTask.id}/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(editedTask),
            });
            if (response.ok) {
                const updatedTodo = await response.json();
                updateTask(updatedTodo); 
                alert("task Updated Successfully");
                window.location.reload();
            } else {
                console.error("Failed to update task:", response.statusText);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <form className="mt-4" onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={editedTask.title}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="discription" className="form-label">Description</label>
                <textarea
                    className="form-control"
                    id="discription"
                    name="discription"
                    value={editedTask.discription}
                    onChange={handleInputChange}
                    required
                ></textarea>
            </div>
            <button type="submit" className="btn btn-success">Update Task</button>
        </form>
    );
};

export default EditTask;
