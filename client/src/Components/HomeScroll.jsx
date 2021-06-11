import React, { useState, useEffect } from "react"
import Image from "./Image"
import "../css/HomeScroll.css"

let imgs = [
  { src: "images/image.png", title: "12", descript: "324", price: 10, width: "25vw" },
  { src: "images/image.png", title: "23", descript: "asd", price: 20, width: "25vw" },
  { src: "images/image.png", title: "34", descript: "sad", price: 30, width: "25vw" },
  { src: "images/image.png", title: "56", descript: "ds", price: 440, width: "25vw" },
  { src: "images/image.png", title: "78", descript: "we", price: 50, width: "25vw" },
]
const ScrollImg = (props) => {
  const overEvent = () => {}
  return (
    <div
      className="scroll_imgs"
      style={{
        width: "220vw",
        position: "relative",
        left: -33 * props.num + "vw",
        transition: "0.5s all",
      }}
    >
      {imgs.map((img, i) => {
        return (
          <div style={{ display: "inline-block", position: "relative" }}>
            <div
              className="image"
              style={{
                display: "inline-block",
                margin: "0 1.5vw",
                border: "2px solid gray",
                padding: "5px",
                boxShadow: "6px 9px 18px rgba(50,50,93,0.4)",
              }}
            >
              <Image {...img} />
            </div>
          </div>
        )
      })}
    </div>
  )
}
export default function HomeScroll(props) {
  const [posi, setPosi] = useState(0)

  return (
    <div
      className="set_overflow"
      style={{ overflowX: "hidden", height: "100vh", width: "92vw", margin: "0 auto" }}
    >
      <ScrollImg num={posi} />
      <ScrollBtns setPosi={setPosi} />
    </div>
  )
}

function ScrollBtns(props) {
  return (
    <div className="btns">
      <button onClick={() => props.setPosi(0)}>0</button>
      <button onClick={() => props.setPosi(1)}>1</button>
      <button onClick={() => props.setPosi(2)}>2</button>
      <button onClick={() => props.setPosi(3)}>3</button>
    </div>
  )
}
