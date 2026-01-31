import React, { useState, useEffect } from "react";

const AddItemModal = ({ onSave, onCancel, fixedCategory, initialData }) => {
  // 初始化狀態：如果是編輯則帶入數據，否則初始化空值
  const [formData, setFormData] = useState({
    name: "",
    category: fixedCategory || "行前準備",
    importance: "一般",
    date: "",
    note: "",
    checked: false,
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  return (
    <div className="modal-fixed-overlay">
      <div className="add-modal">
        <div>
          <h3>
            {initialData ? "✏️ 編輯事項" : `＋ 新增於 ${formData.category}`}
          </h3>
        </div>

        <div>
          <div className="input-group">
            <input
              type="text"
              placeholder="輸入事項名稱"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          <div>
            <label>重要程度</label>
            <div className="bubble-group">
              {["一般", "重要"].map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  className={`bubble-btn ${
                    formData.importance === lvl ? "active" : ""
                  }`}
                  onClick={() => setFormData({ ...formData, importance: lvl })}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          <div className="date-group">
            <label>日期</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
            />
          </div>

          <div className="input-group">
            <textarea
              placeholder="備註..."
              value={formData.note}
              onChange={(e) =>
                setFormData({ ...formData, note: e.target.value })
              }
            />
          </div>

          <div className="modal-actions">
            <button className="confirm-btn" onClick={() => onSave(formData)}>
              {initialData ? "儲存修改" : "加入清單"}
            </button>
            <button className="cancel-btn" onClick={onCancel}>
              取消
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddItemModal;
