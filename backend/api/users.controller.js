const UsersDAO = require("../dao/usersDAO.js");

module.exports = class UserController {
  static async apiGetUsers(req, res, next) {
    //if variable is found, convert to int, if not set to default (20 or 0)
    const usersPerPage = req.query.usersPerPage
      ? parseInt(req.query.usersPerPage, 10)
      : 20;
    const page = req.query.page ? parseInt(req.query.page, 10) : 0;

    //defining filters
    //if name query string, then filters.name is set to the name..
    //*filters start off as empty object.. unless.. IF the name or email is in the query string.
    let filters = {};
    if (req.query.name) {
      filters.name = req.query.name;
    } else if (req.query.email) {
      filters.email = req.query.email;
    } else if (req.query.accounts) {
      filters.accounts = req.query.accounts;
    }
    //* next call the function getUsers from the UserDAO function located in usersDAO.js, which returns a user list and total number of users that meet the query params.
    const { usersList, totalNumUsers } = await UsersDAO.getUsers({
      filters,
      page,
      usersPerPage,
    });
    //* create a response to send to person/api call with the results from the query
    let response = {
      users: usersList,
      page: page,
      filters: filters,
      entries_per_page: usersPerPage,
      total_results: totalNumUsers,
    };
    res.json(response); //*send json response with all the info
  }

  //*add a user
  static async apiAddUser(req, res, next) {
    try {
      const user_id = req.body.user_id;
      const username = req.body.username;
      const name = req.body.name;
      const email = req.body.email;
      //todo: create a date variable

      const userResponse = await UsersDAO.addUser(
        user_id,
        username,
        name,
        email
      );
      //console.log(userResponse);
      //console.log("after userresponse");
      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiUpdateUser(req, res, next) {
    //update what parts? for testing any..
    try {
      const id = req.body._id;
      const user_id = req.body.user_id;
      const username = req.body.username;
      const name = req.body.name;
      const email = req.body.email;
      console.log(`mongodb id: ${id}, and userid: ${user_id}`);
      console.log(username, name, email);
      const userResponse = await UsersDAO.updateUser(
        user_id,
        id,
        username,
        name,
        email
      );
      var { error } = userResponse;
      if (error) {
        res.status(400).json({ error });
      }
      if (userResponse.modifiedCount === 0) {
        throw new Error("unable to update");
      }
      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
};
