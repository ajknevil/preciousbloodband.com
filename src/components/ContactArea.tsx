import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function ContactArea() {
  return (
    <section className="contact-area section-padding-100 bg-img bg-overlay">
      <Container>
        <Row>
          <Col md={12} className="text-center">
            <h2>Contact Us</h2>
            <p>
              For booking and inquiries, please email us at{" "}
              <a href="mailto:info@preciousbloodband.com">
                info@preciousbloodband.com
              </a>
            </p>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
