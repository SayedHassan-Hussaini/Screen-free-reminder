import { Icon } from "@iconify/react";
import { Row, Col, Button, Form, Image, Tabs, Tab } from "react-bootstrap";
import style from "./style.module.css";
import Countdown from "react-countdown";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUpdating } from "../../store/screenReminderSclice";

function LockScreen() {
  const [start, setStart] = useState(true);
  const { du_time, dis_time, updating } = useSelector((state) => state.screen);
  const dispatch = useDispatch();

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
  useEffect(() => {
    localStorage.removeItem("duration_time");
    localStorage.removeItem('display_time"');
    dispatch(setUpdating(true));
    if (du_time && dis_time) {
      handleDisplayTime(dis_time);
      handleDurationTime(du_time);
    }
  }, []);

  return (
    <>
      {start && (
        <Countdown
          key={`c-4`}
          date={Date.now() + +localStorage.getItem("duration_time")}
          autoStart={start ? true : false}
          onTick={(e) => {
            if (localStorage.getItem("screen") === "on" && !updating) {
              localStorage.setItem("duration_time", e.total);
            }
          }}
          onComplete={() => {
            setStart(false);
            handleDurationTime(du_time);
            if (localStorage.getItem("screen") === "on") {
              const timeLock = new Date();
              localStorage.setItem(
                "loackTime",
                timeLock.getHours() +
                  ":" +
                  timeLock.getMinutes() +
                  ":" +
                  timeLock.getSeconds()
              );
            }
          }}
            renderer={() => {
              return "";
            }}
        />
      )}

      {!start && localStorage.getItem("screen") === "on" && (
        <div className={`${style.lockScreen}`}>
          <div className={`${style.screenDiv} text-center`}>
            <h1>Screen Lock For</h1>
            <Countdown
              key={`c-5`}
              date={Date.now() + +localStorage.getItem("display_time")}
              onComplete={() => {
                setStart(true);
              }}
              // renderer={() => {
              //   return ""
              // }}
            />
          </div>
        </div>
      )}
      {!start && localStorage.getItem("screen") === "off" && (
        <Countdown
          key={`c-5`}
          date={Date.now() + +localStorage.getItem("display_time")}
          onTick={(e) => {
            if (localStorage.getItem("screen") === "on") {
              setStart(true);
            }
          }}
          onComplete={() => {
            setStart(true);
          }}
          renderer={() => {
            return ""
          }}
        />
      )}
    </>
  );
}
export default LockScreen;
