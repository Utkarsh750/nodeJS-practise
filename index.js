const express = require("express");
const PORT = 8000;
const app = express();
const fs = require("fs");
const mongoose = require("mongoose");

app.use(express.urlencoded({ extended: false }));

mongoose
  .connect(
    "mongodb+srv://utkarsh750:1234@cluster0.wkygvry.mongodb.net/?retryWrites=true&w=majority/practise"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDb Error", err));
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    jobTitle: {
      type: String,
    },
    gender: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);
app.get("/users", async (req, res) => {
  const allDbUsers = await User.find({});
  const html = `
          <ul> 
          ${allDbUsers
            .map((user) => `<li>${user.firstName} - ${user.email}</li>`)
            .join("")}
          </ul>
      `;
  res.send(html);
});
// Routes
app.get("/api/users", async (req, res) => {
  // res.setHeader("myName", "Utkarsh Sharma");
  const allDbUsers = await User.find({});
  res.setHeader("X-MyName", "Utkarsh Sharma");
  return res.json(allDbUsers);
});

app
  .route("/api/users/:id")
  .get(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "user not found" });
    return res.json(user);
  })
  .patch(async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, {
      email: "megayt750@gmail.com",
    });
    return res.json({ status: "Success" });
  })
  .delete(async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    return res.json({ status: "Success" });
  });

app.post("/api/users", async (req, res) => {
  // Create new user
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_title,
  });

  console.log(result, "result");
  return res.status(201).json({ message: "success" });
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
