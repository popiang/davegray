const NewPost = ({ postTitle, setPostTitle, postBody, setPostBody, handleSubmit }) => {
    return (
        <div className="NewPost">
            <form className="newPostForm" onSubmit={handleSubmit}>
                <label htmlFor="title">Post Title:</label>
                <input
                    type="text"
                    id="title"
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                    required
                />
                <label htmlFor="body">Post Body:</label>
                <textarea
                    id="body"
                    value={postBody}
                    onChange={(e) => setPostBody(e.target.value)}
                    required
                />
				<button>Submmit</button>
            </form>
        </div>
    );
};

export default NewPost;
