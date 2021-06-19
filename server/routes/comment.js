const express = require("express")
const bodyParser = require("body-parser")
const router = express.Router()

const mysql = require("mysql")
const dbconfig = require("../dbconfig.json")
const conn = mysql.createConnection(dbconfig)
conn.connect()

router.post("/update/:comment_id", (req, res) => {
  conn.query(
    "update comment set comment_content = ? where comment_id = ?",
    [req.body.data, req.params.comment_id],
    (err, rs) => {
      if (err) {
        console.log(err)
        res.send({ update: false })
      } else res.send({ update: true })
    }
  )
})
router.post("/delete", (req, res) => {
  console.log(req.body.id)
  let id = req.body.id
  conn.query(
    "update board set board_cnum = board_cnum-1 where board_id = (select board_id from comment where comment_id = ?)",
    [id]
  )
  conn.query("DELETE FROM comment WHERE comment_id=?", [id], (err, rs) => {
    if (err) {
      res.send({ success: false })
    } else {
      res.send({ success: true })
    }
  })
})

router.post("/:board_id", function(req, res) {
  if (req.session.user_id) {
    //session은 app.js가 알아서 해주지 않을까..
    const board_id = req.params.board_id

    const user_id = req.session.user_id
    const user_name = req.body.nickname
    const comment_content = req.body.comment_content

    const sql =
      "INSERT INTO comment(user_id,user_nickname,board_id,comment_content,comment_date) VALUES(?,?,?,?,now())"
    conn.query(sql, [user_id, user_name, board_id, comment_content], function(err, result) {
      if (err) {
        console.log(err)
        res.send(`<script>
            if(confirm("댓글이 안써집니다 ㅠ")){window.location.href=document.referrer}
            </script>`) // document.referrer은 이전주소!
      } else {
        conn.query("update board set board_cnum = board_cnum+1 where board_id = ?", [board_id])
        res.send({ login: true })
      }
    })
  } else {
    //session이 없을때.
    res.send({ login: false })
  }
})

module.exports = router
