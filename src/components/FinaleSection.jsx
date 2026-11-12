import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Play, RotateCcw, Volume2, Film, Download } from 'lucide-react';

export default function FinaleSection({ config, onConfirmYes, onDownloadTxt }) {
  const [noInvisible, setNoInvisible] = useState(false);
  // Stages: 'question' | 'black_screen' | 'video_stage'
  const [stage, setStage] = useState('question');
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef(null);

  const activeVideoSrc = config.videoUrl || '/Scrapbook/finale-video.mp4';

  const handleSelectYes = () => {
    onConfirmYes(config.question, config.yesLabel);

    try {
      confetti({
        particleCount: 70,
        spread: 65,
        origin: { y: 0.65 }
      });
    } catch {
      // ignore if canvas-confetti fails
    }

    // Transition into the full black screen with "?? the end"
    setStage('black_screen');
  };

  useEffect(() => {
    if (stage === 'black_screen') {
      const timer = setTimeout(() => {
        setStage('video_stage');
      }, config.blackScreenDurationMs || 3600);
      return () => clearTimeout(timer);
    }
  }, [stage, config.blackScreenDurationMs]);

  useEffect(() => {
    if (stage === 'video_stage' && videoRef.current) {
      videoRef.current.play().catch(() => {
        // Browser may require user click if unmuted
      });
    }
  }, [stage]);

  return (
    <section id="finale-section" className="scrapbook-section finale-wrapper">
      <div className="finale-card">
        <div className="washi-tape finale-tape" />
        <div className="vintage-stamp">{config.badge || 'CHAPTER III • FOREVER'}</div>
        <h2 className="finale-question-title">{config.question}</h2>
        <p className="finale-subtitle">{config.subtitle}</p>

        <div className="finale-mcq-choices">
          <button
            type="button"
            className="finale-yes-btn"
            onClick={handleSelectYes}
          >
            <Heart size={20} fill="currentColor" />
            <span>{config.yesLabel}</span>
          </button>

          <button
            type="button"
            className={`finale-no-btn ${noInvisible ? 'vanished' : ''}`}
            onMouseEnter={() => setNoInvisible(true)}
            onTouchStart={() => setNoInvisible(true)}
            onFocus={() => setNoInvisible(true)}
            tabIndex={noInvisible ? -1 : 0}
            aria-hidden={noInvisible}
          >
            <span>{config.noLabel}</span>
          </button>
        </div>

        {noInvisible && (
          <p className="no-vanished-whisper">
            {config.vanishedWhisper || 'You thought? No chance ji. Ab yes choose karo'}
          </p>
        )}

        {onDownloadTxt && (
          <div style={{ marginTop: '2.25rem', paddingTop: '1.25rem', borderTop: '1px dashed rgba(93, 64, 47, 0.2)' }}>
            <button type="button" className="download-txt-btn" onClick={onDownloadTxt}>
              <Download size={15} />
              <span>Download Her Saved Answers (responses.txt)</span>
            </button>
          </div>
        )}
      </div>

      {/* FULL BLACK SCREEN OVERLAY: "?? the end" -> 30-SECOND VIDEO */}
      {(stage === 'black_screen' || stage === 'video_stage') && (
        <div className="cinema-blackout-overlay" role="dialog" aria-modal="true">
          {stage === 'black_screen' && (
            <div className="the-end-screen">
              <h1 className="the-end-glitch-text">{config.blackScreenText || '?? the end'}</h1>
              <p className="the-end-subtext">{config.blackScreenSubtext}</p>
            </div>
          )}

          {stage === 'video_stage' && (
            <div className="finale-video-container">
              <div className="finale-video-header">
                <span className="cinema-badge">
                  <Film size={15} /> Special Message From Me ♥
                </span>
                <h2>Why I Love You So Much ♥</h2>
                <p>Happy 3-Year Anniversary (14th November 2023 — 14th November 2026)</p>
              </div>

              <div className="video-frame-shell">
                {!videoError ? (
                  <video
                    ref={videoRef}
                    key={activeVideoSrc}
                    src={activeVideoSrc}
                    controls
                    playsInline
                    className="anniversary-video-element"
                    onError={() => setVideoError(true)}
                  />
                ) : (
                  <div className="video-placeholder-notice">
                    <Volume2 size={36} />
                    <h3>Unable to load video</h3>
                    <p>
                      Video linked at <code>/Scrapbook/finale-video.mp4</code>
                    </p>
                  </div>
                )}
              </div>

              <div className="finale-video-actions">
                {onDownloadTxt && (
                  <button
                    type="button"
                    className="cinema-action-btn"
                    onClick={onDownloadTxt}
                  >
                    <Download size={16} />
                    <span>Download Her Answers (responses.txt)</span>
                  </button>
                )}
                <button
                  type="button"
                  className="cinema-action-btn secondary"
                  onClick={() => {
                    setStage('black_screen');
                  }}
                >
                  <Play size={16} />
                  <span>Replay “?? the end” Transition</span>
                </button>
                <button
                  type="button"
                  className="cinema-action-btn secondary"
                  onClick={() => setStage('question')}
                >
                  <RotateCcw size={16} />
                  <span>Back to Scrapbook</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
