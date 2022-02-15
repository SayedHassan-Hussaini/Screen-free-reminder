import { Icon } from "@iconify/react";
import { Row, Col, Button, Form, Image, Tabs, Tab } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import TimePicker2 from "../timePicker/TimePicker2";
import Card from "../card/Card";
import CardBody from "../card/CardBody";
import CardHeader from "../card/CardHeader";
import Modal from "../modal/modal";
import style from "./style.module.css";
import { useDispatch,useSelector } from "react-redux";
import {
  setUpdating,
  setDis_time,
  setDu_time,
} from "../../store/screenReminderSclice";

function ScreenFreeReminderCard() {
  const { dis_time } = useSelector(
    (state) => state.screen
  );
  const dispatch = useDispatch();
  const [changeMute, setChangeMute] = useState(false);
  const [isShow, setIsShow] = useState(true);
  // Modal
  const [sizeModal, setSizeModal] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const handleClose = () => setModalShow(false);
  // state for time input
  const [durationTime, setDurationTime] = useState({
    hours: "",
    minutes: "",
    seconds: "",
  });
  const [displayTime, setDisplayTime] = useState({
    hours: "",
    minutes: "",
    seconds: "",
  });
  const handleDurationTime = (val) => {
    const arr = val.split(":");
    const time =
      arr[0] * 24 * 60 * 60 * 1000 + arr[1] * 60 * 1000 + arr[2] * 1000;
    localStorage.setItem("duration_time", time);
    dispatch(setUpdating(false));
    return time;
  };
  const handleDisplayTime = (val) => {
    const arr = val.split(":");
    const time =
      arr[0] * 24 * 60 * 60 * 1000 + arr[1] * 60 * 1000 + arr[2] * 1000;
    localStorage.setItem("display_time", time);
    return time;
  };
  const handleSubmit = async () => {
    if (
      (durationTime.hours === "" &&
        durationTime.minutes === "" &&
        durationTime.seconds === "") ||
      (displayTime.hours === "" &&
        displayTime.minutes === "" &&
        displayTime.seconds === "")
    ) {
      return false;
    } else {
      dispatch(setUpdating(true));
      const du_time =
        durationTime.hours +
        ":" +
        durationTime.minutes +
        ":" +
        durationTime.seconds;
      const dis_time =
        displayTime.hours +
        ":" +
        displayTime.minutes +
        ":" +
        displayTime.seconds;
        console.log("dis",dis_time)
      dispatch(setDu_time(du_time));
      dispatch(setDis_time(dis_time));
      handleDisplayTime(dis_time);
      handleDurationTime(du_time);
      setModalShow(false);
    }
  };
  const handleMute = async () => {
    setChangeMute(true);
    if(isShow){
      setIsShow(false)
      localStorage.setItem("screen", "off");
      setChangeMute(false);
    }else{
      setIsShow(true)
      localStorage.setItem("screen", "on");
      setChangeMute(false);
    }
  };

  const setScreeanValue = (e) => {
    if (e === "1") {
      setDurationTime({
        hours: "01",
        minutes: "00",
        seconds: "00",
      });
      setDisplayTime({
        hours: "00",
        minutes: "05",
        seconds: "00",
      });
    }
    if (e === "2") {
      setDurationTime({
        hours: "00",
        minutes: "20",
        seconds: "00",
      });
      setDisplayTime({
        hours: "00",
        minutes: "01",
        seconds: "00",
      });
    }
  };
  //
  useEffect(() => {
    localStorage.setItem("screen", "on");
  }, []);

  return (
    <>
      <Card className={style.card}>
        <CardHeader
          icon={<Image src="/eye 1.png" alt="eye icon" />}
          title={"ScreenFree Reminder"}
          action={
            <>
              <i
                title="Set your screen free Reminder"
                onClick={() => {
                  // getUpdataData ()
                  setModalShow(true);
                  setSizeModal("md");
                }}
              >
                <Icon icon="vaadin:plus" />
              </i>
              <i
                onClick={() => {
                  // getUpdataData ()
                  setModalShow(true);
                  setSizeModal("md");
                }}
              >
                <Icon icon="vaadin:ellipsis-dots-v" />
              </i>
            </>
          }
          className="border-bottom"
        />
        <CardBody>
          <div className={style.wrapper}>
            <div className={style.header}>
              <span>
                {changeMute ? (
                  <Icon fontSize={24} icon="eos-icons:loading" />
                ) : (
                  <Form.Check
                    onClick={() => {
                      handleMute();
                    }}
                    defaultChecked={isShow}
                    type="checkbox"
                  />
                )}
              </span>
              <h6>{dis_time} screen free time</h6>
            </div>
            <p>
              last intermission{" "}
              {localStorage.getItem("loackTime")
                ? localStorage.getItem("loackTime")
                : "00:00:00"}
            </p>
          </div>
        </CardBody>
      </Card>
      {/* Modal */}
      <Modal
        size={sizeModal}
        show={modalShow}
        handleClose={handleClose}
        title="Set your screen free Reminder"
        body={
          <Tabs
            defaultActiveKey="default"
            transition={true}
            id="noanim-tab-example"
            className="mb-3"
          >
            <Tab eventKey="default" title="Default" className="pt-3 pb-4">
              <Form.Label>Options</Form.Label>
              <Form.Check
                onChange={(e) => {
                  setScreeanValue(e.target.value);
                }}
                value="1"
                name="screen"
                type="radio"
                label={`In every hours 5 minut`}
              />
              <Form.Check
                onChange={(e) => {
                  setScreeanValue(e.target.value);
                }}
                value="2"
                name="screen"
                type="radio"
                label={`In every 20 minut one minut`}
              />
            </Tab>
            <Tab eventKey="custome" title="Custome">
              <Row>
                <Col md={12}>
                  <TimePicker2
                    label={"duration time"}
                    value={durationTime}
                    setValue={setDurationTime}
                  />
                </Col>
                <Col md={12}>
                  <TimePicker2
                    label={"Display Time"}
                    value={displayTime}
                    setValue={setDisplayTime}
                  />
                </Col>
                {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Mute " />
            </Form.Group> */}
              </Row>
            </Tab>
          </Tabs>
        }
        footer={
          <>
            <Button
              onClick={() => {
                handleSubmit();
              }}
              variant="primary"
              type="button"
            >
              Save
            </Button>
            <Button variant="outline-dark" onClick={handleClose}>
              Close
            </Button>
          </>
        }
      />
    </>
  );
}

export default ScreenFreeReminderCard;
