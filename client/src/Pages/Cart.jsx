import React, { useState, useEffect } from "react"

import "../css/Cart.css"
import ItemTemplate from "../Components/Cart/ItemTemplate"
import ReceiptTemplate from "../Components/Cart/ReceiptTemplate"
import axios from "axios"
const mockItems = [
  {
    file_name: "image.png",
    product_title: "에어 조던",
    product_descript: "상품 설명",
    product_price: 1000,
    product_count: 1,
    product_id: 1,
  },
]

function Cart(props) {
  const [items, setItems] = useState(mockItems)
  const [selected, setSelected] = useState(new Set())
  useEffect(async () => {
    let id = window.sessionStorage.getItem("id")
    if (!id) {
      alert("로그인이 필요합니다!")
      props.history.push("/login")
    }
    await axios.get(`/cart/${id}`).then((res) => {
      setItems(res.data)
    })
  }, [])
  return (
    <div className="cart__wrapper">
      {props.array.loginCheck && (
        <>
          <div className="cart__my_cart">
            <h1>내 장바구니</h1>
            {items.map((item, idx) => (
              <ItemTemplate
                key={idx}
                idx={idx}
                item={item}
                selected={selected}
                setSelected={setSelected}
              />
            ))}
          </div>
          <div className="cart__receipt">
            <ReceiptTemplate items={items} selected={selected} />
          </div>
        </>
      )}
    </div>
  )
}

export default Cart
