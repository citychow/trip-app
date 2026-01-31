import React, { useState } from "react";

const SpendingList = ({ spends, onUpdateSpends }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [expandedDates, setExpandedDates] = useState({}); // 紀錄邊啲日期係展開咗
  const [newItem, setNewItem] = useState({ date: "", desc: "", amount: "" });

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

  return (
    <div className="spending-section">
      <div className="section-header">
        <h3 className="sub-title">消費紀錄</h3>
        <button className="mini-add-btn" onClick={() => setIsAdding(true)}>
          + 新增
        </button>
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
          <div className="form-btns">
            <button onClick={handleAdd}>儲存</button>
            <button className="cancel" onClick={() => setIsAdding(false)}>
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
                    HK$ {dayTotal.toLocaleString()}
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
                      <span className="item-desc">{item.desc || "無描述"}</span>
                      <span className="item-price">
                        HK$ {Number(item.amount).toLocaleString()}
                      </span>
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
