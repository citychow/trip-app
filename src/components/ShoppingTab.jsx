import React, { useState, useEffect } from "react";
import ShoppingItemCard from "./ShoppingSub/ShoppingItemCard";
import AddItemForm from "./ShoppingSub/AddItemForm";

const ShoppingTab = ({ tripId }) => {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem(`shopping_${tripId}`);
    return saved ? JSON.parse(saved) : [];
  });

  const [statusFilter, setStatusFilter] = useState("all"); // all | pending | completed
  const [isAdding, setIsAdding] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const handleEditItem = (item) => {
    setEditingItem(item); // 開啟編輯 Modal
  };

  const handleSaveEdit = (updatedItem) => {
    setItems(items.map((i) => (i.id === updatedItem.id ? updatedItem : i)));
    setEditingItem(null);
  };

  const handleStatusClick = (targetStatus) => {
    // 如果撳緊嗰個 Status 已經係而家個 Status，就變返 'all' (取消篩選)
    // 否則，就切換去新嘅 Status
    setStatusFilter((prevStatus) =>
      prevStatus === targetStatus ? "all" : targetStatus
    );
  };

  useEffect(() => {
    localStorage.setItem(`shopping_${tripId}`, JSON.stringify(items));
  }, [items, tripId]);

  const [importanceFilter, setImportanceFilter] = useState("全部");
  const [categoryFilter, setCategoryFilter] = useState("全部分類");

  // 動態提取所有已存在的標籤
  const availableCategories = [
    "全部分類",
    ...new Set(
      items
        .map((item) => item.category)
        .filter((cat) => cat && cat.trim() !== "")
    ),
  ];

  // 1. 處理數據過濾 (點擊統計卡片觸發)
  const filteredItems = items.filter((item) => {
    const statusMatch =
      statusFilter === "pending"
        ? !item.checked
        : statusFilter === "completed"
        ? item.checked
        : true;

    const importanceMatch =
      importanceFilter === "全部" ? true : item.importance === importanceFilter;

    // 新增：自定義標籤過濾
    const categoryMatch =
      categoryFilter === "全部分類" ? true : item.category === categoryFilter;

    return statusMatch && importanceMatch && categoryMatch;
  });

  // 2. 處理排序 (必買 > 重要 > 一般)
  const sortedItems = [...filteredItems].sort((a, b) => {
    const priority = { 必買: 3, 重要: 2, 一般: 1 };
    return (priority[b.importance] || 0) - (priority[a.importance] || 0);
  });

  const getImportanceCount = (level) => {
    return items.filter((item) => {
      // 首先要符合「待購買/已購買」嘅篩選狀態
      const statusMatch =
        statusFilter === "pending"
          ? !item.checked
          : statusFilter === "completed"
          ? item.checked
          : true;
      // 然後匹配重要程度
      const importanceMatch =
        level === "全部" ? true : item.importance === level;
      return statusMatch && importanceMatch;
    }).length;
  };

  const toggleCheck = (id) => {
    setItems(
      items.map((i) => (i.id === id ? { ...i, checked: !i.checked } : i))
    );
  };

  const deleteItem = (id) => {
    if (window.confirm("確定要刪除嗎？")) {
      setItems(items.filter((i) => i.id !== id));
    }
  };

  const handleSaveItem = (newItem) => {
    setItems([{ ...newItem, id: Date.now() }, ...items]);
    setIsAdding(false);
  };

  return (
    <div className="tab-container">
      <header className="tab-header">
        <h1>有咩要買</h1>
      </header>
      {/* 統計卡片 - 支援過濾功能 */}
      <div className="summary-cards">
        <div
          className={`summary-card ${
            statusFilter === "pending" ? "active" : ""
          }`}
          onClick={() => handleStatusClick("pending")}
        >
          <div className="summary-info">
            <span className="count">
              {items.filter((i) => !i.checked).length}
            </span>
            <span className="label">待購買</span>
          </div>
          <div className="summary-char">🛒</div>
        </div>

        <div
          className={`summary-card ${
            statusFilter === "completed" ? "active" : ""
          }`}
          onClick={() => handleStatusClick("completed")}
        >
          <div className="summary-info">
            <span className="count">
              {items.filter((i) => i.checked).length}
            </span>
            <span className="label">已購買</span>
          </div>
          <div className="summary-char">🛍️</div>
        </div>
      </div>

      {/* 全部過濾 Bar */}
      <div className="filter-bar">
        <div className="filter-row-top">
          <span className="status-title">
            {statusFilter === "completed" ? "已購買" : "待購買"}
          </span>

          {/* 下拉選單：篩選自定義標籤 */}
          <div className="category-dropdown-wrapper">
            <select
              className="category-select"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              {availableCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="importance-filter-group">
          {["全部", "一般", "重要", "必買"].map((lvl) => {
            const count = getImportanceCount(lvl);
            return (
              <button
                key={lvl}
                className={`filter-pill ${
                  importanceFilter === lvl ? "active" : ""
                }`}
                onClick={() =>
                  setImportanceFilter((prev) => (prev === lvl ? "全部" : lvl))
                }
              >
                {lvl} <span className="pill-count">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 購物清單區域 */}
      {/* // 在渲染列表部分傳遞 handleEditItem 給子組件 */}
      {sortedItems.map((item) => (
        <ShoppingItemCard
          key={item.id}
          item={item}
          onToggle={toggleCheck}
          onDelete={deleteItem}
          onEdit={() => handleEditItem(item)} // 新增編輯傳遞
        />
      ))}

      {/* 懸浮新增按鈕 */}
      <button className="fab-add" onClick={() => setIsAdding(true)}>
        +
      </button>

      {/* 獨立表單組件 */}
      {isAdding && (
        <AddItemForm
          onSave={handleSaveItem}
          onCancel={() => setIsAdding(false)}
        />
      )}
      {/* 
// 在 ShoppingTab 底部加入編輯 Modal 的渲染 */}
      {editingItem && (
        <AddItemForm
          initialData={editingItem} // 傳入現有數據
          onSave={handleSaveEdit}
          onCancel={() => setEditingItem(null)}
          isEdit={true}
        />
      )}
    </div>
  );
};

export default ShoppingTab;
