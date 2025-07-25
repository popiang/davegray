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
        <article>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <p>
                <Link to={`/post/edit/${post.id}`}>Edit Job</Link> &nbsp;
                <PostAuthor userId={post.userId} />
                <TimeAgo timestamp={post.date} />
            </p>
            <ReactionsButtons post={post} />
        </article>
    );
};

export default SinglePostPage;
