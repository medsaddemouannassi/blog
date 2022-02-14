const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");

//CREATE POST
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE POST
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE POST
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.delete();
        res.status(200).json("Post has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can delete only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET POST
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL POSTS with likes
router.get("/", (req, res) => {
  Post.aggregate(
    [
      {
        $lookup: {
          from: "likes", // collection to join
          localField: "_id", //field from the input documents
          foreignField: "postId", //field from the documents of the "from" collection
          as: "likes", // output array field
        },
      },
    ],
    (error, posts) => {
      res.status(200).json(posts);
    }
  );
})
//GET ALL POSTS with comments
router.get("/posts&comments/comments", (req, res) => {
  Post.aggregate(
    [
      {
        $lookup: {
          from: "comments", // collection to join
          localField: "_id", //field from the input documents
          foreignField: "postId", //field from the documents of the "from" collection
          as: "comments", // output array field
        },
      },
    ],
    (error, posts) => {
      res.status(200).json(posts);
    }
  );
})


module.exports = router;
