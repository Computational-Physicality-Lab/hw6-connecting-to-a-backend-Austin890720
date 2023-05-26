import React from "react";
import { Container } from "reactstrap";
import banner from "../../assets/images/banner.png";
import "./Home.css";

const Home = () => {
  return (
    <Container className="Home">
      <img className="home" src={banner} alt="" />
      <div className="document">
        <div className="box">
          <h1 className="box_title">We don't ship. We're not real.</h1>
          <p className="box_text">
            We sell shirts. We are passionate about selling shirts. But keep in
            mind we have no infrastructure, supply chain, or mechanism to
            actually produce these shirts or fulfill the orders. But the shirts
            will always be real in your imagination.
          </p>
        </div>
        <div className="box">
          <h1 className="box_title">We don't ship. We're not real.</h1>
          <p className="box_text">
            We sell shirts. We are passionate about selling shirts. But keep in
            mind we have no infrastructure, supply chain, or mechanism to
            actually produce these shirts or fulfill the orders. But the shirts
            will always be real in your imagination.
          </p>
        </div>
      </div>
    </Container>
  );
};
export default Home;
