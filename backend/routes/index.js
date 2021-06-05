const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Wine = require('../models/Wine');

router.get('/test', (req,res) => {
    console.log('test route');
    res.status(200).json({message: 'Test success'});
})

// User registration, profile update and delete APIs
router.post("/users", async (req, res) => {

await User.create(req.body).then((userdb)=> {
    console.log(userdb);
res.send('Registered User!')
})
.catch((error) => {

res.send({error});

})
});

router.put("/users/:id", (req, res) => {
    console.log(req.params);
    res.send("I will update this user's details in the database!");
});

router.delete("/users/:id", (req, res) => {
    res.send("I will delete this user from the database!");
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

// Wine Routes

  // Save wines to favorites API
    router.post("/users/:id/favorites", (req, res) => {
    res.send(
"I will add this wine to this user's favorites list in the database!"
    );
});

// Route for a new Wine

router.post("/wines/newwine", async (req,res) => {
await Wine.create(req.body).then((winedb) => {
console.log(winedb);
res.send('Wine added');

})
.catch((error) => {

res.send({error});

})
})

// Gets information of all the wines 

router.get("/wines", async (req,res) => {
    await Wine.find().then((wineList) => {
    console.log(wineList);
    res.send(wineList);
    
    })
    .catch((error) => {
        
    res.send({error});
    
    })
    })

// Get information of a single wine

router.get("/wines/:id", async (req,res) => {
    await Wine.findById(req.params.id).then((singleWine) => {
    console.log(singleWine);
    res.send(singleWine);
    
    })
    .catch((error) => {
        
    res.send({error});
    
    })
    })

module.exports = router;