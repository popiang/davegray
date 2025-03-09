import { useDispatch } from "react-redux";
import { addReaction } from "./postsSlice";

const reactionEmoji = {
    thumbsUp: "👍🏻",
    wow: "😮",
    heart: "🫶🏻",
    rocket: "🚀",
    coffee: "☕️",
};

const ReactionsButtons = ({ post }) => {
    const dispatch = useDispatch();

    const reactionsButtons = Object.entries(reactionEmoji).map(
        ([name, emoji]) => {
            return (
                <button
                    key={name}
                    type="button"
					className="reaction-button"
                    onClick={() =>
                        dispatch(
                            addReaction({ postId: post.id, reaction: name })
                        )
                    }
                >
                    {emoji} {post.reactions[name]}
                </button>
            );
        }
    );

    return <div className="reaction-buttons-container">{reactionsButtons}</div>;
};

export default ReactionsButtons;
