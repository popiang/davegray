import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import { sub } from "date-fns";

const postsAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState = postsAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPosts: builder.query({
            query: () => "/posts",
            transformResponse: (responseData) => {
                let min = 1;
                const loadedPosts = responseData.map((post) => {
                    if (!post?.date) {
                        post.date = sub(new Date(), {
                            minutes: min++,
                        }).toISOString();
                    }

                    if (!post?.reactions) {
                        post.reactions = {
                            thumbsUp: 0,
                            wow: 0,
                            heart: 0,
                            rocket: 0,
                            coffee: 0,
                        };
                    }

                    return post;
                });

                postsAdapter.setAll(initialState, loadedPosts);
            },
            providesTags: (result) => [
                { type: "Post", id: "LIST" },
                ...result.ids.map((id) => ({ type: "Post", id })),
            ],
        }),
        getPostsByUserId: builder.query({
            query: (id) => `/posts/?userId=${id}`,
            transformResponse: (responseData) => {
                let min = 1;
                const loadedPosts = responseData.map((post) => {
                    if (!post?.date) {
                        post.date = sub(new Date(), {
                            minutes: min++,
                        }).toISOString();
                    }

                    if (!post?.reactions) {
                        post.reactions = {
                            thumbsUp: 0,
                            wow: 0,
                            heart: 0,
                            rocket: 0,
                            coffee: 0,
                        };
                    }

                    return post;
                });

                postsAdapter.setAll(initialState, loadedPosts);
            },
            providesTags: (result) => [
                ...result.ids.map((id) => ({ type: "Post", id })),
            ],
        }),
        addNewPost: builder.mutation({
            query: (initialPost) => ({
                url: "/posts",
                method: "POST",
                body: {
                    ...initialPost,
                    userId: Number(initialPost.userId),
                    date: new Date().toISOString(),
                    reactions: {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0,
                    },
                },
            }),
            invalidatesTags: [{ type: "Post", id: "LIST" }],
        }),
        updatePost: builder.mutation({
            query: (initialPost) => ({
                url: `/posts/${initialPost.id}`,
                method: "PUT",
                body: {
                    ...initialPost,
                    date: new Date().toISOString(),
                },
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "Post", id: arg.id },
            ],
        }),
        deletePost: builder.mutation({
            query: ({ id }) => ({
                url: `/posts/${id}`,
                method: "DELETE",
                body: {
                    id,
                },
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "Post", id: arg.id },
            ],
        }),
        addReactions: builder.mutation({
            query: (postId, reactions) => ({
                url: `/posts/${postId}`,
                method: "PATCH",
                body: {
                    reactions,
                },
            }),
            async onQueryStarted(
                { postId, reactions },
                { dispatch, queryFulfilled }
            ) {
                const patchResult = dispatch(
                    extendedApiSlice.util.upsertQueryData(
                        "getPosts",
                        undefined,
                        (draft) => {
                            const post = draft.entities[postId];
                            if (post) {
                                post.reactions = reactions;
                            }
                        }
                    )
                );
                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            },
        }),
    }),
});

export const {
    useGetPostsQuery,
    useGetPostsByUserIdQuery,
    useAddNewPostMutation,
    useUpdatePostMutation,
    useDeletePostMutation,
} = extendedApiSlice;

export const selectPostsResults = extendedApiSlice.endpoints.getPosts.select();

const selectPostsData = createSelector(
    selectPostsResults,
    (postsResult) => postsResult.data
);

export const {
    selectAll: selectAllPosts,
    selectById: selectPostById,
    selectIds: selectPostIds,
} = postsAdapter.getSelectors(
    (state) => selectPostsData(state) ?? initialState
);
