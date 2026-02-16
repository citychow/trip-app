import React, { useState } from "react";

const SpendingList = ({ spends, onUpdateSpends, currency }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [expandedDates, setExpandedDates] = useState({}); // 紀錄邊啲日期係展開咗
  const [newItem, setNewItem] = useState({ date: "", desc: "", amount: "" });

  // NEW: State for inline editing
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ desc: "", amount: "" });

  // 1. 將消費按日期分組並排序
  const groupedSpends = spends.reduce((groups, item) => {
    const date = item.date || "未定日期";
    if (!groups[date]) groups[date] = [];
    groups[date].push(item);
    return groups;
  }, {});

  const sortedDates = Object.keys(groupedSpends).sort(
    (a, b) => new Date(b) - new Date(a)
  );

  // 2. 切換展開狀態
  const toggleDate = (date) => {
    setExpandedDates((prev) => ({ ...prev, [date]: !prev[date] }));
  };

  // 3. 新增消費
  const handleAdd = () => {
    if (!newItem.date || !newItem.amount) return alert("請填寫日期同金額");
    onUpdateSpends([...spends, { ...newItem, id: Date.now() }]);
    setNewItem({ date: "", desc: "", amount: "" });
    setIsAdding(false);
  };

  // NEW: Handle Delete
  const handleDelete = (id) => {
    if (window.confirm("確定要刪除呢項開支嗎？")) {
      onUpdateSpends(spends.filter((s) => s.id !== id));
    }
  };

  // NEW: Handle Edit Start
  const startEdit = (item) => {
    setEditingId(item.id);
    setEditForm({ desc: item.desc, amount: item.amount });
  };

  // NEW: Handle Edit Save
  const handleUpdate = (id) => {
    const updated = spends.map((s) =>
      s.id === id ? { ...s, desc: editForm.desc, amount: editForm.amount } : s
    );
    onUpdateSpends(updated);
    setEditingId(null);
  };

  return (
    <div className="spending-section">
      <div className="section-header">
        <h3>消費紀錄</h3>
        <span onClick={() => setIsAdding(true)}>➕</span>
      </div>

      {/* 新增表單彈窗/區塊 */}
      {isAdding && (
        <div className="quick-add-form">
          <input
            type="date"
            value={newItem.date}
            onChange={(e) => setNewItem({ ...newItem, date: e.target.value })}
          />
          <input
            type="text"
            placeholder="項目描述 (e.g. 午餐)"
            value={newItem.desc}
            onChange={(e) => setNewItem({ ...newItem, desc: e.target.value })}
          />
          <input
            type="number"
            placeholder="金額"
            value={newItem.amount}
            onChange={(e) => setNewItem({ ...newItem, amount: e.target.value })}
          />
          <div>
            <button className="btn-confirm-sm" onClick={handleAdd}>
              儲存
            </button>
            <button
              className="btn-cancel-sm"
              onClick={() => setIsAdding(false)}
            >
              取消
            </button>
          </div>
        </div>
      )}

      {/* 分組顯示清單 */}
      <div className="grouped-list">
        {sortedDates.map((date) => {
          const daySpends = groupedSpends[date];
          const dayTotal = daySpends.reduce(
            (sum, item) => sum + Number(item.amount),
            0
          );
          const isExpanded = expandedDates[date];

          return (
            <div key={date} className="date-group">
              <div
                className="date-group-header"
                onClick={() => toggleDate(date)}
              >
                <div className="date-info">
                  <span className="date-text">{date}</span>
                  <span className="day-sum">
                    {currency} {dayTotal.toLocaleString()}
                  </span>
                </div>
                <span className={`arrow-icon ${isExpanded ? "up" : "down"}`}>
                  ⌄
                </span>
              </div>

              {isExpanded && (
                <div className="date-items-list">
                  {daySpends.map((item) => (
                    <div key={item.id} className="spend-detail-item">
                      {editingId === item.id ? (
                        /* INLINE EDIT MODE */
                        <div className="inline-edit-row">
                          <input
                            className="edit-input"
                            value={editForm.desc}
                            onChange={(e) =>
                              setEditForm({ ...editForm, desc: e.target.value })
                            }
                          />
                          <input
                            className="edit-input-amt"
                            type="number"
                            value={editForm.amount}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                amount: e.target.value,
                              })
                            }
                          />
                          <button
                            className="btn-confirm-sm"
                            onClick={() => handleUpdate(item.id)}
                          >
                            ✅
                          </button>
                          <button
                            className="btn-cancel-sm"
                            onClick={() => setEditingId(null)}
                          >
                            ❌
                          </button>
                        </div>
                      ) : (
                        /* VIEW MODE */
                        <>
                          <span className="item-desc">
                            {item.desc || "無描述"}
                          </span>
                          <span className="item-price">
                            {currency} {Number(item.amount).toLocaleString()}
                          </span>
                          <div className="item-actions">
                            <span
                              className="action-icon"
                              onClick={() => startEdit(item)}
                            >
                              ✏️
                            </span>
                            <span
                              className="action-icon del"
                              onClick={() => handleDelete(item.id)}
                            >
                              🗑️
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SpendingList;
