import React, { useRef } from "react";

const DaySelector = ({ days, startDate, activeDay, onSelectDay }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 240; 
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

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

  const currentDetails = getDayDetails(activeDay);

  const handleSelectDay = (dayNum, event) => {
    onSelectDay(dayNum);
    // Smoothly center the clicked card in the viewport
    event.currentTarget.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest'
    });
  };

  return (
    <div>
      <div className="day-selector-wrapper">
        <button className="nav-btn left" onClick={() => scroll("left")}>‹</button>

        <div className="day-selector" ref={scrollRef}>
          {Array.from({ length: days }, (_, i) => i + 1).map((dayNum) => {
            const d = getDayDetails(dayNum);
            return (
              <div
                key={dayNum}
                className={`day-card ${activeDay === dayNum ? "active" : ""}`}
                // Use handleSelectDay to trigger the scroll-into-view logic
                onClick={(e) => handleSelectDay(dayNum, e)}
              >
                <div className="weekday">{d.weekday}</div>
                <div className="date-num">{d.date}</div>
              </div>
            );
          })}
        </div>

        <button className="nav-btn right" onClick={() => scroll("right")}>›</button>
      </div>

      {/* Trip Details Header */}
      <div className="header-box">
        <span className="weekday">
          {currentDetails.weekday}{" "}
        </span>
        <span className="date">
          {currentDetails.date}
        </span>
        <span className="month">
          {currentDetails.month}
        </span>
        <h2>Day {activeDay} 行程</h2>
      </div>
    </div>
  );
};

export default DaySelector;