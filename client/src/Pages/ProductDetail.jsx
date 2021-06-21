import axios from "axios"
import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"

const Wrapper = styled.div`
  margin: 130px auto;
  width: 80vw;
  max-width: 1000px;

  .divider {
    height: 2px;
    background-color: grey;
    filter: brightness(130%);
    width: 100%;
  }

  .top {
    display: grid;
    grid-template: "l r" 610px / 1fr 1fr;
    overflow: hidden;
    gap: 20px;

    img {
      justify-self: center;
      height: 100%;
      width: 100%;
      object-fit: center;
      overflow: hidden;
    }

    .top__desc {
      color: rgba(0, 0, 0, 0.875);
      padding: 1rem 1.5rem;
      font-size: 24px;
      display: grid;
      grid-template-rows: 50px 50px 280px 30px 50px 50px 10px 50px;
      align-items: flex-start;

      .price {
        justify-self: right;
      }

      .description {
        font-size: 18px;
      }

      .count {
        display: grid;
        grid-template-columns: 30px 30px 30px;
        justify-items: center;
        align-items: center;

        div {
          border-top: 1px #111111 solid;
          border-bottom: 1px #111111 solid;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        button {
          border: 1px #111111 solid;
          background-color: #f1f2f4;
          font-size: 30px;
          width: 100%;
          &:hover {
            cursor: pointer;
            filter: brightness(110%);
          }
        }
      }

      .sum {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;

        div:first-child {
          font-size: 18px;
        }

        div:last-child {
          font-weight: 500;
          color: black;
          word-break: nowrap;
          span {
            font-size: 14px;
            font-weight: normal;
            color: grey;
            filter: brightness(110%);
          }
        }
      }

      .purchase {
        display: grid;
        gap: 10px;
        grid-template: "l r" 60px / 1fr 1fr;
        button {
          border: 1px grey solid;
          border-radius: 0px;
          font-size: 1rem;
          font-weight: 600;
          &:hover {
            cursor: pointer;
            filter: brightness(110%);
          }
        }
      }
    }
  }
`

const productDetailMock = {
  file_name: "image.png",
  product_title: "곰돌이 스티커",
  product_price: 20000000,
  product_descript: "곰돌이 스티커, 너무 귀엽다!",
}

function ProductDetail({ history, match: { params } }) {
  const [product_id] = useState(params["product_id"])
  const [detail, setDetail] = useState(productDetailMock)
  const [count, setCount] = useState(0)
  useEffect(() => {
    axios.get(`/product/${product_id}`).then((res) => {
      let { file_name, product_title, product_price, product_descript } = res.data
      let temp = { file_name, product_title, product_price, product_descript }
      setDetail(temp)
    })
  }, [])
  const handleBuy = () => {
    let id = window.sessionStorage.getItem("id")
    if (!id) {
      alert("로그인 후 이용해 주세요!")
      return
    }
    let args = {
      user_id: id,
      product_id,
      product_count: count,
      product_title: detail.product_title,
      total_price: detail.product_price * count,
      file_name: detail.file_name,
    }
    axios.post(`/product/${product_id}`, args).then((res) => {
      if (res.data.purchase) {
        alert("상품을 구매하였습니다")
        setCount(0)
      } else alert("구매 실패")
    })
  }
  const handleCart = () => {
    let id = window.sessionStorage.getItem("id")
    if (!id) {
      alert("로그인 후 이용해 주세요!")
      return
    }
    if (count === 0) {
      alert("1 이상의 수량을 선택해 주세요!")
      return
    }
    axios.post("/cart", { product_id, user_id: id, product_count: count }).then((res) => {
      if (res.data.lap) {
        alert("장바구니에서 삭제되었습니다")
      } else {
        alert("장바구니에 추가되었습니다")
        history.go(-1)
      }
    })
  }
  function toWon(price) {
    return price
      .toString()
      .split("")
      .reduce((p, c, ci) => {
        if ((price.toString().length - ci) % 3 === 0) {
          p += ","
        }
        return (p += c)
      })
  }

  return (
    <Wrapper>
      <div className="top">
        <Link to="/product" style={{ position: "absolute", left: "14vw", fontSize: "18px" }}>
          <button
            style={{
              position: "relative",
              top: "20px",
              padding: "10px",
              borderRadius: "5px",
              backgroundColor: "gray",
              color: "white",
              border: "none",
              transition: "0.5s all",
              cursor: "pointer",
            }}
          >
            이전
          </button>
        </Link>
        <img
          src={`http://localhost:5000/upload/${detail.file_name}`}
          alt={`${detail.product_title}`}
        />
        <div className="top__desc">
          <h3>{`${detail.product_title}`}</h3>
          <div className="price">{`${toWon(detail.product_price)}원`}</div>
          <div className="description">{`${detail.product_descript}`}</div>
          <div className="divider"></div>
          <div className="count">
            <button onClick={() => setCount(Math.max(0, count - 1))}>-</button>
            <div>{`${count}`}</div>
            <button onClick={() => setCount(count + 1)}>+</button>
          </div>
          <div className="sum">
            <div>총 상품 금액</div>
            <div>
              <span>{`총 수량 ${count}개 | `}</span>
              {`${toWon(detail.product_price * count)}원`}
            </div>
          </div>
          <div className="divider"></div>
          <div className="purchase">
            <button onClick={handleBuy}>구매하기</button>
            <button onClick={handleCart}>장바구니</button>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default ProductDetail
