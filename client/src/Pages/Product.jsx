import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Image from "../Components/Image"
import axios from "axios"
import "../css/Product.css"

let models = [
  {
    src: "images/image.png",
    title: "test",
    price: 123,
    review: 12,
    width: 14,
  },
]
const Product = (props) => {
  return (
    <div className="product_box">
      <Image {...props}></Image>
      <div className="product_content">
        <p>{props.product_title}</p>
        <p>{props.product_price}</p>
        {/* <p>{props.review}</p> */}
      </div>
    </div>
  )
}
export default () => {
  const [Images, setImages] = useState([
    {
      file_name: "image.png",
      product_title: "12",
      product_descript: "324",
      product_price: 10,
      product_id: 1,
    },
  ])

  useEffect(async () => {
    let temp = []
    await axios.get("/product").then((res) => {
      temp = res.data
    })
    for (let i = temp.length; i < 6; i++)
      temp.push({
        file_name: "image.png",
        product_title: "12",
        product_descript: "324",
        product_price: 10,
        product_id: 1,
      })
    setImages(temp)
  }, [])

  return (
    <div className="products">
      <div className="products_admin">
        <Link to="/admin">
          <button>관리자 메뉴</button>
        </Link>
      </div>
      <div className="product_grid">
        {Images.map((m, i) => {
          let temp = JSON.parse(JSON.stringify(m))
          temp["width"] = 14
          temp["file_name"] = "http://localhost:5000/upload/" + temp["file_name"]

          return <Product {...temp}></Product>
        })}
      </div>
    </div>
  )
}
