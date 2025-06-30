import { Link, useParams } from "react-router-dom";

const PostPage = ({ posts, handleDelete }) => {
    const { id } = useParams();
    const post = posts.find((post) => post.id === id);

    return (
        <main className="PostPage">
            <article className="post">
                {post && (
                    <>
                        <h2>{post.title}</h2>
                        <p className="postDate">{post.datetime}</p>
                        <p className="postBody">{post.body}</p>
                        <button
                            className="deleteButton"
                            onClick={() => handleDelete(id)}
                        >
                            Delete Post
                        </button>
                        <Link to={`/edit/${post.id}`}>
                            <button className="editButton">Edit Post</button>
                        </Link>
                    </>
                )}
            </article>
        </main>
    );
};

export default PostPage;
