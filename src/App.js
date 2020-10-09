import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import "./styles.css";

const minuteSeconds = 60;
const hourSeconds = 3600;
const daySeconds = 86400;

const timerProps = {
    isPlaying: true,
    size: 240,
    strokeWidth: 24,
};

const renderTime = (dimension, time) => {
    return (
        <div className="time-wrapper">
            <div className="time">{time}</div>
            <div>{dimension}</div>
        </div>
    );
};

const getTimeSeconds = (time) => (minuteSeconds - time) | 0;
const getTimeMinutes = (time) => ((time % hourSeconds) / minuteSeconds) | 0;
const getTimeHours = (time) => ((time % daySeconds) / hourSeconds) | 0;

export default function App() {

    const remainingTime = ((new Date("Sun Oct 11 2020 11:00:00 GMT+0800 (Taipei Standard Time)")) - new Date()) /1000

    return (
        <div className="App">
            <CountdownCircleTimer
                {...timerProps}
                colors={[["#0081B4"]]}
                trailColor="#FFFFFF"
                duration={daySeconds}
                initialRemainingTime={remainingTime % daySeconds}
                onComplete={(totalElapsedTime) => [
                    remainingTime - totalElapsedTime > hourSeconds,
                ]}
            >
                {({ elapsedTime }) => {
                    return renderTime(
                        "hours",
                        getTimeHours(daySeconds - elapsedTime)
                    );
                }}
            </CountdownCircleTimer>
            <CountdownCircleTimer
                {...timerProps}
                colors={[["#00528E"]]}
                trailColor="#FFFFFF"
                duration={hourSeconds}
                initialRemainingTime={remainingTime % hourSeconds}
                onComplete={(totalElapsedTime) => [
                    remainingTime - totalElapsedTime > minuteSeconds,
                ]}
            >
                {({ elapsedTime }) =>
                    renderTime(
                        "minutes",
                        getTimeMinutes(hourSeconds - elapsedTime)
                    )
                }
            </CountdownCircleTimer>
            <CountdownCircleTimer
                {...timerProps}
                trailColor="#000000"
                colors={[["#FFE0E0"]]}
                duration={minuteSeconds}
                initialRemainingTime={remainingTime % minuteSeconds}
                onComplete={(totalElapsedTime) => [
                    remainingTime - totalElapsedTime > 0,
                ]}
            >
                {({ elapsedTime }) =>
                    renderTime("seconds", getTimeSeconds(elapsedTime))
                }
            </CountdownCircleTimer>
        </div>
    );
}
