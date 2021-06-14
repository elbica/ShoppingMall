import React from "react";
import styled from "styled-components";

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
            width: 13rem;
            background-color: white;
            text-align: center;
            padding: 0.8rem 0.1rem;
            border-radius: 0.2rem;
            font-weight: 600;

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
`;

function Receipt({ items, selected }) {
    return (
        <ReceiptWrapper>
            <h1>계산서</h1>
            <div className="receipt__selected_product">
                {items
                    .filter((val, idx) => selected.has(idx))
                    .reduce((prev, cur) => `${prev} ${cur.itemName},`, "")}
            </div>
            <h2>{`총 가격 : ${items
                .filter((val, idx) => selected.has(idx))
                .reduce((prev, cur) => prev + cur.price, 0)}원`}</h2>
            <h2>결제 수단</h2>
            <div className="receipt__payment">
                <div>카드</div>
                <div>무통장입금</div>
                <div>카카오페이</div>
            </div>
            <button>주문하기</button>
        </ReceiptWrapper>
    );
}

export default Receipt;
