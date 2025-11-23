import React from "react";
import { Container, Carousel, Button } from "react-bootstrap";
import videos from "../data/videos.json";

interface VideoProps {
  onWatchVideo?: (embed: string, vid: string) => void;
  className?: string;
}

export default function Video({ onWatchVideo, className = "" }: VideoProps) {
  const videoList = videos || [];
  if (videoList.length === 0) return null;

  const handleOpen = (vid: string) => {
    const embed = `https://www.youtube.com/embed/${vid}?autoplay=1&rel=0`;
    if (onWatchVideo) onWatchVideo(embed, vid);
  };

  return (
    <section
      id="videos"
      className={`video-area section-padding-100 fullscreen-video-section ${className}`.trim()}
    >
      <Container
        fluid
        className="h-100 d-flex flex-column justify-content-center"
      >
        <h3 className="mb-4">Videos</h3>
        <Carousel>
          {videoList.map((v) => (
            <Carousel.Item key={v.id}>
              <a
                href="#play"
                onClick={(e) => {
                  e.preventDefault();
                  handleOpen(v.vid);
                }}
              >
                <img
                  className="d-block w-100 rounded video-thumb"
                  src={v.thumb}
                  alt={v.title}
                />
              </a>
              <Carousel.Caption>
                <h5
                  style={{
                    fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
                    fontWeight: 700,
                  }}
                >
                  {v.title}
                </h5>
                <p>
                  <Button
                    variant="light"
                    size="sm"
                    onClick={() => handleOpen(v.vid)}
                  >
                    Play
                  </Button>
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
    </section>
  );
}
