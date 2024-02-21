import React, { useState } from "react";
import { Col, FormGroup, Form, Container, Row } from "reactstrap";
import "./checkout.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Helmet from "../../assets/helmet/Helmet";
import { PayPalButton } from "react-paypal-button-v2";

import { ToastContainer, toast } from "react-toastify";

function Checkout(props) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const navigate = useNavigate();
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const [showPayPalButton, setShowPayPalButton] = useState(false);

  const formatNumberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleClick = (e) => {
    e.preventDefault();

    navigate("/thank-you");
    // console.log(credentials);
  };

  const handleSelect = (method) => {
    setSelectedPaymentMethod(method);
    if (method === "paypal") {
      setShowPayPalButton(true);
    } else {
      setShowPayPalButton(false);
    }
  };
  return (
    <Helmet title="Checkout">
      {/* <CommonSection title="Checkout" /> */}
      <section className="checkout__cart">
        <div lg="8" className="checkout__left">
          <h4 className="mb-4 fw-bold">Thông tin giao hàng</h4>
          <Form className="form__group">
            <FormGroup>
              <input type="text" placeholder="Họ và tên" />
            </FormGroup>

            <FormGroup
              className=""
              style={{
                display: "flex",
              }}
            >
              <input
                type="email"
                placeholder="Email"
                style={{
                  flex: 2,
                  marginRight: "10px",
                }}
              />
              <input
                type="number"
                placeholder="Số điện thoại"
                style={{
                  flex: 1,
                }}
              />
            </FormGroup>

            <FormGroup>
              <input type="text" placeholder="Địa chỉ" />
            </FormGroup>
            <FormGroup>
              <input type="text" placeholder="Postal code" />
            </FormGroup>
          </Form>
          <h4 className="mb-4 fw-bold">Phương thức vận chuyển</h4>
          <div className="checkout__transport">
            <i class="uil uil-truck"></i>
            <p>
              Vui lòng chọn tỉnh / thành để có danh sách phương thức vận chuyển.
            </p>
          </div>
          <h4 className="mb-4 fw-bold">Phương thức thanh toán</h4>
          <div className="payment__methods">
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="creditCard"
                onChange={() => handleSelect("creditCard")}
              />{" "}
              Thanh toán khi giao hàng (COD)
            </label>

            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="paypal"
                onChange={() => handleSelect("paypal")}
              />{" "}
              PayPal
            </label>
          </div>
          {showPayPalButton ? (
            <div
              className="paypal__container"
              style={{
                width: "100%",
                height: "165px",
                overflow: "hidden",
              }}
            >
              <PayPalButton
                amount="0.01"
                onSuccess={(details, data) => {
                  toast.success("Đã thêm vào giỏ thành công!");

                  navigate("/thank-you");
                  // Gọi đến server để lưu thông tin giao dịch (nếu cần)
                  // return fetch("/paypal-transaction-complete", {
                  //   method: "post",
                  //   body: JSON.stringify({
                  //     orderID: data.orderID,
                  //   }),
                  // });
                }}
              />
            </div>
          ) : (
            ""
          )}{" "}
          <button className="buy__btn auth__btn w-100" onClick={handleClick}>
            Hoàn thành hóa đơn
          </button>
        </div>
        <Col lg="4">
          <div className="checkout__cart1">
            <div className="checkout__total">
              <h6>Total Qty: </h6>
              <span>
                {totalQuantity > 1
                  ? `${totalQuantity} items`
                  : `${totalQuantity} item`}
              </span>
            </div>
            <div className="checkout__total">
              <h6>Subtotal:</h6>
              <span>
                {formatNumberWithCommas(totalAmount)}{" "}
                <small
                  style={{
                    textDecoration: "underline",
                  }}
                >
                  đ
                </small>
              </span>
            </div>
            <div className="checkout__total">
              <h6>Shipping:</h6>
              <span>
                0{" "}
                <small
                  style={{
                    textDecoration: "underline",
                  }}
                >
                  đ
                </small>
              </span>
            </div>
            <h6>Free Shipping</h6>
            <hr />
            <div className="checkout__cost">
              <h4>Total Cost:</h4>
              <span>
                {formatNumberWithCommas(totalAmount)}{" "}
                <small
                  style={{
                    textDecoration: "underline",
                  }}
                >
                  đ
                </small>
              </span>
            </div>
          </div>
        </Col>
      </section>
    </Helmet>
  );
}

export default Checkout;
