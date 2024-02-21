import React, { useContext, useEffect, useState } from "react";
import image from "../../assets/images/avatar.jpg";
import "./account.css";
import userIcon from "../../assets/images/user-icon.png";
import { Form, FormGroup } from "reactstrap";
import Helmet from "../../assets/helmet/Helmet";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
export const Account = () => {
  const userData = useSelector((state) => state.user);

  // console.log("account", userData);
  // const [password, setPassword] = useState("");
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/users/${userData.username}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // newUsername,
            // newEmail,
          }),
        }
      );

      if (response.ok) {
        // Update successful, you might want to update local state or show a success message
        toast.success("You are updated in successfully. ");
      } else {
        // Handle error response from the server
        console.error("Failed to update user");
      }
    } catch (error) {
      toast.error("You are updated in successfully. ");
    }
  };
  return (
    <Helmet title="Account">
      <section className="accountInfo">
        <div className="container boxItems">
          <h1>Hồ Sơ Của Tôi</h1>
          <div className="content">
            <div className="left">
              <div className="img flexCenter">
                <input type="file" accept="image/*" alt="img" />
                <img
                  src={userData.avatar ? userData.avatar : userIcon}
                  alt="image"
                  className="image-preview"
                />
              </div>
            </div>
            <Form className="right" onSubmit={handleUpdate}>
              <FormGroup>
                <label htmlFor="">Tên đăng nhập</label>
                <input
                  type="text"
                  value={userData.username}
                  // onChange={(e) => setNewUsername(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <label htmlFor="">Email</label>
                <input
                  type="email"
                  value={userData.email}
                  // onChange={(e) => setNewEmail(e.target.value)}
                />
              </FormGroup>

              {/* <label htmlFor="">Password</label>
              <input type="password" value={password} readOnly /> */}
              <button>
                <span class="circle1"></span>
                <span class="circle2"></span>
                <span class="circle3"></span>
                <span class="circle4"></span>
                <span class="circle5"></span>
                <span class="text">Cập nhập</span>
              </button>
            </Form>
          </div>
        </div>
      </section>
    </Helmet>
  );
};
