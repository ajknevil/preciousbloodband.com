import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

export interface Album {
  img: string;
  title: string;
  subtitle?: string;
}

interface LatestAlbumsProps {
  albumList: Album[];
}

export default function LatestAlbums({ albumList }: LatestAlbumsProps) {
  return (
    <section
      id="albums"
      className="latest-albums-area section-padding-100 bg-img bg-overlay"
    >
      <Container>
        <h2 className="text-center mb-4">Latest Albums</h2>
        <Row>
          {albumList.map((album, idx) => (
            <Col key={idx} md={4} sm={6} xs={12} className="mb-4">
              <Card className="h-100">
                <Card.Img variant="top" src={album.img} alt={album.title} />
                <Card.Body>
                  <Card.Title>{album.title}</Card.Title>
                  {album.subtitle && <Card.Text>{album.subtitle}</Card.Text>}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
