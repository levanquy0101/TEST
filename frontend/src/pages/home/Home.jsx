import React, { useEffect, useState } from "react";
import Helmet from "../../assets/helmet/Helmet";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import heroImg from "../../assets/images/hero-img.png";
import heroImg1 from "../../assets/images/counter-timer-img.png";
import heroImg2 from "../../assets/images/double-sofa-01.png";
import "./home.css";
import countImage from "../../assets/images/counter-timer-img.png";
import Services from "../../components/services/Servces";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import banner01 from "../../assets/images/banner01.png";
import banner02 from "../../assets/images/banner05.jpg";
import banner03 from "../../assets/images/banner06.jpg";
import banner04 from "../../assets/images/banner07.jpg";
import bannerleft from "../../assets/images/bannerleft.jpg";

import ProductsList from "../../components/UI/producslist/ProductsList";
import products from "../../assets/data/products";
import handleScroll from "../../feature/handleScroll";
import Clock from "../../components/UI/clock/Clock";
import ProductSpecial from "../../components/UI/productspecical/ProductSpecial";

const slideData = [
  {
    image: banner01,
    alt: "Slide 1",
  },
  {
    image: banner02,
    alt: "Slide 2",
  },
  {
    image: banner03,
    alt: "Slide 3",
  },
  {
    image: banner04,
    alt: "Slide 4",
  },
];
const SampleNextArrow = (props) => {
  const { onClick } = props;
  // console.log(props.onClick);
  return (
    <div className="control-btn" onClick={onClick}>
      <button className="next">
        <i class="uil uil-angle-right"></i>{" "}
      </button>
    </div>
  );
};
const SamplePrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="control-btn" onClick={onClick}>
      <button className="prev">
        <i class="uil uil-angle-left"></i>{" "}
      </button>
    </div>
  );
};

