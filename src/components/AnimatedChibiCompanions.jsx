import React, { useState } from 'react';

// Girl dialogues (Left Companion - ani2.png)
const LEFT_QUOTES = [
  'Problem statement bata chutiye',
  'Alright, maaf kr diya',
  'Tumhare dost randwe hai'
];

// Boy dialogues (Right Companion - ani1.png)
const RIGHT_QUOTES = [
  'Sorryy baby',
  'Siddhant bekasoor tha',
  'Shivagya bekasoor tha'
];

export default function AnimatedChibiCompanions() {
  const [leftQuoteIdx, setLeftQuoteIdx] = useState(0);
  const [rightQuoteIdx, setRightQuoteIdx] = useState(0);
  const [leftJumping, setLeftJumping] = useState(false);
  const [rightJumping, setRightJumping] = useState(false);

  const handleLeftClick = () => {
    setLeftQuoteIdx((prev) => (prev + 1) % LEFT_QUOTES.length);
    setLeftJumping(true);
    setTimeout(() => setLeftJumping(false), 650);
  };

  const handleRightClick = () => {
    setRightQuoteIdx((prev) => (prev + 1) % RIGHT_QUOTES.length);
    setRightJumping(true);
    setTimeout(() => setRightJumping(false), 650);
  };

  return (
    <>
      {/* Left Animated Companion (ani2.png) */}
      <div
        className={`chibi-companion chibi-left ${leftJumping ? 'chibi-click-jump' : ''}`}
        onClick={handleLeftClick}
      >
        <div className="chibi-speech-bubble">{LEFT_QUOTES[leftQuoteIdx]}</div>
        <div className="chibi-floating-hearts" aria-hidden="true">
          <span className="float-heart h1">♥</span>
          <span className="float-heart h2">✨</span>
          <span className="float-heart h3">♥</span>
        </div>
        <div className="chibi-breathe-wrapper">
          <img
            src="/Scrapbook/ani2.png?v=2"
            alt="Animated Chibi Companion Left"
            className="chibi-character-img"
            draggable={false}
          />
        </div>
      </div>

      {/* Right Animated Companion (ani1.png) */}
      <div
        className={`chibi-companion chibi-right ${rightJumping ? 'chibi-click-jump' : ''}`}
        onClick={handleRightClick}
      >
        <div className="chibi-speech-bubble">{RIGHT_QUOTES[rightQuoteIdx]}</div>
        <div className="chibi-floating-hearts" aria-hidden="true">
          <span className="float-heart h1">♥</span>
          <span className="float-heart h2">✨</span>
          <span className="float-heart h3">♥</span>
        </div>
        <div className="chibi-breathe-wrapper right-delay">
          <img
            src="/Scrapbook/ani1.png?v=2"
            alt="Animated Chibi Companion Right"
            className="chibi-character-img"
            draggable={false}
          />
        </div>
      </div>
    </>
  );
}

