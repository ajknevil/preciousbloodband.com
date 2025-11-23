import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";

export default function Bio() {
  const [text, setText] = useState("");

  useEffect(() => {
    fetch("/bio.html")
      .then((r) => {
        if (!r.ok) throw new Error("fetch failed");
        return r.text();
      })
      .then((t) => setText(t))
      .catch(() => setText("<p>Bio loading failed.</p>"));
  }, []);

  return (
    <section
      id="bio"
      className="bio-area section-padding-100 bg-img bg-overlay"
    >
      <Container>
        <Row className="align-items-center">
          <Col md={6} lg={5}>
            <div className="bio-thumb text-center mb-3">
              <img
                src="img/bg-img/bio-image.jpg"
                alt="Bio"
                className="img-fluid rounded"
                style={{ maxWidth: "100%", width: "100%", height: "auto" }}
                loading="lazy"
              />
            </div>
          </Col>
          <Col md={6} lg={7}>
            <div
              className="bio-content bg-white p-3 rounded"
              style={{ backgroundColor: "rgba(0,0,0,0.8)", color: "#88171b" }}
            >
              <div
                className="bio-markup"
                dangerouslySetInnerHTML={{
                  __html: text || "<p>Bio loading...</p>",
                }}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
