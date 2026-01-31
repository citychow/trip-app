import React from "react";

const Transit = ({ activity }) => {
  return (
    <div className="transit-connector">
      <div
        className="transit-info-pill"
        onClick={() => {
          const from = activity.location || activity.content;
          const to =
            activities[index + 1].location || activities[index + 1].content;
          window.open(
            `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
              from
            )}&destination=${encodeURIComponent(to)}&travelmode=transit`
          );
        }}
      >
        🚗
      </div>
    </div>
  );
};

export default Transit;
