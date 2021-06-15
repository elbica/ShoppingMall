import React, { useState } from "react"
import axios from "axios"
import "../../css/AdminItem.css"
export default function AdminItem({ history, imgSrc, itemId, title, descript }, key) {
  const [title_, setTitle] = useState(title)
  const [descript_, setDescript] = useState(descript)
  const handleUpdate = (e) => {
    e.preventDefault()
    if (window.confirm("해당 상품을 수정하시겠습니까?")) {
      let etitle = document.querySelector(".admin_item_title").value
      let edescript = document.querySelector(".admin_item_descript").value
      let args = { etitle, edescript }
      axios
        .patch(`/item/${itemId}`, args)
        .then((res) => {
          alert("상품이 수정되었습니다")
          history.push("/admin")
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
        .delete(`/item/${itemId}`)
        .then((res) => {
          alert("상품이 삭제되었습니다")
          history.push("/admin")
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
  return (
    <div className="admin_item">
      <img src={imgSrc} alt="image" />
      <div className="admin_item_content" style={{ display: "inline-block" }}>
        <input
          type="text"
          className="admin_item_title"
          value={title_}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          onChange={(e) => setDescript(e.target.value)}
          name="descript"
          className="admin_item_descript"
          value={descript_}
          cols="30"
          rows="5"
        ></textarea>
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
