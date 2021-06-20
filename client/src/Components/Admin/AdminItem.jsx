import React, { useState, useEffect } from "react"
import axios from "axios"
import { useHistory } from "react-router-dom"
import "../../css/AdminItem.css"
export default function AdminItem({
  file_name,
  product_id,
  product_title,
  product_descript,
  product_price,
  popItems,
}) {
  const [title_, setTitle] = useState("")
  const [descript_, setDescript] = useState("")
  const [price_, setPrice] = useState(0)
  const [Image, setImage] = useState("")
  let history = useHistory()
  // const img;
  useEffect(() => {
    if (title_ !== product_title) {
      setTitle(product_title)
      setDescript(product_descript)
      setPrice(product_price)
      setImage(file_name)
    }

    //  axios.post(file_name).then(res=>{
    //   img =
    //  })
  })
  const handleUpdate = (e) => {
    e.preventDefault()
    if (window.confirm("해당 상품을 수정하시겠습니까?")) {
      // let etitle = document.querySelector(".admin_item_title").value
      // let edescript = document.querySelector(".admin_item_descript").value
      let args = { title: title_, descript: descript_, product_id, price: price_ }
      axios
        .patch(`/product`, args)
        .then((res) => {
          alert("상품이 수정되었습니다")
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
  const handleDelete = (e) => {
    e.preventDefault()
    if (window.confirm("해당 상품을 삭제하시겠습니까?")) {
      axios
        .delete(`/product/${product_id}`)
        .then((res) => {
          alert("상품이 삭제되었습니다")
          popItems(product_id)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
  return (
    <div className="admin_item">
      <img
        src={"http://localhost:5000/upload/" + Image}
        alt="image"
        style={{ width: "22vw", height: "13vw", objectFit: "cover" }}
      />
      <div className="admin_item_content" style={{ display: "inline-block" }}>
        <input
          type="text"
          className="admin_item_title"
          placeholder="제목"
          value={title_}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          onChange={(e) => setDescript(e.target.value)}
          name="descript"
          className="admin_item_descript"
          placeholder="내용"
          value={descript_}
          cols="30"
          rows="5"
        ></textarea>
        <input
          type="number"
          className="admin_item_price"
          placeholder="가격"
          value={price_}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div className="admin_item_btn" style={{ display: "inline-block" }}>
        <button className="admin_item_btn_u" onClick={handleUpdate}>
          수정
        </button>
        <button className="admin_item_btn_d" onClick={handleDelete}>
          삭제
        </button>
      </div>
    </div>
  )
}
