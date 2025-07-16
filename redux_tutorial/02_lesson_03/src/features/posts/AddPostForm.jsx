import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersSlice";
import { postAdded } from "./postsSlice";

const AddPostForm = () => {
    const dispatch = useDispatch();
    const users = useSelector(selectAllUsers);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [userId, setUserId] = useState("");

    const usersOptions = users.map((user) => (
        <option key={user.name} value={user.id}>
            {user.name}
        </option>
    ));

	const canSave = Boolean(title) && Boolean(content) && Boolean(userId);

    const handleClick = () => {
        if (title && content) {
            dispatch(postAdded(title, content, userId));
            setTitle("");
            setContent("");
            setUserId("");
        }
    };

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
                <section
                    name="postAuthor"
                    id="postAuthor"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                >
                    <option value=""></option>
                    {usersOptions}
                </section>

                <label htmlFor="postContent">PostContent</label>
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
