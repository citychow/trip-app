import React, { useState, useEffect } from "react";
import BookingForm from "./BookingSub/BookingForm";

const BookingTab = ({ tripId }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [isReadOnly, setIsReadOnly] = useState(false);


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

  const handleShowDetails = (item) => {
    setEditingItem(item);
    setIsReadOnly(true); // 進入唯讀模式
    setIsAdding(true);   // 開啟 Form
  };

  const handleContainerClick = () => setActiveMenuId(null);

  if (isAdding) {
    return (
      <BookingForm
        initialData={editingItem}
        readOnly={isReadOnly}
        onSave={(data) => {
          if (editingItem) {
            setBookings(bookings.map((b) => (b.id === editingItem.id ? { ...data, id: b.id } : b)));
          } else {
            setBookings([...bookings, { ...data, id: Date.now() }]);
          }
          setIsAdding(false);
          setEditingItem(null);
        }}
        onCancel={() => {
          setIsAdding(false);
          setEditingItem(null);
          setIsReadOnly(false);
        }}
      />
    );
  }

  return (
    <div className="container">
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
  <div key={item.id} className={`booking-card type-${item.type}`}>
    {/* 1. Header: 名稱與動作 (跟足草圖) */}
    <div className="card-header">
      <div className="card-title-group">
        <h3 className="card-name">{item.name}</h3>
        {item.bookingRef && <span className="booking-ref">Ref: {item.bookingRef}</span>}
      </div>
      <div className="card-top-action">
      <button 
  className="details-btn" 
  onClick={(e) => {
    handleShowDetails(item);
  }}
>Details</button>
        <button className="edit-btn" onClick={() => handleEdit(item)}>✏️</button>
        <button className="del-btn" onClick={() => handleDelete(item.id)}>×</button>
      </div>
    </div>

    {/* 2. Sub-header: Location / Link (📍 圖示) */}
    {(item.location || item.link) && (
      <div className="card-sub-header">
        <span className="location-icon">📍</span>
        <span className="location-text">{item.location || "查看連結"}</span>
      </div>
    )}

    {/* 3. Main Data Content: 嚴格遵循草圖佈局 */}
    <div className="card-content-grid">
      {item.type === "機票" ? (
        <div className="grid-details flight-grid">
          <div className="data-row">
            <span className="airport">{item.depAirport} {item.depTerminal && `at ${item.depTerminal}`}</span>
            <div className="val">{item.checkIn} <span className="small-time">{item.checkInTime}</span></div>
          </div>
          <div className="data-row">
            <span className="airport">{item.arrAirport} {item.arrTerminal && `at ${item.arrTerminal}`}</span>
            <div className="val">{item.checkOut} <span className="small-time">{item.checkOutTime}</span></div>
          </div>
        </div>
      ) : item.type === "酒店" ? (
        <div className="grid-details hotel-grid">
          <div className="data-col">
            <label>Check-in</label>
            <div className="val">{item.checkIn} <span className="small-time">{item.checkInTime}</span></div>
          </div>
          <div className="data-col text-right">
            <label>Check-out</label>
            <div className="val">{item.checkOut} <span className="small-time">{item.checkOutTime}</span></div>
          </div>
        </div>
      ) : item.type === "交通" ? (
        <div className="grid-details transport-grid">
          <div className="data-col">
            <label>Start</label>
            <div className="val">{item.checkIn} <span className="small-time">{item.checkInTime}</span></div>
          </div>
          <div className="data-col text-right">
            <label>End</label>
            <div className="val">{item.checkOut} <span className="small-time">{item.checkOutTime}</span></div>
          </div>
        </div>
      ) : (
        /* 餐廳、門票等通用格式 */
        <div className="grid-details simple-grid">
          <div className="data-col">
            <label>Date Time</label>
            <div className="val">{item.checkIn || item.date} <span className="small-time">{item.checkInTime}</span></div>
          </div>
          {item.category && (
            <div className="data-col text-right">
              <label>Category</label>
              <div className="val">{item.category}</div>
            </div>
          )}
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
    </div>
  );
};

export default BookingTab;
