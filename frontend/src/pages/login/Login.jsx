import React, { useState, useEffect, useContext } from "react";
import { Col, Container, Row, Form, FormGroup } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import { toast } from "react-toastify";
import Helmet from "../../assets/helmet/Helmet";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/slices/userSlice";
import GoogleLoginButton from "./GoogleLoginButton";

function Login(props) {
  const clientID =
    "89963773715-m76s4kh6g54gj4166omqlemfgrjv69ht.apps.googleusercontent.com";
  const [showPassword, setShowPassword] = useState(false);
  // const { login } = useContext(AuthContext);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleShowPassword = () => {
    setShowPassword((preve) => !preve);
  };

  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const userData = useSelector((state) => state);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // alert(password, username);
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        body: JSON.stringify(data), // Đảm bảo truyền dữ liệu email và password trong một đối tượng JSON
        headers: { "Content-Type": "application/json" },
        // credentials: "include", // Chỉnh sửa "Content Type" thành "Content-Type"
      });

      // Đây là nơi xử lý đăng nhập, bạn có thể gửi dữ liệu đăng nhập đến máy chủ ở đây.
      const dataRes = await response.json();

      if (response.ok) {
        // Đăng nhập thành công
        toast.success("Login successfully");
        // localStorage.setItem("loggedIn", "true");
        // localStorage.setItem("username", username);
        // Xử lý khi yêu cầu thành công
        const userData = {
          email: dataRes.email,
          username: dataRes.username,
          avatar: dataRes.avatar,
          // Không bao gồm mật khẩu
        };

        // // Lưu thông tin đăng nhập vào Local Storage
        localStorage.setItem("userData", JSON.stringify(userData));

        // Dispatch action login để cập nhật store trong Redux
        dispatch(login(dataRes));
        navigate("/home");
      } else {
        toast.error(
          "Username does not exist or incorrect password.Please try again."
        );
      }
    } catch (error) {}
  };

  // google
  console.log("tai sao m tu dang nhap", userData.email);
  return (
    <Helmet title="Login">
      <section className="">
        <Container>
          <Row>
            <Col lg="6" className="m-auto text-center">
              <Form className="auth__form" onSubmit={handleSubmit}>
                <h3
                  className="fw-bold fs-4
                 mb-4
                "
                >
                  Đăng nhập
                </h3>

                <FormGroup className="form__group">
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={data.username}
                    required
                    name="username"
                    onChange={handleOnChange}
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    name="password"
                    placeholder="Enter your password"
                    value={data.password}
                    onChange={handleOnChange}
                  />
                  <span className="icon-eye" onClick={handleShowPassword}>
                    {showPassword ? (
                      <i
                        class="uil uil-eye"
                        style={{
                          position: "relative",
                          right: "-40px",
                        }}
                      ></i>
                    ) : (
                      <i
                        class="uil uil-eye-slash"
                        style={{
                          position: "relative",
                          right: "-40px",
                        }}
                      ></i>
                    )}
                  </span>
                </FormGroup>
                <p
                  className="page-link"
                  style={{
                    marginBottom: "10px",
                  }}
                >
                  <Link to="/forgotPassword">Forgot Password?</Link>
                </p>
                <button>
                  <span class="circle1"></span>
                  <span class="circle2"></span>
                  <span class="circle3"></span>
                  <span class="circle4"></span>
                  <span class="circle5"></span>
                  <span class="text">Submit</span>
                </button>
                <p>
                  Don't have an account?{" "}
                  <Link to="/register">Create an account</Link>
                </p>
                <span className="line__text">Or</span>
                <GoogleLoginButton />
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
}

export default Login;
