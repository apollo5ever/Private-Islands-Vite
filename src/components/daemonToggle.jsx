import React, { useState, useContext } from 'react';
import { LoginContext } from '../LoginContext';

const DaemonToggle = () => {
  const [checked, setChecked] = useState(false);
  const [state, setState] = useContext(LoginContext);
  const [daemonMode, setDaemonMode] = useState('pools');

  const daemonModes = [
    { name: 'Pools', value: 'pools' },
    { name: 'User', value: 'user' },
  ];

  const handleDaemonToggle = (value) => {
    setDaemonMode(value);
    setState((state) => ({ ...state, daemonMode: value }));
  };

  return (
    <div className="daemon-toggle">
      {daemonModes.map((radio, idx) => (
        <label key={idx} htmlFor={`daemon-${idx}`}>
          <input
            id={`daemon-${idx}`}
            type="radio"
            name="daemonToggle"
            value={radio.value}
            checked={daemonMode === radio.value}
            onChange={(e) => handleDaemonToggle(e.target.value)}
          />
          {radio.name}
        </label>
      ))}
    </div>
  );
};

export default DaemonToggle;
