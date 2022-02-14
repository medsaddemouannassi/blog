const router = require("express").Router();
const Comment = require("../models/Comment");
const { ObjectId } = require("mongodb");

router.post("/", (req, res) => {
    let comment = new Comment({
        userId: ObjectId(req.body.userId),
        postId: ObjectId(req.body.postId),
        username: req.body.username,
        profilePic: req.body.profilePic,
        content: req.body.content
    })
    comment.save().then(() => {
        res.status(200).json({
            result: true
        })
    })
})
router.delete("/:id", (req, res) => {
    Comment.deleteOne({ _id: req.params.id }).then(() => {
        res.status(200).json({
            result: true
        })
    })
})

module.exports = router