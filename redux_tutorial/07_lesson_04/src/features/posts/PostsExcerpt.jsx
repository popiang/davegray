import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionsButtons from "./ReactionsButtons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectPostById } from "./postsSlice";

const PostsExcerpt = ({ postId }) => {
	const post = useSelector(state => selectPostById(state, postId));

    return (
        <article>
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
