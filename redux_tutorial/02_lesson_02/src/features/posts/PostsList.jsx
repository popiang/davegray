import { useSelector } from "react-redux";
import { selectAllPost } from "./postsSlice";

const PostsList = () => {
    const posts = useSelector(selectAllPost);
    const orderedPosts = posts
        .slice()
        .sort((a, b) => b.date.localCompare(a.date));

    const renderedPosts = orderedPosts.map((post) => (
        <article>
            <h3>{post.title}</h3>
            <p>{post.content.substring(0, 100)}</p>
            <p className="postCredit"></p>
        </article>
    ));

    return (
        <section>
            <h2>Posts</h2>
            {renderedPosts}
        </section>
    );
};
