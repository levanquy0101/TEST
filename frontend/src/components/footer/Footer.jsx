import React from "react";
import "./footer.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Col, ListGroup, ListGroupItem } from "reactstrap";
function Footer(props) {
  const year = new Date().getFullYear();
  const quick__links = [
    {
      path: "home",
      display: "Home",
    },
    {
      path: "about",
      display: "About",
    },
    {
      path: "blog",
      display: "Blog",
    },
  ];

  const quick__links2 = [
    {
      path: "gallery",
      display: "Gallery",
    },
    {
      path: "login",
      display: "Login",
    },
    {
      path: "register",
      display: "Register",
    },
  ];
  return (
    <footer>
      <div className="footer__wrapper">
        <div className="footer__one footer">
          <div className="logo">{/* <img src={logo} alt="" /> */}</div>
          <p>
            Discover comfort and style with our handcrafted furniture. Elevate
            your space with our curated collection designed for modern living.
          </p>

          <div className="social__link">
            <span>
              <NavLink>
                <i
                  class="uil uil-youtube"
                  style={{
                    color: "red",
                  }}
                ></i>
              </NavLink>
            </span>
            <span>
              <NavLink>
                <i
                  class="uil uil-facebook"
                  style={{
                    color: "#1877f2",
                  }}
                ></i>
              </NavLink>
            </span>{" "}
            <span>
              <NavLink>
                <i
                  class="uil uil-instagram-alt"
                  style={{
                    color: "#fc466b",
                  }}
                ></i>
              </NavLink>
            </span>{" "}
            <span>
              <NavLink>
                <i
                  class="uil uil-github"
                  style={{
                    color: "black",
                  }}
                ></i>
              </NavLink>
            </span>
          </div>
        </div>

        <div className="footer__two footer">
          <h5 className="footer__link-title">Discover</h5>
          <ListGroup className="footer__quick-links">
            {quick__links.map((item, index) => {
              return (
                <ListGroupItem key={index} className="item__link">
                  <Link to={item.path}>{item.display}</Link>
                </ListGroupItem>
              );
            })}
          </ListGroup>
        </div>

        <div className="footer__three footer">
          <h5 className="footer__link-title">Quick Links</h5>
          <ListGroup className="footer__quick-links">
            {quick__links2.map((item, index) => {
              return (
                <ListGroupItem key={index} className="item__link">
                  <Link to={item.path}>{item.display}</Link>
                </ListGroupItem>
              );
            })}
          </ListGroup>
        </div>

        <div className="footer__four footer">
          <h5 className="footer__link-title">Contact</h5>
          <ListGroup className="footer__quick-links">
            <ListGroupItem className="GroupItem ">
              <p>
                <span>
                  <i class="uil uil-location-point"></i>
                </span>
                Address:
              </p>
              <p>Da Nang </p>
            </ListGroupItem>{" "}
            <ListGroupItem className="GroupItem">
              <p>
                <span>
                  <i class="uil uil-location-point"></i>
                </span>
                Address:
              </p>
              <p>Nha Trang </p>
            </ListGroupItem>{" "}
            <ListGroupItem className="GroupItem">
              <p>
                <span>
                  <i class="uil uil-location-point"></i>
                </span>
                Address:
              </p>
              <p> Ha Noi</p>
            </ListGroupItem>
          </ListGroup>
        </div>
      </div>

      <div className="footer__bottom">
        <p className="copyright">
          Copyright {year}, design and develop by Anh Dev. All rights reserved
        </p>
      </div>
    </footer>
  );
}

export default Footer;
