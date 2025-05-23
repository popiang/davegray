import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { selectUserById } from "./usersSlice";
import { selectPostsByUser } from "../posts/postsSlice";

const UserPage = () => {
    const { userId } = useParams();
    const user = useSelector(selectUserById(userId));
    const postsForUser = useSelector((state) =>
        selectPostsByUser(state, Number(userId))
    );

    const postTitles = postsForUser.map((post) => (
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
