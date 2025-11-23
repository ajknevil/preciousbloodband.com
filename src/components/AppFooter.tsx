import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function AppFooter() {
  return (
    <footer className="footer-area section-padding-100-0">
      <Container>
        <Row>
          <Col md={12} className="text-center">
            <div className="footer-content">
              <p>
                &copy; {new Date().getFullYear()} Precious Blood Band. All
                rights reserved.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
