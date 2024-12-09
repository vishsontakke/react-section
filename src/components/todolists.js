import React, { useState, useEffect } from "react";
function Todolist({ todo, onEdit }) {
    return (
        <div className="col-md-4">
            <div className="card mb-4">
                <div className="card-body">
                    <h5 className="card-title">{todo.title}</h5>
                    <p className="card-text">{todo.discription}</p>
                    <p className="card-text">
                        <span className={`badge ${todo.is_completed ? 'bg-success' : 'bg-warning'}`}>
                            {todo.is_completed ? "Completed" : "Incomplete"}
                        </span>
                    </p>
                    <button className="btn btn-primary ml-2" onClick={() => onEdit(todo)}>
                        Edit
                    </button>
                </div>
            </div>
        </div>
    );
}
export default Todolist;