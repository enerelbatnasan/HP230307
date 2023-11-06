const express = require("express");
const { router } = require("./user");

const port = 8000;
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(router);


app.listen(port, () => {
  console.log("Server is running on http://localhost:" + port);
});
 
