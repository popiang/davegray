import { useState } from "react";
import { useSelector } from "react-redux";
import { useAddNewPostMutation } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";
import { useNavigate } from "react-router-dom";

const AddPost = () => {
    const [addNewPost, { isLoading }] = useAddNewPostMutation();

    const navigate = useNavigate();
    const users = useSelector(selectAllUsers);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [userId, setUserId] = useState("");

    const canSave = [title, content, userId].every(Boolean) && !isLoading;

    const handleSubmit = (e) => {
        e.preventDefault();

        if (canSave) {
            addNewPost({ title, body: content, userId })
                .unwrap()
                .then(() => {
                    setTitle("");
                    setContent("");
                    setUserId("");

                    navigate("/");
                })
                .catch((error) => {
                    console.log("Failed to save the post: ", error);
                });
        }
    };

    const usersOptions = users.map((user) => (
        <option value={user.id} key={user.id}>
            {user.name}
        </option>
    ));

    return (
        <section className="post-form">
            <h2>Add A New Post</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title: </label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="author">Author: </label>
                    <select
                        id="author"
                        onChange={(e) => setUserId(e.target.value)}
                        value={userId}
                    >
                        <option value=""></option>
                        {usersOptions}
                    </select>
                </div>

                <div>
                    <label htmlFor="content">Content: </label>
                    <textarea
                        name="content"
                        id="content"
                        value={content}
                        rows={5}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>

                <button disabled={!canSave}>Save Post</button>
            </form>
        </section>
    );
};

export default AddPost;
