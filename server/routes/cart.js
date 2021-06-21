const express = require("express")
const router = express.Router()

const mysql = require("mysql")
const dbconfig = require("../dbconfig.json")
const conn = mysql.createConnection(dbconfig)
conn.connect()

router.post("/", (req, res) => {
  let { product_id, user_id, product_count } = req.body
  let sql = "select * from cart where user_id = ? and product_id = ?;"
  let param = [user_id, product_id]
  conn.query(sql, param, (err, rs) => {
    if (rs[0]) {
      conn.query("delete from cart where user_id=? and product_id=?;", param, () => {
        res.send({ lap: true })
      })
    } else {
      conn.query("insert into cart value(?,?,?);", [user_id, product_id, product_count], () => {
        res.send({ lap: false })
      })
    }
  })
})

module.exports = router
