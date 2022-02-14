import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./topbar.css";
import logo from "../../assets/images/logo.png";

export default function TopBar() {
  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:5000/images/";

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <div className="top">
      <img className="logo" src={logo} alt="" />
      <div className="topRight">
      <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              Home
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/write">
              Share
            </Link>
          </li>
          <li className="topListItem" onClick={handleLogout}>
            {user && "Log Out"}
          </li>
        </ul>
        {user && user.profilePic ? (
          <Link to="/settings">
            <img className="topImg" src={PF + user.profilePic} alt="" />
          </Link>
        ) : user && !user.profilePic ? (
          <Link to="/settings" style={{ textDecoration: "none" }}>
            <span className="username">{user.username}</span>
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                Log In
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                Register
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
