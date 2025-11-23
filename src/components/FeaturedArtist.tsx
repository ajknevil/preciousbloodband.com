import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function FeaturedArtist() {
  return (
    <section
      id="featured"
      className="featured-artist-area section-padding-100 bg-img bg-overlay"
      style={{ backgroundImage: "url(img/bg-img/bg-4.jpg)" }}
    >
      <Container>
        <Row className="align-items-end">
          <Col md={5} lg={4}>
            <div className="featured-artist-thumb">
              <img
                src="img/bg-img/fa.jpg"
                alt=""
                className="img-fluid"
                loading="lazy"
              />
            </div>
          </Col>
          <Col md={7} lg={8}>
            <div className="featured-artist-content text-white">
              <div className="section-heading white text-left mb-30">
                <p>See whats new</p>
                <h2>Featured Artist</h2>
              </div>
              <p>
                Nam tristique ex vel magna tincidunt, ut porta nisl finibus.
                Vivamus eu dolor eu quam varius rutrum.
              </p>
              <div className="song-play-area mt-3">
                <div className="song-name">
                  <p>01. Main Hit Song</p>
                </div>
                <audio preload="auto" controls>
                  <source src="audio/dummy-audio.mp3" />
                </audio>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
