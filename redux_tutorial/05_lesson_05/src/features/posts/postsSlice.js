import {
    createAsyncThunk,
    createEntityAdapter,
    createSelector,
    createSlice,
} from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

const postsAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState = postsAdapter.getInitialState({
    fetchStatus: "idle",
    addStatus: "idle",
    editStatus: "idle",
    deleteStatus: "idle",
    error: null,
    count: 0,
});

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
    const response = await axios.get(POSTS_URL);
    return response.data;
});

export const addNewPost = createAsyncThunk(
    "posts/addNewPost",
    async (initialPost) => {
        try {
            const response = await axios.post(POSTS_URL, initialPost);
            return response.data;
        } catch (error) {
            return error.message;
        }
    }
);

export const updatePost = createAsyncThunk(
    "posts/updatePost",
    async (updatedPost) => {
        const { id } = updatedPost;
        try {
            const response = await axios.put(`${POSTS_URL}/${id}`, updatedPost);
            return response.data;
        } catch (error) {
            return error.message;
        }
    }
);

export const deletePost = createAsyncThunk(
    "posts/deletePost",
    async (deletedPost) => {
        const { id } = deletedPost;
        try {
            const response = await axios.delete(POSTS_URL, id);
            if (response?.status === 200) return deletedPost;
        } catch (error) {
            return error.message;
        }
    }
);

export const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        reactionAdded(state, action) {
            const { postId, reaction } = action.payload;
            const existingPost = state.posts.find((post) => post.id === postId);
            if (existingPost) {
                existingPost.reactions[reaction]++;
            }
        },
        increaseCount(state) {
            state.count++;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.fetchStatus = "loading";
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.fetchStatus = "succeeded";
                let min = 1;
                const loadedPosts = action.payload.map((post) => {
                    post.date = sub(new Date(), {
                        minutes: min++,
                    }).toISOString();
                    post.reactions = {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0,
                    };
                    return post;
                });

                postsAdapter.upsertMany(state, loadedPosts);
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.fetchStatus = "failed";
                state.error = action.error.message;
            })
            .addCase(addNewPost.pending, (state) => {
                state.addStatus = "loading";
            })
            .addCase(addNewPost.fulfilled, (state, action) => {
                state.addStatus = "succeeded";
                action.payload.userId = Number(action.payload.userId);
                action.payload.date = new Date().toISOString();
                action.payload.reactions = {
                    thumbsUp: 0,
                    wow: 0,
                    heart: 0,
                    rocket: 0,
                    coffee: 0,
                };

                postsAdapter.addOne(state, action.payload);
            })
            .addCase(updatePost.pending, (state) => {
                state.editStatus = "loading";
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                state.editStatus = "idle";

                if (!action.payload?.id) {
                    console.log("Invalid payload. Update can't be completed");
                    console.log(action.payload);
                    return;
                }

                action.payload.data = new Date().toISOString();

                postsAdapter.upsertOne(state, action.payload);
            })
            .addCase(updatePost.rejected, (state, action) => {
                state.editStatus = "failed";
                state.error = action.error;
                console.log("An error occured. Update can't be completed.");
                console.log(action.error);
            })
            .addCase(deletePost.pending, (state) => {
                state.deleteStatus = "loading";
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                // delete failed
                if (!action.payload?.id) {
                    console.log("Post failed to be deleted.");
                    console.log(action.payload);
                    return;
                }

                // delete success
                const { id } = action.payload;

                // remove deleted post from the redux state
                const posts = state.posts.filter((post) => post.id !== id);
                state.posts = posts;
            })
            .addCase(deletePost.rejected, (state, action) => {
                state.deleteStatus = "failed";
                state.error = action.error;
                console.log("Post failed to be deleted.");
                console.log(action.error);
            });
    },
});

export const {
    selectAll: selectAllPosts,
    selectById: selectPostById,
    selectIds: selectPostsIds,
} = postsAdapter.getSelectors((state) => state.posts);

export const getFetchStatus = (state) => state.posts.fetchStatus;
export const getAddStatus = (state) => state.posts.addStatus;
export const getEditStatus = (state) => state.posts.editStatus;
export const getPostsError = (state) => state.posts.error;
export const getCount = (state) => state.posts.count;

export const selectPostsByUser = createSelector(
    [selectAllPosts, (state, userId) => userId],
    (posts, userId) => posts.filter((post) => post.userId === userId)
);

export const { reactionAdded, increaseCount } = postsSlice.actions;

export default postsSlice.reducer;
