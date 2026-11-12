import React from 'react';
import { Heart, CheckCircle2, Sparkles, Download, Edit3 } from 'lucide-react';

export default function AnswerSessionPage({
  questions,
  savedAnswers,
  onJumpToQuestionIndex,
  onDownloadTxt
}) {
  return (
    <section className="single-page-container">
      <div className="answer-session-card">
        <div className="washi-tape cover-tape-left" />
        <div className="washi-tape cover-tape-right" />

        <div className="section-header" style={{ marginBottom: '1.8rem' }}>
          <div className="vintage-stamp">OUR QUESTION & ANSWER SESSION</div>
          <h2 className="section-title">Everything We Shared & Chose</h2>
          <p className="section-subtitle">
            Here is a keepsake page of my love notes to you and the choices you picked for our 3-Year Anniversary date (saved automatically to <code>responses.txt</code>).
          </p>
        </div>

        <div className="answer-session-grid">
          {questions.map((q, idx) => {
            const isReveal = q.type === 'reveal';
            const picked = savedAnswers[q.id]?.selectedOption;

            return (
              <div key={q.id} className="session-summary-item">
                <div className="session-item-top">
                  <span className="question-badge">Question #{idx + 1}</span>
                  <button
                    type="button"
                    className="session-revisit-btn"
                    onClick={() => onJumpToQuestionIndex(idx)}
                  >
                    <Edit3 size={13} />
                    <span>{isReveal ? 'View Card' : 'Change Pick'}</span>
                  </button>
                </div>

                <h3 className="session-q-title">{q.question}</h3>

                {isReveal ? (
                  <div className="session-reveal-box">
                    <div className="session-reveal-text">
                      <strong>
                        <Sparkles size={14} /> {q.answerTitle}
                      </strong>
                      <p>{q.answerText}</p>
                    </div>
                    <div className="session-mini-thumb">
                      <img
                        src={q.photoUrl}
                        alt={q.photoCaption}
                        onError={(e) => {
                          if (e.currentTarget.src !== q.placeholderPhotoUrl) {
                            e.currentTarget.src = q.placeholderPhotoUrl;
                          }
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className={`session-mcq-box ${picked ? 'picked' : 'unpicked'}`}>
                    <CheckCircle2 size={18} />
                    <div>
                      <span className="session-mcq-label">Her Selected Choice:</span>
                      <p className="session-mcq-val">
                        {picked || 'Not chosen yet — click "Change Pick" above to choose one!'}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="session-bottom-bar" style={{ justifyContent: 'center' }}>
          <span className="session-ready-whisper">
            <Heart size={15} fill="currentColor" /> Ready for the final page? Click “Next Page” below!
          </span>
        </div>
      </div>
    </section>
  );
}

