import React, { useState, useEffect } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Heart,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export default function QuestionPage({
  questionItem,
  questionNumber,
  totalQuestions,
  savedAnswers,
  onSelectMcq,
  saveStatus,
  onTriggerFunFact
}) {
  const [isOpen, setIsOpen] = useState(false);

  // Reset open state when navigating between different question pages
  useEffect(() => {
    setIsOpen(false);
  }, [questionItem.id]);

  const isReveal = questionItem.type === 'reveal';
  const selectedValue = savedAnswers[questionItem.id]?.selectedOption || '';
  const statusForThis = saveStatus[questionItem.id];

  const handleChooseOption = (option) => {
    onSelectMcq(questionItem, option);

    // Surprise Fun Fact popup if this question has one
    if (questionItem.funFactPopup) {
      setTimeout(() => {
        onTriggerFunFact(questionItem.funFactPopup, false);
      }, 700);
    }
  };

  return (
    <section className="single-page-container">
      <article className="scrapbook-question-card single-question-stage">
        <div className="washi-tape question-tape" />

        <div className="question-card-top">
          <div className="question-top-row">
            <span className="question-badge">
              {questionItem.badge || `Question ${questionNumber} of ${totalQuestions}`}
            </span>
          </div>

          <h2 className="question-heading">{questionItem.question}</h2>
          {questionItem.promptHint && <p className="question-hint">{questionItem.promptHint}</p>}
        </div>

        {isReveal ? (
          <div className="reveal-question-body">
            <button
              type="button"
              className={`scrapbook-dropdown-trigger reveal-trigger ${isOpen ? 'open' : ''}`}
              onClick={() => setIsOpen((prev) => !prev)}
              aria-expanded={isOpen}
            >
              <span className="trigger-left">
                <Heart size={18} className="heart-icon" />
                <span>
                  {isOpen
                    ? 'Hide My Answer'
                    : questionItem.dropdownButtonText || 'Reveal My Answer & Photo'}
                </span>
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
                    <h3 className="reveal-answer-title">{questionItem.answerTitle}</h3>
                    <p className="reveal-answer-text">{questionItem.answerText}</p>
                    <div className="reveal-signature">— Forever Yours ♥</div>
                  </div>

                  <div className="reveal-polaroid-column">
                    <div className="mini-polaroid">
                      <div className="washi-tape mini-tape" />
                      <div className="mini-polaroid-img-wrap">
                        <img
                          src={questionItem.photoUrl}
                          alt={questionItem.photoCaption || questionItem.question}
                          onError={(e) => {
                            if (e.currentTarget.src !== questionItem.placeholderPhotoUrl) {
                              e.currentTarget.src = questionItem.placeholderPhotoUrl;
                            }
                          }}
                        />
                      </div>
                      <p className="mini-polaroid-caption">{questionItem.photoCaption}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="mcq-question-body">
            {/* All 4 MCQ options displayed directly on screen beside each other (no dropdown!) */}
            <div className="mcq-options-grid" role="radiogroup" aria-label={questionItem.question}>
              {questionItem.options.map((option, optIdx) => {
                const isSelected = selectedValue === option;
                return (
                  <button
                    key={optIdx}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    className={`mcq-option-card ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleChooseOption(option)}
                  >
                    <div className="mcq-option-card-top">
                      <span className="option-letter">{String.fromCharCode(65 + optIdx)}</span>
                      {isSelected && <CheckCircle2 size={19} className="option-check" />}
                    </div>
                    <span className="mcq-option-card-text">{option}</span>
                  </button>
                );
              })}
            </div>

            {selectedValue && (
              <div className="mcq-saved-banner">
                <CheckCircle2 size={17} />
                <div>
                  <strong>Your Pick:</strong> {selectedValue}
                  <span className="saved-file-note">
                    {statusForThis === 'saving' ? ' • Saving choice...' : ' • Choice locked in ♥'}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </article>
    </section>
  );
}
