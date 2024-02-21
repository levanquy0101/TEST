import React, { useContext, useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Container, Row } from "reactstrap";
import userIcon from "../../assets/images/user-icon.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./header.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/userSlice";
import { UserMenu } from "../usermenu/UserMenu";
import SearchResults from "../UI/searchresults/SearchResults";
const nav__links = [
  {
    path: "shop",
    display: "Sản phẩm",
  },
  {
    path: "bo-suu-tap",
    display: "Bộ sưu tập",
  },
  {
    path: "/noi-that",
    display: "Thiết kế nội thất",
  },
  {
    path: "/goc-cam-hung",
    display: "Góc cảm hứng",
  },
];

const dropdown = [
  {
    path: "home",
    display: "Phòng ngủ",
  },
  {
    path: "home",
    display: "Phòng khách",
  },
];

const policy_lists = [
  {
    icon: "uil uil-truck",
    text: "Giao hàng toàn quốc",
  },
  {
    icon: "uil uil-store",
    text: "Hệ thống cửa hàng Perfect Home",
  },
  {
    icon: "uil uil-headphones-alt",
    text: "Hotline: 1900 71 17 67 (9-21h)",
  },
];

function Header(props) {
  const dispatch = useDispatch();
  const [prevScroll, setPrevScroll] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([""]);
  const [noResults, setNoResults] = useState(false);

  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const searchRef = useRef(null);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
  };

  const handleScroll = () => {
    const currentScroll = window.pageYOffset;
    console.log("currentScroll", currentScroll);
    setVisible(prevScroll > currentScroll || currentScroll < 100);
    setPrevScroll(currentScroll);
  };
  // const currentUser = useSelector((state) => state.user.currentUser);
  const userData = useSelector((state) => state.user);
  console.log("header", userData);

  const navigate = useNavigate();
  const navigateToCart = () => {
    navigate("/cart");
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScroll, visible]);

  const profileActionRef = useRef("show__profileActions");

  // const toggleProfileActions = () =>
  //   profileActionRef.current.classList.toggle("show__profileActions");

  // const handleLogout = () => {
  //   // Thực hiện các thao tác cần thiết để đăng xuất
  //   // Sau đó dispatch hành động logout
  //   dispatch(logout());
  // };
  const [menu, setMenu] = useState(true);
  const [menudrop, setMenuDrop] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState("uil uil-moon change__bg");

  const storedTheme = localStorage.getItem("theme");
  //   if (storedTheme) {
  //     setTheme(storedTheme);
  //   }
  const [theme, setTheme] = useState(
    storedTheme === "dark-theme" ? "light-theme" : "dark-theme"
  );
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  useEffect(() => {
    localStorage.setItem("totalQuantity", JSON.stringify(totalQuantity));
  }, [totalQuantity]);

  // const handleClick = () => setMenu(!menu);
  const handleClick = () => {
    setSelectedIcon(
      selectedIcon === "uil uil-moon change__bg"
        ? "uil uil-sun change__bg"
        : "uil uil-moon change__bg"
    );
  };
  const toggleTheme = () => {
    handleClick();
    setTheme(theme === "dark-theme" ? "light-theme" : "dark-theme");
    localStorage.setItem("theme", theme);
  };

  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setIsSearchVisible(false);
    }
  };
  const handleInputClick = (event) => {
    // Ngăn chặn sự kiện click trên ô input lan truyền ra ngoài
    event.stopPropagation();
    setIsSearchVisible(true);
  };
  const handleSearchVisible = (isVisible) => {
    setIsSearchVisible(isVisible);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    document.body.className = theme;
    // document.header.className = icon;
  }, [theme]);
  return (
    <header className={`header ${visible ? "" : "header-hidden"}`}>
      <div className="nav__wrapper">
        <NavLink to="/home">
          <div className="logo">
            {/* <img src={logo} alt="" /> */}
            <i class="uil uil-adobe"></i>
            <div className="">
              <h1>Perfect Home</h1>
              {/* <p>Since 1989</p> */}
            </div>
          </div>
        </NavLink>

        <div className="search__box">
          <div className="header__search">
            <div className="nav__left">
              <input
                type="text"
                value={searchTerm}
                onClick={handleInputClick}
                placeholder="Tìm kiếm sản phẩm..."
                onChange={handleInputChange}
              />
              <span>
                <i class="uil uil-capture"></i>
              </span>
            </div>
            <div className="nav__right">
              <span>
                <i class="uil uil-search"></i>
              </span>
            </div>
          </div>

          <div className="policy__search">
            <div className={menu ? "navigation" : "navigation active"}>
              <ul>
                {policy_lists.map((item, index) => {
                  return (
                    <li key={index}>
                      <NavLink>
                        <span
                          style={{
                            paddingRight: "5px",
                          }}
                        >
                          <i class={item.icon}></i>
                        </span>
                        {item.text}
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {searchTerm.length > 0 && (
            <>
              {" "}
              {isSearchVisible && (
                <div className="wrapper__box" ref={searchRef}>
                  <SearchResults
                    value={searchTerm}
                    onSearchVisible={handleSearchVisible}
                  />
                </div>
              )}
            </>
          )}
        </div>
        <div className="nav__icons">
          <span className="moon__sun">
            <i className={selectedIcon} onClick={() => toggleTheme()}></i>
          </span>
          <span className="fav__icon">
            <i class="uil uil-bell"></i>
            <span className="badge"> 0</span>
          </span>
          <span className="cart__icon" onClick={navigateToCart}>
            <i class="uil uil-shopping-cart-alt"></i>
            <span className="badge">{totalQuantity}</span>
          </span>{" "}
          <div
            className=""
            style={{
              zIndex: "1001",
            }}
          >
            {userData.username ? (
              <UserMenu />
            ) : (
              <div>
                <span style={{ marginRight: "10px" }}>
                  <NavLink
                    to="/login"
                    activeClassName="active"
                    className="color-link"
                  >
                    Đăng nhập
                  </NavLink>
                </span>
                <NavLink
                  to="/register"
                  activeClassName="active"
                  className="color-link"
                >
                  Đăng ký
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="nav__desktop">
        <div className={menu ? "navigation" : "navigation active"}>
          <ul className="menu">
            <li
              className="nav__item dropdown"
              onMouseEnter={() => setMenuDrop(true)}
              onMouseLeave={() => setMenuDrop(false)}
            >
              <NavLink to="/collections/sofa-ghe">
                Sofa - Ghế thư giản <i class="uil uil-angle-down"></i>
              </NavLink>

              <div className="dropdownContent">
                <NavLink className="dropdownItem" to="/collections/sofa">
                  Sofa
                </NavLink>
                <NavLink className="dropdownItem" to="/collections/ghe">
                  Ghế thư giản
                </NavLink>
              </div>
            </li>
            <li
              className="nav__item dropdown"
              onMouseEnter={() => setMenuDrop(true)}
              onMouseLeave={() => setMenuDrop(false)}
            >
              <NavLink to="/collections/ban">
                Bàn <i class="uil uil-angle-down"></i>
              </NavLink>

              <div className="dropdownContent">
                <NavLink className="dropdownItem">Bàn ăn</NavLink>
                <NavLink className="dropdownItem">Bàn làm việc</NavLink>
                <NavLink className="dropdownItem">Bàn học</NavLink>{" "}
                <NavLink className="dropdownItem">Bàn trang điểm</NavLink>
              </div>
            </li>{" "}
            <li
              className="nav__item dropdown"
              onMouseEnter={() => setMenuDrop(true)}
              onMouseLeave={() => setMenuDrop(false)}
            >
              <NavLink to="/collections/giuong">
                Giường <i class="uil uil-angle-down"></i>
              </NavLink>

              <div className="dropdownContent">
                <NavLink className="dropdownItem">Giường nệm</NavLink>
                <NavLink className="dropdownItem">Niệm</NavLink>
              </div>
            </li>
            {nav__links.map((item, index) => {
              return (
                <li className="nav__item" key={index}>
                  <NavLink
                    to={item.path}
                    className={(navClass) =>
                      navClass.isActive ? "nav__active" : ""
                    }
                  >
                    {item.display}{" "}
                  </NavLink>
                </li>
              );
            })}
            <li
              className="nav__item dropdown"
              onMouseEnter={() => setMenuDrop(true)}
              onMouseLeave={() => setMenuDrop(false)}
            >
              <NavLink to="/phong">
                Phòng <i class="uil uil-angle-down"></i>
              </NavLink>

              <div className="dropdownContent">
                <NavLink className="dropdownItem">Phòng khách</NavLink>
                <NavLink className="dropdownItem">Phòng ngủ</NavLink>
                <NavLink className="dropdownItem">Phòng tắm</NavLink>
              </div>
              {/* {menudrop && (
                <ul className="dropdown-menu">
                  {dropdown.map((item, index) => (
                    <li key={index}>
                      <NavLink
                        to={item.path}
                        className={(navClass) =>
                          navClass.isActive ? "nav__active" : ""
                        }
                      >
                        {item.display}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )} */}
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
