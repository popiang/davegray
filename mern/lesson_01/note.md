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
	  