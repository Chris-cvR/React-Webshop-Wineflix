const express = require("express");
const path = require('path');
const app = express();
const port = process.env.PORT || 8888;

app.use(express.static('public'))

const productsroute=require('./routes/api/products.js')
const cartroute=require('./routes/api/cart.js')

app.use("/",productsroute)
app.use("/",cartroute)

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});