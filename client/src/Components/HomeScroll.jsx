import React, { useState, useEffect } from "react"
import Image from "./Image"
import "../css/HomeScroll.css"
import axios from "axios"

const ScrollImg = (props) => {
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
    <div
      className="scroll_imgs"
      style={{
        width: "220vw",
        position: "relative",
        left: -26.5 * props.num + "vw",
        transition: "0.5s all",
      }}
    >
      {Images.map((img, i) => {
        let temp = JSON.parse(JSON.stringify(img))
        temp["width"] = 25
        temp["file_name"] = "http://localhost:5000/upload/" + temp["file_name"]
        temp["version"] = 1
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
              <Image {...temp} />
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
