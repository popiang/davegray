import { useEffect } from "react";
import { useParams } from "react-router-dom";

const EditPost = ({
    posts,
    handleEdit,
    editTitle,
    setEditTitle,
    editBody,
    setEditBody,
}) => {
    const { id } = useParams();
    const post = posts.find((post) => post.id.toString() === id);

    useEffect(() => {
        setEditTitle(post.title);
        setEditBody(post.body);
    }, [post, setEditTitle, setEditBody]);

    return (
        <main className="NewPost">
            <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="title">Post Title:</label>
                <input
                    type="text"
                    id="title"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    required
                />
                <label htmlFor="body">Post Body:</label>
                <textarea
                    id="body"
                    value={editBody}
                    onChange={(e) => setEditBody(e.target.value)}
                    required
                />
                <button onClick={() => handleEdit(id)}>Submmit</button>
            </form>
        </main>
    );
};

export default EditPost;
