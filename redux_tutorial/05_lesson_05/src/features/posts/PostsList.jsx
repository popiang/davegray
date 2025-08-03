import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import PostsExcerpt from "./PostsExcerpt";
import {
    fetchPosts,
    getFetchStatus,
    getPostsError,
	selectPostsIds,
} from "./postsSlice";

const PostsList = () => {
    const dispatch = useDispatch();

	const orderedPostIds = useSelector(selectPostsIds);
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
        content = orderedPostIds.map((postId) => (
            <PostsExcerpt key={postId} postId={postId} />
        ));
    } else if (fetchStatus === "failed") {
        content = <p>{postsError}</p>;
    }

    return (
        <section className="posts-list">
            {content}
        </section>
    );
};

export default PostsList;
