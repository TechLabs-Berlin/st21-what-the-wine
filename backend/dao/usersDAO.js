const ObjectID = require("mongodb").ObjectID;

let users;

module.exports = class UsersDAO {
  static async injectDB(connection) {
    if (users) {
      return;
    }
    try {
      users = await connection.db(process.env.USER_NS).collection("customers");
    } catch (e) {
      console.error(`Unable to establish connection in usersDAO: ${e}`);
    }
  }

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
      cursor = await users.find(query);
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
    //todo: add list type to json object value... list for the wines the user saves to their profile.
    try {
      const userDoc = {
        user_id: user_id,
        username: username,
        name: name,
        email: email,
      };
      return await users.insertOne(userDoc);
    } catch (e) {
      console.error(`Unable to post user: ${e}`);
    }
  }
  static async updateUser(user_id, username, id) {
    try {
      const updateResponse = await users.updateOne(
        { user_id: user_id /* ,  _id: ObjectID(id) */ },
        //todo: why doesnt ObjectID work?
        //filter--> match user id with oid

        { $set: { username: username } } //update
        /*         { $set: { name: name } },
        { $set: { email: email } } */
      );
      return updateResponse;
    } catch (e) {
      console.error(`cannot update review due to: ${e}`);
      return { error: e };
    }
  }
};

//todo: Delete user route
//todo: Users put on pause as MVP was redefined
