import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function BuyNowArea() {
  return (
    <section className="buy-now-area section-padding-100 bg-img bg-overlay">
      <Container>
        <Row>
          <Col md={12} className="text-center">
            <h2>Buy Now</h2>
            <p>Purchase our latest album and merchandise!</p>
            {/* Add buy buttons or links here */}
          </Col>
        </Row>
      </Container>
    </section>
  );
}
