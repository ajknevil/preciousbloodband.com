import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function AppFooter() {
  return (
    <footer className="py-4 text-center app-footer">
      <Container>
        <Row>
          <Col>
            <p className="mb-0">
              © {new Date().getFullYear()} Precious BloodMusic. All rights
              reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
