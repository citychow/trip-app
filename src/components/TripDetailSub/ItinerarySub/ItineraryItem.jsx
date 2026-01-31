import React from "react";

const ItineraryItem = ({ activity, onDelete, onEdit }) => {
  return (
    <div className="itinerary-item">
      <div className="time-box">{activity.time}</div>
      <div className="activity-content">
        <div
          style={{
            fontWeight: "600",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span>{activity.content}</span>
          <button
            onClick={() => onDelete(activity.id)}
            className="delete-small-btn"
          >
            ✕
          </button>
        </div>
        {activity.location && (
          <a
            href={activity.location}
            target="_blank"
            rel="noreferrer"
            style={{ fontSize: "11px", color: "#FF8A8A" }}
          >
            📍 查看地圖
          </a>
        )}
      </div>
    </div>
  );
};

export default ItineraryItem;
