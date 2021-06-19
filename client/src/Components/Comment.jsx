import React, { Component, useState, useEffect } from "react"
import "../css/Comment.css"
import Axios from "axios"
Axios.defaults.withCredentials = true

function Comments({ comment_id, comment_content, user_nickname, comment_date, loginName }) {
  const [states, setStates] = useState({})
  useEffect(() => {
    if (comment_date != states.comment_date)
      setStates({
        comment_content,
        user_nickname,
        comment_date,
        updateFlag: false,
      })
  })

  const handleUpdate = (e) => {
    setStates({ ...states, updateFlag: !states.updateFlag })
  }
  const update = async (e) => {
    e.preventDefault()
    let id = comment_id
    await Axios.post(`/comment/update/${id}`, { data: e.target[0].value }).then((res) => {
      if (res.data.update) {
        alert("댓글이 수정되었습니다")
        console.log(e.target[0].value)
        setStates({ ...states, updateFlag: false, comment_content: e.target[0].value })
      } else {
        alert("수정 실패")
      }
    })
  }
  const Delete = (e) => {
    if (window.confirm("댓글을 삭제 하시겠습니까?")) {
      let id = comment_id
      Axios.post("/comment/delete", { id }).then((res) => {
        if (res.data.success) {
          alert("댓글이 삭제 되었습니다")
          window.location.reload()
        } else {
          alert("댓글 삭제 실패")
        }
      })
    }
  }

  return (
    <div className="comment">
      <div className="title">
        <span className="name"> {user_nickname}</span>
        <span className="date">
          {"("}
          {states.comment_date}
          {")"}
        </span>
        {loginName === user_nickname && (
          <span className="control">
            <button className="update" onClick={(e) => handleUpdate(e)}>
              {states.updateFlag ? "취소" : "수정"}
            </button>
            <button className="delete" onClick={(e) => Delete(e)}>
              X
            </button>
          </span>
        )}
      </div>

      <span className="comment_line" />
      {states.updateFlag ? (
        <div className="updateText">
          <form onSubmit={(e) => update(e)}>
            <textarea
              name="comment_text"
              id=""
              cols="30"
              rows="10"
              defaultValue={states.comment_content}
            ></textarea>
            <button type="submit">완료</button>
          </form>
        </div>
      ) : (
        <div className="content">{states.comment_content}</div>
      )}
    </div>
  )
}

export default Comments
