import Post from "../post/Post";
import "./posts.css";

export default function Posts({ postsWithLikes, postsWithComments }) {
  return (
    <div key={Math.random() * 10} className="posts">
      {postsWithLikes.map((p) =>
        postsWithComments.map((o) =>
          o._id === p._id ? <Post key={p._id} post={p} postWithComments={o} /> : null
        )
      )}
    </div>
  );
}
