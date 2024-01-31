const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

const PORT = process.env.PORT | 5000;

const homeStartingContent =
  "Hi, I'm Viishal.🙋‍♂️ I'm a blend of tech and creativity, casting a spell where my technical skills seamlessly merge with creative flair to elevate user experiences. Every piece of code transforms into a creative touch, maximizing the magic in the digital world";
const aboutContent =
  "This is a Blog Journal Website where one can post a blog post. Compose your blog and let us now your thoughts. ";
const contactContent =
  "Hey, we can connect through email : vishalpundhirofficial@gmail.com";

mongoose.connect(
  "mongodb+srv://admin-vishal:Ronaldo-73@cluster0.jtdoo3s.mongodb.net/blogDB",
  { useNewUrlParser: true }
);

const postSchema = {
  title: String,
  content: String,
};

const Post = new mongoose.model("Post", postSchema);

let posts = [];

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  Post.find({})
    .then(function (foundPosts) {
      res.render("home", {
        startingContent: homeStartingContent,
        postArray: foundPosts,
      });
    })
    .catch(function (err) {
      console.log(err);
    });
});

app.get("/about", function (req, res) {
  res.render("about", { content: aboutContent });
});

app.get("/contact", function (req, res) {
  res.render("contact", { content: contactContent });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.get("/post/:postID", function (req, res) {
  const requestedPostID = req.params.postID;
  Post.findOne({ _id: requestedPostID })
    .then(function (post) {
      res.render("post", {
        title: post.title,
        content: post.content,
      });
    })
    .catch(function (err) {
      console.log(error);
    });

  // let requiredContent = "";
  // posts.forEach(post => {
  //   if (_.lowerCase(post.title) === _.lowerCase(req.params.postID)) {requiredContent = post.content;}
  //   else {console.log("Match Not Found");}
  // });

  // res.render("post", {topic: _.lowerCase(req.params.postID), content: requiredContent });
});

app.post("/compose", function (req, res) {
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postContent,
  });

  post
    .save()
    .then(function () {
      res.redirect("/");
    })
    .catch(function (err) {
      console.log(err);
    });

  // const post = {
  //   title: req.body.postTitle,
  //   content: req.body.postContent
  // };

  // posts.push(post);
});

app.listen(PORT, function () {
  console.log("Server started on port 5000");
});
