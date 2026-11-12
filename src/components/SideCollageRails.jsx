import React, { useState } from 'react';
import { X, Heart } from 'lucide-react';

export default function SideCollageRails({ photos }) {
  const [selectedSidePhoto, setSelectedSidePhoto] = useState(null);
  const [cursorCoords, setCursorCoords] = useState({ x: 200, y: 200 });

  const leftPhotos = photos.filter((p) => p.side === 'left');
  const rightPhotos = photos.filter((p) => p.side === 'right');

  const handleOpenAtCursor = (e, item) => {
    const cardWidth = 340;
    const cardHeight = 380;
    const margin = 16;

    const clampedLeft = Math.min(
      Math.max(margin, e.clientX - cardWidth / 2),
      Math.max(margin, window.innerWidth - cardWidth - margin)
    );
    const clampedTop = Math.min(
      Math.max(margin, e.clientY - cardHeight / 2),
      Math.max(margin, window.innerHeight - cardHeight - margin)
    );

    setCursorCoords({ x: clampedLeft, y: clampedTop });
    setSelectedSidePhoto(item);
  };

  return (
    <>
      {/* Left Side Collage Strip */}
      <aside className="side-collage-rail side-rail-left" aria-label="Left side photo collage">
        {leftPhotos.map((item) => (
          <div
            key={item.id}
            className="side-polaroid-item"
            style={{ '--side-tilt': `${item.tilt}deg`, '--tape-color': item.tapeColor }}
            onClick={(e) => handleOpenAtCursor(e, item)}
            title="Click to enlarge photo"
          >
            <div className="washi-tape side-tape" />
            <div className="side-polaroid-img">
              <img
                src={item.image}
                alt={item.caption}
                loading="lazy"
                onError={(e) => {
                  if (e.currentTarget.src !== item.placeholderImage) {
                    e.currentTarget.src = item.placeholderImage;
                  }
                }}
              />
            </div>
            <p className="side-polaroid-caption">{item.caption}</p>
          </div>
        ))}
      </aside>

      {/* Right Side Collage Strip */}
      <aside className="side-collage-rail side-rail-right" aria-label="Right side photo collage">
        {rightPhotos.map((item) => (
          <div
            key={item.id}
            className="side-polaroid-item"
            style={{ '--side-tilt': `${item.tilt}deg`, '--tape-color': item.tapeColor }}
            onClick={(e) => handleOpenAtCursor(e, item)}
            title="Click to enlarge photo"
          >
            <div className="washi-tape side-tape" />
            <div className="side-polaroid-img">
              <img
                src={item.image}
                alt={item.caption}
                loading="lazy"
                onError={(e) => {
                  if (e.currentTarget.src !== item.placeholderImage) {
                    e.currentTarget.src = item.placeholderImage;
                  }
                }}
              />
            </div>
            <p className="side-polaroid-caption">{item.caption}</p>
          </div>
        ))}
      </aside>

      {/* Cursor-positioned popover if she clicks one of the side collage Polaroids */}
      {selectedSidePhoto && (
        <div
          className="polaroid-cursor-backdrop"
          onClick={() => setSelectedSidePhoto(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="side-lightbox-card"
            style={{
              position: 'fixed',
              left: `${cursorCoords.x}px`,
              top: `${cursorCoords.y}px`,
              width: '340px',
              zIndex: 105
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="polaroid-modal-close"
              onClick={() => setSelectedSidePhoto(null)}
            >
              <X size={18} />
            </button>
            <div className="washi-tape" />
            <div className="side-lightbox-img">
              <img
                src={selectedSidePhoto.image}
                alt={selectedSidePhoto.caption}
                onError={(e) => {
                  if (e.currentTarget.src !== selectedSidePhoto.placeholderImage) {
                    e.currentTarget.src = selectedSidePhoto.placeholderImage;
                  }
                }}
              />
            </div>
            <p className="side-lightbox-caption">
              <Heart size={16} fill="currentColor" /> {selectedSidePhoto.caption}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
