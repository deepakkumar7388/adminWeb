import React from 'react';

/**
 * Clean State Emblem of India (Lion Capital of Ashoka) SVG component
 * Suitable for official Government of India administrative portals
 */
export default function EmblemOfIndia({ size = 44, color = "#F8FAFC" }) {
  return (
    <div className="gov-emblem-wrap" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px' }}>
      <svg 
        width={size} 
        height={size * 0.9} 
        viewBox="0 0 100 90" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}
      >
        {/* Central Lion Head & Mane */}
        <path
          d="M50 8C43 8 39 13 39 19C39 24 43 27 46 29C42 32 40 37 40 43C40 48 44 51 50 51C56 51 60 48 60 43C60 37 58 32 54 29C57 27 61 24 61 19C61 13 57 8 50 8Z"
          fill={color}
          opacity="0.95"
        />
        {/* Left Lion Profile */}
        <path
          d="M36 17C31 16 26 20 25 26C24 31 27 36 31 38C28 41 27 46 29 51C30 54 34 56 38 55C37 50 37 44 38 39C35 37 34 32 35 28C35 24 38 20 40 18C38 17 37 17 36 17Z"
          fill={color}
          opacity="0.85"
        />
        {/* Right Lion Profile */}
        <path
          d="M64 17C69 16 74 20 75 26C76 31 73 36 69 38C72 41 73 46 71 51C70 54 66 56 62 55C63 50 63 44 62 39C65 37 66 32 65 28C65 24 62 20 60 18C62 17 63 17 64 17Z"
          fill={color}
          opacity="0.85"
        />
        {/* Central Crown / Ears */}
        <circle cx="50" cy="12" r="3.5" fill={color} />
        <circle cx="45" cy="18" r="1.5" fill="#0B132B" />
        <circle cx="55" cy="18" r="1.5" fill="#0B132B" />
        {/* Abacus Base Platform */}
        <rect x="22" y="55" width="56" height="7" rx="2" fill={color} opacity="0.9" />
        {/* Ashoka Chakra in Center of Abacus */}
        <circle cx="50" cy="58.5" r="3" stroke="#0B132B" strokeWidth="1" fill={color} />
        {/* Galloping Horse (Left) & Bull (Right) silhouette markers */}
        <path d="M28 58.5C28 57 32 57 32 58.5C32 60 28 60 28 58.5Z" fill="#0B132B" opacity="0.6" />
        <path d="M68 58.5C68 57 72 57 72 58.5C72 60 68 60 68 58.5Z" fill="#0B132B" opacity="0.6" />
        {/* Inverted Lotus Plinth Pedestal */}
        <path
          d="M26 63C33 67 41 68 50 68C59 68 67 67 74 63L76 71C67 74 59 75 50 75C41 75 33 74 24 71L26 63Z"
          fill={color}
          opacity="0.8"
        />
        {/* Stepped Pedestal Base */}
        <rect x="20" y="73" width="60" height="4" rx="1.5" fill={color} opacity="0.9" />
      </svg>
      <span style={{ 
        fontSize: '9.5px', 
        fontWeight: '600', 
        letterSpacing: '0.8px', 
        color: color, 
        opacity: 0.9,
        fontFamily: "'Inter', sans-serif"
      }}>
        भारत सरकार
      </span>
    </div>
  );
}
