const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

const app = express();
require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://Spark:Spark%40123@spark.6wb1v.mongodb.net/?retryWrites=true&w=majority&appName=Spark";

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

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
    const { name, regno, email, phone, department, domain, contribution } = req.body;

    // Check for missing fields
    if (!name || !regno || !email || !phone || !department || !contribution) {
      return res.status(400).send("All fields are required!");
    }

    // Check if the user already exists
    const existingUser = await User.findOne({
      $or: [{ regno: regno }, { email: email }],
    });

    if (existingUser) {
      return res.redirect("/form?error=Registration Number or Email already exists!");
    }

    // Create a new user
    const user = new User({
      name,
      regno,
      email,
      phone,
      department,
      domain,
      contribution,
    });

    await user.save();
    res.redirect("/");
  } catch (error) {
    console.error("Error submitting form:", error);
    res.status(500).send("Internal Server Error");
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
