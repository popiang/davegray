import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { selectPostById } from "./postsSlice";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionsButtons from "./ReactionsButtons";

const SinglePostPage = () => {
    const { postId } = useParams();
    const post = useSelector((state) => selectPostById(state, Number(postId)));

    if (!post) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        );
    }

    return (
        <article className="single-post-article">
            <h3>{post.title}</h3>
            <p>{post.body.substring(0, 100)}</p>
            <p>
                <Link to={`/post/edit/${post.id}`}>Edit Post</Link> &nbsp;
                <PostAuthor userId={post.userId} />
                <TimeAgo timestamp={post.date} />
            </p>
            <ReactionsButtons post={post} />
        </article>
    );
};

export default SinglePostPage;
