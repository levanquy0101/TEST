import React, { useState, useRef, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./usermenu.css";
import { Link } from "react-router-dom";
import { NavLink } from "reactstrap";
import { logout } from "../../redux/slices/userSlice";
import { toast } from "react-toastify";
import userIcon from "../../assets/images/user-icon.png";
import { gapi } from "gapi-script";
//help me comment the code below?
export const UserMenu = () => {
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [profileOpen, setProfileOpen] = useState(false);

  const close = () => {
    setProfileOpen(false);
  };
  const profileOpenRef = useRef(null);
  useEffect(() => {
    // Lắng nghe sự kiện click toàn bộ trang
    const handleDocumentClick = (e) => {
      if (
        profileOpenRef.current &&
        !profileOpenRef.current.contains(e.target)
      ) {
        // Người dùng đã nhấp bên ngoài phạm vi profileOpen
        setProfileOpen(false);
      }
    };

    // Đăng ký sự kiện lắng nghe khi component được mount
    document.addEventListener("click", handleDocumentClick);

    // Hủy đăng ký sự kiện khi component bị hủy
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userData");
    dispatch(logout());
    toast("Logout successfully");

    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      console.log("User signed out");
    });
  };
  return (
    <>
      <div className="profile" ref={profileOpenRef}>
        <NavLink className="img" onClick={() => setProfileOpen(!profileOpen)}>
          <img src={userData.avatar ? userData.avatar : userIcon} alt="" />
        </NavLink>
        {profileOpen && (
          <div className="openProfile boxItems" onClick={close}>
            <div className="image">
              <div className="img">
                <img
                  src={userData.avatar ? userData.avatar : userIcon}
                  alt=""
                />
              </div>
              <div className="text">
                <Link to="/account">
                  <h4>{userData.username}</h4>
                </Link>
                {/* <label>Da Nang City</label> */}
              </div>
            </div>
            <NavLink className="box">
              <i class="uil uil-user-square icon"></i>
              <h4>
                <Link to="/account">Personal Page</Link>
              </h4>
            </NavLink>
            <NavLink className="box">
              <i class="uil uil-sign-out-alt icon"></i>
              <h4>
                <a onClick={handleLogout}>Logout</a>
              </h4>
            </NavLink>
          </div>
        )}
      </div>
    </>
  );
};
