const express = require("express")
const app = express()
const path = require("path")
const bodyParser = require("body-parser")
const session = require("express-session")
const MySQLStore = require("express-mysql-session")(session)
const dbconfig = require("./dbconfig.json")
const cors = require("cors")
app.use(cors())
const PORT = process.env.PORT || 5000

app.get("/", (req, res) => {
  res.send("hello")
})
app.use(
  session({
    secret: "any", // 보안을 위한 키
    resave: false, // 권장값
    saveUninitialized: true, // 권장값
    store: new MySQLStore(dbconfig),
  })
)

const mysql = require("mysql")
const conn = mysql.createConnection(dbconfig)
conn.connect()

//템플릿엔진 설정
app.use(express.json())
//정적 미들웨어
app.use(express.static("public"))
app.use("/upload", express.static("uploads"))

app.use(bodyParser.urlencoded({ extended: false }))

var addBoardRouter = require("./routes/addBoard")
var boardDetailRouter = require("./routes/boardDetail")
var boardListRouter = require("./routes/boardList")
var deleteBoardRouter = require("./routes/deleteBoard")
var updateBoardRouter = require("./routes/updateBoard")
var commentRouter = require("./routes/comment")
var authRouter = require("./routes/auth")
let productRouter = require("./routes/product")
let cartRouter = require("./routes/cart")

app.use("/auth", authRouter)
app.use("/list", boardListRouter)
app.use("/detail", boardDetailRouter)
app.use("/comment", commentRouter)
app.use("/add", addBoardRouter)
app.use("/delete", deleteBoardRouter)
app.use("/update", updateBoardRouter)
app.use("/product", productRouter)
app.use("/cart", cartRouter)

//home
app.post("/", function(req, res) {
  // session 유무에 따라 달라지게

  if (req.session.user_id) {
    // 로그아웃 뜨게
    res.send({ id: req.session.user_id, nickName: req.session.user_name, loginCheck: true })
  } else {
    res.send({ id: "", nickName: "", loginCheck: false })
  }
})

// 리액트 정적 파일 제공
// app.use(express.static(path.join(__dirname, "../client/build")))
// // 라우트 설정
// app.get("*", (req, res) => {
//   res.sendFile(path.join("../client/build/index.html"))
// })
// console.log("dir은 ", __dirname)

// 로그아웃
app.post("/logout", function(req, res) {
  delete req.session.user_id
  delete req.session.user_name
  req.session.save(function() {
    res.send()
  })
})
app.post("/profile/update/:id", (req, res) => {
  let id = req.params.id
  let nickname = req.body.data

  let sql1 = "select user_nickname from user where user_nickname=?"
  conn.query(sql1, [nickname], (err, rs) => {
    if (!rs[0]) {
      let sql2 = "update user set user_nickname=? where user_id=?"
      conn.query(sql2, [nickname, id], (err, rs) => {
        if (err) {
          console.log(err)
          res.send({ update: false })
        } else {
          req.session.user_name = nickname
          res.send({ update: true })
        }
      })
    } else {
      res.send({ update: false })
    }
  })
})
app.post("/profile/delete/:user_id", (req, res) => {
  let id = req.params.user_id
  let sql = `delete from user where user_id='${id}'`
  conn.query(sql, (err, rs) => {
    if (rs) {
      delete req.session.user_id
      delete req.session.user_name
      req.session.save(function() {
        res.send({ delete: true })
      })
    }
  })
})
app.listen(PORT, console.log(PORT, "번 포트가 실행되었습니다."))
