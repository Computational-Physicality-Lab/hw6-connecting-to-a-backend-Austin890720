import React from "react";
import { Container } from "reactstrap";
import { useState } from "react";
import "./Detail.css";
import shirts from "../../shared/shirts";
import routes from "../../shared/appRoutes";
import { useNavigate } from "react-router-dom";
import db from "../../index";
import firebase from "firebase/compat/app";

const Detail = ({ user }) => {
  const navigate = useNavigate();
  const [shirtNumber] = useState(localStorage.getItem("shirt_number") || 0);
  const [shirtColor, setShirtColor] = useState(
    localStorage.getItem("shirt_color") || "white"
  );
  const [shirtSide, setShirtSide] = useState("front");

  const handleColorButtonClick = (color) => {
    setShirtColor(color);
  };

  const handleSideButtonClick = (side) => {
    setShirtSide(side);
  };

  const handleChange = (e) => {
    setValue(parseInt(e.target.value));
  };
  const handleSizeChange = (e) => {
    setSelectedSize(e.target.value);
  };

  const handleClick = () => {
    if (selectedSize !== "Size") {
      const newItem = {
        DIY: false,
        Price: price,
        Name: name,
        Quantity: quantity,
        SelectedSize: selectedSize,
        ShirtColor: shirtColor,
        ShirtNumber: shirtNumber,
        ImgUrl: shirts[shirtNumber].colors[shirtColor].front,
        TimeStamp: firebase.firestore.FieldValue.serverTimestamp(),
      };
      let items;
      db.collection(user.uid)
        .add(newItem)
        .then(() => {
          items = JSON.parse(sessionStorage.getItem("items"));
          items.unshift(newItem);
          sessionStorage.setItem("items", JSON.stringify(items));
          navigate(routes.shoppingCart);
          window.location.reload();
        });
      // let items;
      // if (sessionStorage.getItem("items")) {
      //   items = JSON.parse(sessionStorage.getItem("items"));
      // } else {
      //   items = [];
      // }
      // items.unshift(newItem);
      // sessionStorage.setItem("items", JSON.stringify(items));
      // navigate(routes.shoppingCart);
      // window.location.reload();
    }
  };
  const [quantity, setValue] = useState(1);
  const { name, price, description, colors } = shirts[shirtNumber];
  const [selectedSize, setSelectedSize] = useState("Size");
  return (
    <Container className="Detail">
      <div className="shirt_details_name">
        <p className="details_name">{name}</p>
      </div>
      <div className="shirt_details">
        <div className="details_element">
          <img
            className="details_image"
            src={colors[shirtColor][shirtSide]}
            alt={name}
          />
        </div>
        <div className="detail_element_right">
          <p className="shirt_price">{price}</p>
          <p className="shirt_description">{description}</p>
          <p style={{ display: "inline" }}>Side:</p>
          <button
            className="side_button"
            onClick={() => handleSideButtonClick("front")}
          >
            Front
          </button>
          <button
            className="side_button"
            onClick={() => handleSideButtonClick("back")}
          >
            Back
          </button>
          <div className="details_buttons">
            <p style={{ display: "inline" }}>Color:</p>
            {Object.keys(colors).map((color) => (
              <button
                key={color}
                className="details_button"
                style={{ backgroundColor: color }}
                onClick={() => handleColorButtonClick(color)}
              >
                {color}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <p style={{ display: "inline" }}>Quantity:</p>
            <div className="quantity">
              <select
                value={quantity}
                onChange={handleChange}
                className="quantity_size"
              >
                {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <p style={{ display: "inline" }}>Size: </p>
            <div className="Size">
              <select
                value={selectedSize}
                onChange={handleSizeChange}
                className="size_size"
              >
                <option value="Size">Size</option>
                <option value="Women's XS">Women's XS</option>
                <option value="Women's S">Women's S</option>
                <option value="Women's M">Women's M</option>
                <option value="Women's L">Women's L</option>
                <option value="Women's XL">Women's XL</option>
                <option value="Women's 2XL">Women's 2XL</option>
                <option value="Men's XS">Men's XS</option>
                <option value="Men's S">Men's S</option>
                <option value="Men's M">Men's M</option>
                <option value="Men's L">Men's L</option>
                <option value="Men's XL">Men's XL</option>
                <option value="Men's 2XL">Men's 2XL</option>
              </select>
            </div>
          </div>
          {selectedSize === "Size" || user === null ? (
            <button className="addToCart disabled disabled-button">
              Add To Cart
            </button>
          ) : (
            // <Link to={routes.shoppingCart}>
            <button className="addToCart" onClick={handleClick}>
              Add To Cart
            </button>
            // </Link>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Detail;
