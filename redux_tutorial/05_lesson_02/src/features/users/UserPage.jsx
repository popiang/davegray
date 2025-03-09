import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { selectPostsByUser } from "../posts/postsSlice";
import { selectUserById } from "./usersSlice";

const UserPage = () => {
    const { userId } = useParams();
    const user = useSelector(selectUserById(Number(userId)));
    const userPosts = useSelector((state) => selectPostsByUser(state, Number(userId)));

    const displayPosts = userPosts.map((post) => (
        <li key={post.id}>
            <Link to={`/post/${post.id}`}>{post.title}</Link>
        </li>
    ));

    return (
        <section>
			<h2>{user.name}</h2>
            <ol>{displayPosts}</ol>
        </section>
    );
};

export default UserPage;
