steps

1. create the app, do the standard clean up
2. install all the required dependencies
3. get db.json data file
4. create features/todos/TodoList.jsx  and call it in the App.jsx
5. create features/api/apiSlice.js
6. in index.jsx, wrap App with the ApiProvider
7. then back in TodoList.jsx, call useGetTodosQuery and get all the data
8. then set the conditional content, and check if data is retrieved from the api
9. then go back to apiSlice, add the rest of the endpoints
10. add the additional hooks into the export
11. call them in TodoList.jsx
12. first use addTodo in handleSubmit
13. then complete the code in isSuccess of the content definition
14. then add tags and invalidate the tags during mutation
15. lastly add transformResponse to sort the data