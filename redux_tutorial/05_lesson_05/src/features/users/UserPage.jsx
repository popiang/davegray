import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { selectUserById } from "./usersSlice";
import { selectPostsByUser } from "../posts/postsSlice";

const UserPage = () => {
    const { userId } = useParams();
    const user = useSelector((state) => selectUserById(state, userId));
    const userPosts = useSelector((state) => selectPostsByUser(state, userId));

    const postTitles = userPosts.map((post) => (
        <li key={post.id}>
            <Link to={`/post/${post.id}`}>{post.title}</Link>
        </li>
    ));

    return (
        <section>
            <h2>{user?.name}</h2>
            <ol>{postTitles}</ol>
        </section>
    );
};

export default UserPage;
