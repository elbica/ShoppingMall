import React, { useState, useEffect } from "react"
import Image from "./Image"
import "../css/HomeScroll.css"

let imgs = [
  { src: "images/image.png", title: "12", descript: "324", price: 10, width: 25 },
  { src: "images/image.png", title: "23", descript: "asd", price: 20, width: 25 },
  { src: "images/image.png", title: "34", descript: "sad", price: 30, width: 25 },
  { src: "images/image.png", title: "56", descript: "ds", price: 440, width: 25 },
  { src: "images/image.png", title: "78", descript: "we", price: 50, width: 25 },
]
const ScrollImg = (props) => {
  return (
    <div
      className="scroll_imgs"
      style={{
        width: "220vw",
        position: "relative",
        left: -26.5 * props.num + "vw",
        transition: "0.5s all",
      }}
    >
      {imgs.map((img, i) => {
        img["version"] = 1
        console.log(img)
        return (
          <div key={i} style={{ display: "inline-block", position: "relative" }}>
            <div
              className="image"
              style={{
                backgroundColor: "white",
                display: "inline-block",
                margin: "0 1.5vw",
                border: "1.25px solid lightgray",
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
  const handlePosi = (i) => {
    if (i == -1 && posi > 0) setPosi(posi - 1)
    else if (i == 4 && posi < 3) setPosi(posi + 1)
    else if (i >= 0 && i <= 3) setPosi(i)
  }
  const btnsStyle = {
    width: "150px",
    margin: "10px auto",
    position: "relative",
  }
  const btnStyle = {
    width: "8px",
    height: "8px",
    borderRadius: "4px",
    backgroundColor: "gray",
    border: "none",
    margin: "5px 10px",
  }
  return (
    <div
      className="set_overflow"
      style={{
        overflow: "hidden",
        width: "92vw",
        margin: "0 auto",
        paddingTop: "140px",
      }}
    >
      <ScrollImg num={posi} />
      <div className="btns" style={btnsStyle}>
        <button onClick={() => handlePosi(-1)}>{"<"}</button>
        <button onClick={() => handlePosi(0)} style={{ backgroundColor: "black" }}></button>
        <button onClick={() => handlePosi(1)} style={{ backgroundColor: "gray" }}></button>
        <button onClick={() => handlePosi(2)} style={{ backgroundColor: "lightgray" }}></button>
        <button onClick={() => handlePosi(3)} style={{ backgroundColor: "grey" }}></button>
        <button onClick={() => handlePosi(4)}>{">"}</button>
      </div>
    </div>
  )
}
