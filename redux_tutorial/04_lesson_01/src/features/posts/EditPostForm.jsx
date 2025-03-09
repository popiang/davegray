import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersSlice";
import { useNavigate, useParams } from "react-router-dom";
import {
    deletePost,
    getEditStatus,
    selectPostById,
    updatePost,
} from "./postsSlice";

const EditPostForm = () => {
    const { postId } = useParams();
    const post = useSelector((state) => selectPostById(state, Number(postId)));

    const users = useSelector(selectAllUsers);
    const editStatus = useSelector(getEditStatus);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [title, setTitle] = useState(post?.title);
    const [content, setContent] = useState(post?.body);
    const [userId, setUserId] = useState(post?.userId);

    if (!post) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        );
    }

    const canSave =
        [title, content, userId].every(Boolean) && editStatus === "idle";

    const handleSubmit = (e) => {
        e.preventDefault();

        if (canSave) {
            dispatch(
                updatePost({
                    id: postId,
                    title,
                    body: content,
                    userId,
                    reactions: post.reactions,
                })
            )
                .unwrap()
                .then(() => {
                    setTitle("");
                    setContent("");
                    setUserId("");

                    navigate(`/post/${postId}`);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    const handleDeletePost = () => {
        dispatch(deletePost(post))
            .unwrap()
            .then(() => {
                setTitle("");
                setContent("");
                setUserId("");

                navigate("/");
            })
            .catch((error) => {
                console.log("Failed to delete the post", error);
            });
    };

    const userOptions = users.map((user) => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ));

    return (
        <section className="post-form" onSubmit={handleSubmit}>
            <h2>Edit Post</h2>
            <form>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="author">Author:</label>
                    <select
                        id="author"
                        onChange={(e) => setUserId(e.target.value)}
                        value={userId}
                    >
                        <option value=""></option>
                        {userOptions}
                    </select>
                </div>

                <div>
                    <label htmlFor="content">Content:</label>
                    <textarea
                        name="content"
                        id="content"
                        value={content}
                        rows={5}
                        onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                </div>

                <div className="actions">
                    <button disabled={!canSave}>Save Post</button>
                    <button 
                        type="button"
                        onClick={handleDeletePost}
                        className="delete-post-button"
                    >
                        Delete Post
                    </button>
                </div>
            </form>
        </section>
    );
};

export default EditPostForm;