function Home(props) {
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [bestSalesProducts, setBestSalesProducts] = useState([]);

  useEffect(() => {
    const filteredProducts = products.filter(
      (item) => item.category === "chair"
    );

    const filteredBestSalesProducts = products.filter(
      (item) => item.category === "sofa"
    );
    setBestSalesProducts(filteredBestSalesProducts);
    setTrendingProducts(filteredProducts);
  }, []);
  const year = new Date().getFullYear();
  // const [images, setImages] = useState([heroImg, heroImg1, heroImg2]);
  // const [currentIndex, setCurrentIndex] = useState(0);
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentIndex((preIndex) =>
  //       preIndex === images.length - 1 ? 0 : preIndex + 1
  //     );
  //   }, 5000);
  //   console.log("Image", currentIndex);
  //   return () => clearInterval(interval);
  // }, [currentIndex, images.length]);
  let height = document.body.scrollHeight;
  const [scrollY, setHeight] = useState(height);
  window.addEventListener("scroll", () => {
    setHeight(document.body.scrollHeight);
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    handleScroll();

    // document.header.className = icon;
  }, [scrollY]);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <Helmet title="Home">
      <section className="hero__section" id="home">
        <div className="container__banner">
          <Slider {...settings}>
            {slideData.map((slide, index) => (
              <div key={index}>
                <img
                  style={{
                    width: "100%",
                    backgroundSize: "contain",
                    objectFit: "cover",
                  }}
                  src={slide.image}
                  alt={slide.alt}
                />
              </div>
            ))}
          </Slider>{" "}
        </div>{" "}
        {/* 
    
    */}{" "}
      </section>
      <div
        className=""
        style={{
          height: "100px",
        }}
      ></div>
      <div className="wrapper__services">
        <Services />
      </div>
      <section className="trending__products">
        <div className="header__section">
          <div class="loader"></div>
          <h2 className="section__title">Sản phẩm xu hướng</h2>
        </div>
        <ProductsList data={trendingProducts} />
        <div
          className=""
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "93%",
          }}
        >
          <button className="buy__btn store__btn">
            <Link to="/shop">Xem tất cả </Link>
          </button>
        </div>
      </section>
      <section className="timer__count hidden">
        <Col lg="6" md="6">
          <div className="clock__top__content">
            <h4 className="text-white fs-6 mb-2">Limited Offers</h4>
            <h3 className="text-white fs-5 mb-3">Quality Armchair</h3>
          </div>
          <Clock />
          <button
            className="buy__btn store__btn"
            style={{
              background: "linear-gradient(to bottom right, #f42f8a, #159245)",
            }}
          >
            <Link to="/shop">Xem thêm</Link>
          </button>
          {/* <img src={countImage} alt="" /> */}
        </Col>
        <Col lg="6" md="6" className="text-end">
          <img src={heroImg} alt="" />
        </Col>
      </section>
      <section className="special__products">
        <div className="header__section">
          <h2
            className="section__title"
            style={{
              color: "#c31425",
            }}
          >
            Sản phẩm nổi bật
          </h2>
        </div>
        <div className="special__container">
          <div className="banner__left">
            <img src={bannerleft} alt="" />
          </div>
          <div
            className="container__products"
            style={{
              display: "flex",
              gap: "20px",
              flexWrap: "wrap",
            }}
          >
            {bestSalesProducts.map((item, index) => {
              return <ProductSpecial item={item} key={index} />;
            })}
          </div>
        </div>
      </section>{" "}
      <section className="inspiration__corner hidden">
        <div className="corner__img">
          <div class="grid-item one">
            <img
              src="https://images.pexels.com/photos/6186504/pexels-photo-6186504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Image 1"
            />
          </div>
          <div class="grid-item">
            <img
              src="https://images.pexels.com/photos/7512032/pexels-photo-7512032.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Image 2"
            />
          </div>
          <div class="grid-item three">
            <img
              src="https://images.pexels.com/photos/6077454/pexels-photo-6077454.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Image 3"
            />
          </div>
        </div>
        <div className="corner__text">
          {" "}
          <div className="header__conner">
            <h2 className="section__title" style={{}}>
              Tầm Quan Trọng Của Thiết Kế Nội Thất Trong Cuộc Sống
            </h2>{" "}
            <p>
              Thiết kế nội thất có thể tạo ra không gian chia sẻ và tương tác,
              khuyến khích sự giao tiếp và kết nối gia đình. Khu vực sinh hoạt
              chung và bố trí nội thất có thể tạo ra không gian thoải mái cho
              việc chia sẻ thời gian và kinh nghiệm.Nhiều người sử dụng nội thất
              để tạo điểm nhấn nghệ thuật trong ngôi nhà của họ.
            </p>
            <div className="gist">
              <details>
                <summary>Tạo Ra Môi Trường Sống Thú Vị</summary>
                <p>
                  Thiết kế nội thất giúp tạo nên một không gian sống thú vị,
                  sáng tạo và phản ánh cá nhân. Sự sáng tạo trong thiết kế có
                  thể tạo ra không gian độc đáo, phản ánh gu thẩm mỹ và tâm hồn
                  của chủ nhân.
                </p>
              </details>{" "}
              <details>
                <summary>Tăng Cường Chất Lượng Cuộc Sống</summary>
                <p>
                  Một không gian sống được thiết kế tốt có thể tạo ra một môi
                  trường tích cực và thoải mái, góp phần nâng cao chất lượng
                  cuộc sống hàng ngày.
                </p>
              </details>{" "}
              <details>
                <summary>Tối Ưu Hóa Không Gian</summary>
                <p>
                  Thiết kế nội thất thông minh có thể tối ưu hóa không gian sử
                  dụng, đặc biệt quan trọng trong các căn hộ và nhà có diện tích
                  hạn chế.
                </p>
              </details>{" "}
              <details>
                <summary>Tạo Nên Phong Cách Sống</summary>
                <p>
                  Nhiều người sử dụng nội thất để tạo điểm nhấn nghệ thuật trong
                  ngôi nhà của họ.
                </p>
              </details>
            </div>
            <button className="buy__btn store__btn">
              <Link to="/shop">Xem thêm</Link>
            </button>
          </div>
        </div>
      </section>
    </Helmet>
  );
}

export default Home;
