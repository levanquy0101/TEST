import React, { useEffect, useState } from "react";
import products from "../../../assets/data/products";
import { motion } from "framer-motion";
import ProductSearch from "../productsearch/ProductSearch";
import { Link, unstable_HistoryRouter, useNavigate } from "react-router-dom";
import "./searchresults.css";

function SearchResults(props) {
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

  const [productsData, setProductsData] = useState(products);
  const [showMore, setShowMore] = useState(false);
  const [numberProducts, setNumberProducts] = useState(0);
  console.log("SearchResults", props.value);
  const navigate = useNavigate();
  const handleSearch = (e) => {
    let val = props.value;
    if (val) {
      const filteredProduct = products.filter((item) =>
        item.productName.toLowerCase().includes(val.toLowerCase())
      );
      setNumberProducts(filteredProduct.length);
      setProductsData(filteredProduct.slice(0, 4));
      setShowMore(filteredProduct.length > 4);
    } else {
      setProductsData([]);
      setShowMore(false);
    }
  };
  const handleProductClick = () => {
    navigate(`/search?value=${props.value}`);
    // Thực hiện chuyển hướng đến trang sản phẩm chi tiết
    // và truyền trạng thái isSearchVisible từ component cha
    props.onSearchVisible(false);
    // Đặt logic chuyển hướng tại đây (ví dụ: sử dụng react-router-dom)
  };

  useEffect(() => {
    handleSearch();
  }, [props.value]);
  return (
    <div className="wrapper__results">
      {productsData.length === 0 ? (
        <p
          className="text-center"
          style={{
            textAlign: "center",
            color: "gray",
          }}
        >
          Không có sản phẩm nào...
        </p>
      ) : (
        <>
          {productsData?.map((item, index) => {
            return (
              <>
                <div className="product__search">
                  <div className="container__left">
                    {" "}
                    <h3 className="product__name">
                      <Link
                        onClick={handleProductClick}
                        to={`/shop/${item.id}`}
                      >
                        {item.productName}
                      </Link>
                    </h3>
                    <div className="product__card-bottom">
                      <span className="price">
                        {formatNumberWithCommas(item.price)}{" "}
                        <small
                          style={{
                            textDecoration: " underline",
                          }}
                        >
                          đ
                        </small>
                        {item.onSale && (
                          <strike
                            style={{
                              marginLeft: "10px",
                            }}
                          >
                            {formatNumberWithCommas(
                              calculateOriginalPrice(
                                item.price,
                                randomPercentage
                              )
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
                      src={item.imgUrl}
                      alt="ẢNh LỖi"
                    />
                  </div>{" "}
                </div>
              </>
            );
          })}
        </>
      )}{" "}
      {showMore && (
        <button
          className="btn__search"
          style={{
            width: "100%",
            backgroundColor: "transparent",
            border: "none",
            fontSize: "17px",
            height: "30px",
          }}
          onClick={handleProductClick}
        >
          Xem thêm {numberProducts - 4} sản phẩm
        </button>
      )}
    </div>
  );
}

export default SearchResults;
