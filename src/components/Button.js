import React from "react";

function Button({ onClick, text }) {
    return (
        <button className="btn btn-primary" onClick={onClick}>
            {text}
        </button>
    );
}

export default Button;
