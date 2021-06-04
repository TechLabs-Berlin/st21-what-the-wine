const express = require('express');
const router = express.Router();

router.get('/test', (req,res) => {
    console.log('test route');
    res.status(200).json({message: 'Test success'});
})

// User registration, profile update and delete APIs
router.post("/users", (req, res) => {
    res.send("I will register this user to the database!");
});

router.put("/users/:id", (req, res) => {
    console.log(req.params);
    res.send("I will update this user's details in the database!");
});

router.delete("/users/:id", (req, res) => {
    res.send("I will delete this user from the database!");
});

  // Save wines to favorites API
router.post("/users/:id/favorites", (req, res) => {
    res.send(
"I will add this wine to this user's favorites list in the database!"
    );
});

  // Recommendation API
/* 
Save form input to user profile, forward it to Flask server, 
recieve & save recommendation to user profile, send response to FE
  */
router.post("/users/:id/recommendations", (req, res) => {
    res.send(
"I will add these form details to this user's profile in the database!"
    );
});

module.exports = router;