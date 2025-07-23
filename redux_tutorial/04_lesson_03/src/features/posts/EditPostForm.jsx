import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, selectAllUsers } from "../users/usersSlice";
import {
    deletePost,
    getEditStatus,
    selectPostById,
    updatePost,
} from "./postsSlice";
import { useNavigate, useParams } from "react-router-dom";

const EditPostForm = () => {
    const { postId } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const post = useSelector((state) => selectPostById(state, Number(postId)));
    const users = useSelector(selectAllUsers);
    const editStatus = useSelector(getEditStatus);

    const [title, setTitle] = useState(post?.title);
    const [content, setContent] = useState(post?.body);
    const [userId, setUserId] = useState(post?.userId);

    useEffect(() => {
        if (editStatus === "idle") {
            dispatch(fetchUsers());
        }
    }, [dispatch, editStatus]);

    const usersOptions = users.map((user) => (
        <option key={user.id} value={user.id}>
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
                console.log(error);
            } finally {
                console.log("asdf");
            }
        }
    };

    const onDeletePostClicked = async () => {
        try {
            await dispatch(deletePost({ id: postId })).unwrap();

            setTitle("");
            setContent("");
            setUserId("");

            navigate("/");
        } catch (error) {
            console.log("Failed to delete the post: " + error);
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
                        name="postTitle"
                        id="postTitle"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="postAuthor">Post Author:</label>
                    <select
                        name="postAuthor"
                        id="postAuthor"
                        defaultValue={userId}
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
                        rows={5}
                        onChange={(e) => setContent(e.target.value)}
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
                    <button type="button" onClick={onDeletePostClicked}>
                        Delete Post
                    </button>
                </div>
            </form>
        </section>
    );
};

export default EditPostForm;
