import React from "react";
import styled from "styled-components";

const ItemWrapper = styled.div`
    display: flex;
    margin-top: 1.5rem;
    column-gap: 10px;
    align-items: center;
`;

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
`;

function ItemTemplate({ idx, item, selected, setSelected }, key) {
    const handleCheck = (e) => {
        const newSelected = new Set(selected);
        if (e.target.checked) {
            newSelected.add(idx);
        } else {
            newSelected.delete(idx);
        }
        setSelected(newSelected);
    };

    return (
        <ItemWrapper>
            <ItemBox>
                <img src={item.image} alt="product" />
                <div className="item__desc">
                    <h2>{item.itemName}</h2>
                    <p>{item.description}</p>
                </div>
                <div className="item__price">{`${item.price}원`}</div>
            </ItemBox>
            <input type="checkbox" checked={selected.has(idx)} onChange={handleCheck} />
        </ItemWrapper>
    );
}

export default ItemTemplate;
