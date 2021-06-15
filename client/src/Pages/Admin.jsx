import React, { useState, useEffect } from "react"
import "../css/Admin.css"
import AdminItem from "../Components/Admin/AdminItem"
export default ({ history, array: { id } }) => {
  const [items, setItems] = useState([])
  useEffect(() => {
    if (id !== "admin") {
      alert("관리자가 아닙니다!")
      history.push("/product")
    } else {
      let temp = [
        {
          imgSrc: "/images/image.png",
          itemId: 1,
          title: "df",
          descript: "test",
        },
        {
          imgSrc: "/images/image.png",
          itemId: 1,
          title: "df",
          descript: "test",
        },
        {
          imgSrc: "/images/image.png",
          itemId: 1,
          title: "df",
          descript: "test",
        },
      ]

      setItems(temp)
    }
  }, [])

  return (
    <div className="admin_wrapper">
      <h1>관리자 페이지</h1>
      {items.map((i, k) => {
        return <AdminItem {...i}></AdminItem>
      })}
    </div>
  )
}
