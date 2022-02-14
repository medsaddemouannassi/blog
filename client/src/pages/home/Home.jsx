import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./home.css";
import axios from "axios";
import { useLocation } from "react-router";
import logo from "../../assets/images/logo.png"
import news from "../../assets/images/news.jpg"

export default function Home() {
  const [postsLikes, setPostsLikes] = useState([]);
  const [postsComments, setPostsComments] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      const res1 = await axios.get("/posts" + search);
      const res2 = await axios.get("/posts/posts&comments/comments" + search);
      setPostsLikes(res1.data);
      setPostsComments(res2.data);
    };
    fetchPosts();
  }, [search]);
  let leftSidebar = {
    img: news,
    title: "News",
    debrief: "Read More"
  }
  let rightSidebar = {
    img: logo,
    title: "About Us",
    debrief: "Follow Us"
  }
  return (
    <>
      <Header />
      <div className="home">
        <Sidebar content={leftSidebar} />
        <Posts postsWithLikes={postsLikes} postsWithComments={postsComments} />
        <Sidebar content={rightSidebar} />
      </div>
    </>
  );
}
