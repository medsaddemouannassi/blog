import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./register.css";
import bg from "../../assets/images/bg-signup.jpg";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    const user = {
      username,
      email,
      password,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      user.profilePic = filename;
      try {
        try {
          await axios.post("/upload", data);
          setError(false);
        } catch (err) {
          setError(true);
        }
      } catch (err) {
        setError(true);
      }
    } else {
      user.profilePic = "user.png";
    }
    try {
      const res = await axios.post("/auth/register", user);
      res.data && window.location.replace("/login");
      setError(false);
    } catch (err) {
      setError(true);
    }
  };
  return (
    <div className="register">
      <img className="bgSignUp" src={bg} alt="" />
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          className="registerInput"
          placeholder="Enter your username..."
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Email</label>
        <input
          type="email"
          className="registerInput"
          placeholder="Enter your email..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          autoComplete="on"
          className="registerInput"
          placeholder="Enter your password..."
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="settingsPP">
          <label className="settingsPPIcon" htmlFor="fileInput">
            <i className="far fa-user-circle"></i> Add picture
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          {file ? (
            <img src={file ? URL.createObjectURL(file) : null} alt="" />
          ) : null}
        </div>
        <button className="registerButton" type="submit">
          Register
        </button>
        <small className="question">You have already an account?
        <span className="registerLoginButton">
          <Link className="link" to="/login">
            Login
          </Link>
        </span>
      </small>
      {error && (
        <span style={{ color: "red", marginTop: "10px" }}>
          Something went wrong!
        </span>
      )}
      </form>
    </div>
  );
}
