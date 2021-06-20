import React, { useState, useEffect } from "react"
import "../css/Home.css"
import Image from "../Components/Image"
import HomeScroll from "../Components/HomeScroll"
import { Link } from "react-router-dom"
import styled from "styled-components"
import axios from "axios"
const Griddiv = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  margin: 0 auto;
  width: 80vw;
  row-gap: 25px;
  padding-top: 80px;
`
const ShopButton = styled.button`
  background-color: #df431c;
  color: white;
  font-size: 1rem;
  /* padding: 0 30px; */
  border-radius: 0.5vw;
  width: 12vw;
  height: 3vw;
  border: 1px solid white;
  cursor: pointer;
  margin-top: 2vw;
`

const MoreBtn = styled.button`
  background-color: white;
  color: #ce583b;
  font-size: 1.2rem;
  font-weight: bold;
  /* padding: 0 30px; */
  width: 18vw;
  height: 4vw;
  border-radius: 0.5vw;
  border: 1.2px solid #ce583b;
  cursor: pointer;
  margin: 0 auto 30px auto;
  transition: 0.5s all;
  box-shadow: 3px 3px 9px rgb(0, 0, 0, 0.4);
  will-change: content;
  &:hover {
    transform: scale(1.1);
  }
`

const Welcome = styled.div`
  transition: 0.5s all;
  position: absolute;
  bottom: 0vw;
  left: 12vw;
  opacity: 0.8;
  background-color: white;
  width: 30vw;
  height: 30vh;
  padding: 10px;
  text-align: center;
  z-index: 1;
  font-size: 1rem;

  .exit {
    position: absolute;
    top: 5px;
    right: 10px;
    width: 1.1rem;
    height: 1.1rem;
    /* background-color: grey; */
    display: flex;
    color: #707070;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
`

export default function Home() {
  const [gridImages, setImages] = useState([
    {
      file_name: "image.png",
      product_title: "12",
      product_descript: "324",
      product_price: 10,
      product_id: 1,
    },
  ])

  const handleCloseWelcome = (e) => {
    e.target.parentNode.style["display"] = "none"
    console.log()
  }
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
    <div className="home_total">
      <div className="home_images" style={{ position: "relative" }}>
        <HomeScroll className="home_image"></HomeScroll>
        <Welcome className="welcome">
          <div className="exit" onClick={handleCloseWelcome}>
            X
          </div>
          <h1 style={{ margin: "1vw auto 2vw auto" }}>Welcome!</h1>
          <p>
            ELBI에 오신 것을 환영합니다! ELBI는 사용자 친화적인, 사용자만을 위한 토탈 쇼핑몰입니다.
          </p>
          <Link to="/product">
            <ShopButton>Shop Now</ShopButton>
          </Link>
        </Welcome>
      </div>
      <Griddiv>
        {gridImages.map((g, i) => {
          let temp = JSON.parse(JSON.stringify(g))
          temp["width"] = 20
          temp["file_name"] = "http://localhost:5000/upload/" + temp["file_name"]
          return <Image key={i} {...temp}></Image>
        })}
        <Link to="/product">
          <MoreBtn>Show More</MoreBtn>
        </Link>
      </Griddiv>
    </div>
  )
}
