/* eslint-disable react-hooks/exhaustive-deps */
import "./styles/styles.scss";
import React, { useState, useRef, useEffect } from "react";
import Layout from "./components/Layout";
import Controller from "./components/Controller";

function App() {
  const [minutesToGo, setMinutesToGo] = useState("");
  const [showTime, setShowTime] = useState(null);
  const [fullDateTime, setFullDateTime] = useState(null);
  const [play, setPlay] = useState(true);
  const [stop, setStop] = useState(false);
  const [resumeTime, setResumeTime] = useState(null);
  const [intervalStatus, setIntervalStatus] = useState(null);
  const [milliseconds, setMilliseconds] = useState(null);
  const refTimeCount = useRef(null);
  const refCount = useRef(0);

  useEffect(() => {
    if (fullDateTime) {
      startCountDown();
    }
  }, [fullDateTime]);

  useEffect(() => {
    if (milliseconds && milliseconds > 0) {
      loadingCountHandler();
    }
  }, [milliseconds]);

  const handleTimeChange = (e) => {
    setMinutesToGo(e.target.value);
  };

  const startCountHandler = () => {
    if (minutesToGo) {
      let showTimeCount;
      if (resumeTime) {
        setFullDateTime(new Date(resumeTime));
        refTimeCount.current = new Date(resumeTime);
        showTimeCount = resumeTime.toISOString().substr(11, 8);
      } else {
        const date = new Date(null);
        date.setMinutes(minutesToGo);

        setFullDateTime(new Date(date));
        refTimeCount.current = new Date(date);
        showTimeCount = date.toISOString().substr(11, 8);
      }
      setShowTime(showTimeCount);
      setPlay(false);
    }
  };

  const startCountDown = () => {
    setStop(true);
    if (fullDateTime) {
      let interval = setInterval(() => {
        const time = refTimeCount.current?.getTime();
        if (time && time <= 0) {
          clearInterval(interval);
          return;
        }
        setMilliseconds(time);
        let newTime = refTimeCount.current?.getTime() - 1000;
        refTimeCount.current = new Date(newTime);
        const stringToShow = refTimeCount.current.toISOString().substr(11, 8);
        if (stringToShow !== "23:59:59") {
          setMilliseconds(newTime);
          setShowTime(stringToShow);
        } else {
          setShowTime(null);
          setPlay(true);
          setStop(false);
          refCount.current = 0;
          setMinutesToGo("");
        }
      }, 1000);
      setIntervalStatus(interval);
    }
  };

  const stopCountHandler = () => {
    if (stop) {
      refCount.current = 0;
      setStop(false);
      setPlay(true);
      setShowTime(false);
      setMinutesToGo("");
      setResumeTime(refTimeCount.current);
      clearInterval(intervalStatus);
    }
  };

  const pauseCountHandler = () => {
    setPlay(true);
    clearInterval(intervalStatus);
    setResumeTime(refTimeCount.current);
    setShowTime(refTimeCount.current.toISOString().substr(11, 8));
  };

  const loadingCountHandler = () => {
    refCount.current = refCount.current + 1.67 / minutesToGo;
  };

  return (
    <div className="App">
      <Layout loadingTime={refCount.current} />
      <Controller
        showTime={showTime}
        minutesToGo={minutesToGo}
        handleTimeChange={handleTimeChange}
        play={play}
        startCountHandler={startCountHandler}
        pauseCountHandler={pauseCountHandler}
        stopCountHandler={stopCountHandler}
        stop={stop}
      />
    </div>
  );
}

export default App;
