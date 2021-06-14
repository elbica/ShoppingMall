import React, { useState } from "react";

import "../css/Cart.css";
import ItemTemplate from "../Components/Cart/ItemTemplate";
import ReceiptTemplate from "../Components/Cart/ReceiptTemplate";

const mockItems = [
    {
        image: "/images/image.png",
        itemName: "에어 조던",
        description: "상품 설명",
        price: 1000,
    },
    {
        image: "/images/image.png",
        itemName: "맥북 에어",
        description: "상품 설명",
        price: 50000,
    },
    {
        image: "/images/image.png",
        itemName: "토마토",
        description: "상품 설명",
        price: 100,
    },
];

function Cart() {
    const [items, setItems] = useState(mockItems);
    const [selected, setSelected] = useState(new Set());

    return (
        <div className="cart__wrapper">
            <div className="cart__my_cart">
                <h1>내 장바구니</h1>
                {items.map((item, idx) => (
                    <ItemTemplate
                        key={idx}
                        idx={idx}
                        item={item}
                        selected={selected}
                        setSelected={setSelected}
                    />
                ))}
            </div>
            <div className="cart__receipt">
                <ReceiptTemplate items={items} selected={selected} />
            </div>
        </div>
    );
}

export default Cart;
