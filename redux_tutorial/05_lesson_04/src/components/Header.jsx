import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCount, increaseCount } from "../features/posts/postsSlice";

const Header = () => {
    const count = useSelector(getCount);
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(increaseCount());
    };

    return (
        <header className="header">
            <h1>Redux Blog</h1>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/post">Post</Link>
                    </li>
                    <li>
                        <Link to="/user">Users</Link>
                    </li>
                </ul>
                <button onClick={handleClick}>{count}</button>
            </nav>
        </header>
    );
};

export default Header;
