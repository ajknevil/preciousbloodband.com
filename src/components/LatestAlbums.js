import React from "react";
import { Carousel, Row, Col, Container } from "react-bootstrap";

function chunkArray(arr, size) {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size)
    chunks.push(arr.slice(i, i + size));
  return chunks;
}

export default function LatestAlbums({ albumList }) {
  return (
    <section id="albums" className="latest-albums-area section-padding-100">
      <Container>
        <Row>
          <Col>
            <div className="section-heading style-2 text-center mb-4">
              <p>Precious Blood's</p>
              <h2>Latest Albums</h2>
            </div>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col md={9} className="text-center mb-4">
            <p className="mb-0">
              Nam tristique ex vel magna tincidunt, ut porta nisl finibus.
              Vivamus eu dolor eu quam varius rutrum.
            </p>
          </Col>
        </Row>

        <Row>
          <Col>
            <Carousel controls indicators className="albums-slideshow">
              {chunkArray(albumList, 3).map((group, idx) => (
                <Carousel.Item key={idx}>
                  <Row>
                    {group.map((album, i) => (
                      <Col key={i} xs={12} md={4} className="d-flex">
                        <div className="single-album text-center w-100">
                          <img
                            src={album.img}
                            alt={album.title}
                            className="img-fluid"
                            loading="lazy"
                          />
                          <div className="album-info">
                            <a href="#albums">
                              <h5>{album.title}</h5>
                            </a>
                            <p>{album.subtitle}</p>
                          </div>
                        </div>
                      </Col>
                    ))}
                  </Row>
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
