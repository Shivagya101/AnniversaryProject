import React, { useState, useEffect } from 'react';
import {
  Heart,
  FileText,
  Download,
  ArrowLeft,
  ArrowRight,
  BookOpen
} from 'lucide-react';
import {
  COUPLE_INFO,
  SIDE_COLLAGE_PHOTOS,
  MONTHLY_COLLAGE,
  INTERACTIVE_QUESTIONS,
  FINALE_CONFIG
} from './data/anniversaryData';
import SideCollageRails from './components/SideCollageRails';
import MonthlyCollage from './components/MonthlyCollage';
import QuestionPage from './components/QuestionPage';
import AnswerSessionPage from './components/AnswerSessionPage';
import FinaleSection from './components/FinaleSection';
import FunFactModal from './components/FunFactModal';
import AnimatedChibiCompanions from './components/AnimatedChibiCompanions';

export default function App() {
  const [savedAnswers, setSavedAnswers] = useState({});
  const [foreverAnswer, setForeverAnswer] = useState(null);
  const [saveStatus, setSaveStatus] = useState({});
  const [showFilePreview, setShowFilePreview] = useState(false);

  // Build the ordered list of separate pages:
  // 0: Cover ("Three Years of Us")
  // 1: 37-Month Scrapbook
  // 2..(2 + N - 1): Each Question on its own page
  // 2 + N: Answer Session Page
  // 3 + N: Final Page ("Do you see us together forever?")
  const pages = [
    { id: 'cover', type: 'cover', title: 'Three Years of Us', shortLabel: '1. Start' },
    { id: 'scrapbook', type: 'scrapbook', title: '37-Month Scrapbook', shortLabel: '2. Scrapbook' },
    ...INTERACTIVE_QUESTIONS.map((q, idx) => ({
      id: `question-${q.id}`,
      type: 'question',
      questionIndex: idx,
      questionItem: q,
      title: `Question #${idx + 1}`,
      shortLabel: `${idx + 3}. Q${idx + 1}`
    })),
    {
      id: 'answer-session',
      type: 'answer-session',
      title: 'Q&A Session',
      shortLabel: `${INTERACTIVE_QUESTIONS.length + 3}. Answers`
    },
    {
      id: 'finale',
      type: 'finale',
      title: 'Together Forever?',
      shortLabel: `${INTERACTIVE_QUESTIONS.length + 4}. Forever`
    }
  ];

  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [activeFunFact, setActiveFunFact] = useState(null);
  const [advanceAfterFunFact, setAdvanceAfterFunFact] = useState(false);
  const [seenFunFacts, setSeenFunFacts] = useState({});

  const currentPage = pages[currentPageIndex];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPageIndex]);

  // Load any previously saved answers from `/api/responses` (or localStorage fallback)
  useEffect(() => {
    fetch('/api/responses')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.answers) {
          setSavedAnswers(data.answers);
        }
        if (data && data.foreverAnswer) {
          setForeverAnswer(data.foreverAnswer);
        }
      })
      .catch(() => {
        const local = localStorage.getItem('anniversary_scrapbook_answers');
        if (local) {
          try {
            const parsed = JSON.parse(local);
            setSavedAnswers(parsed.answers || {});
            setForeverAnswer(parsed.foreverAnswer || null);
          } catch {
            // ignore
          }
        }
      });
  }, []);

  const handleSelectMcq = async (questionObj, selectedOption) => {
    const timestamp = new Date().toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'medium'
    });

    const nextAnswers = {
      ...savedAnswers,
      [questionObj.id]: {
        questionId: questionObj.id,
        question: questionObj.question,
        selectedOption,
        timestamp
      }
    };
    setSavedAnswers(nextAnswers);
    setSaveStatus((prev) => ({ ...prev, [questionObj.id]: 'saving' }));

    localStorage.setItem(
      'anniversary_scrapbook_answers',
      JSON.stringify({ answers: nextAnswers, foreverAnswer })
    );

    try {
      await fetch('/api/save-response', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'mcq',
          questionId: questionObj.id,
          question: questionObj.question,
          selectedOption
        })
      });
      setSaveStatus((prev) => ({ ...prev, [questionObj.id]: 'saved' }));
    } catch {
      setSaveStatus((prev) => ({ ...prev, [questionObj.id]: 'saved_local' }));
    }
  };

  const handleConfirmYes = async (questionText, answerLabel) => {
    const timestamp = new Date().toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'medium'
    });
    const foreverObj = { question: questionText, answer: answerLabel, timestamp };
    setForeverAnswer(foreverObj);

    localStorage.setItem(
      'anniversary_scrapbook_answers',
      JSON.stringify({ answers: savedAnswers, foreverAnswer: foreverObj })
    );

    try {
      await fetch('/api/save-response', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'forever',
          question: questionText,
          answer: answerLabel
        })
      });
    } catch {
      // fallback already stored in localStorage
    }
  };

  const handleTriggerFunFact = (funFactObj, shouldAdvanceWhenClosed = false) => {
    setActiveFunFact(funFactObj);
    setAdvanceAfterFunFact(shouldAdvanceWhenClosed);
    if (currentPage.type === 'question') {
      setSeenFunFacts((prev) => ({
        ...prev,
        [currentPage.questionItem.id]: true
      }));
    }
  };

  const handleNextPage = () => {
    if (currentPageIndex >= pages.length - 1) return;

    // If we are on a Question page that has a Fun Fact popup and she hasn't seen it yet,
    // pop up the Fun Fact ("This is my fav pic of us!") before turning to the next page!
    if (
      currentPage.type === 'question' &&
      currentPage.questionItem.funFactPopup &&
      !seenFunFacts[currentPage.questionItem.id]
    ) {
      handleTriggerFunFact(currentPage.questionItem.funFactPopup, true);
      return;
    }

    setCurrentPageIndex((prev) => Math.min(pages.length - 1, prev + 1));
  };

  const handlePrevPage = () => {
    setCurrentPageIndex((prev) => Math.max(0, prev - 1));
  };

  const downloadResponsesTxt = () => {
    const lines = [
      '====================================================',
      '   OUR 3-YEAR ANNIVERSARY SCRAPBOOK - HER ANSWERS   ',
      '   (14th November 2023 — 14th November 2026)        ',
      '====================================================',
      '',
      '--- MULTIPLE CHOICE ANSWERS ---'
    ];
    const entries = Object.values(savedAnswers);
    if (entries.length === 0) {
      lines.push('(No MCQ options selected yet)');
    } else {
      entries.forEach((entry, i) => {
        lines.push(`${i + 1}. Question: ${entry.question}`);
        lines.push(`   Her Choice: ${entry.selectedOption}`);
        lines.push(`   Time: ${entry.timestamp}`);
        lines.push('');
      });
    }
    lines.push('--- FINAL QUESTION ---');
    if (foreverAnswer) {
      lines.push(`Question: ${foreverAnswer.question}`);
      lines.push(`Her Answer: ${foreverAnswer.answer}`);
      lines.push(`Time: ${foreverAnswer.timestamp}`);
    } else {
      lines.push('(Final question not answered yet)');
    }

    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'responses.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="scrapbook-page">
      {/* Top Page-Stepper Navigation Bar */}
      <header className="scrapbook-navbar">
        <div className="navbar-inner">
          <button
            type="button"
            className="navbar-brand-btn"
            onClick={() => setCurrentPageIndex(0)}
          >
            <Heart size={17} fill="currentColor" />
            <span>14.11.2023 — 14.11.2026</span>
          </button>

          {/* Stepper Pills for Each Page */}
          <nav className="page-stepper-pills" aria-label="Scrapbook Pages">
            {pages.map((p, idx) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setCurrentPageIndex(idx)}
                className={`stepper-pill ${currentPageIndex === idx ? 'active' : ''} ${
                  idx < currentPageIndex ? 'visited' : ''
                }`}
              >
                {p.shortLabel}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Animated Left & Right Chibi Companions (ani1 & ani2) */}
      <AnimatedChibiCompanions />

      {/* Main Stage */}
      <div className="page-stage-wrapper">
        <main className="central-page-viewport" key={currentPage.id}>
          <div className="page-number-ribbon">
            <BookOpen size={14} />
            <span>
              Page {currentPageIndex + 1} of {pages.length} • {currentPage.title}
            </span>
          </div>

          {/* PAGE 1: THREE YEARS OF US (START COVER) */}
          {currentPage.type === 'cover' && (
            <section className="hero-scrapbook-cover">
              <div className="cover-kraft-sheet">
                <div className="washi-tape cover-tape-left" />
                <div className="washi-tape cover-tape-right" />

                <div className="cover-postmark">
                  <span>HAPPY 3RD ANNIVERSARY</span>
                  <small>14 NOVEMBER 2026</small>
                </div>

                <h1 className="cover-title">{COUPLE_INFO.heroTitle}</h1>
                <p className="cover-dates">{COUPLE_INFO.heroSubtitle}</p>

                <div className="cover-stats-ribbon">
                  <div className="stat-pill">
                    <strong>3</strong>
                    <span>Years</span>
                  </div>
                  <div className="stat-divider">•</div>
                  <div className="stat-pill">
                    <strong>37</strong>
                    <span>Monthly Polaroids</span>
                  </div>
                  <div className="stat-divider">•</div>
                  <div className="stat-pill">
                    <strong>1,096</strong>
                    <span>Days of Loving You</span>
                  </div>
                  <div className="stat-divider">•</div>
                  <div className="stat-pill">
                    <strong>∞</strong>
                    <span>Forever To Go</span>
                  </div>
                </div>

                <p className="cover-handwritten-letter">“{COUPLE_INFO.coverNote}”</p>

                <div className="cover-cta-row">
                  <button
                    type="button"
                    className="scrapbook-primary-btn"
                    onClick={handleNextPage}
                  >
                    <span>Aage Badho →</span>
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* PAGE 2: 37-MONTH SCRAPBOOK COLLAGE */}
          {currentPage.type === 'scrapbook' && (
            <MonthlyCollage months={MONTHLY_COLLAGE} />
          )}

          {/* PAGES 3..6: EACH QUESTION ON ITS OWN SEPARATE PAGE */}
          {currentPage.type === 'question' && (
            <QuestionPage
              questionItem={currentPage.questionItem}
              questionNumber={currentPage.questionIndex + 1}
              totalQuestions={INTERACTIVE_QUESTIONS.length}
              savedAnswers={savedAnswers}
              onSelectMcq={handleSelectMcq}
              saveStatus={saveStatus}
              onTriggerFunFact={handleTriggerFunFact}
            />
          )}

          {/* PAGE 7: QUESTION & ANSWER SUMMARY SESSION */}
          {currentPage.type === 'answer-session' && (
            <AnswerSessionPage
              questions={INTERACTIVE_QUESTIONS}
              savedAnswers={savedAnswers}
              onJumpToQuestionIndex={(qIdx) => setCurrentPageIndex(2 + qIdx)}
              onDownloadTxt={downloadResponsesTxt}
            />
          )}

          {/* PAGE 8: THE FINALE ("DO YOU SEE US TOGETHER FOREVER?") */}
          {currentPage.type === 'finale' && (
            <FinaleSection
              config={FINALE_CONFIG}
              onConfirmYes={handleConfirmYes}
              onDownloadTxt={downloadResponsesTxt}
            />
          )}

          {/* Bottom Page-Turning Controls */}
          <div className="page-turn-footer">
            <button
              type="button"
              className="page-turn-btn prev"
              onClick={handlePrevPage}
              disabled={currentPageIndex === 0}
            >
              <ArrowLeft size={17} />
              <span>Previous Page</span>
            </button>

            <span className="page-turn-indicator">
              Page {currentPageIndex + 1} / {pages.length}
            </span>

            {currentPageIndex < pages.length - 1 ? (
              <button
                type="button"
                className="page-turn-btn next"
                onClick={handleNextPage}
              >
                <span>
                  {currentPageIndex === 0 ? 'Aage Badho' : `Next: ${pages[currentPageIndex + 1].title}`}
                </span>
                <ArrowRight size={17} />
              </button>
            ) : (
              <div className="final-page-badge">Final Page ♥</div>
            )}
          </div>
        </main>
      </div>

      {/* Fun Fact Favorite Picture Pop-up Modal */}
      <FunFactModal
        funFact={activeFunFact}
        onClose={() => {
          setActiveFunFact(null);
          setAdvanceAfterFunFact(false);
        }}
        onContinue={() => {
          const shouldAdvance = advanceAfterFunFact;
          setActiveFunFact(null);
          setAdvanceAfterFunFact(false);
          if (shouldAdvance) {
            setCurrentPageIndex((prev) => Math.min(pages.length - 1, prev + 1));
          }
        }}
      />

      <footer className="scrapbook-footer">
        <p>Handcrafted with all my love for our 3-Year Anniversary • 14th November 2026 ♥</p>
      </footer>
    </div>
  );
}
