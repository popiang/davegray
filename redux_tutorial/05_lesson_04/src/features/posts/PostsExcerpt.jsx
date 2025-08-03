import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectPostById } from "./postsSlice";
import PostAuthor from "./PostAuthor";
import ReactionsButtons from "./ReactionsButtons";
import TimeAgo from "./TimeAgo";

const PostsExcerpt = ({ postId }) => {
	const post = useSelector((state) => selectPostById(state, Number(postId)));

    return (
        <article key={postId}>
            <h2>{post.title}</h2>
            <p>{post.body.substring(0, 75)}</p>
            <p>
                <Link to={`post/${post.id}`}>View Post</Link>
                <PostAuthor userId={post.userId} />
                <TimeAgo timestamp={post.date} />
            </p>
            <ReactionsButtons post={post} />
        </article>
    );
};

export default PostsExcerpt;
