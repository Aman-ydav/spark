const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());

const DB_URI =
  "mongodb+srv://Spark:<Spark@123>@spark.6wb1v.mongodb.net/?retryWrites=true&w=majority&appName=Spark";

mongoose
  .connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("MongoDB connection error:", err));


require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('MongoDB connection error:', err));


const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  regno: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  department: { type: String, required: true },
  domain: [String],
  contribution: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../Frontend")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend/index.html"));
});

app.get("/form", (req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend/Form/form.html"));
});

app.post("/submit", async (req, res) => {
  try {
    const existingUser = await User.findOne({
      $or: [{ regno: req.body.regno }, { email: req.body.email }],
    });

    if (existingUser) {
      return res.redirect(
        "/form?error=Registration Number or Email already exists!"
      );
    }

    const user = new User({
      name: req.body.name,
      regno: req.body.regno,
      email: req.body.email,
      phone: req.body.phone,
      department: req.body.department,
      domain: req.body.domain,
      contribution: req.body.contribution,
    });

    await user.save();
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
