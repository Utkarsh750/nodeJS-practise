const express = require("express");
const users = require("./MOCK_DATA.json");
const PORT = 8000;
const app = express();
const fs = require("fs");
const mongoose = require("mongoose");

app.use(express.urlencoded({ extended: false }));


app.get("/users", (req, res) => {
  const html = `
          <ul> 
          ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
          </ul>
      `;
  res.send(html);
});
// Routes
app.get("/api/users", (req, res) => {
  // res.setHeader("myName", "Utkarsh Sharma");
  console.log(req.headers);
  return res.json(users);
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
  })
  .patch((req, res) => {
    users.filter((user) => id === user.id);
    return res.json({ status: "Pending" });
  })
  .delete((req, res) => {
    const id = Number(req.params.id);

    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) {
      users.splice(index, 1);
      return res.json({ status: "Success", message: "User deleted" });
    } else {
      return res
        .status(404)
        .json({ status: "Error", message: "User not found" });
    }
    // return res.json({ status: "Pending" });
  });

app.post("/api/users", (req, res) => {
  // Create new user
  const body = req.body;
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({ status: "Success", id: users.length });
  });
});

// app.patch("/api/users/:id", (req, res) => {
//   // Edit new user with ID
//   return res.send({ status: "Pending" });
// });

// app.delete("/api/users/:id", (req, res) => {
//   // Delete user with ID
//   return res.send({ status: "Pending" });
// });

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
