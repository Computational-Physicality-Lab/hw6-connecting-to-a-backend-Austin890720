import "./App.css";
import { Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Footer from "./containers/Footer/Footer";
import Header from "./containers/Header/Header";
import Home from "./containers/Home/Home";
import routes from "./shared/appRoutes";
import NotImplement from "./containers/NotImplement/NotImplement";
import Tshirts from "./containers/Tshirts/Tshirts";
import Detail from "./containers/Detail/Detail";
import Cart from "./containers/Cart/Cart";
import Login from "./containers/Login/Login";
import Create from "./containers/Create/Create";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

export let userID;
// export const cartList =[{price: '$19.99', name: 'Beep Boop', quantity: 13, selectedSize: "Women's S", shirtColor: 'blue', shirtNumber: "0"}];
const App = () => {
  // useEffect(() => {
  //   db.collection("anchors").get().then(querySnapshot =>{
  //     console.log(querySnapshot.docs.map(doc => doc.data()))
  //   })
  // });
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
      if (user !== null) {
        userID = user.uid;
      }
    });
    return () => unsubscribe();
  }, []);
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      <Header user={user} />
      <div className="MainContent">
        <Routes>
          <Route exact path={routes.home} element={<Home />}></Route>
          <Route
            exact
            path={routes.notImplemented}
            element={<NotImplement />}
          ></Route>
          <Route exact path={routes.products} element={<Tshirts />}></Route>
          <Route exact path={routes.shoppingCart} element={<Cart />}></Route>
          <Route
            exact
            path={routes.detail}
            element={<Detail user={user} />}
          ></Route>
          <Route
            exact
            path={routes.login}
            element={<Login user={user} />}
          ></Route>
          <Route
            exact
            path={routes.create}
            element={<Create user={user} />}
          ></Route>
        </Routes>
      </div>

      <Footer />
    </div>
  );
};

export default App;
