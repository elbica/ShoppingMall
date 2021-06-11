import React from "react"
import "../css/Home.css"
import Image from "../Components/Image"
import HomeScroll from "../Components/HomeScroll"
export default function Home() {
  return (
    <div className="home_total">
      <div className="home_images">
        <HomeScroll></HomeScroll>
      </div>
    </div>
  )
}
