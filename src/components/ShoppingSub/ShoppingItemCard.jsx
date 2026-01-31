import React from "react";

const ShoppingItemCard = ({ item, onToggle, onDelete, onEdit }) => {
  return (
    <div className={`shopping-item-card ${item.checked ? "is-done" : ""}`}>
      <label className="custom-checkbox">
        <input
          type="checkbox"
          checked={item.checked}
          onChange={() => onToggle(item.id)}
        />
        <span className="checkmark"></span>
      </label>

      {/* 點擊圖片或文字區域觸發編輯 */}
      <div className="item-content-click">
        <div className="item-img">
          {item.image ? <img src={item.image} alt="" /> : <span>📸</span>}
        </div>
        <div className="item-info">
          <div className="name-line">
            <span className="name">{item.name} </span>
            <span className={`bubble imp-${item.importance}`}>
              {item.importance}
            </span>
          </div>
          <div className="desc-line">
            <span className="item-note">{item.note}</span>
            {item.category && (
              <span className="bubble cat">{item.category}</span>
            )}
          </div>
        </div>
      </div>

      <div className="item-actions">
        <button className="edit-btn" onClick={onEdit}>
          ✏️
        </button>
        <button className="del-btn" onClick={() => onDelete(item.id)}>
          ×
        </button>
      </div>
    </div>
  );
};

export default ShoppingItemCard;
