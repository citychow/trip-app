import React, { useState } from "react";

const AddItemForm = ({ onSave, onCancel, initialData, isEdit }) => {
  const [item, setItem] = useState(
    initialData || {
      name: "",
      category: "",
      importance: "一般",
      note: "",
      image: null,
      checked: false,
    }
  );

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setItem({ ...item, image: reader.result });
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="add-modal">
        <h3>{isEdit ? "✏️ 編輯項目" : "🛍️ 新增物品"}</h3>
        <div className="upload-area">
          <label>
            {item.image ? (
              <img src={item.image} alt="preview" />
            ) : (
              "📷 點擊上傳相片"
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              hidden
            />
          </label>
        </div>

        <div className="input-group">
          <input
            type="text"
            placeholder="物品名稱 (必填)"
            value={item.name}
            onChange={(e) => setItem({ ...item, name: e.target.value })}
          />
        </div>

        <div>
          <div className="bubble-group">
            {["一般", "重要", "必買"].map((lvl) => (
              <button
                key={lvl}
                className={`bubble-btn ${
                  item.importance === lvl ? "active" : ""
                }`}
                onClick={() => setItem({ ...item, importance: lvl })}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        <div className="input-group">
          <input
            type="text"
            placeholder="自定義標籤 (如: 藥妝, 零食)"
            value={item.category}
            onChange={(e) => setItem({ ...item, category: e.target.value })}
          />
        </div>

        <div className="input-group">
          <input
            type="text"
            placeholder="備註 (如: 分店地址, 價錢)"
            value={item.note}
            onChange={(e) => setItem({ ...item, note: e.target.value })}
          />
        </div>

        <div className="modal-actions">
          <button className="btn-confirm-sm" onClick={() => onSave(item)}>
            {isEdit ? "儲存修改" : "加入清單"}
          </button>
          <button className="btn-cancel-sm" onClick={onCancel}>
            取消
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddItemForm;
