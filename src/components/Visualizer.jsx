import React, { useState } from 'react';
import './Visualizer.css';

const finishes = [
  { name: 'Limewash', icon: '🎨' },
  { name: 'Roman Clay', icon: '🧱' },
  { name: 'Concretta FS', icon: '🗿' },
  { name: 'Tadelakt', icon: '💧' },
  { name: 'Marmorino Tintoretto', icon: '✨' },
  { name: 'Marmorino Palladino', icon: '💎' },
];

const rooms = [
  { name: 'Living Room', icon: '🛋️' },
  { name: 'Bathroom', icon: '🛁' },
  { name: 'Kitchen', icon: '🍳' },
  { name: 'Bedroom', icon: '🛏️' },
  { name: 'Home Office', icon: '💻' },
  { name: 'Outdoor', icon: '🪴' },
  { name: 'Restaurant', icon: '🍽️' },
  { name: 'Cafe', icon: '☕' },
  { name: 'Law Office', icon: '⚖️' }, // New Law Office
  { name: 'Hotel', icon: '🏨' },     // New Hotel
];

const colorsByVibe = [
  {
    vibe: 'Neutrals',
    colors: ['White', 'Off-White', 'Beige', 'Light Gray', 'Greige'],
    colorMap: {
      'White': '#fff',
      'Off-White': '#f8f8f2',
      'Beige': '#f5f5dc',
      'Light Gray': '#d3d3d3',
      'Greige': '#a9a98f',
    },
  },
  {
    vibe: 'Naturals',
    colors: ['Earthy Brown', 'Terracotta', 'Olive Green', 'Sandy Beige', 'Stone Gray'],
    colorMap: {
      'Earthy Brown': '#a0522d',
      'Terracotta': '#e2725b',
      'Olive Green': '#808000',
      'Sandy Beige': '#f0e68c',
      'Stone Gray': '#8c8c8c',
    },
  },
  {
    vibe: 'Cool & Serene',
    colors: ['Light Blue', 'Mint Green', 'Lavender', 'Cool Gray', 'Seafoam'],
    colorMap: {
      'Light Blue': '#add8e6',
      'Mint Green': '#98fb98',
      'Lavender': '#e6e6fa',
      'Cool Gray': '#c0c0c0',
      'Seafoam': '#a7f3d0',
    },
  },
  {
    vibe: 'Warm & Vibrant',
    colors: ['Warm Yellow', 'Coral', 'Rust Orange', 'Crimson', 'Goldenrod'],
    colorMap: {
      'Warm Yellow': '#ffff00',
      'Coral': '#ff7f50',
      'Rust Orange': '#ff8c00',
      'Crimson': '#dc143c',
      'Goldenrod': '#daa520',
    },
  },
];

const Visualizer = () => {
  const [finish, setFinish] = useState({ name: 'Limewash', icon: '🎨' }); // Default to Limewash
  const [room, setRoom] = useState({ name: 'Living Room', icon: '🛋️' }); // Default to Living Room
  const [color, setColor] = useState('White'); // Default to White

  const handleColorClick = (c) => {
    setColor(c); // Set color directly
  };

  const scrollColors = (direction) => {
    const colorBar = document.querySelector('.color-bar');
    if (!colorBar) {
      console.error('Color bar not found');
      return;
    }
    const scrollAmount = 200;
    colorBar.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
  };

  const getImagePath = () => {
    const defaultPath = '/images/limewash_living-room_white.png';
    if (!finish && !room && !color) return defaultPath;

    const finishName = finish?.name?.toLowerCase().replace(/\s+/g, '-') || 'limewash';
    const roomName = room?.name?.toLowerCase().replace(/\s+/g, '-') || 'living-room';
    const colorName = color ? `_${color.toLowerCase().replace(/\s+/g, '-')}` : '';

    return `/images/${finishName}_${roomName}${colorName}.png`;
  };

  return (
    <section id="designer">
      <div className="design-selector compact-layout">
        {/* Left Panel */}
        <div className="left-panel">
          {/* Finishes Section */}
          <div className="finishes-section">
            <h3>
              <span className="header-icon">🎨</span> Choose Your Finish
            </h3>
            <div className="finishes-grid">
              {finishes.map((f) => (
                <button
                  key={f.name}
                  className={`finish-box ${finish && finish.name === f.name ? 'selected' : ''}`}
                  onClick={() => setFinish(f)}
                >
                  {f.name}
                </button>
              ))}
            </div>
          </div>

          {/* Rooms Section */}
          <div className="rooms-section">
            <h3>
              <span className="header-icon">🏠</span> Choose Your Room
            </h3>
            <div className="rooms-grid">
              {rooms.map((r) => (
                <button
                  key={r.name}
                  className={`room-box ${room && room.name === r.name ? 'selected' : ''}`}
                  onClick={() => setRoom(r)}
                >
                  <span className="room-icon">{r.icon}</span>
                  {r.name}
                </button>
              ))}
            </div>
          </div>

          {/* Signature Box */}
          <div className="signature-box">
            more options are coming soon! <br />
          </div>
        </div>

        {/* Right Panel */}
        <div className="right-panel">
          {/* Colors Section */}
          <div className="colors-section">
            <h3>
              <span className="header-icon">🌈</span> Choose Your Color
            </h3>
            <div className="color-bar-container">
              <button className="scroll-button left" onClick={() => scrollColors('left')}>
                ◀
              </button>
              <div className="color-bar">
                {colorsByVibe.flatMap((vibeGroup) => vibeGroup.colors).map((c) => {
                  const colorValue = colorsByVibe.find((vibeGroup) => vibeGroup.colorMap[c])?.colorMap[c];
                  return (
                    <div
                      key={c}
                      className={`color-item ${color === c ? 'selected' : ''}`}
                      onClick={() => handleColorClick(c)}
                    >
                      <div
                        className="color-circle"
                        style={{ backgroundColor: colorValue }}
                      />
                      <span className="color-name">{c}</span>
                    </div>
                  );
                })}
              </div>
              <button className="scroll-button right" onClick={() => scrollColors('right')}>
                ▶
              </button>
            </div>
          </div>

          {/* Preview Area */}
          <div className="preview-area">
            <h3>
              Your Selection:  
              <span id="selection-text">
                {finish ? finish.name : 'No Finish'} | {room ? room.name : 'No Room'} | {color ? color : 'No Color'}
              </span>
            </h3>
            <div className="preview-image">
              <img
                src={getImagePath()}
                alt={`${finish ? finish.name : 'No Finish'} | ${room ? room.name : 'No Room'} | ${color ? color : 'No Color'}`}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Visualizer;