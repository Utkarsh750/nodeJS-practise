const express = require("express");
const users = require("./MOCK_DATA.json");
const PORT = 8000;
const app = express();

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
    return res.json({ status: "Pending" });
  })
  .delete((req, res) => {
    return res.json({ status: "Pending" });
  });

app.post("/api/users", (req, res) => {
  // Create new user
  const body = req.body;
  console.log("Body", body);
  return res.json({ status: "Pending" });
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
