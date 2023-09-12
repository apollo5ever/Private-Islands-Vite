import React from 'react';
import PropTypes from 'prop-types';

export const Divider = ({ color = 'success', size = 0.5 }) => {
  return <div className={`bg-${color} my-4 w-full rounded py-${size}`} />;
};

Divider.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
