import React from "react";

const Transit = ({ fromActivity, toActivity }) => {
  const handleOpenMaps = () => {
    // Encode the locations for the URL
    const origin = encodeURIComponent(fromActivity.location);
    const destination = encodeURIComponent(toActivity.location);

    // Official Google Maps Directions URL
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=transit`;

    window.open(mapsUrl, "_blank");
  };

  return (
    <div className="transit-connector">
      {/* Decorative dashed line to visual link the items */}
      <div className="transit-line"></div>
      
      <button 
        className="transit-info-pill" 
        onClick={handleOpenMaps}
        title="開啟 Google Maps 導航"
      >
        <span className="transit-icon">🚌</span>
        <span className="transit-text">查看路線</span>
      </button>
    </div>
  );
};

export default Transit;