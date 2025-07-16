import { useSelector } from "react-redux";
import { selectAllPosts } from "./postsSlice";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";

const PostsList = () => {
    const posts = useSelector(selectAllPosts);
    const orderedPosts = posts
        .slice()
        .sort((a, b) => b.date.localCompare(a.date));
    const renderedPosts = orderedPosts.map((post) => (
        <article>
            <h3>{post.title}</h3>
            <p>{post.content.substring(0, 100)}</p>
            <p className="postCredit">
                <PostAuthor userId={post.user.id} />
                <TimeAgo timestamp={post.date} />
            </p>
        </article>
    ));

    return (
        <section>
            <h2>Posts</h2>
            {renderedPosts}
        </section>
    );
};

export default PostsList;
