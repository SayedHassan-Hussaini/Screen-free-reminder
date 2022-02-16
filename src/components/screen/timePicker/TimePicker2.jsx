import React, { useState, useEffect } from "react";
import { Col, Form, Row } from "react-bootstrap";

function TimePicker({ label, value, setValue }) {
  const [houreValue, setHoursValue] = useState("");
  const [minuteValue, setMinuteValue] = useState("");
  const [secondValue, setSecondeValue] = useState("");

  useEffect(() => {
    if (value) {
      setHoursValue(value.hours);
      setMinuteValue(value.minutes);
      setSecondeValue(value.seconds);
    }
  }, [value]);

  const validatHours = (e) => {
    const value = e.target.value;
    const hours = value < 12 ? value : 12;
    setValue({
      hours: hours,
      minutes: minuteValue === "" ? "00" : minuteValue,
      seconds: secondValue === "" ? "00" : secondValue,
    });
  };

  const validatMintteAndSeconds = (value, type) => {
    const val = value <= 60 ? value : 60;
    if (type === "sec") {
      setValue({
        hours: houreValue === "" ? "00" : houreValue,
        minutes: minuteValue === "" ? "00" : minuteValue,
        seconds: val,
      });
      return "";
    } else {
      setValue({
        hours: houreValue === "" ? "00" : houreValue,
        minutes: val,
        seconds: secondValue === "" ? "00" : secondValue,
      });
      return "";
    }
  };
  const timeFormat = (time) => {
    if (time.hours.length == 1)
      setValue({ ...time, ["hours"]: "0" + time.hours });
    if (time.hours.length == 0) setValue({ ...time, ["hours"]: "00" });
    if (time.hours.length > 2) setValue({ ...time, ["hours"]: "00" });

    if (time.minutes.length == 1)
      setValue({ ...time, ["minutes"]: "0" + time.minutes });
    if (time.minutes.length == 0) setValue({ ...time, ["minutes"]: "00" });
    if (time.minutes.length > 2) setValue({ ...time, ["minutes"]: "00" });

    if (time.seconds.length == 1)
      setValue({ ...time, ["seconds"]: "0" + time.seconds });
    if (time.seconds.length == 0) setValue({ ...time, ["seconds"]: "00" });
    if (time.seconds.length > 2) setValue({ ...time, ["seconds"]: "00" });
  };
  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Row>
        <Col>
          <label>Hour</label>
          <Form.Control
            type="number"
            placeholder="hr"
            min={0}
            max={12}
            value={value?.hours}
            onChange={validatHours}
            onBlur={() => {
              timeFormat(value);
            }}
          />
        </Col>

        <Col>
          <label>Minute</label>
          <Form.Control
            type="number"
            placeholder="min"
            min={0}
            max={60}
            value={value?.minutes}
            onChange={(e) => validatMintteAndSeconds(e.target.value, "min")}
            onBlur={() => {
              timeFormat(value);
            }}
          />
        </Col>
        <Col>
          <label>Seconds</label>
          <Form.Control
            type="number"
            placeholder="sec"
            min={0}
            max={60}
            value={value?.seconds}
            onChange={(e) => validatMintteAndSeconds(e.target.value, "sec")}
            onBlur={() => {
              timeFormat(value);
            }}
          />
        </Col>
      </Row>
    </Form.Group>
  );
}

export default TimePicker;
