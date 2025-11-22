import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import MasonryGallery from "./MasonryGallery";

export default function BuyNowArea({ items }) {
  return (
    <section
      id="buy"
      className="oneMusic-buy-now-area has-fluid bg-gray section-padding-100"
    >
      <Container fluid>
        <Row>
          <Col className="text-center">
            <div className="section-heading style-2">
              <p>See what’s new</p>
              <h2>Buy What’s New</h2>
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <MasonryGallery items={items} />
          </Col>
        </Row>
      </Container>
    </section>
  );
}
