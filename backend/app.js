const express = require("express");
const app = express();
// const port = process.env.PORT || 8080;

app.use(express.urlencoded({ extendednpm: true }));

app.use('/api', require('./routes/index'));

app.listen(8080, () => {
  console.log("It works woohooo!");
});
