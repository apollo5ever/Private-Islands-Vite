import React, { createContext } from 'react';
const LoggerContext = createContext();

/*
 DEBUG => debug msgs
 API => api data responses
 INFO => status msgs
 */
export const LOG = {
  DEBUG: 1,
  API: 2,
  INFO: 3,
  OFF: 10,
};

export const LoggerProvider = ({ children, loggingThreshold }) => {
  const customLog = (status, component, label, data = '') => {
    const displayComponent = component ? component : '';
    if (loggingThreshold >= status) {
      label
        ? console.log(`[${displayComponent}]` + ' ' + label.toUpperCase())
        : console.log(`[${displayComponent}]`);
      console.log(data);
    }
  };

  return (
    <LoggerContext.Provider value={customLog}>
      {children}
    </LoggerContext.Provider>
  );
};

export default LoggerContext;
