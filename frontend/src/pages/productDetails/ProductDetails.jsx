import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./productdetails.css";
import products from "../../assets/data/products";

// import CommonSection from "../../components/UI/commonsection/CommonSection";
import { Container, Row, Col, NavLink } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";

import { useDispatch } from "react-redux";
import { cartActives } from "../../redux/slices/cartSlice";
import Helmet from "../../assets/helmet/Helmet";
import ProductsList from "../../components/UI/producslist/ProductsList";
function ProductDetails(props) {
  const getRandomPercentage = () => {
    return Math.floor(Math.random() * 41) + 10; // Tạo số ngẫu nhiên từ 10 đến 50
  };
  function calculateOriginalPrice(salePrice, discountPercentage) {
    // Chuyển tỷ lệ giảm giá từ phần trăm thành số thập phân
    const discountDecimal = discountPercentage / 100;

    // Tính giá gốc trước khi sale
    const originalPrice = salePrice / (1 - discountDecimal);

    // Làm tròn giá gốc về 2 chữ số thập phân (nếu cần)
    const roundedOriginalPrice = Math.round(originalPrice * 100) / 100;

    return roundedOriginalPrice;
  }
  const formatNumberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // const formattedPrice = formatNumberWithCommas(props.item.price);

  const randomPercentage = getRandomPercentage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [tab, setTab] = useState("desc");
  const [rating, setRating] = useState(null);

  const reviewUser = useRef(null);
  const reviewMsg = useRef("");
  const dispatch = useDispatch();
  const { id } = useParams();

  const product = products.find((product) => product.id === id);

  console.log(product);

  const {
    imgUrl,
    productName,
    description,
    price,
    avgRating,
    shortDesc,
    reviews,
    category,
    src,
  } = product;

  const relatedProducts = products.filter((item) => item.category === category);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    {
      setQuantity(1);
    }
  }, [product]);

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setQuantity(isNaN(value) ? 1 : value);
  };

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
  };

  const submitHandle = (e) => {
    e.preventDefault();

    const reviewUserValue = reviewUser.current.value;
    const reviewMsgValue = reviewMsg.current.value;

    const reviewObj = {
      userName: reviewUserValue,
      text: reviewMsgValue,
      rating,
    };

    toast.success("Review submited");
    console.log(reviewUserValue, reviewMsgValue, rating);
  };
  const addToCart = () => {
    dispatch(
      cartActives.addItem({
        id,
        productName,
        imgUrl,
        price,
        quantity,
      })
    );
    toast.success("Đã thêm vào giỏ thành công!");
  };

  const [currentImage, setCurrentImage] = useState(imgUrl);
  const [activeThumbIndex, setActiveThumbIndex] = useState(0);

  const handleThumbHover = (image, index) => {
    setCurrentImage(image);
    setActiveThumbIndex(index);
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    setCurrentImage(imgUrl);

    setActiveThumbIndex(0);
  }, [id]);
  return (
    <Helmet title={productName}>
      <div className="detail__main">
        <section className="detail__container" style={{ top: "-10px" }}>
          <div className="detail__left">
            <div className="detail__img">
              <img src={currentImage} />
            </div>
            <div className="product__details">
              <h2>{productName}</h2>
              <div className="product__rating ">
                <div>
                  <span>
                    <i class="uil uil-star"></i>
                  </span>
                  <span>
                    <i class="uil uil-star"></i>
                  </span>
                  <span>
                    <i class="uil uil-star"></i>
                  </span>
                  <span>
                    <i class="uil uil-star"></i>
                  </span>
                  <span>
                    <i class="uil uil-star"></i>
                  </span>
                </div>
                <p>
                  (<span>{avgRating}</span> ratings)
                </p>
              </div>
              <div className="price__category">
                <span className="product__price">
                  {" "}
                  {formatNumberWithCommas(price)}{" "}
                  <small
                    style={{
                      textDecoration: " underline",
                    }}
                  >
                    đ
                  </small>
                </span>
                <span className="category">
                  Category: {category.toUpperCase()}
                </span>
              </div>
              <p className="shortDesc" style={{ marginTop: "10px" }}>
                {shortDesc}
              </p>
              {/*  */}
              <div className="quantity-container">
                <button className="quantity-btn" onClick={decreaseQuantity}>
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={handleQuantityChange}
                />
                <button className="quantity-btn" onClick={increaseQuantity}>
                  +
                </button>
              </div>
              {/*  */}
              <button className="buy__btn" onClick={addToCart}>
                Add to cart
              </button>{" "}
              <div className="social__media">
                <h4>Chia sẻ :</h4>{" "}
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
              <div className="service__policy">
                <div className="box">
                  <i class="uil uil-shield-check"></i>
                  <p>1 Năm Bảo Hành</p>
                </div>
                <div
                  className="box"
                  style={{
                    width: "43%",
                  }}
                >
                  <i class="uil uil-refresh"></i>
                  <p>
                    Hỗ trợ đổi trong 3 ngày không cần lý do (Áp dụng cho sản
                    phẩm nguyên giá)
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="thumb">
            {src.map((image, index) => {
              return (
                <img
                  key={index}
                  src={image}
                  onMouseEnter={() => handleThumbHover(image, index)}
                  className={`thumb ${
                    index === activeThumbIndex ? "active" : ""
                  }`}
                />
              );
            })}
          </div>
        </section>

        <section className="desc__reviews">
          <Row>
            <Col lg="12">
              <div className="tab__wrapper d-flex align-items-center gap-5">
                <h5
                  className={`${tab === "desc" ? "active__tab" : ""}`}
                  onClick={() => setTab("desc")}
                >
                  Description
                </h5>
                <h6
                  className={`${tab === "rev" ? "active__tab" : ""}`}
                  onClick={() => setTab("rev")}
                >
                  Reviews ({reviews.length})
                </h6>
              </div>
              {tab === "desc" ? (
                <div className="tab__content mt-4">
                  <p>{description}</p>
                </div>
              ) : (
                <div className="product__review">
                  <div className="reviews__wrapper">
                    <ul>
                      {reviews?.map((item, index) => (
                        <li key={index} className="mt-4">
                          <h6>John</h6>

                          <span>{item.rating} ( rating)</span>
                          <p>{item.text}</p>
                        </li>
                      ))}
                    </ul>

                    <div className="review__form">
                      <h4>Leave your experience</h4>
                      <form
                        action="
                      "
                        onSubmit={submitHandle}
                      >
                        <div className="form__group">
                          <input
                            type="text"
                            placeholder="Enter your name"
                            ref={reviewUser}
                            required
                          />
                        </div>
                        <div className="form__group rating__group">
                          <span
                            onClick={() => {
                              setRating(1);
                            }}
                          >
                            1<i class="ri-star-fill"></i>
                          </span>
                          <span
                            onClick={() => {
                              setRating(2);
                            }}
                          >
                            2<i class="ri-star-fill"></i>
                          </span>
                          <span
                            onClick={() => {
                              setRating(3);
                            }}
                          >
                            3<i class="ri-star-fill"></i>
                          </span>
                          <span
                            onClick={() => {
                              setRating(4);
                            }}
                          >
                            4<i class="ri-star-fill"></i>
                          </span>
                          <span
                            onClick={() => {
                              setRating(5);
                            }}
                          >
                            5<i class="ri-star-fill"></i>
                          </span>
                        </div>
                        <div className="form__group">
                          <textarea
                            role={4}
                            type="text"
                            placeholder="Enter message..."
                            ref={reviewMsg}
                            required
                          />
                        </div>
                        <button
                          type="submit"
                          className="buy__btn"
                          onClick={submitHandle}
                        >
                          Submit
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              )}
            </Col>
            <Col lg="12" className="mt-4">
              <h2
                className="related__title "
                style={{
                  marginLeft: "550px",
                  fontSize: "22px",
                }}
              >
                Sản phẩm tương tự
              </h2>
              <Row className="list__products">
                <ProductsList data={relatedProducts}></ProductsList>
              </Row>
            </Col>
          </Row>
        </section>
      </div>
      {/* <CommonSection title={productName} /> */}
    </Helmet>
  );
}

export default ProductDetails;
