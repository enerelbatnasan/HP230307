const express = require("express");
const fs = require("fs");

const router = express.Router();

router.get("/admin", (request, response) => {
  const { id } = request.params;
  fs.readFile(
    "./UserInfo.json",
    "utf-8",

    (readError, data) => {
      let saveddata = JSON.parse(data);
      response.json({ data: saveddata });
    }
  );
});

module.exports = {router}