import React from "react";

const RestaurantForm = ({ data, updateData, readOnly }) => (
  <>
    <div className="input-group">
      <label>餐廳名稱</label>
      <input
        className="input-field"
        value={data.name|| ""}
        disabled={readOnly}
        onChange={(e) => updateData({ name: e.target.value })}
      />
    </div>
    <div className="input-group">
      <label>地點 / 地址</label>
      <input
        className="input-field"
        value={data.location|| ""}
        disabled={readOnly}
        onChange={(e) => updateData({ location: e.target.value })}
      />
    </div>
    <div className="input-group">
      <label>地圖連結</label>
      <input
        className="input-field"
        value={data.addressLink|| ""}
        disabled={readOnly}
        onChange={(e) => updateData({ addressLink: e.target.value })}
      />
    </div>
    <div className="input-group date-group">
        <label>預約日期時間</label>
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
    {/* <div className="input-group">
      <label>預約日期時間</label>
      <input
        type="datetime-local"
        className="input-field"
        value={data.checkIn|| ""}
        disabled={readOnly}
        onChange={(e) => updateData({ checkIn: e.target.value })}
      />
    </div> */}
  </>
);

export default RestaurantForm;
