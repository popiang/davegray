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

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const users = useSelector(selectAllUsers);
    const post = useSelector((state) => selectPostById(state, Number(postId)));
    const editStatus = useSelector(getEditStatus);

    const [title, setTitle] = useState(post?.title);
    const [content, setContent] = useState(post?.body);
    const [userId, setUserId] = useState(post?.userId);

    const usersOptions = users.map((user) => (
        <option value={user.id} key={user.id}>
            {user.name}
        </option>
    ));

    const canSave =
        [title, content, userId].every(Boolean) && editStatus === "idle";

    const onSavePostClicked = async () => {
        if (canSave) {
            try {
                await dispatch(
                    updatePost({
                        id: postId,
                        title,
                        body: content,
                        userId,
                        reactions: post.reactions,
                    })
                ).unwrap();

                navigate(`/post/${postId}`);
            } catch (error) {
                console.log("Failed to save post");
                console.log(error);
            } finally {
                setTitle("");
                setContent("");
                setUserId("");
            }
        }
    };

    const onDeletePostClicked = async () => {
        try {
            await dispatch(deletePost(post)).unwrap();
            navigate("/");
        } catch (error) {
            console.log("Failed to delete post");
            console.log(error);
        } finally {
            setTitle("");
            setContent("");
            setUserId("");
        }
    };

    return (
        <section className="post-form">
            <h2>Edit Post</h2>
            <form>
                <div>
                    <label htmlFor="postTitle">Post Title:</label>
                    <input
                        type="text"
                        id="postTitle"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="author">Author:</label>
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
                        rows={5}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>

                <button
                    type="button"
                    onClick={onSavePostClicked}
                    disabled={!canSave}
                >
                    Edit Post
                </button>
                <button
                    type="button"
                    onClick={onDeletePostClicked}
                    disabled={!canSave}
                >
                    Delete Post
                </button>
            </form>
        </section>
    );
};

export default EditPostForm;
