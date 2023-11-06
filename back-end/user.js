const express = require("express");
const fs = require("fs");

const router = express.Router();
//middleware
// router.use((req, res, next)=>{
//   if(req.headers.token){
//     next()
//   } else {
//     res.status(401).json({"message": "Please Login"})
//     next()
//   }
// })



router.get("/users/:id", (request, response) => {
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
router.get("/users", (request, response) => {
  fs.readFile(
    "./UserInfo.json",
    "utf-8",

    (readError, data) => {
      let saveddata = JSON.parse(data);
      response.json({ data: saveddata });
    }
  );
});
router.post("/users", (req, res) => {
  const users = req.body;

  fs.readFile(
    "./UserInfo.json",
    "utf-8",

    (readError, data) => {
      let saveddata = JSON.parse(data);

      if (readError) {
        res.json({
          status: "read file error",
        });
      }

      const newUser = {
        id: Date.now().toString(),

        username: users.username,

        age: users.age,

        work: users.work,

        password: users.password,
      };

      saveddata.push(newUser);

      console.log(saveddata);

      fs.writeFile(
        "./UserInfo.json",

        JSON.stringify(saveddata),

        (writeError) => {
          if (writeError) {
            res.json({
              status: "error hhhh",
            });
          } else {
            res.json({
              status: "success hhhhh",

              data: saveddata,
            });
          }
        }
      );
    }
  );
});

router.put("/users/:id", (request, response) => {
  const { id } = request.params;
  fs.readFile(
    "./UserInfo.json",
    "utf-8",

    (readError, data) => {
      let savedData = JSON.parse(data);

      if (readError) {
        response.json({
          status: "read file error",
        });
      }
      const body = request.body;

      const updatedData = savedData.map((d) => {
        if (d.id == body.id) {
          (d.username = body.username),
            (d.age = body.age),
            (d.work = body.work);
            (d.password = body.password)
        }

        return d;
      });

      fs.writeFile(
        "./UserInfo.json",

        JSON.stringify(updatedData),

        (writeError) => {
          response.json({
            data: updatedData,
          });
        }
      );
    }
  );
});

router.delete("/users/:id", (request, response) => {
  const { id } = request.params;
  fs.readFile("./UserInfo.json", "utf-8", (readError, data) => {
    let savedData = JSON.parse(data);
    if (readError) {
      response.json({
        status: "read file error",
      });
    }
    const deleteddData = savedData.filter((d) => d.id !== id);
    fs.writeFile(
      "./UserInfo.json",
      JSON.stringify(deleteddData),
      (writeError) => {
        if (writeError) {
          response.json({
            status: "error",
          });
        }
        response.json({
          status: "success",
          data: deleteddData,
        });
      }
    );
  });
});

module.exports = {router}
