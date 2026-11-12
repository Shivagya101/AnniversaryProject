import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Heart, CheckCircle2, Sparkles } from 'lucide-react';

export default function InteractiveQuestions({ questions, savedAnswers, onSelectMcq, saveStatus }) {
  const [openReveals, setOpenReveals] = useState({});
  const [openDropdowns, setOpenDropdowns] = useState({});

  const toggleReveal = (id) => {
    setOpenReveals((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const toggleMcqDropdown = (id) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleChooseOption = (q, option) => {
    onSelectMcq(q, option);
    setOpenDropdowns((prev) => ({
      ...prev,
      [q.id]: false
    }));
  };

  return (
    <section id="questions-section" className="scrapbook-section">
      <div className="section-header">
        <div className="vintage-stamp">CHAPTER II • LITTLE QUESTIONS FOR YOU</div>
        <h2 className="section-title">Unfold My Notes & Pick Your Favorites</h2>
        <p className="section-subtitle">
          Some questions hide a secret note and photo from me — and others let you choose how we celebrate our 3-year anniversary date.
        </p>
      </div>

      <div className="questions-stack">
        {questions.map((q, index) => {
          const isReveal = q.type === 'reveal';
          const isOpen = !!openReveals[q.id];
          const isMcqOpen = !!openDropdowns[q.id];
          const selectedValue = savedAnswers[q.id]?.selectedOption || '';
          const statusForThis = saveStatus[q.id];

          return (
            <article key={q.id} className="scrapbook-question-card">
              <div className="washi-tape question-tape" />

              <div className="question-card-top">
                <span className="question-badge">{q.badge || `Question #${index + 1}`}</span>
                <h3 className="question-heading">{q.question}</h3>
                {q.promptHint && <p className="question-hint">{q.promptHint}</p>}
              </div>

              {isReveal ? (
                <div className="reveal-question-body">
                  <button
                    type="button"
                    className={`scrapbook-dropdown-trigger reveal-trigger ${isOpen ? 'open' : ''}`}
                    onClick={() => toggleReveal(q.id)}
                    aria-expanded={isOpen}
                  >
                    <span className="trigger-left">
                      <Heart size={18} className="heart-icon" />
                      <span>{isOpen ? 'Hide My Answer' : q.dropdownButtonText || 'Reveal My Answer & Photo'}</span>
                    </span>
                    {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>

                  {isOpen && (
                    <div className="reveal-answer-drawer">
                      <div className="reveal-answer-grid">
                        <div className="reveal-letter-column">
                          <div className="wax-seal-tag">
                            <Sparkles size={14} /> Written by Me for You
                          </div>
                          <h4 className="reveal-answer-title">{q.answerTitle}</h4>
                          <p className="reveal-answer-text">{q.answerText}</p>
                          <div className="reveal-signature">— Forever Yours ♥</div>
                        </div>

                        <div className="reveal-polaroid-column">
                          <div className="mini-polaroid">
                            <div className="washi-tape mini-tape" />
                            <div className="mini-polaroid-img-wrap">
                              <img
                                src={q.photoUrl}
                                alt={q.photoCaption || q.question}
                                onError={(e) => {
                                  if (e.currentTarget.src !== q.placeholderPhotoUrl) {
                                    e.currentTarget.src = q.placeholderPhotoUrl;
                                  }
                                }}
                              />
                            </div>
                            <p className="mini-polaroid-caption">{q.photoCaption}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="mcq-question-body">
                  <div className="custom-dropdown-container">
                    <button
                      type="button"
                      className={`scrapbook-dropdown-trigger mcq-trigger ${isMcqOpen ? 'open' : ''} ${
                        selectedValue ? 'has-selection' : ''
                      }`}
                      onClick={() => toggleMcqDropdown(q.id)}
                      aria-expanded={isMcqOpen}
                    >
                      <span className="trigger-left">
                        <span>{selectedValue || q.dropdownPlaceholder || 'Select one of the 4 options...'}</span>
                      </span>
                      {isMcqOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>

                    {isMcqOpen && (
                      <ul className="scrapbook-dropdown-menu" role="listbox">
                        {q.options.map((option, optIdx) => {
                          const isSelected = selectedValue === option;
                          return (
                            <li key={optIdx}>
                              <button
                                type="button"
                                className={`dropdown-option-item ${isSelected ? 'selected' : ''}`}
                                onClick={() => handleChooseOption(q, option)}
                              >
                                <span className="option-letter">{String.fromCharCode(65 + optIdx)}</span>
                                <span className="option-text">{option}</span>
                                {isSelected && <CheckCircle2 size={18} className="option-check" />}
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>

                  {selectedValue && (
                    <div className="mcq-saved-banner">
                      <CheckCircle2 size={17} />
                      <div>
                        <strong>Your Pick:</strong> {selectedValue}
                        <span className="saved-file-note">
                          {statusForThis === 'saving'
                            ? ' • Saving to file...'
                            : ' • Saved to responses.txt & responses.json ♥'}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}

