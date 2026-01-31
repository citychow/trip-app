import React, { useState } from "react";

const ItineraryForm = ({ onAdd, onCancel, initialData }) => {
  const [item, setItem] = useState({
    time: initialData?.time || "",
    content: initialData?.content || "",
    location: initialData?.location || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!item.time || !item.content) {
      alert("請填寫時間同活動名稱呀！");
      return;
    }
    onAdd(item);
  };

  return (
    <div className="add-activity-box">
      <h3>{initialData ? "修改行程" : "新增行程"}</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label style={{ fontSize: "13px", fontWeight: "600", color: "#666" }}>
            🕒 時間
          </label>
          <input
            type="time"
            className="input-field"
            value={item.time}
            onChange={(e) => setItem({ ...item, time: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label style={{ fontSize: "13px", fontWeight: "600", color: "#666" }}>
            📍 活動 / 景點
          </label>
          <input
            className="input-field"
            placeholder="例如：心齋橋筋商店街"
            value={item.content}
            onChange={(e) => setItem({ ...item, content: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label style={{ fontSize: "13px", fontWeight: "600", color: "#666" }}>
            🗺️ Google 地圖位置 (選填)
          </label>
          <input
            className="input-field"
            placeholder="輸入地址、店名或貼上 URL"
            value={item.location}
            onChange={(e) => setItem({ ...item, location: e.target.value })}
          />
          <small style={{ fontSize: "11px", color: "#AAA" }}>
            *填寫後可自動生成交通路線圖
          </small>
        </div>

        <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
          <button type="submit" className="add-main-btn" style={{ flex: 1 }}>
            加入
          </button>
          <button
            type="button"
            className="add-item-btn"
            style={{ flex: 1, borderStyle: "solid" }}
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
