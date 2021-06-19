const express = require("express")
const router = express.Router()

const mysql = require("mysql")
const dbconfig = require("../dbconfig.json")
const conn = mysql.createConnection(dbconfig)
conn.connect()

// 상세내용 보기
router.post("/", function(req, res) {
  if (!req.body.board_id) {
    res.redirect("/list") // board_id 가 없으면 boardList/1로 리다이렉트
  } else {
    let user_id = req.session.user_id

    if (user_id) {
      let updateSql =
        "update board set board_view = board_view + 1 where board_id = ? and user_id != ?"
      conn.query(updateSql, [parseInt(req.body.board_id), req.session.user_id], (err, res) => {
        if (err) console.log(err)
      })
    } else {
      let updateSql = "update board set board_view = board_view + 1 where board_id = ? "
      conn.query(updateSql, [parseInt(req.body.board_id)], (err, res) => {
        if (err) console.log(err)
      })
    }

    var sql =
      'SELECT board_title,board_content,user_nickname,user_id,DATE_FORMAT(add_date,"%m/%d %H:%i") as add_date,board_id, board_view, board_cnum FROM board WHERE board_id=?'
    // DATE_FORMAT(add_date,"%m/%d %H:%i") as add_date :: 시간 데이터를 원하는 포맷으로 가져올 수 y
    conn.query(sql, [parseInt(req.body.board_id)], function(err, b_rs) {
      // 보드에 관한 r은 b_rs
      if (err) {
        console.log(err)
        res.send("게시글을 찾을 수 없습니다.")
      } else {
        var sql =
          'SELECT user_nickname, comment_content, DATE_FORMAT(comment_date,"%m/%d %H:%i") as comment_date, comment_id FROM comment WHERE board_id=?; select count(*) as cnt from board where board_id >?;'
        conn.query(sql, [parseInt(req.body.board_id), req.body.board_id], function(err, c_rs) {
          if (err) {
            console.log(err)
            res.send("댓글을 찾을 수 없습니다.")
          } else {
            if (b_rs[0].user_id == req.session.user_id) {
              // board의 i와 session의 id가 같을 때 즉, 수정, 삭제의 권한 부여
              res.send({
                title: b_rs[0].board_title,
                content: b_rs[0].board_content,
                writer: b_rs[0].user_nickname,
                date: b_rs[0].add_date,
                view: b_rs[0].board_view,
                flag: true,
                comment: c_rs[0],
                prevLink: Math.floor(c_rs[1][0].cnt / 5) + 1,
              })
            } else {
              res.send({
                title: b_rs[0].board_title,
                content: b_rs[0].board_content,
                writer: b_rs[0].user_nickname,
                date: b_rs[0].add_date,
                view: b_rs[0].board_view,
                flag: false,
                comment: c_rs[0],
                prevLink: Math.floor(c_rs[1][0].cnt / 5) + 1,
              })
            }
          }
        })
      }
    })
  }
})

module.exports = router
