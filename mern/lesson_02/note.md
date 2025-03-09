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
16. create logs and middleware folders
17. in gitignore, add logs


18. in package.json, change the name to lesson_02
19. npm install date-fns and uuid
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
28. npm install cookie-parser
29. in server.js, require cookie-parser and use it at the top after express.json()
30. npm install cors
31. in server.js, require cors and use it after logger
32. create config folder
33. create allowedOrigins.js in config folder
	- create allowedOrigins array and add the allowed url
	- export it
34. create corsOptions.js in config folder
	- require allowedOrigins
	- create corsOptions block with all the configurations
	- export it
35. in server.js, require corsOptions
36. put corsOptions in cors();
