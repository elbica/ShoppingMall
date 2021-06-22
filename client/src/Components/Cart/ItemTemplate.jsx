import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"

const ItemWrapper = styled.div`
  display: flex;
  margin-top: 1.5rem;
  column-gap: 10px;
  align-items: center;
`

const ItemBox = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 10rem;
  background-color: RGB(248, 233, 236);
  padding: 0.6rem;
  column-gap: 1rem;
  border-radius: 0.7rem;

  img {
    height: 100%;
    border-radius: 0.7rem;
  }

  .item__desc {
    width: 100%;
  }

  .item__price {
    position: absolute;
    bottom: -1.4rem;
    right: 1rem;
  }
`

function ItemTemplate({ idx, item, selected, setSelected }, key) {
  const handleCheck = (e) => {
    const newSelected = new Set(selected)
    if (e.target.checked) {
      newSelected.add(idx)
    } else {
      newSelected.delete(idx)
    }
    setSelected(newSelected)
  }

  return (
    <ItemWrapper>
      <ItemBox>
        <img src={"http://localhost:5000/upload/" + item.file_name} alt="product" />
        <div className="item__desc">
          <Link to={`/product/${item.product_id}`}>
            <h2>{item.product_title}</h2>
            <p>{item.product_descript}</p>
          </Link>
        </div>
        <div
          className="item__count"
          style={{
            position: "absolute",
            right: "15px",
            bottom: "20px",
            width: "44px",
            backgroundColor: "white",
            borderRadius: "5px",
            fontSize: "18px",
            padding: "5px",
          }}
        >
          {item.product_count + "개"}
        </div>
        <div className="item__price">{`${item.product_price * item.product_count}원`}</div>
      </ItemBox>
      <input type="checkbox" checked={selected.has(idx)} onChange={handleCheck} />
    </ItemWrapper>
  )
}

export default ItemTemplate
