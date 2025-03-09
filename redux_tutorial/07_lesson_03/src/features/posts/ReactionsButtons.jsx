import { useAddReactionMutation } from "./postsSlice";

const reactionEmoji = {
    thumbsUp: "👍🏻",
    wow: "😮",
    heart: "🫶🏻",
    rocket: "🚀",
    coffee: "☕️",
};

const ReactionsButtons = ({ post }) => {
    const [addReaction] = useAddReactionMutation();

    const reactionsButtons = Object.entries(reactionEmoji).map(
        ([name, emoji]) => {
            return (
                <button
                    key={name}
                    type="button"
                    className="reaction-button"
                    onClick={() => {
                        const newValue = post.reactions[name] + 1;
                        addReaction({
                            postId: post.id,
                            reactions: { ...post.reactions, [name]: newValue },
                        });
                    }}
                >
                    {emoji} {post.reactions[name]}
                </button>
            );
        }
    );

    return <div className="reaction-buttons-container">{reactionsButtons}</div>;
};

export default ReactionsButtons;
