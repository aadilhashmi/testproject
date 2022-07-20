import React, { useState, useEffect } from "react";
import axios from "axios";
import "./FetchScrollData.css";

export const FetchScrollData = () => {
  const [productInfo, setProductInfo] = useState([]);
  const productsData = async () => {
    const result = await axios("https://dummyjson.com/products");
    const {
      data: { products },
    } = result;
    // console.log("products call", result.products);
    setProductInfo(products);
  };
  const handleScrollEvent = () => {
    let userScrollHeight = window.innerHeight + window.scrollY;
    let windowBottomHeight = document.documentElement.offsetHeight;
    if (userScrollHeight >= windowBottomHeight) {
      productsData();
    }
  };
  useEffect(() => {
    productsData();
    window.addEventListener("scroll", handleScrollEvent);
  }, []);
  return (
    <>
      <div className="products_wrapper">
        {productInfo.length > 0 &&
          productInfo.map((item) => (
            <div className="wrapper" key={item.id}>
              <div>
                <img className="product_img" src={item.thumbnail} alt="" />
                <p className="product_title">{item.title}</p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};
