import React, { useState, useEffect } from "react"
import "../css/Admin.css"
import AdminItem from "../Components/Admin/AdminItem"
import AddItem from "../Components/Admin/AddItem"
import axios from "axios"
export default ({ history, array: { id, loginCheck } }) => {
  const [items, setItems] = useState([])
  const pushItems = (parms) => {
    setItems([...items, parms])
  }
  const popItems = (id) => {
    let temp = items.filter((i) => i.product_id != id)
    console.log(temp)
    setItems(temp)
  }
  useEffect(async () => {
    if (loginCheck && id !== "admin") {
      alert("관리자가 아닙니다!")
      history.push("/product")
    } else {
      let temp = []
      await axios.get("/product").then((res) => {
        temp = res.data
      })
      setItems(temp)
    }
  }, [])
  console.log("render")
  return (
    <div className="admin_wrapper">
      <h1>관리자 페이지</h1>
      <AddItem pushItems={pushItems} />
      {items.map((i, k) => {
        return <AdminItem popItems={popItems} {...i}></AdminItem>
      })}
    </div>
  )
}
