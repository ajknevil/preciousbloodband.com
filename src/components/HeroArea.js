import React from "react";
import { Carousel, Container, Row, Col, Button } from "react-bootstrap";
import { makeSrcSets } from "../utils/imageHelpers";

export default function HeroArea({ onWatchVideo }) {
  const carouselStyle = { height: "100%" };
  const slideStyle = { height: "100%" };
  const figureStyle = { height: "100%", width: "100%" };

  return (
    <section
      id="hero"
      className="hero-area"
      style={{
        minHeight: "calc(100vh - var(--app-header-height, 64px))",
        height: "calc(100vh - var(--app-header-height, 64px))",
        minWidth: "100%",
      }}
    >
      <Carousel
        fade
        controls
        indicators
        interval={5000}
        className="hero-slides"
        style={carouselStyle}
      >
        <Carousel.Item>
          <div
            className="single-hero-slide d-flex align-items-center justify-content-center"
            style={slideStyle}
          >
            <figure className="hero-slide-figure" style={figureStyle}>
              <picture>
                {/* AVIF sources (best) */}
                {(() => {
                  const s = makeSrcSets("img/bg-img/bg-1");
                  return (
                    <source
                      type="image/avif"
                      srcSet={s.avif}
                      sizes="(max-width: 600px) 100vw, 1200px"
                    />
                  );
                })()}
                {/* WebP fallback */}
                {(() => {
                  const s = makeSrcSets("img/bg-img/bg-1");
                  return (
                    <source
                      type="image/webp"
                      srcSet={s.webp}
                      sizes="(max-width: 600px) 100vw, 1200px"
                    />
                  );
                })()}
                {/* small SVG placeholder for very small viewports */}
                {(() => {
                  const s = makeSrcSets("img/bg-img/bg-1");
                  return (
                    <>
                      <source media="(max-width: 600px)" srcSet={s.smallSvg} />
                      <img
                        src={s.jpgSrc}
                        srcSet={s.jpgSrcSet}
                        sizes="(max-width: 600px) 100vw, 1200px"
                        alt="Hero 1"
                        className="img-fluid hero-slide-img"
                        loading="lazy"
                      />
                    </>
                  );
                })()}
              </picture>
            </figure>
            <Container fluid>
              <Row>
                <Col className="text-center">
                  <div className="hero-slides-content">
                    <h6>Latest album</h6>
                    <h2>
                      False Prophets{" "}
                      <span aria-hidden="true">False Prophets</span>
                    </h2>
                    <Button variant="primary" className="mt-3" href="#albums">
                      Discover
                    </Button>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div
            className="single-hero-slide d-flex align-items-center justify-content-center"
            style={slideStyle}
          >
            <figure className="hero-slide-figure" style={figureStyle}>
              <picture>
                {(() => {
                  const s = makeSrcSets("img/bg-img/bg-images-3");
                  return (
                    <source
                      type="image/avif"
                      srcSet={s.avif}
                      sizes="(max-width: 600px) 100vw, 1200px"
                    />
                  );
                })()}
                {(() => {
                  const s = makeSrcSets("img/bg-img/bg-images-3");
                  return (
                    <source
                      type="image/webp"
                      srcSet={s.webp}
                      sizes="(max-width: 600px) 100vw, 1200px"
                    />
                  );
                })()}
                {(() => {
                  const s = makeSrcSets("img/bg-img/bg-images-3");
                  return (
                    <>
                      <source media="(max-width: 600px)" srcSet={s.smallSvg} />
                      <img
                        src={s.jpgSrc}
                        srcSet={s.jpgSrcSet}
                        sizes="(max-width: 600px) 100vw, 1200px"
                        alt="Hero 3"
                        className="img-fluid hero-slide-img"
                        loading="lazy"
                      />
                    </>
                  );
                })()}
              </picture>
            </figure>
            <Container fluid>
              <Row>
                <Col className="text-center">
                  <div className="hero-slides-content">
                    <h6>On Tour</h6>
                    <h2>
                      Catch Us Live <span aria-hidden="true">On the Road</span>
                    </h2>
                    <Button variant="primary" className="mt-3" href="#shows">
                      See Shows
                    </Button>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </Carousel.Item>

        <Carousel.Item>
          <div
            className="single-hero-slide d-flex align-items-center justify-content-center"
            style={slideStyle}
          >
            <figure className="hero-slide-figure" style={figureStyle}>
              <picture>
                {(() => {
                  const s = makeSrcSets("img/bg-img/bg-2");
                  return (
                    <source
                      type="image/avif"
                      srcSet={s.avif}
                      sizes="(max-width: 600px) 100vw, 1200px"
                    />
                  );
                })()}
                {(() => {
                  const s = makeSrcSets("img/bg-img/bg-2");
                  return (
                    <source
                      type="image/webp"
                      srcSet={s.webp}
                      sizes="(max-width: 600px) 100vw, 1200px"
                    />
                  );
                })()}
                {(() => {
                  const s = makeSrcSets("img/bg-img/bg-2");
                  return (
                    <>
                      <source media="(max-width: 600px)" srcSet={s.smallSvg} />
                      <img
                        src={s.jpgSrc}
                        srcSet={s.jpgSrcSet}
                        sizes="(max-width: 600px) 100vw, 1200px"
                        alt="Hero 2"
                        className="img-fluid hero-slide-img"
                        loading="lazy"
                      />
                    </>
                  );
                })()}
              </picture>
            </figure>
            <Container fluid>
              <Row>
                <Col className="text-center">
                  <div className="hero-slides-content">
                    <h6>Latest Video</h6>
                    <h2>
                      El Muerte <span aria-hidden="true">El Muerte </span>
                    </h2>
                    <Button
                      variant="primary"
                      className="mt-3"
                      onClick={() =>
                        onWatchVideo &&
                        onWatchVideo(
                          "https://www.youtube.com/embed/OFdPTWqJsns?autoplay=1"
                        )
                      }
                    >
                      Watch Video
                    </Button>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </Carousel.Item>
      </Carousel>
    </section>
  );
}
