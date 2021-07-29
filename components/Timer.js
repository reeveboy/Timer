import { useEffect, useRef, useState } from "react";
import { twoDigits } from "../utils/twoDigits";

const STATUS = {
  STARTED: "Started",
  STOPPED: "Stopped",
};

const INITAIL_TIME = 1200;

const Timer = (props) => {
  const [initial, setInitial] = useState(INITAIL_TIME);
  const [input, setInput] = useState(null);
  const [isInputting, setIsInputting] = useState(false);

  const [status, setStatus] = useState(STATUS.STOPPED);
  const [secondsRemaining, setSecondsRemaining] = useState(INITAIL_TIME);

  const secondsToDisplay = secondsRemaining % 60;
  const minutesRemaining = (secondsRemaining - secondsToDisplay) / 60;
  const minutesToDisplay = minutesRemaining % 60;
  const hoursToDisplay = (minutesRemaining - minutesToDisplay) / 60;

  const handleStart = () => {
    setStatus(STATUS.STARTED);
  };
  const handleStop = () => {
    setStatus(STATUS.STOPPED);
  };
  const handleReset = () => {
    setStatus(STATUS.STOPPED);
    setSecondsRemaining(initial);
  };

  useInterval(
    () => {
      if (secondsRemaining > 0) {
        setSecondsRemaining(secondsRemaining - 1);
      } else {
        alert();
        setStatus(STATUS.STOPPED);
      }
    },
    status === STATUS.STARTED ? 1000 : null
    // passing null stops the interval
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const inputStr = input === null ? "" : input.toString();
    const length = inputStr.length;
    let s2 = inputStr[length - 1] === undefined ? "0" : inputStr[length - 1];
    let s1 = inputStr[length - 2] === undefined ? "0" : inputStr[length - 2];
    let m2 = inputStr[length - 3] === undefined ? "0" : inputStr[length - 3];
    let m1 = inputStr[length - 4] === undefined ? "0" : inputStr[length - 4];
    let h2 = inputStr[length - 5] === undefined ? "0" : inputStr[length - 5];
    let h1 = inputStr[length - 6] === undefined ? "0" : inputStr[length - 6];

    const final =
      parseInt(h1 + h2, 10) * 60 * 60 +
      parseInt(m1 + m2, 10) * 60 +
      parseInt(s1 + s2, 10);
    setSecondsRemaining(final);
    setInitial(final);
    setIsInputting(false);
    setInput("");
  };

  const handleChange = (e) => {
    if (e.target.value.toString().length > 6) return;
    setInput(e.target.value);
  };

  const handleInput = () => {
    setIsInputting(true);
    setStatus(STATUS.STOPPED);
  };

  const alert = () => {
    let audio = new Audio("/audio/alert.mp3");
    return audio.play();
  };

  const display = () => {
    if (isInputting) {
      const inputStr = input === null ? "" : input.toString();
      const length = inputStr.length;
      let s2 = inputStr[length - 1] === undefined ? "" : inputStr[length - 1];
      let s1 = inputStr[length - 2] === undefined ? "" : inputStr[length - 2];
      let m2 = inputStr[length - 3] === undefined ? "" : inputStr[length - 3];
      let m1 = inputStr[length - 4] === undefined ? "" : inputStr[length - 4];
      let h2 = inputStr[length - 5] === undefined ? "" : inputStr[length - 5];
      let h1 = inputStr[length - 6] === undefined ? "" : inputStr[length - 6];

      if (input === null || input === "") {
        return (
          <div>
            <span className="text-5xl text-gray-700">
              {twoDigits(hoursToDisplay)}
            </span>
            <span className="text-xl text-gray-700">h &nbsp;</span>
            <span className="text-5xl text-gray-700">
              {twoDigits(minutesToDisplay)}
            </span>
            <span className="text-xl text-gray-700">m &nbsp;</span>
            <span className="text-5xl text-gray-700">
              {twoDigits(secondsToDisplay)}
            </span>
            <span className="text-xl text-gray-700">s</span>
          </div>
        );
      }

      return (
        <div>
          <span className="text-5xl text-gray-500">{h1 + h2}</span>
          <span className="text-xl text-gray-500" hidden={!h2}>
            h &nbsp;
          </span>
          <span className="text-5xl text-gray-500">{m1 + m2}</span>
          <span className="text-xl text-gray-500" hidden={!m2}>
            m &nbsp;
          </span>
          <span className="text-5xl text-gray-500">{s1 + s2}</span>
          <span className="text-xl text-gray-500" hidden={!s2}>
            s
          </span>
        </div>
      );
    }
    return (
      <div>
        <span className="text-5xl text-white" hidden={hoursToDisplay === 0}>
          {twoDigits(hoursToDisplay)}
        </span>
        <span className="text-xl text-white" hidden={hoursToDisplay === 0}>
          h &nbsp;
        </span>
        <span className="text-5xl text-white" hidden={minutesToDisplay === 0}>
          {twoDigits(minutesToDisplay)}
        </span>
        <span className="text-xl text-white" hidden={minutesToDisplay === 0}>
          m &nbsp;
        </span>
        <span className="text-5xl text-white">
          {twoDigits(secondsToDisplay)}
        </span>
        <span className="text-xl text-white">s</span>
      </div>
    );
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <span className="text-xl font-bold text-white">
        Work is Hard..
        <br />
        You'll make it through!
      </span>
      <div onClick={handleInput} className="relative">
        {display()}
        <form onSubmit={handleSubmit}>
          <input
            className="opacity-0 absolute top-1 px-5 py-3"
            type="number"
            min={0}
            value={input}
            maxLength={6}
            onChange={handleChange}></input>
        </form>
      </div>
      <div>
        {status === STATUS.STOPPED ? (
          <button
            onClick={handleStart}
            type="button"
            className="rounded-md border border-white m-4 px-3 py-2">
            <span className="text-white">Start</span>
          </button>
        ) : (
          <button
            onClick={handleStop}
            type="button"
            className="rounded-md border border-white m-4 px-3 py-2">
            <span className="text-white">Stop</span>
          </button>
        )}

        <button
          onClick={handleReset}
          type="button"
          className="rounded-md border border-white m-4 px-3 py-2">
          <span className="text-white">Reset</span>
        </button>
      </div>
    </div>
  );
};

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default Timer;
