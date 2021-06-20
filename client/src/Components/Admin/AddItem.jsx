import React, { forwardRef, useState } from "react"
import axios from "axios"
import "../../css/AddItem.css"
const headers = { withCredentials: true, "Content-Type": "multipart/form-data" }
export default function AddItem({ pushItems }) {
  const [_title, setTitle] = useState("")
  const [_descript, setDescript] = useState("")
  const [_file, setFile] = useState(null)
  const [_fileName, setFileName] = useState("")
  const [_price, setPrice] = useState(0)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (_fileName === "" || _descript === "" || _file === "" || _title === "" || _price == 0) {
      window.alert("모두 입력해 주세요")
      return
    }

    let fd = new FormData()

    fd.append("fileName", _fileName)
    fd.append("descript", _descript)
    fd.append("file", _file)
    fd.append("title", _title)
    fd.append("price", _price)

    let temp = {
      product_descript: _descript,
      file: _file,
      product_title: _title,
      product_price: _price,
    }
    axios
      .post("/product", fd, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.upload) {
          temp["file_name"] = res.data._filename
          temp["product_id"] = res.data.id
          console.log(temp)
          window.alert("상품 추가 성공!")
          pushItems(temp)
        }
      })
  }
  const handleFile = (e) => {
    setFile(e.target.files[0])
    setFileName(e.target.value)
  }
  return (
    <form className="admin_add_item" onSubmit={(e) => handleSubmit(e)}>
      <input
        type="file"
        name="file"
        file={_file}
        className="set_file"
        onChange={(e) => handleFile(e)}
      />
      <div className="set_content">
        <input
          type="text"
          className="set_title"
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목"
        />
        <textarea
          type="text"
          className="set_descript"
          onChange={(e) => setDescript(e.target.value)}
          placeholder="내용"
        />
        <input
          type="number"
          className="set_price"
          onChange={(e) => setPrice(e.target.value)}
          placeholder="가격"
        />
      </div>
      <button type="submit" className="add_btn">
        추가
      </button>
    </form>
  )
}
