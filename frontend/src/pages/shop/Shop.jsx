import React, { useEffect, useState } from "react";
import "./shop.css";
import { Col, Container, Row } from "reactstrap";
import Helmet from "../../assets/helmet/Helmet";
import products from "../../assets/data/products";
import bannershop from "../../assets/images/bannershop.jpg";
import { Link, useParams } from "react-router-dom";
import ProductItem from "../../components/UI/productitem/ProductItem";
// import ProductItem from "../../components/UI/productitem/ProductItem";

function Shop(props) {
  const { category } = useParams();

  console.log("HHH", category);

  const [productsData, setProductsData] = useState(products);
  const [search, setSearch] = useState("");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filterProductsByCategory = (category, products) => {
    if (!category) {
      return products;
    }

    const lowerCaseCategory = category.toLowerCase();

    switch (lowerCaseCategory) {
      case "sofa-ghe":
        return products;
      case "ghe":
        return products.filter(
          (product) => product.category.toLowerCase() === "chair"
        );
      case "sale":
        return products.filter((product) => product.onSale === true);
      default:
        return products.filter(
          (product) =>
            product.productName.toLowerCase().includes(lowerCaseCategory) ||
            product.category.toLowerCase().includes(lowerCaseCategory)
        );
    }
  };
  useEffect(() => {
    const filteredProducts = filterProductsByCategory(category, products);
    setProductsData(filteredProducts);
  }, [category, products]);
  // useEffect(() => {
  //   // Nếu category tồn tại, lọc danh sách sản phẩm theo điều kiện
  //   if (category) {
  //     let filteredProducts;

  //     if (category.toLowerCase() === "sofa-ghe") {
  //       // Nếu category là 'sofa-ghe', hiển thị tất cả sản phẩm
  //       filteredProducts = products;
  //     } else if (category.toLowerCase() === "ghe") {
  //       // Nếu category là 'ghe', hiển thị sản phẩm có category là 'chair'
  //       filteredProducts = products.filter(
  //         (product) => product.category.toLowerCase() === "chair"
  //       );
  //     } else if (category.toLowerCase() === "sale") {
  //       // Nếu category là 'ghe', hiển thị sản phẩm có category là 'chair'
  //       filteredProducts = products.filter(
  //         (product) => product.onSale === true
  //       );
  //     } else {
  //       // Ngược lại, lọc theo điều kiện thông thường
  //       filteredProducts = products.filter(
  //         (product) =>
  //           product.productName
  //             .toLowerCase()
  //             .includes(category.toLowerCase()) ||
  //           product.category.toLowerCase().includes(category.toLowerCase())
  //       );
  //     }

  //     setProductsData(filteredProducts);
  //   } else {
  //     // Nếu category không tồn tại, hiển thị tất cả sản phẩm
  //     setProductsData(products);
  //   }
  // }, [category, products]);

  const handleFilter = (e) => {
    let val = e.target.value;
    let sortedProducts;

    switch (val) {
      case "tang":
        sortedProducts = [...productsData].sort((a, b) => a.price - b.price);
        break;
      case "giam":
        sortedProducts = [...productsData].sort((a, b) => b.price - a.price);
        break;
      case "a-z":
        sortedProducts = [...productsData].sort((a, b) =>
          a.productName.toLowerCase().localeCompare(b.productName.toLowerCase())
        );
        break;
      case "z-a":
        sortedProducts = [...productsData].sort((a, b) =>
          b.productName.toLowerCase().localeCompare(a.productName.toLowerCase())
        );
        break;
      case "all":
      default:
        sortedProducts = [...productsData];
        break;
    }

    setProductsData(sortedProducts);
  };

  const handleSearch = (e) => {
    let val = e.target.value;
    if (val) {
      const filteredProduct = products.filter((item) =>
        item.productName.toLowerCase().includes(val.toLowerCase())
      );
      setProductsData(filteredProduct);
    } else {
      setProductsData(products);
    }
  };
  return (
    <Helmet title="Shop">
      {/* <CommonSection title="Products"></CommonSection> */}
      <section className="collection__wrapper">
        <div className="collection__filter">
          <h3 className="subtitle">Danh mục sản phẩm</h3>
          <div className="filter__category">
            <ul className="tree__menu">
              <li>
                <a href="">Sản phẩm mới</a>
              </li>{" "}
              <li>
                <Link to="/collections/sale">Sản phẩm khuyến mãi</Link>
              </li>
            </ul>
            <h3 className="subtitle">Nhà cung cấp</h3>
            <ul className="tree__menu">
              <li>
                <input type="checkbox" name="" id="" />
                <a href="">BLACK-&-WHITE</a>
              </li>{" "}
              <li>
                <input type="checkbox" name="" id="" />
                <a href="">VICTORIA</a>
              </li>{" "}
              <li>
                <input type="checkbox" name="" id="" />
                <a href="">FLORAL</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="collection__content">
          <div className="collection__img">
            <img src={bannershop} alt="" />
          </div>
          <div className="header__section">
            <div className="header__left">
              <h2
                className="section__title"
                style={{
                  color: "#c31425",
                }}
              >
                Tất cả sản phẩm
              </h2>
              <p>{productsData.length} Sản phẩm</p>
            </div>
            <div className="filter__widget">
              <select onChange={handleFilter}>
                <option>Sắp xếp</option>{" "}
                <option value="all">Tất cả sản phẩm</option>
                <option value="tang">Giá: Tăng dần</option>
                <option value="giam">Giá: Giảm dần</option>
                <option value="a-z">Tên: A-Z</option>{" "}
                <option value="z-a">Tên: Z-A</option>
              </select>
            </div>
          </div>
          <div className="all__products">
            {productsData.map((item, index) => {
              return <ProductItem item={item} key={index} />;
            })}
          </div>
        </div>
      </section>
    </Helmet>
  );
}

export default Shop;
