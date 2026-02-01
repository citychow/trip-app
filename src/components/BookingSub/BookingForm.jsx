import React, { useState } from "react";
import HotelForm from "./HotelForm";
import FlightForm from "./FlightForm";
import RestaurantForm from "./RestaurantForm";
import TransportForm from "./TransportForm";
import EventForm from "./EventForm";

const BookingForm = ({ onSave, onCancel, initialData }) => {
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
    switch (formData.type) {
      case "酒店":
        return <HotelForm data={formData} updateData={updateData} />;
      case "機票":
        return <FlightForm data={formData} updateData={updateData} />;
      case "餐廳":
        return <RestaurantForm data={formData} updateData={updateData} />;
      case "交通":
        return <TransportForm data={formData} updateData={updateData} />;
      case "門票":
        return <EventForm data={formData} updateData={updateData} />;
      default:
        return (
          <div className="form-group">
            <label>項目名稱</label>
            <input
              className="input-field"
              onChange={(e) => updateData({ name: e.target.value })}
            />
          </div>
        );
    }
  };

  return (
    <div className="full-page">
      <div className="container" style={{ paddingBottom: "100px" }}>
        <h2 className="title">📝 新增預約</h2>

        <div className="info-card">
          <div className="form-group">
            <label>類別</label>
            <select
              className="input-field"
              value={formData.type}
              onChange={(e) => updateData({ type: e.target.value })}
            >
              <option value="酒店">🏨 酒店</option>
              <option value="機票">✈️ 機票</option>
              <option value="餐廳">🍴 餐廳</option>
              <option value="交通">🚗 交通 / 租車</option>
              <option value="門票">🎟️ 活動門票</option>
            </select>
          </div>

          {renderSpecificForm()}

          <div className="form-group" style={{ marginTop: "15px" }}>
            <label>上載截圖/PDF</label>
            <input
              type="file"
              onChange={(e) =>
                updateData({
                  filePreview: URL.createObjectURL(e.target.files[0]),
                })
              }
            />
          </div>

          <div className="form-group">
            <label>備註</label>
            <textarea
              className="input-field"
              rows="3"
              onChange={(e) => updateData({ remarks: e.target.value })}
            />
          </div>
        </div>

        <div className="button-group" style={{ display: "flex", gap: "10px" }}>
          <button
            className="add-main-btn"
            style={{ flex: 2 }}
            onClick={() => onSave(formData)}
          >
            儲存
          </button>
          <button
            className="add-item-btn"
            style={{ flex: 1 }}
            onClick={onCancel}
          >
            返回
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
