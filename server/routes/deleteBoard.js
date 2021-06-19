const express = require("express")
const router = express.Router()

const mysql = require("mysql")
const dbconfig = require("../dbconfig.json")

const conn = mysql.createConnection(dbconfig)
conn.connect()

// 삭제폼(비밀번호 확인을 위한)
router.post("/:board_id", function(req, res) {
  const board_id = parseInt(req.params.board_id)
  console.log("/deleteBoard 삭제 요청", board_id)

  conn.query("delete from comment where board_id = ?", [board_id])
  conn.query("DELETE FROM board WHERE board_id=?;", [board_id], function(err, rs) {
    if (err) {
      console.log(err)
      res.send({ success: false })
    } else {
      res.send({ success: true })
    }
  })
})

module.exports = router
