import React from "react";
import productImg from "../../../assets/images/arm-chair-01.jpg";
import { Col } from "reactstrap";
import "./productcard.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import saleImg from "../../../assets/images/sale.jpg";
import { useDispatch } from "react-redux";
import { cartActives } from "../../../redux/slices/cartSlice";

import { ToastContainer, toast } from "react-toastify";
function ProductCard(props) {
  const dispatch = useDispatch();
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

  const formattedPrice = formatNumberWithCommas(props.item.price);

  const randomPercentage = getRandomPercentage();
  const addToCart = () => {
    dispatch(
      cartActives.addItem({
        id: props.item.id,
        productName: props.item.productName,
        imgUrl: props.item.imgUrl,
        price: props.item.price,
        quantity: 1,
      })
    );
    toast.success("Đã thêm vào giỏ thành công!");
  };
  return (
    <Col lg="3" md="4" className="mb-2">
      <div className="product__item">
        <div className="product__img">
          <motion.img
            whileHover={{ scale: 0.9 }}
            src={props.item.imgUrl}
            alt="ẢNh LỖi"
          />
          {props.item.onSale && (
            <span className="onsale">Sale {randomPercentage}%</span>
          )}
          <div className="product__shortDesc">{props.item.shortDesc}</div>
        </div>{" "}
        <div className="img__sale">
          <img src={saleImg} alt="" />
        </div>
        <p
          className="product__category text-center"
          style={{ textAlign: "center" }}
        >
          {props.item.category}
        </p>
        <div className="p-2">
          {" "}
          <h3 className="product__name">
            <Link to={`/shop/${props.item.id}`}>{props.item.productName}</Link>
          </h3>
        </div>
        <div className="product__card-bottom">
          <span className="price">
            {formattedPrice}{" "}
            <small
              style={{
                textDecoration: " underline",
              }}
            >
              đ
            </small>
            {props.item.onSale && (
              <strike
                style={{
                  marginLeft: "10px",
                }}
              >
                {formatNumberWithCommas(
                  calculateOriginalPrice(props.item.price, randomPercentage)
                )}{" "}
                <small
                  style={{
                    textDecoration: "underline",
                  }}
                >
                  đ
                </small>
              </strike>
            )}
          </span>
          <button className="btn__buy" onClick={addToCart}>
            THÊM VÀO GIỎ
            <div>
              <i class="uil uil-shopping-bag"></i>
            </div>
          </button>
        </div>
      </div>
    </Col>
  );
}

export default ProductCard;
