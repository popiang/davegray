import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import PostsExcerpt from "./PostsExcerpt";
import {
    fetchPosts,
    getPostsError,
    getPostsStatus,
    selectAllPosts,
} from "./postsSlice";
import { fetchUsers } from "../users/usersSlice";

const PostsList = () => {
    const dispatch = useDispatch();

    const posts = useSelector(selectAllPosts);
    const postsStatus = useSelector(getPostsStatus);
    const postsError = useSelector(getPostsError);

    useEffect(() => {
        if (postsStatus === "idle") {
            dispatch(fetchPosts());
			dispatch(fetchUsers());
        }
    }, [dispatch, postsStatus]);

    let content;
    if (postsStatus === "loading") {
        content = <p>Loading...</p>;
    } else if (postsStatus === "succeeded") {
        const orderedPosts = posts
            .slice()
            .sort((a, b) => b.date.localeCompare(a.date));		          
        content = orderedPosts.map((post) => (
            <PostsExcerpt key={post.id} post={post} />
        ));
    } else if (postsStatus === "failed") {
        content = <p>{postsError}</p>;
    }

    return (
        <section className="posts-list">
            {content}
        </section>
    );
};

export default PostsList;
