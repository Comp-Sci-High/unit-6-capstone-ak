
const express = require("express");
const mongoose = require("mongoose");

const app = express();

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
});

const Comment = mongoose.model("Comment", CommentSchema, "Comments");

app.comment("/add/comment", async(req,res)=>{
  const comment = await new Comment({
    comment:req.body.comment,
    pfpURL:req.body.pfpURL,
    rating:req.body.rating,
    app:req.body.app,
}).save()
res.json(comment)
})

app.get("/",async(req,res)=>{
  const comments = await Comment.find({})
  res.render("comments.ejs",{comments})
})

