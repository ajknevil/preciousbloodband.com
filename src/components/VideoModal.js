import React from "react";
import { Modal } from "react-bootstrap";

export default function VideoModal({ show, onHide, src, title = "Video" }) {
  return (
    <Modal size="lg" centered show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {src ? (
          <div className="ratio ratio-16x9">
            <iframe
              src={src}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <p>No video available</p>
        )}
      </Modal.Body>
    </Modal>
  );
}
