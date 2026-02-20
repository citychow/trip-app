import React from "react";

const ItemCard = ({ item, onToggle, onDelete, onEdit }) => {
  return (
    <div className={`item-card-main ${item.checked ? "is-done" : ""}`}>
      {/* 圓角 Checkbox */}
      <label className="custom-checkbox">
        <input
          type="checkbox"
          checked={item.checked}
          onChange={() => onToggle(item.id)}
        />
        <span className="checkmark"></span>
      </label>

      {/* 內容區域 */}
      <div className="item-content-click">
        <div className="item-info">
          <div className="name-line">
            <div>
              <span className={`bubble imp-${item.importance}`}>
                {item.importance}
              </span>
              <span> </span>
              <span className="name">{item.name}</span>
            </div>
          </div>

          <div className="desc-line">
            {/* 如果有備註或日期則顯示 */}
            {(item.note || item.date) && (
              <div>
                {item.date && <span className="item-date">📅 {item.date}</span>}
                {item.note && <span className="item-note">{item.note}</span>}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. 右側：動作按鈕 */}
      <div className="item-actions">
        <button className="edit-btn" onClick={() => onEdit(item)}>
          ✏️
        </button>
        <button
          className="del-btn"
          onClick={() => {
            onDelete(item.id);
          }}
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default ItemCard;
