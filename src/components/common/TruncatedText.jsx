import React, { useState } from 'react';

export const TruncatedText = ({ text, maxLength = 50 }) => {
  const [isHovered, setIsHovered] = useState(false);
  const truncatedText =
    text && text.length > maxLength
      ? text.slice(0, 10) + '...' + text.slice(-10)
      : text;

  return (
    <div className="max-w-[400px] break-words">
      <div
        className={`relative overflow-hidden ${
          isHovered ? 'max-h-full' : 'max-h-[1.5em]'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span
          className="inline-block max-w-full whitespace-normal transition-all duration-300"
          style={{
            lineHeight: '1.5em',
            textOverflow: 'ellipsis',
          }}
        >
          {isHovered ? text : truncatedText}
        </span>
      </div>
    </div>
  );
};
