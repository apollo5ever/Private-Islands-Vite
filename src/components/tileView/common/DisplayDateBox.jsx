import hourGlass from '@/assets/icons/icon_hourglass.svg';
import dateString from '@/utils/dateString.js';
import { useState } from 'react';

export const DisplayDateBox = ({ date }) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

  const handleMouseOver = (e) => {
    const target = e.target;
    const rect = target.getBoundingClientRect();

    // Show tooltip
    setTooltipPosition({
      top: rect.top + window.scrollY,
      left: rect.left + rect.width,
    });
    setTooltipVisible(true);
  };

  const handleMouseOut = () => {
    // Hide tooltip
    setTooltipVisible(false);
  };
  return (
    <div className="deadline grid w-full grid-flow-col items-center justify-start gap-3 rounded-lg bg-gray-200 px-4 py-3 text-start text-sm font-[600] shadow-lg ring-1 ring-slate-300 sm:max-w-[325px] sm:text-base">
      <img className="h-[16px] w-[16px]" src={hourGlass} />
      <span onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
        Deadline: {dateString(date).local}
        {tooltipVisible && (
          <div
            id="tooltip"
            style={{
              display: 'block',
              position: 'absolute',

              backgroundColor: '#f9f9f9',
              border: '1px solid #ccc',
              padding: '10px',
            }}
          >
            {dateString(date).utc}
          </div>
        )}
      </span>
    </div>
  );
};
