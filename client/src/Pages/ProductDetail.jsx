import React, { useState } from "react";
import styled from "styled-components";

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
            height: 600px;
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
`;

const productDetailMock = {
    src: "images/image.png",
    title: "곰돌이 스티커",
    price: 200000,
    description: "곰돌이 스티커, 너무 귀엽다!",
};

function ProductDetail({ match: { params } }) {
    const [productName] = useState(params["productName"]);
    const [detail, setDetail] = useState(productDetailMock);
    const [count, setCount] = useState(0);

    function toWon(price) {
        return price
            .toString()
            .split("")
            .reduce((p, c, ci) => {
                if ((price.toString().length - ci) % 3 === 0) {
                    p += ",";
                }
                return (p += c);
            });
    }

    return (
        <Wrapper>
            <div className="top">
                <img src={`/${detail.src}`} alt={`${detail.title}`} />
                <div className="top__desc">
                    <h3>{`${detail.title}`}</h3>
                    <div className="price">{`${toWon(detail.price)}원`}</div>
                    <div className="description">{`${detail.description}`}</div>
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
                            {`${toWon(detail.price * count)}원`}
                        </div>
                    </div>
                    <div className="divider"></div>
                    <div className="purchase">
                        <button>구매하기</button>
                        <button>장바구니</button>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
}

export default ProductDetail;
