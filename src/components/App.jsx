import React, { useState, useEffect } from "react";
import LandingPage from "./LandingPage";
import CreateTrip from "./CreateTrip";
import TripDetail from "./TripDetail";
import Navbar from "./Navbar";
import BookingTab from "./BookingTab";
import BillingTab from "./BillingTab";
import ShoppingTab from "./ShoppingTab";
import ItemListTab from "./ItemListTab";

const App = () => {
  const [trips, setTrips] = useState(() => {
    const saved = localStorage.getItem("my-travel-trips");
    return saved ? JSON.parse(saved) : [];
  });

  const [activeTab, setActiveTab] = useState("trip"); // 底部導航狀態
  const [screen, setScreen] = useState("home"); // 行程分頁內部狀態
  const [selectedTrip, setSelectedTrip] = useState(null);

  useEffect(() => {
    localStorage.setItem("my-travel-trips", JSON.stringify(trips));
  }, [trips]);

  const handleUpdateTrip = (updatedTrip) => {
    setTrips((prev) =>
      prev.map((t) => (t.id === updatedTrip.id ? updatedTrip : t))
    );
    setSelectedTrip(updatedTrip);
  };

  const handleDeleteTrip = (id) => {
    const confirmed = window.confirm(
      "⚠️ 確定要刪除整個行程嗎？所有相關紀錄亦會被刪除。"
    );
    if (confirmed) {
      setTrips(trips.filter((t) => t.id !== id));
      // // Optional: Clean up localStorage for this specific trip
      // localStorage.removeItem(`billing_${id}`);
      // localStorage.removeItem(`itinerary_${id}`);
    }
  };

  const saveNewTrip = (newTripData) => {
    if (screen === "edit") {
      setTrips(
        trips.map((t) =>
          t.id === selectedTrip.id
            ? { ...newTripData, id: t.id, itinerary: t.itinerary }
            : t
        )
      );
    } else {
      setTrips([{ ...newTripData, id: Date.now(), itinerary: [] }, ...trips]);
    }
    setScreen("home");
  };

  // 渲染當前分頁內容
  const renderContent = () => {
    switch (activeTab) {
      case "trip":
        if (screen === "home") {
          return (
            <LandingPage
              trips={trips}
              setScreen={setScreen}
              setSelectedTrip={setSelectedTrip}
              deleteTrip={handleDeleteTrip}
            />
          );
        }
        if (screen === "detail") {
          return (
            <TripDetail
              trip={selectedTrip}
              onBack={() => setScreen("home")}
              onUpdateTrip={handleUpdateTrip}
            />
          );
        }
        if (screen === "create" || screen === "edit") {
          return (
            <CreateTrip
              onSave={saveNewTrip}
              onCancel={() => setScreen("home")}
              initialData={selectedTrip}
            />
          );
        }
        break;
      case "booking":
        return <BookingTab tripId={selectedTrip?.id} />;
      case "billing":
        return <BillingTab tripId={selectedTrip?.id} />;
      case "shopping":
        return <ShoppingTab tripId={selectedTrip?.id} />;
      case "items":
        return <ItemListTab tripId={selectedTrip?.id} />;
      case "member":
        return <div className="placeholder">👥 行程成員 (Coming Soon)</div>;
      case "settings":
        return <div className="placeholder">⚙️ 系統設定 (Coming Soon)</div>;
      default:
        return (
          <LandingPage
            trips={trips}
            setScreen={setScreen}
            setSelectedTrip={setSelectedTrip}
          />
        );
    }
  };

  return (
    <div className="app-wrapper">
      <main className="main-content">{renderContent()}</main>

      {/* 只有在進入了某個 Trip (即不是首頁列表) 且不是在創建頁面時才顯示導航 */}
      {selectedTrip && screen !== "home" && screen !== "create" && (
        <Navbar
          currentTab={activeTab}
          onTabChange={(tab) => {
            setActiveTab(tab);
            // 如果點擊「行程」Tab，確保 Screen 回到 detail 模式
            if (tab === "trip") setScreen("detail");
          }}
        />
      )}
    </div>
  );
};

export default App;
