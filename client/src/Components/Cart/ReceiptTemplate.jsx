import React from "react"
import styled from "styled-components"
import axios from "axios"
import { useHistory } from "react-router"
const ReceiptWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: RGB(248, 233, 236);
  border-radius: 1.2rem;
  padding: 1.5rem 2rem;
  gap: 1rem;

  h2 {
    align-self: flex-start;
    padding: 1rem;
  }

  .receipt__selected_product {
    background-color: white;
    width: 100%;
    height: 10rem;
    padding: 1rem;
  }

  .receipt__payment {
    display: flex;
    justify-content: space-evenly;
    width: 100%;

    div {
      width: 12rem;
      background-color: white;
      text-align: center;
      padding: 0.8rem 0.1rem;
      border-radius: 0.2rem;
      font-weight: 600;
      margin-left: 8px;
      display: inline-block;

      &:hover {
        cursor: pointer;
        filter: brightness(90%);
      }
    }
  }

  button {
    margin-top: 3rem;
    width: 90%;
    height: 60px;
    border: none;
    transition: all 0.08s linear;
    border-radius: 0.5rem;
    font-size: 2rem;
    background-color: white;

    &:hover {
      cursor: pointer;
      filter: brightness(90%);
    }
  }
`

function Receipt({ items, selected }) {
  let history = useHistory()
  const handlePurchase = () => {
    let args = items.filter((val, idx) => selected.has(idx))
    if (args.length === 0) {
      alert("상품을 선택해 주세요")
      return
    }

    axios.post(`/cart/${window.sessionStorage.getItem("id")}`, args).then((res) => {
      if (res.data.purchase) {
        alert("감사합니다. 구매가 완료되었습니다.")
        history.push("/")
      }
    })
  }
  return (
    <ReceiptWrapper>
      <h1>계산서</h1>
      <div className="receipt__selected_product">
        {items
          .filter((val, idx) => selected.has(idx))
          .reduce((prev, cur) => `${prev} ${cur.product_title},`, "")}
      </div>
      <h2>{`총 가격 : ${items
        .filter((val, idx) => selected.has(idx))
        .reduce((prev, cur) => prev + cur.product_price * cur.product_count, 0)}원`}</h2>
      <h2>결제 수단</h2>
      <div className="receipt__payment">
        <label>
          <input name="pay" type="radio" value="카드" defaultChecked />
          <div>카드</div>
        </label>
        <br />
        <label>
          <input name="pay" type="radio" value="무통장입금" /> <div>무통장입금</div> <br />
        </label>
        <label>
          <input name="pay" type="radio" value="카카오페이" /> <div>카카오페이</div> <br />
        </label>
      </div>
      <button onClick={handlePurchase}>주문하기</button>
    </ReceiptWrapper>
  )
}

export default Receipt
