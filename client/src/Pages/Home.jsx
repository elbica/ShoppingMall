import React from "react"
import "../css/Home.css"
import Image from "../Components/Image"
import HomeScroll from "../Components/HomeScroll"
import { Link } from "react-router-dom"
import styled from "styled-components"

const Griddiv = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  margin: 0 auto;
  width: 80vw;
  row-gap: 27px;
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
  height: 20vw;
  text-align: center;
  z-index: 1;
  font-size: 1rem;

  .exit {
    position: absolute;
    top: 5px;
    right: 10px;
    width: 1rem;
    height: 1rem;
    background-color: grey;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
`

export default function Home() {
  let gridImages = [
    { src: "images/image.png", title: "12", descript: "324", price: 10, width: 20 },
    { src: "images/image.png", title: "23", descript: "asd", price: 20, width: 20 },
    { src: "images/image.png", title: "34", descript: "sad", price: 30, width: 20 },
    { src: "images/image.png", title: "56", descript: "ds", price: 440, width: 20 },
    { src: "images/image.png", title: "78", descript: "we", price: 50, width: 20 },
    { src: "images/image.png", title: "78", descript: "we", price: 50, width: 20 },
  ]

  const handleCloseWelcome = (e) => {
    e.target.parentNode.style["display"] = "none"
    console.log()
  }

  return (
    <div className="home_total">
      <div className="home_images" style={{ position: "relative" }}>
        <HomeScroll></HomeScroll>
        <Welcome className="welcome">
          <div className="exit" onClick={handleCloseWelcome}>
            x
          </div>
          <h1 style={{ margin: "1vw auto 2vw auto" }}>Welcome!</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, animi voluptatem.
            Consequuntur voluptatibus at aperiam laboriosam quo illum, esse harum nulla atque nobis
            sint quibusdam voluptatum natus porro quis perspiciatis?
          </p>
          <Link>
            <ShopButton>Shop Now</ShopButton>
          </Link>
        </Welcome>
      </div>
      <Griddiv>
        {gridImages.map((g, i) => {
          return <Image {...g}></Image>
        })}
        <MoreBtn>Show More</MoreBtn>
      </Griddiv>
    </div>
  )
}
