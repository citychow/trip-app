import React, { useState, useEffect } from "react";

const Countdown = ({ startDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hms: "00:00:00",
    isStarted: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      // 設定出發日期為當天 00:00:00
      const start = new Date(`${startDate}T00:00:00`);
      const diff = start - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hms: "旅程進行中！✈️", isStarted: true });
        return;
      }

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24)
        .toString()
        .padStart(2, "0");
      const m = Math.floor((diff / 1000 / 60) % 60)
        .toString()
        .padStart(2, "0");
      const s = Math.floor((diff / 1000) % 60)
        .toString()
        .padStart(2, "0");

      setTimeLeft({ days: d, hms: `${h}:${m}:${s}`, isStarted: false });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);

    return () => clearInterval(timer);
  }, [startDate]);

  return (
    <div className="countdown-card">
      <div className="timer-text1">
        {timeLeft.isStarted ? "Status" : "距離出發"}
      </div>
      <div className="timer-text2">
        {timeLeft.isStarted ? (
          timeLeft.hms
        ) : (
          <>
            {timeLeft.days} <span style={{ fontSize: "18px" }}>天</span>{" "}
            {timeLeft.hms}
          </>
        )}
      </div>
      <div className="timer-text3">
        {startDate} 出發
      </div>
    </div>
  );
};

export default Countdown;
