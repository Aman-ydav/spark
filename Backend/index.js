const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

const app = express();

require("dotenv").config();

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://Spark:Spark%40123@spark.6wb1v.mongodb.net/?retryWrites=true&w=majority&appName=Spark";

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

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  query: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const newsletterSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  date: { type: Date, default: Date.now },
});

const Contact = mongoose.model("Contact", contactSchema);
const Newsletter = mongoose.model("Newsletter", newsletterSchema);

const User = mongoose.model("User", userSchema);

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../Frontend")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend/index.html"));
});

app.get("/form", (req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend/Form/index.html"));
});

app.post("/submit", async (req, res) => {
  try {
    if (req.body.query) {
      const { name, email, query } = req.body;

      if (!name || !email || !query) {
        return res.status(400).send("All fields are required!");
      }

      const contact = new Contact({ name, email, query });
      await contact.save();
    alert("Successfully submitted! You will contact you soon.");
      return res.redirect("/");
    }

    const { name, regno, email, phone, department, domain, contribution } =
      req.body;

    if (!name || !regno || !email || !phone || !department || !contribution) {
      return res.status(400).send("All fields are required!");
    }

    const existingUser = await User.findOne({ $or: [{ regno }, { email }] });
    if (existingUser) {
      return res.redirect(
        "/Form?error=Registration Number or Email already exists!"
      );
    }

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
    alert("Successfully submitted! You will receive an interview email soon.");
    res.redirect("/");
  } catch (error) {
    console.error("Error submitting form:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/subscribe", async (req, res) => {
  try {
    console.log("Received data:", req.body); // Debugging line

    const { email } = req.body;

    if (!email || email.trim() === "") {
      return res.status(400).send("Email is required!");
    }

    const existingSubscription = await Newsletter.findOne({ email });
    if (existingSubscription) {
      return res.redirect("/?error=Email already subscribed!");
    }

    const subscription = new Newsletter({ email });
    await subscription.save();
    alert("Successfully submitted! We will keep you updated via email regularly.");
    res.redirect("/");
  } catch (error) {
    console.error("Error subscribing:", error);
    res.status(500).send("Internal Server Error");
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
