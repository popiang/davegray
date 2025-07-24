import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

const initialState = {
    posts: [],
    fetchStatus: "idle",
    addStatus: "idle",
    editStatus: "idle",
    error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
    const response = await axios.get(POSTS_URL);
    return response.data;
});

export const addNewPost = createAsyncThunk(
    "posts/addNewPost",
    async (initialPost) => {
        const response = await axios.post(POSTS_URL, initialPost);
        return response.data;
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
            const response = await axios.delete(`${POSTS_URL}/${id}`);
            if (response?.status === 200) {
                return deletedPost;
            }
        } catch (error) {
            return error.message;
        }
    }
);

export const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        postAdded: {
            prepare(title, content, userId) {
                return {
                    payload: {
                        id: nanoid,
                        title,
                        content,
                        date: new Date().toISOString(),
                        userId,
                        reactions: {
                            thumbsUp: 0,
                            wow: 0,
                            heart: 0,
                            rocket: 0,
                            coffee: 0,
                        },
                    },
                };
            },
            reducer(state, action) {
                state.push(action.payload);
            },
        },
        reactionAdded(state, action) {
            const { postId, reaction } = action.payload;
            const existingPost = state.posts.find((post) => post.id === postId);
            if (existingPost) {
                existingPost.reactions[reaction]++;
            }
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

                state.posts = state.posts.concat(loadedPosts);
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
                state.posts.push(action.payload);
            })
            .addCase(addNewPost.rejected, (state, action) => {
                state.addStatus = "failed";
                state.error = action.error.message;
            })
            .addCase(updatePost.pending, (state) => {
                state.editStatus = "loading";
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                state.editStatus = "idle";

                if (!action.payload?.id) {
                    console.log("Update could not be completed");
                    console.log(action.payload);
                    return;
                }

                const { id } = action.payload;
                action.payload.date = new Date().toISOString();
                const posts = state.posts.filter((post) => post.id !== id);
                state.post = [...posts, action.payload];
            })
            .addCase(updatePost.rejected, (state, action) => {
                state.editStatus = "failed";
                state.error = action.error.message;
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log("Delete could not complete");
                    console.log(action.payload);
                    return;
                }

                const { id } = action.payload;

                const posts = state.posts.filter((post) => post.id !== id);
                state.posts = posts;
            });
    },
});

export const selectAllPosts = (state) => state.posts.posts;
export const selectPostById = (state, id) =>
    state.posts.posts.find((post) => post.id === id);
export const getPostsStatus = (state) => state.posts.status;
export const getAddStatus = (state) => state.posts.addStatus;
export const getEditStatus = (state) => state.posts.editStatus;
export const getPostsError = (state) => state.posts.error;

export const { postAdded, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;
