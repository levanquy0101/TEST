import React from "react";
import ProductCard from "../productcard/ProductCard.jsx";

function ProductsList(props) {
  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        flexWrap: "wrap",
      }}
    >
      {props.data?.map((item, index) => (
        <ProductCard item={item} key={index} />
      ))}
    </div>
  );
}

export default ProductsList;
