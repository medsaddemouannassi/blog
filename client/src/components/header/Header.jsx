import "./header.css";
import bg from "../../assets/images/bg.jpg"

export default function Header() {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleLg">Let's share, like and comment your favorite cars</span>
      </div>
      <img
        className="headerImg"
        src={bg}
        alt=""
      />
    </div>
  );
}
