const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.static(__dirname + "/public"));
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Schema
const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  rating: { type: String, required: true },
  image: { type: String },
  description: { type: String }
});

const Post = mongoose.model("Post", PostSchema, "Posts");

// Routes
app.get("/", (req, res) => {
  res.render("add-app.ejs");
});

app.get("/reviewed-apps", async (req, res) => {
  try {
    const apps = await Post.find({});
    res.render("reviewed-apps.ejs", { apps });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post("/post/add", async (req, res) => {
  try {
    const post = await new Post({
      title: req.body.title,
      description: req.body.description,
      image: req.body.image,
      rating: req.body.rating
    }).save();
    res.redirect("/reviewed-apps");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post("/post/delete/:id", async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.redirect("/reviewed-apps");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get("/post/edit/:id", async (req, res) => {
  try {
    const app = await Post.findById(req.params.id);
    res.render("edit-app.ejs", { app });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post("/post/update/:id", async (req, res) => {
  try {
    await Post.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      description: req.body.description,
      image: req.body.image,
      rating: req.body.rating
    });
    res.redirect("/reviewed-apps");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Start server
async function startServer() {
  await mongoose.connect(
    "mongodb+srv://SE12:CSH2025@cluster0.u9yhg.mongodb.net/CSHteachers?retryWrites=true&w=majority&appName=Cluster0"
  );
  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
}

startServer();