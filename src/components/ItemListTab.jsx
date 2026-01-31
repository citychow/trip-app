import React, { useState, useEffect } from "react";
import ItemCard from "./ItemSub/ItemCard";
import AddItemModal from "./ItemSub/AddItemModal";

const ItemListTab = ({ tripId }) => {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem(`tasks_${tripId}`);
    return saved ? JSON.parse(saved) : [];
  });

  const [statusFilter, setStatusFilter] = useState("all");
  // 統一控制 Modal：如果 editingItem 有值則為編輯，否則看 modalConfig
  const [modalConfig, setModalConfig] = useState({ show: false, category: "" });
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    localStorage.setItem(`tasks_${tripId}`, JSON.stringify(tasks));
  }, [tasks, tripId]);

  const standardCategories = ["行前準備", "簽證", "保險", "其他"];

  const handleToggle = (id) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, checked: !t.checked } : t))
    );
  };

  const handleDelete = (id) => {
    if (window.confirm("確定要刪除嗎？")) {
      setItems(items.filter((t) => t.id !== id));
    }
  };

  const handleStatusClick = (target) => {
    setStatusFilter((prev) => (prev === target ? "all" : target));
  };

  const handleEdit = (item) => {
    setEditingItem(item);
  };

  const handleSave = (updatedTask) => {
    if (editingItem) {
      // 編輯模式
      setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
    } else {
      // 新增模式
      setTasks([...tasks, { ...updatedTask, id: Date.now() }]);
    }
    closeModal();
  };

  const closeModal = () => {
    setEditingItem(null);
    setModalConfig({ show: false, category: "" });
  };

  return (
    <div className="tab-container">
      <header className="header-with-action">
        <h1 className="title">有咩要做</h1>
      </header>
      {/* 1. 統計卡片 */}
      <div className="summary-cards">
        <div
          className={`summary-card ${
            statusFilter === "pending" ? "active" : ""
          }`}
          onClick={() => handleStatusClick("pending")}
        >
          <div className="summary-info">
            <span className="count">
              {tasks.filter((t) => !t.checked).length}
            </span>
            <span className="label">待完成</span>
          </div>
          <div className="summary-char">📋</div>
        </div>

        <div
          className={`summary-card ${
            statusFilter === "completed" ? "active" : ""
          }`}
          onClick={() => handleStatusClick("completed")}
        >
          <div className="summary-info">
            <span className="count">
              {tasks.filter((t) => t.checked).length}
            </span>
            <span className="label">已完成</span>
          </div>
          <div className="summary-char">✅</div>
        </div>
      </div>

      {/* 2. 分類清單 */}
      <div className="filter-bar">
        {standardCategories.map((cat) => {
          const catTasks = tasks.filter(
            (t) =>
              t.category === cat &&
              (statusFilter === "all" ||
                (statusFilter === "pending" ? !t.checked : t.checked))
          );

          return (
            <div key={cat} className="category-group">
              <div className="category-header">
                <div className="cat-title-wrap">
                  <span className="cat-title">{cat}</span>
                  <span className="cat-badge">{catTasks.length}</span>
                </div>
                <button
                  className="add-inline-btn"
                  onClick={() => setModalConfig({ show: true, category: cat })}
                >
                  {" "}
                  +{" "}
                </button>
              </div>

              <div className="task-list">
                {catTasks.map((task) => (
                  <ItemCard
                    key={task.id}
                    item={task}
                    onToggle={handleToggle}
                    onDelete={handleDelete}
                    onEdit={() => handleEdit(task)}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. 統一 Modal 放置在循環外部，避免渲染多個實例 */}
      {(modalConfig.show || editingItem) && (
        <AddItemModal
          initialData={editingItem}
          fixedCategory={modalConfig.category}
          onSave={handleSave}
          onCancel={closeModal}
        />
      )}
    </div>
  );
};

export default ItemListTab;
