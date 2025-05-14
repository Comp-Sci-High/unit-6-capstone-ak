
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
  Comment: { type: String },
  pfpURL: { type: String },
  rating: { type: Number },
  App: { type: String },
});

const Comment = mongoose.model("Comment", CommentSchema, "Comments");

