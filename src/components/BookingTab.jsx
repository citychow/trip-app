import React, { useState, useEffect } from "react";
import BookingForm from "./BookingSub/BookingForm";

const BookingTab = ({ tripId }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [activeMenuId, setActiveMenuId] = useState(null);

  // 核心：如果沒有 tripId，就回傳空陣列
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (!tripId) return;

    // 1. 讀取該 Trip 專屬的儲存空間
    const storageKey = `bookings_for_trip_${tripId}`;
    const saved = localStorage.getItem(storageKey);
    setBookings(saved ? JSON.parse(saved) : []);
  }, [tripId]); // 當切換行程時，重新讀取

  useEffect(() => {
    if (!tripId) return;

    // 2. 儲存時也只存入該 Trip 專屬空間
    const storageKey = `bookings_for_trip_${tripId}`;
    localStorage.setItem(storageKey, JSON.stringify(bookings));
  }, [bookings, tripId]);

  const categories = ["機票", "酒店", "餐廳", "交通", "門票"];

  useEffect(() => {
    localStorage.setItem(`bookings_${tripId}`, JSON.stringify(bookings));
  }, [bookings, tripId]);

  const handleEdit = (item) => {
    setEditingItem(item); // Store the full item details
    setIsAdding(true);    // Open the form
  };

  const handleDelete = (id) => {
    if (window.confirm("確定要刪除這項預約紀錄嗎？")) {
      setBookings(bookings.filter((b) => b.id !== id));
    }
  };

  const handleContainerClick = () => setActiveMenuId(null);

  if (isAdding) {
    return (
      <BookingForm
        initialData={editingItem}
        onSave={(data) => {
          if (editingItem) {
            setBookings(
              bookings.map((b) =>
                b.id === editingItem.id ? { ...data, id: b.id } : b
              )
            );
          } else {
            setBookings([...bookings, { ...data, id: Date.now() }]);
          }
          setIsAdding(false);
          setEditingItem(null);
        }}
        onCancel={() => {
          setIsAdding(false);
          setEditingItem(null);
        }}
      />
    );
  }
  return (
    <div className="tab-container" onClick={handleContainerClick}>
      <header className="tab-header">
        <h1>預約紀錄</h1>
        <button className="icon-btn-top" onClick={() => setIsAdding(true)}>
          ➕
        </button>
      </header>
<div className="container">
      <div>
        {categories.map((cat) => {
          const catItems = bookings.filter((b) => b.type === cat);
          if (catItems.length === 0) return null;

          return (
            <div key={cat}>
              <div className="category-header">
                <span className="cat-title">{cat}</span>
                <span className="count-badge">{catItems.length}</span>
              </div>

              {catItems.map((item) => (
                /* 動態加入類別 class */
                <div key={item.id} className={`booking-card type-${item.type}`}>
    <div className="card-header">
      <h3 className="card-name">{item.name}</h3>
      
      <div className="card-top-action">
        <button className="edit-btn" onClick={() => handleEdit(item)}>
          ✏️
        </button>
        <button
          className="del-btn"
          onClick={(e) => {
            handleDelete(item.id);
          }}
        >
          ×
        </button>
      </div>
    </div>


    <div>
      {/* 酒店：粉紅系 */}
      {item.type === "酒店" && (
        <div className="detail-box hotel-box">
          <div className="time-block">
            <label>Check-in</label>
            <div className="time-val">
              {item.checkIn} {item.checkInTime}
            </div>
          </div>
          <div className="time-block">
            <label>Check-out</label>
            <div className="time-val">
              {item.checkOut} {item.checkOutTime}
            </div>
          </div>
        </div>
      )}

      {/* 機票：橙黃/藍系 */}
      {item.type === "機票" && (
        <div className="detail-box flight-box">
          <div className="route">
            <strong>{item.depAirport}</strong> ✈️{" "}
            <strong>{item.arrAirport}</strong>
          </div>
          <div className="route-sub">
            {item.flightNo} | {item.depTime}
          </div>
        </div>
      )}

      {/* 餐廳：綠系 */}
      {item.type === "餐廳" && (
        <div className="detail-box restaurant-box">
          <div className="time-val">
            🍴 {item.checkIn} | {item.location}
          </div>
        </div>
      )}

      {/* 其他：灰色系 */}
      {item.type !== "酒店" &&
        item.type !== "機票" &&
        item.type !== "餐廳" && (
          <div className="detail-box common-box">
            📅 {item.checkIn || "未定日期"}
          </div>
        )}
    </div>
  </div>


                  
                
              ))}
            </div>
          );
        })}
      </div>
      </div>
    </div>
  );
};

export default BookingTab;
