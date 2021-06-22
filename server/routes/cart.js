const express = require("express")
const router = express.Router()

const mysql = require("mysql")
const { restart } = require("nodemon")
const dbconfig = require("../dbconfig.json")
const conn = mysql.createConnection(dbconfig)
conn.connect()
router.get(`/purchase/:user_id`, (req, res) => {
  let id = req.params.user_id
  let sql = `select * from purchase where user_id='${id}' order by purchase_date desc;`
  conn.query(sql, (err, rs) => {
    if (err) console.log(err)
    else {
      let args = rs.slice(0, 4)
      res.send(args)
    }
  })
})
router.get("/:user_id", (req, res) => {
  let id = req.params.user_id
  let sql = `select * from cart_product_view where user_id='${id}';`
  conn.query(sql, [], (err, rs) => {
    res.send(rs)
  })
})

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
router.post(`/:user_id`, async (req, res) => {
  let arrays = req.body
  let id = req.params.user_id
  let sql = "insert into purchase values (?,?,?,?,?,?,now())"
  await arrays.forEach(a => {
    delete a[`product_descript`]
    let temp = Object.values(a)
    conn.query(sql, temp, (err, rs) => {
      if (err) console.log(err)
    })
  })
  conn.query(`delete from cart where user_id='${id}'`)
  res.send({ purchase: true })
})

module.exports = router
