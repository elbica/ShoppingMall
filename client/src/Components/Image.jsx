import React, { useState } from "react"
import "../css/Image.css"

const Content = (props) => {
  return (
    <div className={props.cn} style={{ visibility: props.visi }}>
      <p className="imgtitle">{props.title}</p>
      <p className="imgdes">{props.descript}</p>
      <p className="imgprice">{props.price}</p>
    </div>
  )
}

export default function Image(props) {
  let [visi, setVisi] = useState("hidden")
  const [act, setAct] = useState("")

  return (
    <>
      <img
        src={props.src}
        alt="이미지"
        style={{ height: props.width, width: "33vw" }}
        onMouseEnter={() => {
          setVisi("visible")
          setAct(" act")
        }}
        onMouseLeave={() => {
          setAct("")
          setVisi("hidden")
        }}
      />
      <Content {...props} visi={visi} cn={"ContentWrap" + act} />
    </>
  )
}
