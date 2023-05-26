import React, { useEffect, useCallback } from "react";
import { Container } from "reactstrap";
import "./Create.css";
import { useState } from "react";
import routes from "../../shared/appRoutes";
import { useNavigate } from "react-router-dom";
import shirt_base from "../../assets/images/shirt-base.png";
import { createApi } from "unsplash-js";
import db from "../../index";
import firebase from "firebase/compat/app";

const Create = ({ user }) => {
  const navigate = useNavigate();
  const [shirtName, setShirtName] = useState("shirt-base");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentQuery, setCurrentQuery] = useState("");
  const [imageUrls, setImageUrls] = useState([[]]);
  const [selectPicUrl, setSelectPicUrl] = useState("");

  const getData = useCallback(async () => {
    setCurrentQuery(searchQuery);
    const unsplash = createApi({
      accessKey: "PkJOfYsNtJFKtyGr27eoyiKB6CLYJeexVACRJDVn7Zs",
    });
    const urls = [];
    await unsplash.search
      .getPhotos({
        query: searchQuery,
        page: 1,
        perpage: 10,
      })
      .then((result) => {
        if (result.type === "success") {
          urls.push(result.response.results);
        }
      });
    setImageUrls(urls);
    return urls;
  }, [searchQuery]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await getData();
      setImageUrls(response);
    };

    fetchData();
  }, [getData]);

  const addImage = (imgURL) => {
    setShirtName(currentQuery);
    setSelectPicUrl(imgURL);
    var image = document.getElementById("overlay_image");
    image.src = imgURL;
    image.style.position = "absolute";
    image.style.left = "85px";
    image.style.top = "70px";
    image.style.width = "130px";
  };
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const handleChange = (e) => {
    setValue(parseInt(e.target.value));
  };
  const handleSizeChange = (e) => {
    setSelectedSize(e.target.value);
  };

  const handleClick = () => {
    if (selectedSize !== "Size") {
      let newItem = {
        DIY: true,
        Name: shirtName,
        Price: "$20.00",
        Quantity: quantity,
        SelectedSize: selectedSize,
        ImgUrl: selectPicUrl,
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
    }
  };
  const [quantity, setValue] = useState(1);
  const [selectedSize, setSelectedSize] = useState("Size");
  return (
    <Container className="Create">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div className="create_left">
          <div className="mix_shirt">
            <img id="details_image" src={shirt_base} alt="details_image" />
            <img id="overlay_image" src="" alt="overlay_image" />
          </div>
          <p className="shirt_price">$20.00</p>
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
            <button className="addToCart" onClick={handleClick}>
              Add To Cart
            </button>
          )}
        </div>
        <div className="create_right">
          <div>
            <input
              type="text"
              id="searchInput"
              placeholder="Search for pictures"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button type="button" className="search_button" onClick={getData}>
              Search
            </button>
          </div>
          {currentQuery === "" ? (
            <p className="no_search_results_text">
              No search results. Maybe use a Scotty?
            </p>
          ) : (
            <p></p>
          )}
          <div className="image-grid">
            {[...imageUrls[0]].map((imageUrl, i) => (
              <button
                key={imageUrl.id}
                className="image_button"
                onClick={() => addImage(imageUrls[0][i].urls.small)}
              >
                <img
                  key={imageUrl.id}
                  height="130px"
                  width="130px"
                  src={imageUrls[0][i].urls.thumb}
                  alt="imageUrl.id"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Create;
