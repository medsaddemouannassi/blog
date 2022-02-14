import "./post.css";
import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { Context } from "../../context/Context";
import Swal from "sweetalert2";

export default function Post({ post, postWithComments }) {
  const { user } = useContext(Context);
  const PF = "http://localhost:5000/images/";
  let buttonState = post.likes.find((obj) => obj.userId === user?._id)
    ? "buttonLiked"
    : "button";
  let [likeButton, setStyle] = useState(buttonState);
  let [likes, setValue] = useState(post.likes.length);
  let [comments, setState] = useState(postWithComments.comments);

  const likeFunction = (id) => {
    if (user) {
      let x = likeButton === "button" ? "buttonLiked" : "button";
      setStyle(x);
      axios.get("/posts").then((posts) => {
        posts.data.find((obj) => (obj._id === id ? post = obj : null));
        if (post.likes.find((obj) => obj.userId === user._id)) {
          console.log(post.likes.find((obj) => obj.userId === user._id));
          console.log(user._id);
          axios.delete(`/likes/${user._id}/${id}`).then(() => {
            axios.get("/posts").then((newPosts) => {
            newPosts.data.find((newObj) =>
              newObj._id === id ? post = newObj : null
            );
            likes--;
            setValue(likes);
          });
          });
        } else if (!post.likes.find((obj) => obj.userId === user._id)) {
          axios
            .post("/likes", {
              userId: user._id,
              postId: id,
              value: true,
            })
            .then(() => {
              axios.get("/posts").then((newPosts) => {
              newPosts.data.find((obj) =>
                obj._id === id ? post = obj : null
              );
              likes++;
              setValue(likes);
            });
          });
        }
      });
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "You must connect",
        showConfirmButton: false,
        timer: 1700,
      });
    }
  };
  function deleteComment(id, userId) {
    if (user) {
      if (user._id === userId) {
        axios.delete(`/comments/${id}`).then(() => {
          axios.get("/posts/posts&comments/comments").then((data) => {
            data.data.map((obj) =>
              obj._id === post._id ? setState(obj.comments) : null
            );
          });
        });
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "You can not delete comments of other users",
          showConfirmButton: false,
          timer: 2700,
        });
      }
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "You must connect",
        showConfirmButton: false,
        timer: 1700,
      });
    }
  }
  const placeCursor = () => {
    document.getElementById(`${post._id}`).focus();
  };
  const handleKeyDown = (event) => {
    if (user) {
      if (event.key === "Enter") {
        let comment = document.getElementById(`${post._id}`).value;
        axios
          .post("/comments", {
            userId: user._id,
            username: user.username,
            profilePic: user.profilePic,
            postId: post._id,
            content: comment,
          })
          .then(() => {
            axios.get("/posts/posts&comments/comments").then((data) => {
              data.data.map((obj) =>
                obj._id === post._id ? setState(obj.comments) : null
              );
            });
            document.getElementById(`${post._id}`).value = null;
            document.getElementById(`${post._id}`).blur();
          });
      }
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "You must connect",
        showConfirmButton: false,
        timer: 1700,
      });
    }
  };
  return (
    <div className="post" key={post._id}>
      {post.photo && <img className="postImg" src={PF + post.photo} alt="" />}
      <div className="postInfo">
          <span className="postTitle">{post.title}</span>
        <hr />
        <span className="postDate">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <p className="postDesc">{post.desc}</p>
      {likes === 1 ? <small>{likes} Like</small> : null}
      {likes > 1 ? <small>{likes} Likes</small> : null}
      <div className="buttons">
        <button className={likeButton} onClick={() => likeFunction(post._id)}>
          <i className="fa-regular fa-thumbs-up"></i>
          Like
        </button>
        <button className="button" onClick={placeCursor}>
          <i className="fa-regular fa-message"></i>
          Comment
        </button>
      </div>
      <input
        className="commentInput"
        id={post._id}
        type="text"
        placeholder="Add a comment"
        onKeyDown={handleKeyDown}
      />
      <small id={post._id + post._id}></small>
      <div>
        {comments?.map((comment) => (
          <div key={comment._id} className="commentSection">
            <div className="comment">
              <img
                className="commentImg"
                src={PF + comment.profilePic}
                alt=""
              />
              <div>
                <h4> {comment.username} </h4>
                <div>{comment.content}</div>
              </div>
            </div>
            <i
              className="fa-solid fa-xmark"
              onClick={() => deleteComment(comment._id, comment.userId)}
            ></i>
          </div>
        ))}
      </div>
    </div>
  );
}
