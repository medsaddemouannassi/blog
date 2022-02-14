const router = require("express").Router();
const Like = require("../models/Like");
const { ObjectId } = require("mongodb");

// Add Like
router.post("/", (req, res) => {
  let like = new Like({
    userId: ObjectId(req.body.userId),
    postId: ObjectId(req.body.postId),
    value: req.body.value,
  });
  like.save().then(() => {
    res.status(200).json({
      result: true,
    });
  });
});

// Delete Like
router.delete("/:userId/:postId", (req, res) => {
  Like.deleteOne({ userId: req.params.userId, postId: req.params.postId }).then(() => {
    res.status(200).json({
      result: true,
    });
  });
});

module.exports = router;
