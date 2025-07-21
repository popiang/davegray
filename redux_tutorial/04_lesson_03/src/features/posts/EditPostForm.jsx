import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, selectAllUsers } from "../users/usersSlice";
import { addNewPost, selectPostById } from "./postsSlice";
import { useNavigate, useParams } from "react-router-dom";

const EditPostForm = () => {
    const dispatch = useDispatch();
	const navigate = useNavigate();
	const {postId} = useParams();

	const post = useSelector(state => selectPostById(state, Number(postId)));
    const users = useSelector(selectAllUsers);
	const editStatus = useSelector(getEditStatus);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [userId, setUserId] = useState("");
    const [addRequestStatus, setAddRequestStatus] = useState("idle");

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const usersOptions = users.map((user) => (
        <option key={user.name} value={user.id}>
            {user.name}
        </option>
    ));

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

export default EditPostForm;
