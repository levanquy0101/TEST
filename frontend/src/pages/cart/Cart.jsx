import React, { useEffect, useState } from "react";
import "./cart.css";

import { Col, Container, Row } from "reactstrap";
import tdImg from "../../assets/images/arm-chair-01.jpg";

import { cartActives } from "../../redux/slices/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Helmet from "../../assets/helmet/Helmet";

function Cart(props) {
  const [paymentUrl, setPaymentUrl] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  const totalAmounts = useSelector((state) => state.cart.totalAmount);

  const cartItems = useSelector((state) => state.cart.cartItem);

  const [totalAmount, setTotalAmount] = useState(totalAmounts);

  const getRandomPercentage = () => {
    return Math.floor(Math.random() * 41) + 10; // Tạo số ngẫu nhiên từ 10 đến 50
  };
  function calculateOriginalPrice(salePrice, discountPercentage) {
    // Chuyển tỷ lệ giảm giá từ phần trăm thành số thập phân
    const discountDecimal = discountPercentage / 100;

    // Tính giá gốc trước khi sale
    const originalPrice = salePrice / (1 - discountDecimal);

    // Làm tròn giá gốc về 2 chữ số thập phân (nếu cần)
    const roundedOriginalPrice = Math.round(originalPrice * 1) / 1;

    return roundedOriginalPrice;
  }
  const formatNumberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // const formattedPrice = formatNumberWithCommas(props.item.price);

  const randomPercentage = getRandomPercentage();

  useEffect(() => {
    window.scrollTo(0, 0);

    localStorage.setItem("cart", JSON.stringify(cartItems));
    setTotalAmount(
      cartItems.reduce(
        (acc, curr) => acc + Number(curr.price) * curr.quantity,
        0
      )
    );
  }, [cartItems]);
  /**
   * 
   * Redux Toolkit, một thư viện quản lý trạng thái phổ biến cho ứng dụng React.

    useSelector được sử dụng để truy xuất trạng thái từ Redux store trong các component React. Nó cho phép bạn chọn và lấy các giá trị từ store mà bạn quan tâm và sử dụng chúng trong component của mình.
   */
  const handlePayment = async () => {
    try {
      const response = await fetch("http://localhost:5000/create-payment-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error creating payment URL");
      }

      const responseData = await response.json();
      setPaymentUrl(responseData.paymentUrl);

      // Redirect the user to the payment URL
      window.location.href = responseData.paymentUrl;
    } catch (error) {
      console.error("Error creating payment URL:", error);
    }
  };
  return (
    <Helmet title="Cart">
      {/* <CommonSection title="Shopping Cart" /> */}
      <section className="cart__wrapper" style={{ top: "10px" }}>
        <div className="cart__detail">
          <h4 className="cart__title">Giỏ hàng của bạn</h4>

          {cartItems.length === 0 ? (
            <span className="cart__subtitle">Giỏ hàng của bạn đang trống</span>
          ) : (
            <>
              <span className="cart__subtitle">
                Bạn đang có <strong>{totalQuantity} sản phẩm</strong> trong giỏ
                hàng
              </span>
              <table className="table bordered">
                <thead>
                  <tr>
                    <th>Ảnh </th>
                    <th>Tên sản phẩm</th>
                    <th>Giá</th>
                    <th>Số lượng</th>
                    <th>Xóa</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, index) => (
                    <Tr item={item} key={index}></Tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>

        <div lg="3" className="oder__summary">
          <div>
            <h4 className="cart__title">Thông tin đơn hàng</h4>
            <div className="summary__total">
              <span
                className="d-flex align-items-center"
                style={{ fontSize: "18px" }}
              >
                Tổng tiền:
              </span>
              <span className="cart__total">
                {formatNumberWithCommas(totalAmount ?? 0)}
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
          <p>Phí vận chuyển sẽ được tính ở trang thanh toán.</p>
          <p>Bạn cũng có thể nhập mã giảm giá ở trang thanh toán.</p>

          <div className="cart__btn">
            <div>
              <button className="buy__btn lg-7">
                <Link to="/shop">Tiếp tục mua sắm</Link>
              </button>
            </div>

            <div
              style={{
                marginLeft: "20px",
              }}
            >
              <button
                className="buy__btn"
                style={{
                  backgroundColor: "#333",
                }}
                onClick={handlePayment}
              >
                <Link to="/checkout">Thanh toán</Link>
              </button>
            </div>
          </div>
        </div>
      </section>
    </Helmet>
  );
}
const Tr = ({ item }) => {
  const dispatch = useDispatch();
  const deleteProduct = () => {
    dispatch(cartActives.deleteItem(item.id));
  };
  return (
    <tr>
      <td>
        <img src={item.imgUrl} />
      </td>
      <td>{item.productName}</td>
      <td>
        {item.price}{" "}
        <small
          style={{
            textDecoration: "underline",
          }}
        >
          đ
        </small>
      </td>
      <td>{item.quantity} px</td>
      <td onClick={deleteProduct}>
        <i class="uil uil-trash"></i>
      </td>
    </tr>
  );
};

export default Cart;
