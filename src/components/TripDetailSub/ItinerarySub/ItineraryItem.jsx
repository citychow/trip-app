import React from "react";

const ItineraryItem = ({ activity, onDelete, onEdit }) => {
  return (
    <div className="itinerary-item">
      <div className="time-box">{activity.time}</div>
      <div className="activity-content">
        <div className="activity-box"
        >
          <span>{activity.content}</span>
          
          <div className="item-actions">
        <button className="edit-btn" onClick={onEdit}>
          ✏️
        </button>
        <button className="del-btn" onClick={() => onDelete(activity.id)}>
          ×
        </button>
      </div>
        </div>
        {activity.location && (
          <a
            href={activity.location}
            target="_blank"
            rel="noreferrer"
          ><div className="map-title">
            📍 查看地圖 </div>
          </a>
        )}
      </div>
    </div>
  );
};

export default ItineraryItem;
