const express = require("express")
const router = express.Router()
const session = require("express-session")
const mysql = require("mysql")
const dbconfig = require("../dbconfig.json")

const conn = mysql.createConnection(dbconfig)
conn.connect()

// 로그인 액션
router.post("/login", function(req, res) {
  var i_user_id = req.body.user_id
  var i_user_password = req.body.user_password

  var sql = "SELECT user_id ,user_nickname FROM user WHERE user_id=? AND user_password=?"
  conn.query(sql, [i_user_id, i_user_password], function(err, rs) {
    if (rs[0]) {
      //rs말고 rs[0]을 해야 정의 되었는지를 확실히 알 수 있음
      req.session.user_id = rs[0].user_id
      req.session.user_name = rs[0].user_nickname
      req.session.save(function() {
        res.send({
          _login: true,
          _user_name: rs[0].user_nickname,
          _user_mbti: rs[0].user_mbti,
          session: { cookie: { maxAge: 1000 * 60 * 60 } },
        })
      })
    } else {
      console.log(rs) // []으로 정의는 되어있지만 텅 비어있음 -> rs[0]이 정의 되지 않음
      res.send({ _login: false })
    }
  })
})
// 회원가입 액션
router.post("/", function(req, res, err) {
  let user_id = req.body.user_id // id
  let user_password = req.body.user_password // pwd
  let user_nickname = req.body.user_nickname // user_realname
  let user_q = req.body.user_q // verify question
  let user_a = req.body.user_a // verify answer
  let sql = `INSERT INTO user(user_idx,user_id, user_password, user_nickname, user_question, user_answer) VALUES (0,?,?,?,?,?)`

  conn.query(sql, [user_id, user_password, user_nickname, user_q, user_a], (err, rs) => {
    if (err) {
      // user_id, user_name을 unique로 설정해서 중복되면 에러 발생
      console.log(err)
      res.status(500).send(err)
    } else {
      req.session.user_id = user_id
      req.session.user_password = user_password
      req.session.user_name = user_nickname
      req.session.save(function() {
        res.send()
      })
    }
  })
})

router.post("/check_id", (req, res) => {
  let id = req.body.id
  let sql = "select user_id from user where user_id=?"
  conn.query(sql, [id], (err, rs) => {
    if (rs[0]) {
      res.send({ id_check: true })
    } else res.send({ id_check: false })
  })
})

router.post("/check_user_nickname", (req, res) => {
  let nickname = req.body.nickname
  let sql = "select user_nickname from user where user_nickname=?"
  conn.query(sql, [nickname], (err, rs) => {
    if (rs[0]) {
      res.send({ nickname_check: true })
    } else res.send({ nickname_check: false })
  })
})

module.exports = router
