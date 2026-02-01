import React, { useState } from "react";
import Countdown from "./TripDetailSub/Countdown";
import DaySelector from "./TripDetailSub/DaySelector";
import ItineraryList from "./TripDetailSub/ItineraryList";
import ItineraryForm from "./TripDetailSub/ItineraryForm";

const TripDetail = ({ trip, onBack, onUpdateTrip }) => {
  const [activeDay, setActiveDay] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  // 1. 篩選當前行程
  const dayActivities = trip.itinerary
    .filter((item) => item.day === activeDay)
    .sort((a, b) => a.time.localeCompare(b.time));

  // 2. 處理新增
  const handleAddActivity = (newItem) => {
    const updatedTrip = {
      ...trip,
      itinerary: [
        ...trip.itinerary,
        { ...newItem, day: activeDay, id: Date.now() },
      ],
    };
    onUpdateTrip(updatedTrip);
    setIsAdding(false);
  };

//3a. Handle updated
const handleUpdateActivity = (updatedItem) => {
  const updatedTrip = {
    ...trip,
    itinerary: trip.itinerary.map((act) =>
      act.id === updatedItem.id ? { ...updatedItem, day: activeDay } : act
    ),
  };
  onUpdateTrip(updatedTrip);
};

  // 3. 處理刪除
  const handleDeleteActivity = (activityId) => {
    if (window.confirm("確定要刪除？")) {
      const updatedTrip = {
        ...trip,
        itinerary: trip.itinerary.filter((act) => act.id !== activityId),
      };
      onUpdateTrip(updatedTrip);
    }
  };

  return (
    <div className="container">
      <button className="back-btn" onClick={onBack}>
        ← 揀行程
      </button>

      <Countdown startDate={trip.startDate} />

      <DaySelector
        days={trip.days}
        startDate={trip.startDate}
        activeDay={activeDay}
        onSelectDay={setActiveDay}
      />

      <div className="info-card">
        {/* 只需傳入篩選好的數據同刪除 function */}
        <ItineraryList
          activities={dayActivities}
          onDelete={handleDeleteActivity}
          onUpdate={handleUpdateActivity}
        />

          {isAdding ? (
            <ItineraryForm
              onSave={handleAddActivity}
              onCancel={() => setIsAdding(false)}
            />
          ) : (
            <button className="add-main-btn" onClick={() => setIsAdding(true)}>
              + 新增行程內容
            </button>
          )}
        
      </div>
    </div>
  );
};

export default TripDetail;
