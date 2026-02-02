import React, { useState } from "react";
import HotelForm from "./HotelForm";
import FlightForm from "./FlightForm";
import RestaurantForm from "./RestaurantForm";
import TransportForm from "./TransportForm";
import EventForm from "./EventForm";

const BookingForm = ({ onSave, onCancel, initialData, readOnly }) => {
  const [formData, setFormData] = useState(initialData ||{
    type: "酒店",
    name: "",
    checkInTime: "15:00",
    checkOutTime: "11:00",
    remarks: "",
    filePreview: null,
  });

  const updateData = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const renderSpecificForm = () => {
    const subProps = { data: formData, updateData, readOnly };

    switch (formData.type) {
      case "酒店": return <HotelForm {...subProps} />;
      case "機票": return <FlightForm {...subProps} />;
      case "餐廳": return <RestaurantForm {...subProps} />;
      case "交通": return <TransportForm {...subProps} />;
      case "門票": return <EventForm {...subProps} />;
      default: return null;
    }
  };

  return (
    <div className={`full-page ${readOnly ? "mode-view" : ""}`}>
      <div className="container" style={{ paddingBottom: "100px" }}>
        <h2 className="title">{readOnly ? "🔍 預約詳情" : "📝 編輯預約"}</h2>

        <div className="info-card">
          <div className="input-group">
            <label>類別</label>
            <select
              className="input-field"
              value={formData.type}
              disabled={readOnly} // 類別唯讀
              onChange={(e) => updateData({ type: e.target.value })}
            >
              <option value="酒店">🏨 酒店</option>
              <option value="機票">✈️ 機票</option>
              <option value="餐廳">🍴 餐廳</option>
              <option value="交通">🚗 交通</option>
              <option value="門票">🎟️ 門票</option>
            </select>
          </div>

          {renderSpecificForm()}

          {/* 文件上傳部分 */}
          <div className="input-group" style={{ marginTop: "15px" }}>
            <label>相關附件</label>
            {!readOnly && (
              <input
                type="file"
                onChange={(e) => updateData({ filePreview: URL.createObjectURL(e.target.files[0]) })}
              />
            )}
            
            {/* 這裡讓文件在唯讀模式下也可以看 */}
            {formData.filePreview && (
              <div className="file-display" style={{ marginTop: "10px" }}>
                <img src={formData.filePreview} alt="Preview" style={{ width: "100%", borderRadius: "8px" }} />
                {readOnly && <p style={{ fontSize: "12px", color: "#9B9284" }}>附件預覽</p>}
              </div>
            )}
          </div>

          <div className="input-group">
            <label>備註</label>
            <textarea
              className="input-field"
              value={formData.remarks}
              disabled={readOnly} // 備註唯讀
              placeholder={readOnly ? "無備註" : "輸入備註..."}
              rows="3"
              onChange={(e) => updateData({ remarks: e.target.value })}
            />
          </div>
        </div>

        <div className="form-actions" style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
          {!readOnly && (
            <button className="add-main-btn" style={{ flex: 2 }} onClick={() => onSave(formData)}>
              儲存變更
            </button>
          )}
          <button className="add-item-btn" style={{ flex: 1 }} onClick={onCancel}>
            {readOnly ? "關閉" : "取消"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
