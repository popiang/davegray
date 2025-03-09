import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";

const AddPost = () => {
    const dispatch = useDispatch();
    const users = useSelector(selectAllUsers);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [userId, setUserId] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addPost(title, content, userId));

        setTitle("");
        setContent("");
        setUserId("");
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

                <button>Save Post</button>
            </form>
        </section>
    );
};

export default AddPost;
