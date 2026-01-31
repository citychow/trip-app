import React from "react";

const NavBar = ({ currentTab, onTabChange }) => {
  const tabs = [
    { id: "trip", label: "Trip", icon: "✈️" },
    { id: "booking", label: "Booking", icon: "🏨" },
    { id: "billing", label: "Billing", icon: "💰" },
    { id: "shopping", label: "Shopping", icon: "🛍️" },
    { id: "items", label: "Item List", icon: "🎒" },
    { id: "member", label: "Member", icon: "👤" },
    { id: "settings", label: "Setting", icon: "⚙️" },
  ];

  return (
    <nav className="bottom-nav">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`nav-item ${currentTab === tab.id ? "active" : ""}`}
          onClick={() => onTabChange(tab.id)}
        >
          <span className="nav-icon">{tab.icon}</span>
          <span className="nav-text">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default NavBar;