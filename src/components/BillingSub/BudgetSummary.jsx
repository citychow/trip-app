import React, { useState } from "react";

const BudgetSummary = ({ budget, spends, onUpdateBudget }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempBudget, setTempBudget] = useState(budget);

  // 計算總花費 (假設金額已在傳入前換算好，或在此處計算)
  const totalSpent = spends.reduce(
    (sum, item) => sum + Number(item.amount || 0),
    0
  );
  const remaining = budget - totalSpent;
  const spentPercentage =
    budget > 0 ? Math.min((totalSpent / budget) * 100, 100) : 0;

  // 處理儲存預算
  const handleSave = () => {
    onUpdateBudget(Number(tempBudget));
    setIsEditing(false);
  };

  // 情況 A：尚未設定預算 (Empty State)
  if (budget <= 0 && !isEditing) {
    return (
      <div className="budget-card empty-state">
        <div className="budget-icon">💰</div>
        <p>仲未設定預算喎！</p>
        <button className="add-budget-btn" onClick={() => setIsEditing(true)}>
          + 加入行程預算
        </button>
      </div>
    );
  }

  return (
    <div className="budget-card">
      <div className="budget-header">
        <span className="label">總預算</span>
        {isEditing ? (
          <div className="edit-input-group">
            <input
              type="number"
              value={tempBudget}
              onChange={(e) => setTempBudget(e.target.value)}
              autoFocus
            />
            <button onClick={handleSave}>儲存</button>
          </div>
        ) : (
          <span className="value" onClick={() => setIsEditing(true)}>
            HK$ {budget.toLocaleString()} ✍️
          </span>
        )}
      </div>

      {/* 情況 B：已設定預算，顯示進度條 */}
      <div className="progress-container">
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${spentPercentage}%`,
              backgroundColor: spentPercentage > 90 ? "#FF6B6B" : "#FFB5B5",
            }}
          ></div>
        </div>
        <div className="progress-info">
          <span>已花費: HK$ {totalSpent.toLocaleString()}</span>
          <span className={remaining < 0 ? "negative" : ""}>
            剩餘: HK$ {remaining.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BudgetSummary;
