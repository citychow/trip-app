import React, { useState } from "react";

const LandingPage = ({ trips, setScreen, setSelectedTrip, deleteTrip }) => {
  const [activeMenuTrip, setActiveMenuTrip] = useState(null);

  return (
    <>
      <header className="header">
        <h1 className="title"> 去旅行啦 </h1>
      </header>

      <div className="trip-list">
        {trips.map((trip) => (
          <div key={trip.id} className="trip-card">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <div>
                <h2 style={{ fontSize: "18px", margin: "0 0 10px 0" }}>
                  {trip.name}
                </h2>
                <div className="trip-meta">
                  <span
                    style={{ color: "var(--primary-pink)", fontWeight: "bold" }}
                  >
                    {trip.country}
                  </span>
                  <span> • </span>
                  <span>
                    {trip.startDate} - {trip.endDate} ({trip.days} Days)
                  </span>
                </div>
                {trip.desc && <div className="trip-desc">{trip.desc}</div>}
              </div>

              <button
                className="details-pill"
                onClick={() => setActiveMenuTrip(trip)}
              >
                Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Action Menu Overlay (保持你原本嘅邏輯) */}
      {activeMenuTrip && (
        <div className="action-overlay" onClick={() => setActiveMenuTrip(null)}>
          <div className="action-menu" onClick={(e) => e.stopPropagation()}>
            <button
              className="menu-item"
              onClick={() => {
                setSelectedTrip(activeMenuTrip);
                setScreen("detail");
                setActiveMenuTrip(null);
              }}
            >
              👀 進入行程
            </button>
            <button
              className="menu-item"
              onClick={() => {
                setSelectedTrip(activeMenuTrip);
                setScreen("edit");
                setActiveMenuTrip(null);
              }}
            >
              ✍️ 修改資料
            </button>
            <button
              className="menu-item delete"
              onClick={() => deleteTrip(activeMenuTrip.id)}
            >
              🗑️ 刪除行程
            </button>
            <button
              className="menu-item cancel"
              onClick={() => setActiveMenuTrip(null)}
            >
              取消
            </button>
          </div>
        </div>
      )}

      <div className="list-footer">
        <button
          className="add-trip-btn-inline"
          onClick={() => {
            setSelectedTrip(null);
            setScreen("create");
          }}
        >
          + 添加一個旅程
        </button>
      </div>
    </>
  );
};

export default LandingPage;
