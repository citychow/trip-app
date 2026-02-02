import React from "react";

const FlightForm = ({ data, updateData,readOnly }) => (
  <>
  
    <div className="input-group">
      <label>航班編號 (Flight No.)</label>
      <input
        className="input-field"
        placeholder="e.g. CX504"
        value={data.name|| ""}
        disabled={readOnly}
        onChange={(e) => updateData({ name: e.target.value })}
      />
    </div>
    <div className="date-row">
      <div className="input-group date-group">
        <label>出發地 (Dep)</label>
        <input
          className="input-field"
          placeholder="HKG"
          value={data.depAirport|| ""}
          disabled={readOnly}
          onChange={(e) => updateData({ depAirport: e.target.value })}
        />
        <div className="input-group date-group">
        <label>Departure</label>
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
      </div>
      <div className="input-group date-group">
        <label>目的地 (Arr)</label>
        <input
          className="input-field"
          placeholder="NRT"
          value={data.arrAirport|| ""}
          disabled={readOnly}
          onChange={(e) => updateData({ arrAirport: e.target.value })}
        />
        <div className="input-group date-group">
        <label>Arrival</label>
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
    </div>
    <div className="date-row">
      <div className="input-group date-group">
        <label>客運大樓 / 閘口</label>
        <input
          className="input-field"
          placeholder="T1 / 25"
          value={data.depTerminal|| ""}
          disabled={readOnly}
          onChange={(e) => updateData({ depTerminal: e.target.value })}
        />
      </div>
      <div className="input-group date-group">
        <label>客運大樓 / 閘口</label>
        <input
          className="input-field"
          placeholder="T1 / 25"
          value={data.arrTerminal|| ""}
          disabled={readOnly}
          onChange={(e) => updateData({ arrTerminal: e.target.value })}
        />
      </div>
    </div>
  </>
);

export default FlightForm;
