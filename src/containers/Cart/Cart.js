import React from "react";
import { useState } from "react";
import "./Cart.css";
import shirts from "../../shared/shirts";
import routes from "../../shared/appRoutes";
import { Link } from "react-router-dom";
import shirt_base from "../../assets/images/shirt-base.png";
import db from "../../index";
import { userID } from "../../App";

const Cart = () => {
  const items = JSON.parse(sessionStorage.getItem("items"));
  const handleRemove = (i) => {
    db.collection(userID)
      .where("ImgUrl", "==", items[i].ImgUrl)
      .where("SelectedSize", "==", items[i].SelectedSize)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          doc.ref.delete().then(() => {
            items.splice(i, 1);
            setCartState(items);
            sessionStorage.setItem("items", JSON.stringify(items));
            window.location.reload();
          });
        });
      });
  };
  const handleChange = (i, value) => {
    db.collection(userID)
      .where("ImgUrl", "==", items[i].ImgUrl)
      .where("SelectedSize", "==", items[i].SelectedSize)
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          console.log("未找到匹配的文档");
          return;
        }
        snapshot.forEach((doc) => {
          doc.ref
            .update({
              Quantity: parseInt(value),
            })
            .then(() => {
              items[i].Quantity = parseInt(value);
              sessionStorage.setItem("items", JSON.stringify(items));
              setQ();
              window.location.reload();
            });
        });
      });
  };
  const [quantities, setQ] = useState(items.map((item) => item.Quantity));
  const [cartItem, setCartState] = useState(items);
  const number = cartItem.reduce((acc, item) => acc + item.Quantity, 0);
  const subtotal = cartItem
    .reduce(
      (acc, item) =>
        acc + item.Quantity * parseFloat(item.Price.replace("$", "")),
      0
    )
    .toFixed(2);
  const total = (parseFloat(subtotal) + 6.95).toFixed(2);
  return (
    <div className="Cart">
      <div className="cart_header">
        {cartItem.length === 0
          ? "Your Cart is Empty"
          : "My Cart (" + number + ")"}
      </div>
      <div style={{ display: "flex" }}>
        <div className="cart_Tshirts">
          {[...cartItem].map((item, i) => (
            <div className="cart_element" key={i}>
              <hr style={{ borderTop: "2px solid red" }} />
              <div className="element_name">{item.Name}</div>
              <div className="element_left">
                {item.DIY ? (
                  <div className="mix_shirt">
                    <img
                      id="details_image"
                      src={shirt_base}
                      alt="details_image"
                    />
                    <img id="overlay_image" src={item.ImgUrl} alt="" />
                  </div>
                ) : (
                  <img
                    src={shirts[item.ShirtNumber].colors[item.ShirtColor].front}
                    className="element_img"
                    alt={item.name}
                  />
                )}
              </div>

              <div className="element_right">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <p>Quantity:</p>
                  <div className="quantity">
                    <select
                      value={quantities[i]}
                      onChange={(e) => handleChange(i, e.target.value)}
                      className="quantity_size"
                    >
                      {Array.from({ length: 20 }, (_, i) => i + 1).map(
                        (num) => (
                          <option key={num} value={num}>
                            {num}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                </div>
                {item.DIY ? (
                  <div style={{ display: "flex", alignItems: "center" }}></div>
                ) : (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <p>Color: </p>
                    <p className="data">{item.ShirtColor}</p>
                  </div>
                )}

                <div style={{ display: "flex", alignItems: "center" }}>
                  <p>Size: </p>
                  <p className="data">{item.SelectedSize}</p>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <p>Price(each): </p>
                  <p className="data">{item.Price}</p>
                </div>
                <button
                  className="remove_button"
                  onClick={() => handleRemove(i)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <div style={{ height: "600px" }}>
          <div className="order_summary_box">
            <p className="order_summary">Order Summary</p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                margin: "20px",
              }}
            >
              <div className="price_left">
                <p>Subtotal:</p>
                <p>Est. Shipping:</p>
                <hr style={{ border: " white" }} />
                <p style={{ fontSize: "1cm" }}>Total:</p>
              </div>

              <div
                style={{ float: "right", textAlign: "right" }}
                className="price_right"
              >
                <p>${subtotal}</p>
                <p>$6.95</p>
                <hr style={{ borderTop: "2px solid red" }} />
                <p style={{ fontSize: "1cm" }}>${total}</p>
              </div>
            </div>
            {/* {cartItem.length === 0 ? (
              <div style={{ textAlign: "center" }}>
                <button className="signin_button disabled disabled-button">
                  Sign in and Checkout
                </button>
              </div>
            ) : (
              <Link to={routes.notImplemented}>
                <div style={{ textAlign: "center" }}>
                  <button className="signin_button">
                    Sign in and Checkout
                  </button>
                </div>
              </Link>
            )} */}
            <Link to={routes.products}>
              <div style={{ textAlign: "center", marginTop: "70px" }}>
                <button className="signin_button">Continue Shopping</button>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
