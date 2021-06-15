const express = require("express");
const router = express.Router();
const UserController = require("./users.controller.js");

//* With the connection open from index.js, access the api route in server.js and conenct with this router route localhost:8080/api/ to get "hello world"
//? how it works: the app.use is calling this current file.
//router.route("/").get((req, res) => res.send("hello world")); //*this is a test route. When first starting the app, uncomment this, and comment the next line out.

router
  .route("/")
  .get(UserController.apiGetUsers)
  .post(UserController.apiAddUser); //create new user
//.put(NewUserController.apiUpdateUser) //edit user
//.delete(NewUserController.apiDeleteUser); //delete user
//*What will be returned at this route ^^, comes from the file 'users.controller.js'
module.exports = router;
