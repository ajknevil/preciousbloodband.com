import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import shows from "../data/shows.json";
import { makeSrcSetsFor } from "../utils/imageHelpers";

export default function Shows() {
  const upcoming = Array.isArray(shows) ? shows : [];
  return (
    <section
      id="shows"
      className="shows-area section-padding-100 bg-img bg-overlay"
    >
      <Container>
        <Row>
          <Col>
            <div className="section-heading style-2 text-center mb-4">
              <p>On the Road</p>
              <h2>Upcoming Shows</h2>
            </div>
          </Col>
        </Row>

        <Row className="justify-content-center">
          {upcoming.map((s, i) => {
            const parts = [
              s.venue && s.venue.trim(),
              s.address && s.address.trim(),
              s.city && s.city.trim(),
            ].filter(Boolean);
            const ariaLabel = parts.length
              ? `${parts.join(", ")}${s.date ? ` on ${s.date.trim()}` : ""}`
              : s.venue || "";

            const base = s.img ? s.img.replace(/\.jpg$/, "") : null;
            const sets = base ? makeSrcSetsFor(base, [480, 800, 1200]) : null;

            return (
              <Col key={i} xs={12} md={4} className="mb-3">
                <div className="single-show text-center p-3 border rounded bg-white">
                  {sets && (
                    <picture>
                      <source
                        type="image/avif"
                        srcSet={sets.avif}
                        sizes="(max-width: 600px) 100vw, 33vw"
                      />
                      <source
                        type="image/webp"
                        srcSet={sets.webp}
                        sizes="(max-width: 600px) 100vw, 33vw"
                      />
                      <source
                        media="(max-width: 600px)"
                        srcSet={sets.smallSvg}
                      />
                      <img
                        src={sets.jpgSrc}
                        srcSet={sets.jpgSrcSet}
                        sizes="(max-width: 600px) 100vw, 33vw"
                        alt={s.venue}
                        aria-label={ariaLabel}
                        className="img-fluid mb-2 rounded"
                        loading="lazy"
                      />
                    </picture>
                  )}

                  <h5 className="mb-1">{s.venue}</h5>
                  {s.address && (
                    <p className="mb-0 text-muted small">{s.address}</p>
                  )}
                  <p
                    className="mb-0 text-muted small"
                    style={{ lineHeight: 1 }}
                  >
                    {s.city}
                  </p>
                  <p className="mt-2 fw-bold">{s.date}</p>
                </div>
              </Col>
            );
          })}
        </Row>
      </Container>
    </section>
  );
}
