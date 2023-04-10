import React from "react";

export default function Toast() {
  return (
    <div className='notification-container'>
      <div className='notification toast'>
        <div>
          <p className='notification-message'>Recipe Saved</p>
        </div>
      </div>
    </div>
  );
}
