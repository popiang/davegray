steps lesson 02

1. create the base code as usual for redux project
2. create the store
3. create the postsSlice
4. create PostsList.jsx to display the list
5. create AddPostForm.jsx to add post
6. create usersSlice.js
7. create PostAuthor.jsx
8. create TimeAgo.jsx
9. create ReactionButtons.jsx

steps lesson 03

1. install axios
2. set the POSTS_URL
3. create initialState
4. create fetchPosts
5. create extraReducers
6. export the state values
7. update PostList.jsx
   - get all posts values from postsSlice.js
   - use useEffect to fetchPosts using dipatch when postsStatus is idle
   - create variable content
   - update content based on postsStatus
   - create PostsExcerpt
7. create addNewPost
8. update extraReducers
9. update AddPost.jsx
   - update canSave, add checking if the status is idle
   - if canSave, call dispatch -> call addNewPost, unwrap, then, catch
10. in usersSlice.js
   - create USERS_URL const
   - create initialState emptry array
   - create fetchUsers
   - create extraReducers

step lesson 04

1. in postsSlice.js, create the selectPostById function and export it
2. create SinglePostPage.jsx
   - install react-router-dom
   - use useparams to get postId from url
   - call selectpostbyid to get the post
     - wrap the postId with Number
   - create return when !post
   - create return if post available, just like in PostsExcerpt
3. in index.jsx, add routing for the <App />
4. create Layout.jsx
5. update App.jsx to include route for all pages
6. in PostsExcerpt
   - substring the body to 75...
   - add Link before PostAuthor to view post
7. create Header.jsx
   - add logo and nav link to Home and Post
   - add Header in Layout.jsx before main
8. in PostList remove h2 
9. in PostsExcerpt change h3 to h2
10. in SinglePostPage, add edit Link before PostAuthor
11. create EditPostForm.jsx
	- almost similar to AddPost.jsx
    - a long one, refer previous code
12. in postSlices, create updatePost function and add addCase for updatePost
13. style the whole things first
14. create deletePost function in postsSlice
15. add delete post button in EditPostForm

step lesson 07

1. get db.json file and put in data folder
2. run json-server
3. create features/api/apiSlice.js
4. in postsSlice.js, delete unnecessory code
5. import apiSlice
6. create extendedApiSlice getPosts and export a couple of hooks
7. in store.js, replace postsreducer with apiSlice.reducer and add the middleware
8. in index.jsx, amend the store to dispatch extendedApiSlice
9. in PostsList.jsx, call useGetPostsQuery to get all the states, and then make all the required changes
10. in PostAuthor.jsx, add link to author.name
11. in postsSlice, add getPostsByUserId, addNewPost, updatePost and deletePost and export them
12. in AddPost.jsx, bring the useAddNewPostMutation and do the required changes
13. in EditPostForm.jsx, bring useUpdatePostMutation and useDeletePostMutation and do the required changes
14. in UserPage.jsx, bring in useGetPostsByUserIdQuery and do the required changes
15. in Header.jsx, remove increment features and everything related to it
16. back in postsSlice.js, addReaction. this is a bit long and complicated, refer finished code
17. in ReactionsButtons.jsx, bring in useAddReactionMutation and do all the required changes


