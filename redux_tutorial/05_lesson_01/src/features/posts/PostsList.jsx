import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
    fetchPosts,
    getFetchStatus,
    getPostsError,
    // selectAllPosts,
    selectPostIds,
} from "./postsSlice";
import PostsExcerpt from "./PostsExcerpt";

const PostsList = () => {
    const dispatch = useDispatch();

    // const posts = useSelector(selectAllPosts);
    const orderedPostIds = useSelector(selectPostIds);
    const fetchStatus = useSelector(getFetchStatus);
    const postsError = useSelector(getPostsError);

    useEffect(() => {
        if (fetchStatus === "idle") {
            dispatch(fetchPosts());
        }
    }, [dispatch, fetchStatus]);

    let content;
    if (fetchStatus === "loading") {
        content = <p>Loading...</p>;
    } else if (fetchStatus === "succeeded") {
        // const orderedPosts = posts
        //     .slice()
        //     .sort((a, b) => b.date.localeCompare(a.date));

        // content = orderedPosts.map((post) => (
        //     <PostsExcerpt key={post.id} post={post} />
        // ));

        content = orderedPostIds.map((postId) => (
            <PostsExcerpt key={postId} postId={postId} />
        ));
    } else if (fetchStatus === "failed") {
        content = <p>{postsError}</p>;
    }

    return <section className="posts-list">{content}</section>;
};

export default PostsList;
