import React, { useState } from "react";

const LandingPage = ({ trips, setScreen, setSelectedTrip, deleteTrip }) => {
  const [activeMenuTrip, setActiveMenuTrip] = useState(null);

  return (
    <><div className="container">
      <header>
        <h1> 去旅行啦 </h1>
      </header>

      <div>
        {trips.map((trip) => (
          <div key={trip.id} className="trip-card">
            <div className="trip-card-box">
              <div>
                <h2 className="trip-title">
                  {trip.name}
                </h2>
                <div className="trip-meta">
                  <span className="country-tag">{trip.country}</span>
                  <span> • </span>
                  <span className="duration-tag">
                    {trip.days} Days
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
      </div>
    </>
  );
};

export default LandingPage;
