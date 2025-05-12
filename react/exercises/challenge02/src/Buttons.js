import React from "react";

const Buttons = ({ getData }) => {
    return (
        <form className="buttons" onSubmit={(e) => e.preventDefault()}>
            <button
                className="btn active"
                onClick={(e) => getData(e.target, "users")}
            >
                users
            </button>
            <button className="btn" onClick={(e) => getData(e.target, "posts")}>
                posts
            </button>
            <button
                className="btn"
                onClick={(e) => getData(e.target, "comments")}
            >
                comments
            </button>
        </form>
    );
};

export default Buttons;
