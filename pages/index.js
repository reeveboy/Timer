import { useState } from "react";
import Countdown from "../components/Countdown";
import Timer from "../components/Timer";

export default function Home() {
  const [seconds, setSeconds] = useState(120);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <video
        autoPlay
        muted
        loop
        style={{
          position: "absolute",
          width: "100%",
          left: "50%",
          top: "50%",
          height: "100%",
          objectFit: "cover",
          transform: "translate(-50%, -50%)",
          zIndex: "-1",
        }}>
        <source src="/video/earth_rotate.mp4" type="video/mp4" />
      </video>

      <Timer />
    </div>
  );
}
