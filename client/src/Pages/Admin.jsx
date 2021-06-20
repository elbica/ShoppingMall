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
  useEffect(async () => {
    if (loginCheck && id !== "admin") {
      alert("관리자가 아닙니다!")
      history.push("/product")
    } else {
      let temp = []
      await axios.get("/product").then((res) => {
        temp = res.data
      })
      console.log(temp)
      setItems(temp)
    }
  }, [])

  return (
    <div className="admin_wrapper">
      <h1>관리자 페이지</h1>
      <AddItem pushItems={pushItems} />
      {items.map((i, k) => {
        return <AdminItem {...i}></AdminItem>
      })}
    </div>
  )
}
