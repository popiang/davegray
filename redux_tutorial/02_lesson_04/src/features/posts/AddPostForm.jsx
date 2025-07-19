import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersSlice";
import { postAdded } from "./postsSlice";

const AddPostForm = () => {
    const users = useSelector(selectAllUsers);
    const dispatch = useDispatch();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [userId, setUserId] = useState("");

    const usersOptions = users.map((user) => (
        <option key={user.name} value={user.id}>
            {user.name}
        </option>
    ));

    const handleClick = () => {
        if (title && content) {
            dispatch(postAdded(title, content, userId));
            setTitle("");
            setContent("");
            setUserId("");
        }
    };

    const canSave = Boolean(title) && Boolean(content) && Boolean(userId);

    return (
        <section className="post-form">
            <h2>Add A New Post</h2>
            <form>
                <label htmlFor="postTitle">Post Title:</label>
                <input
                    type="text"
                    name="postTitle"
                    id="postTitle"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <label htmlFor="postAuthor">Author:</label>
                <select
                    name="postAuthor"
                    id="postAuthor"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                >
                    <option value=""></option>
                    {usersOptions}
                </select>

                <label htmlFor="postContent">Post Content:</label>
                <textarea
                    name="postContent"
                    id="postContent"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />

                <button type="button" onClick={handleClick} disabled={!canSave}>
                    Save Post
                </button>
            </form>
        </section>
    );
};

export default AddPostForm;
