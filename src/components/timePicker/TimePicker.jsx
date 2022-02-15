import React from "react";
import { Col, Form, Row } from "react-bootstrap";

function TimePicker({ label }) {
  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Row>
        <Col>
          <Form.Control type="number" placeholder="hr" min={0} max={12} />
        </Col>

        <Col>
          <Form.Control type="number" placeholder="min" min={0} max={60} />
        </Col>
        <Col>
          <Form.Control type="number" placeholder="sec" min={0} max={60} />
        </Col>
      </Row>
    </Form.Group>
  );
}

export default TimePicker;
