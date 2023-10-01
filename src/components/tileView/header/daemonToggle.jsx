import React, { useState, useContext } from 'react';
import { LoginContext } from '@/LoginContext.jsx';
import { daemonModes } from '@/utils/helpers.js';

const DaemonToggle = ({ onDaemonClick, selectedDaemonMode }) => {
  const handleDaemonToggle = (value) => {
    onDaemonClick(value);
  };

  return (
    <div className="rounded-md px-2">
      {Object.keys(daemonModes).map((key, idx) => (
        <label
          key={idx}
          htmlFor={`daemon-${idx}`}
          className={`block cursor-pointer rounded p-2 ${
            selectedDaemonMode === daemonModes[key]
              ? 'bg-success text-neutral'
              : 'bg-gray-300 text-neutral'
          }`}
        >
          <input
            id={`daemon-${idx}`}
            type="radio"
            name="daemonToggle"
            value={daemonModes[key]}
            checked={selectedDaemonMode === daemonModes[key]}
            onClick={(e) => handleDaemonToggle(e.target.value)}
            className="hidden"
          />
          {daemonModes[key]}
        </label>
      ))}
    </div>
  );
};

export default DaemonToggle;
