import React, { useState, useRef } from 'react';
import { Calendar, Sparkles, X, Eye, Grid, Layers } from 'lucide-react';

export default function MonthlyCollage({ months }) {
  const [selectedYear, setSelectedYear] = useState('All');
  const [activePolaroid, setActivePolaroid] = useState(null);
  const [popoverPos, setPopoverPos] = useState({ left: 0, top: 0 });
  const [compactMode, setCompactMode] = useState(false);
  const sectionRef = useRef(null);

  const yearTabs = [
    { id: 'All', label: 'All 37 Months (Nov ’23 – Nov ’26)' },
    { id: 'Year 1', label: 'Year 1 (Nov ’23 – Oct ’24)' },
    { id: 'Year 2', label: 'Year 2 (Nov ’24 – Oct ’25)' },
    { id: 'Year 3', label: 'Year 3 (Nov ’25 – Nov ’26)' }
  ];

  const filteredMonths =
    selectedYear === 'All'
      ? months
      : months.filter((item) => item.yearGroup === selectedYear);

  const handlePolaroidClick = (e, item) => {
    e.stopPropagation();
    if (!sectionRef.current) return;

    const sectionRect = sectionRef.current.getBoundingClientRect();
    const cardWidth = Math.min(480, sectionRect.width - 24);
    const cardHeight = 260;
    const padding = 12;

    // Position relative to the scrapbook section itself so it NEVER goes outside the scrapbook!
    const clickX = e.clientX - sectionRect.left;
    const clickY = e.clientY - sectionRect.top;

    const clampedLeft = Math.min(
      Math.max(padding, clickX - cardWidth / 2),
      Math.max(padding, sectionRect.width - cardWidth - padding)
    );

    const clampedTop = Math.min(
      Math.max(padding, clickY - cardHeight / 2),
      Math.max(padding, sectionRect.height - cardHeight - padding)
    );

    setPopoverPos({ left: clampedLeft, top: clampedTop });
    setActivePolaroid(item);
  };

  return (
    <section
      id="collage-section"
      ref={sectionRef}
      className="scrapbook-section"
      style={{ position: 'relative' }}
      onClick={() => {
        if (activePolaroid) setActivePolaroid(null);
      }}
    >
      <div className="section-header">
        <div className="vintage-stamp">CHAPTER I • 37 MONTHS OF US</div>
        <h2 className="section-title">Every Month From November 2023 to November 2026</h2>
        <p className="section-subtitle">
          Thirty-seven Polaroids for thirty-seven unforgettable months.
        </p>

        <div className="collage-controls">
          <div className="year-filter-group" role="tablist" aria-label="Filter collage by year">
            {yearTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActivePolaroid(null);
                  setSelectedYear(tab.id);
                }}
                className={`year-filter-btn ${selectedYear === tab.id ? 'active' : ''}`}
              >
                <Calendar size={14} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          <button
            type="button"
            className="layout-toggle-btn"
            onClick={(e) => {
              e.stopPropagation();
              setActivePolaroid(null);
              setCompactMode((prev) => !prev);
            }}
            title="Switch collage density"
          >
            {compactMode ? <Layers size={15} /> : <Grid size={15} />}
            <span>{compactMode ? 'Scrapbook Wall View' : 'Compact Overview'}</span>
          </button>
        </div>
      </div>

      <div className={`polaroid-collage-grid ${compactMode ? 'compact-grid' : ''}`}>
        {filteredMonths.map((item) => (
          <article
            key={item.id}
            className={`polaroid-card ${item.monthNumber === 37 ? 'milestone-polaroid' : ''}`}
            style={{ '--tilt': `${item.tilt}deg`, '--tape-color': item.tapeColor }}
            onClick={(e) => handlePolaroidClick(e, item)}
          >
            <div className="washi-tape" aria-hidden="true" />
            <div className="polaroid-number-badge">#{String(item.monthNumber).padStart(2, '0')}</div>
            <div className="polaroid-image-frame">
              <img
                src={item.image}
                alt={item.month}
                loading="lazy"
                onError={(e) => {
                  if (e.currentTarget.src !== item.placeholderImage) {
                    e.currentTarget.src = item.placeholderImage;
                  }
                }}
              />
              <div className="polaroid-hover-overlay">
                <Eye size={18} />
                <span>Read Memory</span>
              </div>
            </div>

            <div className="polaroid-caption-area">
              <div className="polaroid-month-label">{item.title}</div>
              <p className="polaroid-handwritten-caption">{item.caption}</p>
            </div>
          </article>
        ))}
      </div>

      {activePolaroid && (
        <div
          className="polaroid-cursor-popover"
          style={{
            position: 'absolute',
            left: `${popoverPos.left}px`,
            top: `${popoverPos.top}px`
          }}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            className="polaroid-modal-close"
            onClick={() => setActivePolaroid(null)}
            aria-label="Close memory"
          >
            <X size={18} />
          </button>
          <div className="washi-tape modal-tape" />

          <div className="polaroid-popover-content">
            <div className="polaroid-popover-image">
              <img
                src={activePolaroid.image}
                alt={activePolaroid.title}
                onError={(e) => {
                  if (e.currentTarget.src !== activePolaroid.placeholderImage) {
                    e.currentTarget.src = activePolaroid.placeholderImage;
                  }
                }}
              />
            </div>
            <div className="polaroid-popover-note">
              <span className="modal-month-tag">
                <Sparkles size={13} /> Month #{activePolaroid.monthNumber} • {activePolaroid.month}
              </span>
              <h3>{activePolaroid.title}</h3>
              <p className="modal-caption-highlight">“{activePolaroid.caption}”</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
