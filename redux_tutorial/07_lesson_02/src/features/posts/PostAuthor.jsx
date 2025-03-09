import { useSelector } from "react-redux";
import { selectUserById } from "../users/usersSlice";
import { Link } from "react-router-dom";

const PostAuthor = ({ userId }) => {
    const author = useSelector(selectUserById(userId));

    return (
        <span>
            by{" "}
            {author ? (
                <Link to={`/user/${userId}`}>{author.name}</Link>
            ) : (
                "Unknon author"
            )}
        </span>
    );
};

export default PostAuthor;
