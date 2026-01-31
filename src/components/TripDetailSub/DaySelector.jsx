import React from "react";

const DaySelector = ({ days, startDate, activeDay, onSelectDay }) => {
  const getDayDetails = (dayNumber) => {
    const start = new Date(startDate);
    const targetDate = new Date(start);
    targetDate.setDate(start.getDate() + (dayNumber - 1));

    return {
      weekday: targetDate.toLocaleDateString("en-US", { weekday: "short" }),
      date: targetDate.getDate(),
      month: targetDate.toLocaleDateString("en-US", { month: "short" }),
    };
  };

  // SUB TITLE BAR
  // 呢度仲保留一個簡單嘅 helper，用嚟顯示 Header 嗰行（Day X 行程）
  const getHeaderDate = (dayNum) => {
    const d = new Date(startDate);
    d.setDate(d.getDate() + (dayNum - 1));
    return {
      weekday: d.toLocaleDateString("en-US", { weekday: "short" }),
      date: d.getDate(),
      month: d.toLocaleDateString("en-US", { month: "short" }),
    };
  };

  const currentDetails = getHeaderDate(activeDay);

  return (
    <div>
      <div className="day-selector">
        {Array.from({ length: days }, (_, i) => i + 1).map((dayNum) => {
          const d = getDayDetails(dayNum);
          return (
            <div
              key={dayNum}
              className={`day-card ${activeDay === dayNum ? "active" : ""}`}
              onClick={() => onSelectDay(dayNum)}
            >
              <div className="weekday">{d.weekday}</div>
              <div className="date-num">{d.date}</div>
            </div>
          );
        })}
      </div>
      <div style={{ padding: "0 10px", marginBottom: "15px" }}>
        <span style={{ color: "#FF8A8A", fontWeight: "bold" }}>
          {currentDetails.weekday}{" "}
        </span>
        <span style={{ fontSize: "24px", fontWeight: "900" }}>
          {currentDetails.date}
        </span>
        <span style={{ color: "#888", marginLeft: "5px" }}>
          {currentDetails.month}
        </span>
        <h2 style={{ margin: "5px 0" }}>Day {activeDay} 行程</h2>
      </div>
    </div>
  );
};

export default DaySelector;
