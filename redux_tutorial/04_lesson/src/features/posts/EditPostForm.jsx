import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
    deletePost,
    getEditStatus,
    selectPostById,
    updatePost,
} from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";
import { useState } from "react";

const EditPostForm = () => {
    const { postId } = useParams();
    const navigate = useNavigate();

    const post = useSelector((state) => selectPostById(state, Number(postId)));
    const users = useSelector(selectAllUsers);
    const editStatus = useSelector(getEditStatus);

    const [title, setTitle] = useState(post?.title);
    const [content, setContent] = useState(post?.body);
    const [userId, setUserId] = useState(post?.userId);

    const dispatch = useDispatch();

    if (!post) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        );
    }

    const onTitleChanged = (e) => setTitle(e.target.value);
    const onContentChanged = (e) => setContent(e.target.value);
    const onAuthorChanged = (e) => setUserId(e.target.value);

    const canSave =
        [title, content, userId].every(Boolean) && editStatus === "idle";

    const onSavePostClicked = async () => {
        if (canSave) {
            try {
                await dispatch(
                    updatePost({
                        id: post.id,
                        title,
                        body: content,
                        userId,
                        reactions: post.reactions,
                    })
                ).unwrap();

                setTitle("");
                setContent("");
                setUserId("");
                navigate(`/post/${postId}`);
            } catch (error) {
                console.log("Failed to save the post", error);
            } finally {
                console.log("asdf");
            }
        }
    };

    const onDeletePostClicked = () => {
        try {
            dispatch(deletePost({ id: post.id })).unwrap();

            setTitle("");
            setContent("");
            setUserId("");

            navigate("/");
        } catch (error) {
            console.log("Failed to delete the post", error);
        }
    };

    const usersOptions = users.map((user) => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ));

    return (
        <section className="post-form">
            <h2>Edit Post</h2>
            <form>
                <div>
                    <label htmlFor="postTitle">Title:</label>
                    <input
                        type="text"
                        id="postTitle"
                        name="postTitle"
                        value={title}
                        onChange={onTitleChanged}
                    />
                </div>

                <div>
                    <label htmlFor="postAuthor">Author:</label>
                    <select
                        id="postAuthor"
                        defaultValue={userId}
                        onChange={onAuthorChanged}
                    >
                        <option value=""></option>
                        {usersOptions}
                    </select>
                </div>

                <div>
                    <label htmlFor="postContent">Content:</label>
                    <textarea
                        name="postContent"
                        id="postContent"
                        value={content}
                        rows={5}
                        onChange={onContentChanged}
                    />
                </div>

                <div className="actions">
                    <button
                        type="button"
                        onClick={onSavePostClicked}
                        disabled={!canSave}
                    >
                        Save Post
                    </button>

                    <button
                        type="button"
                        onClick={onDeletePostClicked}
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
