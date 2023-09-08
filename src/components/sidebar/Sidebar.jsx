import {
  ExitToAppOutlined,
  MonitorWeight,
  PhotoSizeSelectActualOutlined,
  Search,
  TrackChanges,
} from "@mui/icons-material";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import MenuLink from "../menuLink/MenuLink";
import "./sidebar.scss";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = (e) => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };
  const handleBMI = (e) => {
    dispatch({ type: "BMI" });
    navigate("/bmi");
  };

  const handleSearch = (e) => {
    dispatch({ type: "SEARCH" });
    navigate("/search");
  };

  const handleWT = (e) => {
    dispatch({ type: "WORKOUT TRACKER" });
    navigate("/workoutTracker");
  };

  const { currentUser } = useContext(AuthContext);

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <img
          className="profileImg"
          src={
            currentUser.photoURL
              ? currentUser.photoURL
              : "/assets/DefaultProfile.jpg"
          }
          alt=""
        />
        <span className="rightbarName">{currentUser.displayName}</span>
      </div>
      <span onClick={handleBMI}>
        <MenuLink icon={<MonitorWeight />} text="BMI" />
      </span>
      <span onClick={handleSearch}>
        <MenuLink icon={<Search />} text="Search" />
      </span>
      <span onClick={handleWT}>
        <MenuLink icon={<TrackChanges />} text="Workout Tracker" />
      </span>

      <span onClick={handleLogout}>
        <MenuLink icon={<ExitToAppOutlined />} text="Logout" />
      </span>
    </div>
  );
};

export default Sidebar;
