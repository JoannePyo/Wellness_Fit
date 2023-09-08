import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./home.scss";

function Home() {
  return (
    <Row>
      <Col
        md={6}
        className="d-flex flex-direction-column align-items-center justify-content-center"
      >
        <div className="homeword">
          <h1>Your health depends on your choices.</h1>
          <p style={{ fontSize: "1.2em", color: "gray" }}>
            "Physical fitness can neither be achieved by wishful thinking, nor
            outright purchase." - Joseph Pilates
          </p>
          <LinkContainer to="/login">
            <Button variant="success" className="homeButton">
              Get Started !
            </Button>
          </LinkContainer>
        </div>
      </Col>
      <Col md={6} className="home_scss"></Col>
    </Row>
  );
}

export default Home;
