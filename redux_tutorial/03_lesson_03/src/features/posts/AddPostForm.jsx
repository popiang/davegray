import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersSlice";
import { addNewPost } from "./postsSlice";

const AddPostForm = () => {
    const dispatch = useDispatch();

    const users = useSelector(selectAllUsers);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [userId, setUserId] = useState("");
    const [addRequestStatus, setAddRequestStatus] = useState("idle");

    const canSave =
        [title, content, userId].every(Boolean) && addRequestStatus === "idle";

    const handleSubmit = (e) => {
        e.preventDefault();

        if (canSave) {
            try {
                setAddRequestStatus("pending");
                dispatch(addNewPost({ title, body: content, userId })).unwrap();

                setTitle("");
                setContent("");
                setUserId("");
            } catch (error) {
                console.log("Failed to save the post: ", error);
            } finally {
                setAddRequestStatus("idle");
            }
        }
    };

    const usersOptions = users.map((user) => (
        <option key={user.name} value={user.id}>
            {user.name}
        </option>
    ));

    return (
        <section className="post-form">
            <h2>Add A New Post</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="postTitle">Post Title:</label>
                    <input
                        type="text"
                        name="postTitle"
                        id="postTitle"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div>
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
                </div>

                <div>
                    <label htmlFor="postContent">Post Content:</label>
                    <textarea
                        name="postContent"
                        id="postContent"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>

                <button disabled={!canSave}>Save Post</button>
            </form>
        </section>
    );
};

export default AddPostForm;
