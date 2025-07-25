import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, selectAllUsers } from "../users/usersSlice";
import { addNewPost, getAddStatus } from "./postsSlice";
import { useNavigate } from "react-router-dom";

const AddPostForm = () => {
    const dispatch = useDispatch();
	const navigate = useNavigate();
    const users = useSelector(selectAllUsers);
	const addStatus = useSelector(getAddStatus);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [userId, setUserId] = useState("");

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const usersOptions = users.map((user) => (
        <option key={user.name} value={user.id}>
            {user.name}
        </option>
    ));

    const canSave =
        [title, content, userId].every(Boolean) && addStatus === "idle";

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (canSave) {
            try {
                await dispatch(addNewPost({ title, body: content, userId })).unwrap();
				navigate("/");
            } catch (error) {
				console.log("Failed to save the post: ", error);
            } finally {
                setTitle("");
                setContent("");
                setUserId("");
            }
        }
    };

    return (
        <section className="post-form">
            <h2>Add A New Post</h2>
            <form onSubmit={handleSubmit}>
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
                    <option value="">Select an author</option>
                    {usersOptions}
                </select>

                <label htmlFor="postContent">Post Content:</label>
                <textarea
                    name="postContent"
                    id="postContent"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />

                <button disabled={!canSave}>Save Post</button>
            </form>
        </section>
    );
};

export default AddPostForm;
