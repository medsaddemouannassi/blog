import "./settings.css";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import bg from "../../assets/images/bg-settings.jpg";

export default function Settings() {
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:5000/images/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axios.put("/users/" + user._id, updatedUser);
      setSuccess(true);
      setError(false);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
      setError(true)
      setSuccess(false);
    }
  };
  return (
    <div className="settings">
      <img className="bgSettings" src={bg} alt="" />
      <div className="settingsWrapper">
        <div className="settingsTitle">Update Your Account</div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            type="text"
            placeholder={user.username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            placeholder={user.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="settingsPP">
            <label htmlFor="fileInput">
              <i className="fa-solid fa-image"></i> Change Profile Picture
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            {file ? (
              <img
                src={file ? URL.createObjectURL(file) : PF + user.profilePic}
                alt=""
              />
            ) : null}
          </div>
          <button className="settingsSubmit" type="submit">
            Update
          </button>
          {success && !error && (
            <span
              style={{ color: "green", textAlign: "center", marginTop: "20px" }}
            >
              Profile has been updated
            </span>
          )}
          {error && !success && (
            <span
              style={{ color: "red", textAlign: "center", marginTop: "20px" }}
            >
              Please verify username or email
            </span>
          )}
        </form>
      </div>
    </div>
  );
}
