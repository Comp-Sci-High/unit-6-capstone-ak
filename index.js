
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

const CommentSchema = new mongoose.Schema({
  comment: { type: String },
  pfpURL: { type: String },
  rating: { type: Number },
  app: { type: String },
  postId:{ type: String},
});

const Comment = mongoose.model("Comment", CommentSchema, "Comments");

app.post("/comment/add", async(req,res)=>{
  const comment = await new Comment({
    comment:req.body.comment,
    pfpURL:req.body.pfpURL,
    rating:req.body.rating,
    app:req.body.app,
}).save()
res.json(comment)
})

app.get("/comment",async(req,res)=>{
  const app = await Comment.find({})
  res.render("comment.ejs",{app})
})
app.get("/comments",async(req,res)=>{
  const comments = await Comment.find({})
  res.json(comments)
})

app.patch("/menu/update/:comment", async (req, res) => {
  const updatedComment = await Menu.findOneAndUpdate(
    { comment: req.params.comment },
    { pfpURL: res.body.pfpURL },
    { rating: req.body. rating},
    { new: true }
  );
  res.json(updatedComment);
});

app.delete("/menu/delete/:comment", async (req, res) => {
  const deletedComment = await Menu.findOne({
    comment: req.params.comment,
  });
  res.json(deletedComment);
});

const PostSchema = new mongoose.Schema({
  title: { type: String },
  descrption: { type: String },
  image: { type: String },
});

const Post = mongoose.model("Post", PostSchema, "Posts");


app.post("/post/add", async(req,res)=>{
  const post = await new Post({
    title:req.body.title,
    description:req.body.description,
    image:req.body.image,
}).save()
res.json(post)
})

app.get("/post",async(req,res)=>{
  const app = await Post.find({})
  res.render("post.ejs",{app})
})
app.get("/posts",async(req,res)=>{
  const posts = await Post.find({})
  res.json(posts)
})

app.patch("/menu/update/:post", async (req, res) => {
  const updatedPost = await Menu.findOneAndUpdate(
    { title: req.params.title },
    { description: res.body.description },
    { image: req.body. image},
    { new: true }
  );
  res.json(updatedPost);
});

app.delete("/menu/delete/:post", async (req, res) => {
  const deletedPost = await Menu.findOne({
    post: req.params.post,
  });
  res.json(deletedPost);
});


async function startServer() {
  await mongoose.connect(
    "mongodb+srv://SE12:CSH2025@cluster0.u9yhg.mongodb.net/CSHteachers?retryWrites=true&w=majority&appName=Cluster0"
  );

  app.listen(3000, () => {
    console.log(`Server running.`);
  });
}

startServer();


