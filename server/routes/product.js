const express = require("express")
const router = express.Router()
const path = require("path")
const mysql = require("mysql")
const dbconfig = require("../dbconfig.json")

const conn = mysql.createConnection(dbconfig)
conn.connect()

const multer = require("multer")
router.use(express.urlencoded({ extended: false }))
router.use(express.json())
const productStorage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    cb(null, "" + Date.now() + path.extname(file.originalname))
  },
})
const upload = multer({
  storage: productStorage,
  limits: { fileSize: 1000000 },
}).single("file")

router.get("/", (req, res) => {
  let sql = "select * from product;"
  conn.query(sql, (err, rs) => {
    res.send(rs)
  })
})
router.patch("/", (req, res) => {})

router.post("/", (req, res, next) => {
  upload(req, res, err => {
    if (err) {
      console.log("uploads failed")
    } else {
      console.log("uploads success")
    }
    let newfilename = req.file.filename
    // let newfilename = res.req.file.path
    let sql = "insert into product values(0,?,?,?,?)"
    let param = [newfilename, req.body.descript, req.body.title, req.body.price]
    conn.query(sql, param, (err, rs) => {
      console.log(rs.insertId)
      console.log(rs[0])
      if (err) {
        res.send({ upload: false })
      } else res.send({ upload: true, _filename: newfilename, id: rs.insertId })
    })
  })
})

module.exports = router
