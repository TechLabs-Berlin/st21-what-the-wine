//var greet = require("../backend/sandbox.js");
const { json } = require("express");

function cleanJson(jsonList) {
  for (let i = 0; i < jsonList.length; i++) {
    //*randomize vegan values to true/false
    const randomVeganBool = Math.round(Math.random() * 1);
    let veganBool;
    //*has a high flase probability due to vegan wines being less common
    if (randomVeganBool <= 0.9) {
      veganBool = false;
    } else {
      veganBool = true;
    }
    jsonList[i].vegan = veganBool;
  }
  for (let i = 0; i < jsonList.length; i++) {
    jsonList[i].flavor_profile = {
      bitter: randomNumber(),
      sweet: randomNumber(),
      dry: randomNumber(),
    };
  }
  for (let i = 0; i < jsonList.length; i++) {
    if (jsonList[i].food_names) {
      jsonList[i].food_names = jsonList[i].food_names.split("|");
    } else {
      jsonList[i].food_names = [];
    }
  }
}
function randomNumber() {
  const number_ = Math.round(Math.random() * 4 + 1);
  return number_;
}

function testingFunction(greet) {
  console.log(greet);
  greet = "hwllo world";
  console.log(greet);
  console.log("leaving fucntion....");
  //let byw = "bye";
  //console.log(greet);
  //console.log("hello");
  return greet;
}

module.exports = cleanJson;
//module.exports = querySelectors;
module.exports = testingFunction;
