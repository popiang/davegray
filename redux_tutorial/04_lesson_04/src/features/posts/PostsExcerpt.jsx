import { Link } from "react-router-dom";
import PostAuthor from "./PostAuthor";
import ReactionsButtons from "./ReactionsButtons";
import TimeAgo from "./TimeAgo";

const PostsExcerpt = ({ post }) => {
    return (
        <article key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body.substring(0, 75)}</p>
            <p>
                <Link to={`/posts/${post.id}`}>View Post</Link>
                <PostAuthor userId={post.userId} />
                <TimeAgo timestamp={post.date} />
            </p>
            <ReactionsButtons post={post} />
        </article>
    );
};

export default PostsExcerpt;
