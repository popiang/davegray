steps 02

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