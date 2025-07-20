import PostAuthor from "./PostAuthor";
import ReactionsButtons from "./ReactionsButtons";
import TimeAgo from "./TimeAgo";

const PostsExcerpt = ({ post }) => {
    return (
        <article key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body.substring(0, 100)}</p>
            <p>
                <PostAuthor userId={post.userId} />
                <TimeAgo timestamp={post.date} />
            </p>
			<ReactionsButtons post={post} />
        </article>
    );
};

export default PostsExcerpt;
