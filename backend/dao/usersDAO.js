const ObjectID = require("mongoose").ObjectID;

//This is a variable to use to store a reference to the db
let users;

//* injectDB method. (to initially conenct to db)
//* as soon as server starts, get a reference to the users database.
//* if it is already filled, then return, but if not already filled, then assign the variable with a reference to the db.
module.exports = class UsersDAO {
  static async injectDB(connection) {
    if (users) {
      return;
    }
    try {
      //*connect to the db 'sample_analytics' then access the collection 'customers'.
      users = await connection.db(process.env.USER_NS).collection("customers");
    } catch (e) {
      console.error(`Unable to establish connection in usersDAO: ${e}`);
    }
  }
  //Then, run the function get
  //?call this to get a list of all users in the db
  //?call this method to query/sort
  //* corresponds to the .get
  static async getUsers({
    //can put many queries here..
    //https://docs.mongodb.com/manual/reference/operator/
    filters = null,
    page = 0,
    usersPerPage = 20,
  } = {}) {
    let query;
    if (filters) {
      if ("name" in filters) {
        //this filter needed to be set up in Atlas, in 'create index'
        query = { $text: { $search: filters["name"] } };
      } else if ("email" in filters) {
        query = { email: { $eq: filters["email"] } };
      } else if ("accounts" in filters) {
        query = { accounts: { $eq: filters["accounts"] } };
      }
    }
    let cursor;
    try {
      cursor = await users.find(query); //*find all users from db that goes along with query that was passed in.
    } catch (e) {
      console.error(`Unable to issue find query: ${e}`);
      return { usersList: [], totalNumUsers: 0 };
    }
    const displayCursor = cursor
      .limit(usersPerPage) //* user per page
      .skip(usersPerPage * page); //*get to specific page of results
    try {
      const usersList = await displayCursor.toArray(); //convert user list into array and return array
      const totalNumUsers = await users.countDocuments(query); //get total number of users in the query
      return { usersList, totalNumUsers }; //*return the users!
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents: ${e}`
      );
      return { usersList: [], totalNumUsers: 0 };
    }
  }
  static async addUser(user_id, username, name, email) {
    //review takes all the parameters ^^ and creates a user document
    try {
      const userDoc = {
        user_id: user_id,
        username: username,
        name: name,
        email: email,
      };

      //console.log(userDoc);
      return await users.insertOne(userDoc);
    } catch (e) {
      console.error(`Unable to post user: ${e}`);
    }
  }
};
