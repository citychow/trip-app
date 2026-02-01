import React from "react";

const TransportForm = ({ data, updateData }) => (
  <>
    <div className="form-group">
      <label>項目 / 公司名稱 (租車公司或交通工具)</label>
      <input
        className="input-field"
        placeholder="e.g. Toyota Rent-a-car / JR Pass"
        value={data.name|| ""}
        onChange={(e) => updateData({ name: e.target.value })}
      />
    </div>
    <div className="form-group">
      <label>預約編號 (Booking No.)</label>
      <input
        className="input-field"
        placeholder="Confirmation #"
        value={data.bookingNo|| ""}
        onChange={(e) => updateData({ bookingNo: e.target.value })}
      />
    </div>
    <div className="date-row">
      <div className="form-group date-group">
        <label>開始 / 取車日期</label>
        <input
          type="date"
          className="input-field"
          value={data.checkIn|| ""}
          onChange={(e) => updateData({ checkIn: e.target.value })}
        />
        <input
          type="time"
          className="input-field"
          style={{ marginTop: "5px" }}
          value={data.checkInTime|| ""}
          onChange={(e) => updateData({ checkInTime: e.target.value })}
        />
      </div>
      <div className="form-group date-group">
        <label>結束 / 還車日期</label>
        <input
          type="date"
          className="input-field"
          value={data.checkOut|| ""}
          onChange={(e) => updateData({ checkOut: e.target.value })}
        />
        <input
          type="time"
          className="input-field"
          style={{ marginTop: "5px" }}
          value={data.checkOutTime|| ""}
          onChange={(e) => updateData({ checkOutTime: e.target.value })}
        />
      </div>
    </div>
    <div className="form-group">
      <label>取車 / 出發地點</label>
      <input
        className="input-field"
        placeholder="Pickup Location"
        value={data.pickupLocation|| ""}
        onChange={(e) => updateData({ pickupLocation: e.target.value })}
      />
    </div>
  </>
);

export default TransportForm;
