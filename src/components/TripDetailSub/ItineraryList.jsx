import React, { useState } from "react";
import ItineraryItem from "./ItinerarySub/ItineraryItem";
import Transit from "./ItinerarySub/Transit";
import ItineraryForm from "./ItineraryForm";

const ItineraryList = ({ activities, onDelete, onUpdate }) => {
  const [editingItem, setEditingItem] = useState(null);

  if (editingItem) {
    return (
      <div className="edit-overlay">
        <div className="edit-modal">
          <ItineraryForm
            initialData={editingItem}
            // Now onUpdate is defined because we added it to the props above!
            onSave={(data) => {
              onUpdate(data);
              setEditingItem(null);
            }}
            onCancel={() => setEditingItem(null)}
          />
        </div>
      </div>
    );
  }

  if (activities.length === 0) {
    return <p className="empty-text">仲未有行程，加一個啦！</p>;
  }

  return (
    <div className="itinerary-list">
      {activities.map((activity, index) => {
        const nextActivity = activities[index + 1];

        // Logic: Only show transit if the current and the next activity both have locations
        const showTransit =
          nextActivity && activity.location && nextActivity.location;

        return (
          <React.Fragment key={activity.id}>
            <ItineraryItem
              activity={activity}
              onEdit={() => setEditingItem(activity)}
              onDelete={onDelete}
            />

            {showTransit && (
              <Transit fromActivity={activity} toActivity={nextActivity} />
            )}
          </React.Fragment>
        );
      })}

      {/* POPUP EDIT FORM */}
      {editingItem && (
        <div className="edit-overlay">
          <div className="edit-modal">
            <ItineraryForm
              initialData={editingItem}
              onSave={(data) => {
                onUpdate(data);
                setEditingItem(null);
              }}
              onCancel={() => setEditingItem(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ItineraryList;
