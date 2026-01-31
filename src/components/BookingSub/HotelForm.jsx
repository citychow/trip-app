import React from "react";

const HotelForm = ({ data, updateData }) => (
  <>
    <div className="form-group">
      <label>酒店名稱 (Must)</label>
      <input
        className="input-field"
        value={data.name}
        onChange={(e) => updateData({ name: e.target.value })}
        required
      />
    </div>
    <div className="form-group">
      <label>預約編號</label>
      <input
        className="input-field"
        value={data.bookingNo}
        onChange={(e) => updateData({ bookingNo: e.target.value })}
      />
    </div>
    <div className="date-row">
      <div className="form-group date-group">
        <label>Check-in</label>
        <input
          type="date"
          className="input-field"
          onChange={(e) => updateData({ checkIn: e.target.value })}
        />
      </div>
      <div className="form-group date-group">
        <label>Check-out</label>
        <input
          type="date"
          className="input-field"
          onChange={(e) => updateData({ checkOut: e.target.value })}
        />
      </div>
    </div>
  </>
);

export default HotelForm;
