1. npm init -y
2. npm install express
3. npm install nodemon -D
4. put description in package.json
5. create script for dev and prod to run the server
6. create .gitignore
7. create server.js
   - require express
   - create app
   - require path
   - get PORT from .env file
8. app.listen()
9. app.use path.join
10. create public/css/style.css
    - copy the basic css style
11. in server.js, add app.use, require("./routes/root")
12. create routes/root.js
    - get express, router and path
	- router.get(regex)
	- res.sendFile(path to index.html)
	- export the router
13. create views/index.html
    - add link to style.css
	- the page should be viewable now
14. create 404.html
    - add basic message
	- link to style.css
15. in server.js, add app.all(*)
	- set response status to 404
	- check if accepts html sendFile 404.html
	- if json return json{message 404}
	- else res.type(txt).send(404)
	- can test now

16. in package.json, change the name to lesson_02
17. in gitignore, add logs
18. npm install date-fns and uuid
19. create logs and middleware folders
20. create logger.js in middleware
21. get {format} from date-fns, v4:uuid, fs, fsPromises and path
22. create logEvents async function that accept message and logFileName
23. create logger
24. export both logEvents and logger
25. in server.js, require logger and use it at the top
    - now you can test it
26. create errorHandler.js in middleware
	- create errorHandler middleware function and export it
27. import it in server.js and use it right before calling app.listen
28. in server.js, add app.use(express.json()) after logger
29. npm install cookie-parser
30. in server.js, require cookie-parser and use it at the top after express.json()
31. npm install cors
32. in server.js, require cors and use it after logger
33. create config folder
34. create allowedOrigins.js in config folder
	- create allowedOrigins array and add the allowed url
	- export it
35. create corsOptions.js in config folder
	- require allowedOrigins
	- create corsOptions block with all the configurations
	- export it
36. in server.js, require corsOptions
37. put corsOptions in cors();

38. change name in package.json to lesson_03
39. npm install dotenv
40. at the top of the server.js, put require('dotenv').config()
41. create .env at root folder
42. add .env in gitignore
43. setup database in mongodb atlas
44. in .env, set the DATABASE_URI
45. npm install mongoose
46. create models folder, create User.js model file, create userSchema and export it
47. create Note.js model file, create the schema and export it
48. npm install mongoose-sequence and complete the Note.js file
49. create dbConn.js in config folder, require mongoose and create a function to connect to database and export it
50. in server.js, require connectDB, mongoose and logEvents
51. at the top, console.log process.env.NODE_ENV
52. after that call connectDB()
53. at the bottom call mongoose.connection.once and bring the app.listen into the callback
54. at the bottom again, call mongoose.connection.on error, to catch any database error
55. try everything

56. in server.js, add app.use(/users) that require("./routes/userRoutes")
57. in routes folder, create userRoutes.js create the scaleton of get, post, patch and delete, and then export it
58. create controllers folder and create usersController.js, and require both User and Note model
59. install express-async-handler and bcrypt, and require them in usersController.js
60. in usersController, create the scaleton of getAllUsers, createNewUser, updateUser and delete user, then export them
61. require usersController in userRoutes.js and put the respective method in get, post, patch and delete route
62. back in usersController, complete the code for all 4 methods
63. use postman and test everything
64. now create controller for note and also test everything with postman 