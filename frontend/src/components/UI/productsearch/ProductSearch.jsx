import React from "react";
import "./productsearch.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
function ProductSearch(props) {
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
  return (
    <>
      <div className="product__search">
        <div className="container__left">
          {" "}
          <h3 className="product__name">
            <Link to={`/shop/${props.item.id}`}>{props.item.productName}</Link>
          </h3>
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
          </div>
        </div>
        <div className="product__img">
          <motion.img
            whileHover={{ scale: 0.9 }}
            src={props.item.imgUrl}
            alt="ẢNh LỖi"
          />
        </div>{" "}
      </div>
    </>
  );
}

export default ProductSearch;
