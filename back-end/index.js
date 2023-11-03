const fs = require("fs");
const express = require("express");
const port = 8000;
const app = express();
const cors = require("cors");
app.use(cors());

app.use(express.json());

app.get("/users/:id", (request, response) => {  
  const {id} = request.params;
  fs.readFile(
    "./UserInfo.json",
    "utf-8",


    (readError, data) => {
      let saveddata = JSON.parse(data);
      response.json({ data: saveddata });
    }
  );
});
app.get("/users", (request, response) => {  

  fs.readFile(
    "./UserInfo.json",
    "utf-8",


    (readError, data) => {
      let saveddata = JSON.parse(data);
      response.json({ data: saveddata });
    }
  );
});
app.post("/users", (req, res) => {
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

        password: users.password
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

app.put("/users/:id", (request, response) => {
  const {id} = request.params;
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

app.delete("/users/:id", (request, response) => {
  const {id} = request.params;
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
app.head("/", (request, response) => {
  response.send("Hello Head server");
});
app.options("/", (request, response) => {
  response.send("Hello Options server");
});

app.listen(port, () => {
  console.log("Server is running on http://localhost:" + port);
});
app.patch("/", (request, response) => {
  response.send("Hello Patch server");
});
