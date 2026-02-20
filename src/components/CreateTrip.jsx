// src/component/CreateTrip.js
import React, { useState } from "react";

const CreateTrip = ({ onSave, onCancel, initialData }) => {
  // 檢查 initialData 存唔存在，存在就填入去（Edit Mode），否則用空 Form（Create Mode）
  const [formData, setFormData] = useState({
    name: initialData ? initialData.name : "",
    country: initialData ? initialData.country : "",
    startDate: initialData ? initialData.startDate : "",
    endDate: initialData ? initialData.endDate : "",
    desc: initialData ? initialData.desc : "",
  });

  // 計算日數 (Inclusive: 例如 16號去 17號返係計 2日)
  const calculateDays = () => {
    if (!formData.startDate || !formData.endDate) return 0;
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const diffTime = end - start;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays > 0 ? diffDays : 0;
  };

  const handleSave = () => {
    if (!formData.name || !formData.startDate || !formData.endDate) {
      alert("請填好行程名稱同埋日期先！");
      return;
    }
    // 傳回數據，days 會重新計算一次以確保準確
    onSave({ ...formData, days: calculateDays() });
  };

  return (
    <div>
      <div className="container" style={{ paddingBottom: "50px" }}>
        {" "}
        {/* 預留位畀底部的 NavBar */}
        <h2>{initialData ? "✍️ 修改行程資料" : "✍️ 規劃新旅程"}</h2>
        <div className="info-card">
          {/* 旅程名稱 */}
          <div className="input-group">
            <label>旅程名稱</label>
            <input
              placeholder="例如：Osaka 2026"
              value={formData.name}
              className="input-field"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          {/* 國家 */}
          <div className="input-group">
            <label>國家 / 地點</label>
            <input
              placeholder="例如：Japan"
              value={formData.country}
              className="input-field"
              onChange={(e) =>
                setFormData({ ...formData, country: e.target.value })
              }
            />
          </div>

          <div className="date-row">
            <div className="input-group date-group">
              <label>第一日</label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
              />
            </div>
            <div className="input-group date-group">
              <label>最後一日</label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
              />
            </div>
          </div>

          {/* 日數 Badge */}
          {calculateDays() > 0 && (
            <div className="days-badge" style={{ marginTop: "10px" }}>
              📅 共 {calculateDays()} 日行程
            </div>
          )}

          {/* 描述 */}
          <div className="input-group" style={{ marginTop: "15px" }}>
            <label>備註 / 描述</label>
            <input
              type="text"
              placeholder="寫低你想去嘅地方或者特別要留意嘅嘢..."
              value={formData.desc}
              className="input-field"
              onChange={(e) =>
                setFormData({ ...formData, desc: e.target.value })
              }
            />
          </div>
        </div>
        {/* 按鈕組 */}
        <div
          className="button-group"
          style={{ display: "flex", gap: "12px", marginTop: "20px" }}
        >
          <button className="add-main-btn" onClick={handleSave}>
            {initialData ? "儲存修改" : "開始規劃"}
          </button>
          <button className="cancel-main-btn" onClick={onCancel}>
            取消
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTrip;
