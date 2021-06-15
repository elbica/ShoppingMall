import React from "react"
import axios from "axios"
export default function AdminItem({ history, imgSrc, itemId, title, descript }, key) {
  const handleUpdate = (e) => {
    e.preventDefault()
    if (window.confirm("해당 상품을 수정하시겠습니까?")) {
      let title = document.querySelector(".admin_item_title")[0].value
      let descript = document.querySelector(".admin_item_descript")[0].value
      let args = { title, descript }
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
        <input type="text" className="admin_item_title" value={title} />
        <textarea
          name="descript"
          className="admin_item_descript"
          value={descript}
          cols="30"
          rows="10"
        ></textarea>
      </div>
      <div className="admin_item_btn" style={{ display: "inline-block" }}>
        <button onClick={handleUpdate}>수정</button>
        <button onClick={handleDelete}>삭제</button>
      </div>
    </div>
  )
}
