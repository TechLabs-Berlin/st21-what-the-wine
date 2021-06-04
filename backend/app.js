const express = require("express");
const app = express();
// const port = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));

// User registration, profile update and delete APIs
app.post("/users", (req, res) => {
  res.send("I will register this user to the database!");
});

app.put("/users/:id", (req, res) => {
  res.send("I will update this user's details in the database!");
});

app.delete("/users/:id", (req, res) => {
  res.send("I will delete this user from the database!");
});

// Save wines to favorites API
app.post("/users/:id/favorites", (req, res) => {
  res.send(
    "I will add this wine to this user's favorites list in the database!"
  );
});

// Recommendation API
/* 
Save form input to user profile, forward it to Flask server, 
recieve & save recommendation to user profile, send response to FE
*/
app.post("/users/:id/recommendations", (req, res) => {
  res.send(
    "I will add these form details to this user's profile in the database!"
  );
});

app.listen(8080, () => {
  console.log("It works woohoo!");
});
