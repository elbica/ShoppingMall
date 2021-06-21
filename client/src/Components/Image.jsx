import React, { useState } from "react"
import "../css/Image.css"
import styled from "styled-components"
import axios from "axios"
import { Link } from "react-router-dom"

const CartButton = styled.button`
  background-color: #df431c;
  color: white;
  font-size: 1rem;
  padding: 0 30px;
  border-radius: 2vw;
  width: 12vw;
  height: 4vw;
  border: 1.2px solid white;
  cursor: pointer;
`

const WrapImage = styled.div`
  position: relative;
  display: inline-block;
`

const Content = (props) => {
  return (
    <Link to={`/product/${props.product_id}`}>
      <div className={props.cn} style={{ visibility: props.visi }}>
        <p className="imgtitle">{props.product_title}</p>
        <p className="imgdes">{props.product_descript}</p>
        <p className="imgprice">{props.product_price}</p>
      </div>
    </Link>
  )
}

const AddCart = (props) => {
  const handleCart = (e) => {
    let product_id = props.product_id
    let user_id = window.sessionStorage.getItem("id")

    if (!user_id) alert("로그인 후 이용해 주세요")
    else {
      axios.post("/cart", { product_id, user_id, product_count: 1 }).then((res) => {
        if (res.data.lap) alert("장바구니에서 삭제되었습니다")
        else alert("장바구니에 담겼습니다")
      })
    }
  }
  return (
    <div className={props.cn} style={{ visibility: props.visi }}>
      <CartButton onClick={handleCart}>Cart</CartButton>
    </div>
  )
}
export default function Image(props) {
  let [visi, setVisi] = useState("hidden")
  const [act, setAct] = useState("")

  return (
    <WrapImage
      onMouseEnter={(e) => {
        setVisi("visible")
        setAct(" act")
        e.currentTarget.children[0].style["filter"] = "brightness(30%)"
      }}
      onMouseLeave={(e) => {
        setAct("")
        setVisi("hidden")
        e.currentTarget.children[0].style["filter"] = "brightness(100%)"
      }}
    >
      <img
        src={props.file_name}
        alt="이미지"
        style={{
          objectFit: "cover",
          height: props.width + "vw",
          width: props.width * 1.2 + "vw",
          transition: "0.3s all ease-in-out",
          userDrag: "none",
        }}
        draggable={false}
      />
      {props.version ? (
        <Content {...props} visi={visi} cn={"ContentWrap" + act} />
      ) : (
        <AddCart {...props} visi={visi} cn={"ButtonWrap" + act} />
      )}
    </WrapImage>
  )
}
