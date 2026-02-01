import React, { useState } from "react";

const ItineraryForm = ({ onSave, onCancel, initialData }) => {
  
  const [time, setTime] = useState(initialData?.time || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [location, setLocation] = useState(initialData?.location || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...initialData, // Keeps the original ID if editing
      time,
      content,
      location
    });
  };

  return (
    <div className="add-activity-box">
      <h3>{initialData ? "修改行程" : "新增行程"}</h3>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>
            🕒 時間
          </label>
          <input
            type="time"
            className="input-field"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>
            📍 活動 / 景點
          </label>
          <input
            className="input-field"
            placeholder="例如：心齋橋筋商店街"
            value={content}
            onChange={(e) => setContent(e.target.value) }
          />
        </div>

        <div className="input-group">
          <label style={{ fontSize: "13px", fontWeight: "600", color: "#666" }}>
            🗺️ Google 地圖位置 (選填)
          </label>
          <input
            className="input-field"
            placeholder="輸入地址、店名或貼上 URL"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <small>
            *填寫後可自動生成交通路線圖
          </small>
        </div>

        <div className="form-btn">
          <button type="submit" className="add-main-btn">
            加入
          </button>
          <button
            type="button"
            className="cancel-main-btn"
            onClick={onCancel}
          >
            取消
          </button>
        </div>
      </form>
    </div>
  );
};

export default ItineraryForm;
