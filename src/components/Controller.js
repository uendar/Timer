/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Button from "../shared/Button";
import { FaPlay, FaSquareFull, FaPause } from "react-icons/fa";

const Controller = ({
  showTime,
  minutesToGo,
  handleTimeChange,
  play,
  startCountHandler,
  pauseCountHandler,
  stopCountHandler,
  stop,
}) => {
  return (
    <div className="Controller">
      <div className="time-box-input">
        {showTime ? (
          <div className="time-count">
            <p>{showTime}</p>
          </div>
        ) : (
          <input
            type="number"
            id="txtMinutes"
            value={minutesToGo}
            onChange={handleTimeChange}
            autoFocus
          />
        )}
      </div>
      <div className="time-box-controllers">
        {play ? (
          <Button onClick={startCountHandler} className="play-btn">
            <FaPlay />
          </Button>
        ) : (
          <Button onClick={pauseCountHandler} className="play-btn">
            <FaPause />
          </Button>
        )}
        <Button
          onClick={stopCountHandler}
          className="stop-btn"
          disabled={!stop}
        >
          <FaSquareFull />
        </Button>
      </div>
    </div>
  );
};

export default Controller;
