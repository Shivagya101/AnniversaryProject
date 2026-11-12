import React, { useEffect, useRef } from 'react';
import { Sparkles, Heart, ArrowRight, X } from 'lucide-react';

export default function FunFactModal({ funFact, onClose, onContinue }) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (!funFact || !funFact.audioUrl) return;

    const audio = new Audio(funFact.audioUrl);
    audio.loop = true;
    audio.volume = 0.85;
    audioRef.current = audio;

    audio.play().catch(() => {
      // Fallback if browser requires interaction
    });

    // Strictly stop and clean up the audio as soon as the pop-up closes or unmounts
    return () => {
      audio.pause();
      audio.currentTime = 0;
      audioRef.current = null;
    };
  }, [funFact]);

  if (!funFact) return null;

  const handleClose = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    onClose();
  };

  const handleContinue = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    onContinue();
  };

  return (
    <div
      className="fun-fact-modal-backdrop"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label="Fun Fact Favorite Photo Popup"
    >
      <div className="fun-fact-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="washi-tape fun-fact-tape-left" />
        <div className="washi-tape fun-fact-tape-right" />

        <button
          type="button"
          className="polaroid-modal-close"
          onClick={handleClose}
          aria-label="Close Fun Fact Popup"
        >
          <X size={20} />
        </button>

        <div className="fun-fact-header-badge">
          <Sparkles size={15} />
          <span>{funFact.badge || 'FUN FACT POP-UP! 📸'}</span>
        </div>

        <h2 className="fun-fact-exclamation">{funFact.exclamation}</h2>

        <div className="fun-fact-body-grid">
          <div className="fun-fact-polaroid">
            <div className="washi-tape mini-tape" />
            <div className="fun-fact-img-frame">
              <img
                src={funFact.photoUrl}
                alt={funFact.photoCaption}
                onError={(e) => {
                  if (e.currentTarget.src !== funFact.placeholderPhotoUrl) {
                    e.currentTarget.src = funFact.placeholderPhotoUrl;
                  }
                }}
              />
            </div>
            <p className="fun-fact-polaroid-caption">{funFact.photoCaption}</p>
          </div>

          <div className="fun-fact-description-box">
            <div className="speech-bubble-tag">
              <Heart size={14} fill="currentColor" /> Why I love this photo so much:
            </div>
            <p className="fun-fact-description-text">“{funFact.description}”</p>
            <div className="fun-fact-signoff">— Me, still obsessed with this photo of us ♥</div>

            <div className="fun-fact-actions">
              <button
                type="button"
                className="scrapbook-primary-btn fun-fact-continue-btn"
                onClick={handleContinue}
              >
                <span>Turn to Next Page</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
