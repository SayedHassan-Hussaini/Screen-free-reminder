import React from "react";
import { Modal, Form, Container } from "react-bootstrap";

function CustomModal(props) {
  const { title, body, footer, handleClose, size, className, subTitle } = props;
  return (
    <Modal
      {...props}
      size={size}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={handleClose}
      className={className}
    >
      <Container>
        <Form>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              {title}
              <br />
              <span className="modal-sub-title">{subTitle}</span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>{body}</Modal.Body>
          <Modal.Footer>{footer}</Modal.Footer>
        </Form>
      </Container>
    </Modal>
  );
}
export default CustomModal;
