steps lesson 02

1. create the base code as usual for redux project
2. create the store
3. create postsSlice
4. create usersSlice
5. create PostAuthor.jsx
6. create TimeAgo.jsx
7. create PostsList.jsx to display the list
8. create AddPostForm.jsx to add post
9. create ReactionButtons.jsx

steps lesson 03

1. install axios
2. set the POSTS_URL
3. create initialState
4. create fetchPosts
5. create addNewPost 
6. create extraReducers
7. export the state values
8. update PostList.jsx
   - get all posts values from postsSlice.js
   - use useEffect the fetchPosts using dipatch when postsStatus is idle
   - create variable content
   - update content based on postsStatus
   - create PostsExcerpt
9. update extraReducers
10. update AddPostForm.jsx
   - update canSave, add checking if the status is idle
   - if canSave, call dispatch -> call addNewPost, unwrap, then, catch
11. in usersSlice.js
   - create USERS_URL const
   - create initialState emptry array
   - create fetchUsers
   - create extraReducers

step lesson 04

1. in postsSlice.js
   - update initialState
   - update existing extraReducers
   - create the selectPostById function and export it
   - create updatePost and deletePost async thunk function
   - create addCase in postsSlice.js for updatePost and deletePost
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
12. update AddPostForm.jsx
13. copy ccs