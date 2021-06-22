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
  let limits = 6
  let sql = "select * from product order by product_id desc limit 0,?;"
  conn.query(sql, [limits], (err, rs) => {
    res.send(rs)
  })
})
router.get("/:product_id", (req, res) => {
  let id = req.params.product_id
  let sql = "select * from product where product_id=" + id
  conn.query(sql, (err, rs) => {
    if (err) console.log(err)
    else res.send(rs[0])
  })
})
router.patch("/", (req, res) => {
  let { title, descript, product_id, price } = req.body
  let sql =
    "update product set product_title=?, product_descript=?, product_price=? where product_id=?"
  let param = [title, descript, price, product_id]
  conn.query(sql, param, (err, rs) => {
    if (err) console.log(err)
    else res.send({ update: true })
  })
})
router.delete(`/:product_id`, (req, res) => {
  let id = req.params.product_id
  let sql = "delete from product where product_id=" + id
  conn.query(sql, (err, rs) => {
    if (err) console.log(err)
    else res.send({ delete: true })
  })
})

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
router.post("/:product_id", (req, res) => {
  let params = Object.values(req.body)

  let sql = "insert into purchase values (?,?,?,?,?,?,now())"
  conn.query(sql, params, (err, rs) => {
    if (err) console.log(err)
    else res.send({ purchase: true })
  })
})

module.exports = router
