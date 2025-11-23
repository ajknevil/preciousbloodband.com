import React from "react";
import { Modal, Button } from "react-bootstrap";

interface VideoModalProps {
  show: boolean;
  onHide: () => void;
  src: string | null;
}

export default function VideoModal({ show, onHide, src }: VideoModalProps) {
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Body className="p-0">
        <div className="embed-responsive embed-responsive-16by9">
          {src && (
            <iframe
              className="embed-responsive-item"
              src={src}
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="Video"
              style={{ width: "100%", height: "400px", border: 0 }}
            />
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
