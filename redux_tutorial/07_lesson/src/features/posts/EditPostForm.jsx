import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { selectPostById } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";
import { useState } from "react";
import { useUpdatePostMutation, useDeletePostMutation } from "./postsSlice";

const EditPostForm = () => {
    const [updatePost, { isLoading }] = useUpdatePostMutation();
    const [deletePost, { isLoading: isDeleteLoading }] =
        useDeletePostMutation();

    const { postId } = useParams();
    const navigate = useNavigate();

    const post = useSelector((state) => selectPostById(state, Number(postId)));
    const users = useSelector(selectAllUsers);

    const [title, setTitle] = useState(post?.title);
    const [content, setContent] = useState(post?.body);
    const [userId, setUserId] = useState(post?.userId);

    if (!post) {
        return (
            <section>
                <h2>Post is not found!!</h2>
            </section>
        );
    }

    const usersOptions = users.map((user) => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ));

    const canSave =
        [title, content, userId].every(Boolean) && !isLoading;

    const handleSubmit = (e) => {
        e.preventDefault();

        if (canSave) {
            updatePost({ id: post.id, title, body: content, userId })
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
        deletePost({ id: post.id })
            .unwrap()
            .then(() => {
                setTitle("");
                setContent("");
                setUserId("");

                navigate("/");
            })
            .catch((error) => {
                console.log("Post could not be deleted: ", error);
            });
    };

    return (
        <section className="post-form">
            <h2>Edit Post</h2>
            <form onSubmit={handleSubmit}>
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
                        name="author"
                        id="author"
                        defaultValue={userId}
                        onChange={(e) => setUserId(Number(e.target.value))}
                    >
                        <option value=""></option>
                        {usersOptions}
                    </select>
                </div>

                <div>
                    <label htmlFor="content">Content:</label>
                    <textarea
                        name="content"
                        id="content"
                        rows={5}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>

                <div className="actions">
                    <button disabled={!canSave}>Save Post</button>
                    <button
                        onClick={handleDeletePost}
                        className="delete-post-button"
                        type="button"
                        disabled={isDeleteLoading}
                    >
                        Delete
                    </button>
                </div>
            </form>
        </section>
    );
};

export default EditPostForm;
