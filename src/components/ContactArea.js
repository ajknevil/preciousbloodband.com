import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

export default function ContactArea() {
  return (
    <section
      id="contact"
      className="contact-area section-padding-100 bg-img bg-overlay has-bg-img"
      style={{ backgroundImage: "url(img/bg-img/bg-2.jpg)" }}
    >
      <Container>
        <Row>
          <Col>
            <div className="section-heading white text-left mb-30">
              <p>See what’s new</p>
              <h2>Get In Touch</h2>
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <form>
              <Row>
                <Col md={6} lg={4} className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                  />
                </Col>
                <Col md={6} lg={4} className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                  />
                </Col>
                <Col lg={4} className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Subject"
                  />
                </Col>
                <Col xs={12} className="mb-3">
                  <textarea
                    className="form-control"
                    rows={4}
                    placeholder="Message"
                  />
                </Col>
                <Col xs={12} className="text-center">
                  <Button type="submit">Send Message</Button>
                </Col>
              </Row>
            </form>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
