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
  { name: 'Law Office', icon: '⚖️' },
  { name: 'Hotel', icon: '🏨' },
];

const colors = [
  { name: 'White', value: '#fff' },
  { name: 'Beige', value: '#f5f5dc' },
  { name: 'Greige', value: '#a9a98f' },
  { name: 'Blue', value: '#add8e6' },
  { name: 'Green', value: '#98fb98' },
  { name: 'Lavender', value: '#e6e6fa' },
  { name: 'Gray', value: '#c0c0c0' },
  { name: 'Seafoam', value: '#a7f3d0' },
  { name: 'Yellow', value: '#ffff00' },
  { name: 'Coral', value: '#ff7f50' },
  { name: 'Orange', value: '#ff8c00' },
  { name: 'Crimson', value: '#dc143c' },
  { name: 'Goldenrod', value: '#daa520' },
];

const Visualizer = () => {
  const [finish, setFinish] = useState({ name: 'Limewash', icon: '🎨' });
  const [room, setRoom] = useState({ name: 'Living Room', icon: '🛋️' });
  const [color, setColor] = useState('White');

  const handleColorClick = (c) => {
    setColor(c.name); // Set color name directly
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
                {colors.map((c) => (
                  <div
                    key={c.name}
                    className={`color-item ${color === c.name ? 'selected' : ''}`}
                    onClick={() => handleColorClick(c)}
                  >
                    <div
                      className="color-circle"
                      style={{ backgroundColor: c.value }}
                    />
                    <span className="color-name">{c.name}</span>
                  </div>
                ))}
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