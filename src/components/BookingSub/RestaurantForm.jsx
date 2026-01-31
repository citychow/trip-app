import React from "react";

const RestaurantForm = ({ data, updateData }) => (
  <>
    <div className="form-group">
      <label>餐廳名稱</label>
      <input
        className="input-field"
        value={data.name}
        onChange={(e) => updateData({ name: e.target.value })}
      />
    </div>
    <div className="form-group">
      <label>地點 / 地址</label>
      <input
        className="input-field"
        value={data.location}
        onChange={(e) => updateData({ location: e.target.value })}
      />
    </div>
    <div className="form-group">
      <label>地圖連結</label>
      <input
        className="input-field"
        value={data.addressLink}
        onChange={(e) => updateData({ addressLink: e.target.value })}
      />
    </div>
    <div className="form-group">
      <label>預約日期時間</label>
      <input
        type="datetime-local"
        className="input-field"
        value={data.checkIn}
        onChange={(e) => updateData({ checkIn: e.target.value })}
      />
    </div>
  </>
);

export default RestaurantForm;
