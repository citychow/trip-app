import React from "react";

const FlightForm = ({ data, updateData }) => (
  <>
    <div className="form-group">
      <label>航班編號 (Flight No.)</label>
      <input
        className="input-field"
        placeholder="e.g. CX504"
        value={data.flightNo|| ""}
        onChange={(e) => updateData({ flightNo: e.target.value })}
      />
    </div>
    <div className="date-row">
      <div className="form-group date-group">
        <label>出發地 (Dep)</label>
        <input
          className="input-field"
          placeholder="HKG"
          value={data.depAirport|| ""}
          onChange={(e) => updateData({ depAirport: e.target.value })}
        />
        <input
          type="datetime-local"
          className="input-field"
          style={{ marginTop: "5px" }}
          value={data.depTime|| ""}
          onChange={(e) => updateData({ depTime: e.target.value })}
        />
      </div>
      <div className="form-group date-group">
        <label>目的地 (Arr)</label>
        <input
          className="input-field"
          placeholder="NRT"
          value={data.arrAirport|| ""}
          onChange={(e) => updateData({ arrAirport: e.target.value })}
        />
        <input
          type="datetime-local"
          className="input-field"
          style={{ marginTop: "5px" }}
          value={data.arrTime|| ""}
          onChange={(e) => updateData({ arrTime: e.target.value })}
        />
      </div>
    </div>
    <div className="date-row">
      <div className="form-group date-group">
        <label>客運大樓 / 閘口</label>
        <input
          className="input-field"
          placeholder="T1 / 25"
          value={data.terminal|| ""}
          onChange={(e) => updateData({ terminal: e.target.value })}
        />
      </div>
      <div className="form-group date-group">
        <label>座位</label>
        <input
          className="input-field"
          placeholder="32K"
          value={data.seat|| ""}
          onChange={(e) => updateData({ seat: e.target.value })}
        />
      </div>
    </div>
  </>
);

export default FlightForm;
