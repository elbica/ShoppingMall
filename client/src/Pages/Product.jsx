import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Image from "../Components/Image";
import "../css/Product.css";

let models = [
    {
        src: "images/image.png",
        title: "test",
        price: 123,
        review: 12,
        width: 14,
    },
    {
        src: "images/image.png",
        title: "test",
        price: 123,
        review: 12,
        width: 14,
    },
    {
        src: "images/image.png",
        title: "test",
        price: 123,
        review: 12,
        width: 14,
    },
    {
        src: "images/image.png",
        title: "test",
        price: 123,
        review: 12,
        width: 14,
    },
    {
        src: "images/image.png",
        title: "test",
        price: 123,
        review: 12,
        width: 14,
    },
];
const Product = (props) => {
    return (
        <div className="product_box">
            <Image {...props}></Image>
            <div className="product_content">
                <p>{props.title}</p>
                <p>{props.price}</p>
                <p>{props.review}</p>
            </div>
        </div>
    );
};
export default () => {
    return (
        <div className="products">
            <div className="products_admin">
                <Link to="/admin">
                    <button>관리자 메뉴</button>
                </Link>
            </div>
            <div className="product_grid">
                {models.map((m, i) => {
                    return <Product {...m}></Product>;
                })}
            </div>
        </div>
    );
};
