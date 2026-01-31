import React from "react";
import ItineraryItem from "./ItinerarySub/ItineraryItem";
import Transit from "./ItinerarySub/Transit";

const ItineraryList = ({ activities, onDelete }) => {
  if (activities.length === 0) {
    return (
      <p style={{ textAlign: "center", color: "#CCC", padding: "20px" }}>
        仲未有行程，加一個啦！
      </p>
    );
  }

  return (
    <div className="itinerary-list">
      {activities.map((activity, index) => (
        <React.Fragment key={activity.id}>
          <ItineraryItem activity={activity} onDelete={onDelete} />

          {/* 自動計算並顯示交通連結 */}
          {index < activities.length - 1 && <Transit activity={activity} />}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ItineraryList;
