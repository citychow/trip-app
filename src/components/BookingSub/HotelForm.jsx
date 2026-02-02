import React from "react";

const HotelForm = ({ data, updateData,readOnly }) => (
  <>
    <div className="input-group">
      <label>酒店名稱</label>
      <input
        className="input-field"
        value={data.name|| ""}
        disabled={readOnly}
        onChange={(e) => updateData({ name: e.target.value })}
        required
      />
    </div>
    <div className="input-group">
      <label>預約編號</label>
      <input
        className="input-field"
        value={data.bookingNo|| ""}
        disabled={readOnly}
        placeholder="Confirmation #"
        onChange={(e) => updateData({ bookingNo: e.target.value })}
      />
    </div>
    <div className="date-row">
    
    <div className="input-group date-group">
        <label>Check-in</label>
        <input
          type="date"
          className="input-field"
          value={data.checkIn|| ""}
          disabled={readOnly}
          onChange={(e) => updateData({ checkIn: e.target.value })}
        />
        <input
          type="time"
          className="input-field"
          style={{ marginTop: "5px" }}
          value={data.checkInTime|| ""}
          disabled={readOnly}
          onChange={(e) => updateData({ checkInTime: e.target.value })}
        />
      </div>
      <div className="input-group date-group">
        <label>Check-out</label>
        <input
          type="date"
          className="input-field"
          value={data.checkOut|| ""}
          disabled={readOnly}
          onChange={(e) => updateData({ checkOut: e.target.value })}
        />
        <input
          type="time"
          className="input-field"
          style={{ marginTop: "5px" }}
          value={data.checkOutTime|| ""}
          disabled={readOnly}
          onChange={(e) => updateData({ checkOutTime: e.target.value })}
        />
      </div>
      
    </div>
  </>
);

export default HotelForm;
