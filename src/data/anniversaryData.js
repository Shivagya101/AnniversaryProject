// ============================================================================
//  3-YEAR ANNIVERSARY SCRAPBOOK CONFIGURATION FILE
//  Edit this file to customize your photos, questions, fun-fact popups & video!
// ============================================================================

const createPolaroidPlaceholder = (label, index, subtitle = 'Drop photo in /public/photos/') => {
  const palettes = [
    ['#e8d5c4', '#b88b72', '#6b4435'],
    ['#dfcbb5', '#a67b60', '#5a3a29'],
    ['#ead8c8', '#c4927a', '#6e3f32'],
    ['#dfd3c3', '#9c7e68', '#544032'],
    ['#f0dcd5', '#bf887a', '#693d35']
  ];
  const [bg, accent, ink] = palettes[index % palettes.length];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
    <defs>
      <radialGradient id="g${index}" cx="50%" cy="45%" r="65%">
        <stop offset="0%" stop-color="${bg}" />
        <stop offset="100%" stop-color="${accent}" stop-opacity="0.55" />
      </radialGradient>
    </defs>
    <rect width="600" height="600" fill="url(#g${index})" />
    <rect x="28" y="28" width="544" height="544" fill="none" stroke="${ink}" stroke-opacity="0.22" stroke-width="2" stroke-dasharray="8 6" />
    <g transform="translate(300, 240)" fill="none" stroke="${ink}" stroke-opacity="0.55" stroke-width="3">
      <path d="M0 45 C-12 32 -65 -5 -65 -42 C-65 -68 -44 -85 -22 -85 C-7 -85 0 -74 0 -64 C0 -74 7 -85 22 -85 C44 -85 65 -68 65 -42 C65 -5 12 32 0 45 Z" fill="${accent}" fill-opacity="0.35"/>
    </g>
    <text x="300" y="345" text-anchor="middle" font-family="Georgia, serif" font-size="32" font-weight="bold" fill="${ink}">${label}</text>
    <text x="300" y="520" text-anchor="middle" font-family="monospace" font-size="14" fill="${ink}" fill-opacity="0.65">${subtitle}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

export const COUPLE_INFO = {
  yourName: 'Me',
  partnerName: 'My Love',
  startDate: '14th November 2023',
  anniversaryDate: '14th November 2026',
  anniversaryISO: '2026-11-14T00:00:00',
  heroTitle: 'Three Years of Us',
  heroSubtitle: '14th November 2023 — 14th November 2026',
  coverNote:
    "Happy 37 madam ji, words transcend the emotions I'm feeling while I write these words in your name. Thank you for molding a human out of me, for being there during my darkest of times and being a constant boulder of happiness and support. Here is to many more decades of me annoying the hell out of you, I love you 3000."
};

// ============================================================================
//  INTRO SIDE COLLAGE PHOTOS (Displayed ONLY on the Page 1 Introduction sides)
//  Uses your photos from `/Scrapbook/` (or any custom file you set here!)
// ============================================================================
const rawSidePhotos = [
  { id: 'side-1', side: 'left', file: '/Scrapbook/November-2023.jpeg', caption: 'Where it all began ♥', tilt: -4.5, tapeColor: 'rgba(214, 159, 148, 0.78)' },
  { id: 'side-2', side: 'left', file: '/Scrapbook/Nov-2024.jpeg', caption: 'Year 1 Milestone', tilt: 3.5, tapeColor: 'rgba(232, 206, 176, 0.82)' },
  { id: 'side-3', side: 'right', file: '/Scrapbook/November-2025.jpg', caption: 'Year 2 Together', tilt: 4, tapeColor: 'rgba(225, 190, 145, 0.78)' },
  { id: 'side-4', side: 'right', file: '/Scrapbook/Nov-2026.jpg', caption: '14.11.23 → Forever ♥', tilt: -3.5, tapeColor: 'rgba(186, 198, 175, 0.78)' }
];

export const SIDE_COLLAGE_PHOTOS = rawSidePhotos.map((item, idx) => {
  return {
    ...item,
    image: item.file,
    placeholderImage: createPolaroidPlaceholder(item.caption, idx, item.file)
  };
});

// ============================================================================
//  1. 37-MONTH COLLAGE (NOVEMBER 2023 TO NOVEMBER 2026)
//  Connected directly to your 37 photos in `public/Scrapbook/`!
// ============================================================================
const rawMonths = [
  // Year 1: Nov 2023 - Oct 2024
  { month: 'November 2023', file: 'November-2023.jpeg', short: 'Nov ’23', yearGroup: 'Year 1', title: 'Calm before the storm', caption: "Me looking at a cricket match with feigned interest, who would've thought" },
  { month: 'December 2023', file: 'December-2023.jpeg', short: 'Dec ’23', yearGroup: 'Year 1', title: 'Thanda thanda cool cool', caption: 'LDS photoshoot me dono cuties' },
  { month: 'January 2024', file: 'January-2024.jpeg', short: 'Jan ’24', yearGroup: 'Year 1', title: 'One last kiss', caption: 'With my favorite gift of all time, to this very day' },
  { month: 'February 2024', file: 'Feb-2024.jpeg', short: 'Feb ’24', yearGroup: 'Year 1', title: 'Pehli function ooo', caption: "Valentine's day in the air, so am I" },
  { month: 'March 2024', file: 'Mar-2024.jpeg', short: 'Mar ’24', yearGroup: 'Year 1', title: 'Thumbs upp', caption: 'Baby happy, sab happy' },
  { month: 'April 2024', file: 'April-2024.jpeg', short: 'Apr ’24', yearGroup: 'Year 1', title: 'Say cheeseee', caption: 'Back in blackkkk' },
  { month: 'May 2024', file: 'May-2024.jpeg', short: 'May ’24', yearGroup: 'Year 1', title: '0.5 attained', caption: 'Iss khushi me photo ho jaye' },
  { month: 'June 2024', file: 'Jun-2024.jpeg', short: 'Jun ’24', yearGroup: 'Year 1', title: "When you've had enough", caption: 'So talented man, hehehhe' },
  { month: 'July 2024', file: 'Jul-2024.jpeg', short: 'Jul ’24', yearGroup: 'Year 1', title: 'Budday ka mahina', caption: 'Smile again O7' },
  { month: 'August 2024', file: 'Aug-2024.jpeg', short: 'Aug ’24', yearGroup: 'Year 1', title: 'Cutie and cutie', caption: 'hmphh' },
  { month: 'September 2024', file: 'Sep-2024.jpeg', short: 'Sep ’24', yearGroup: 'Year 1', title: 'Hellooo', caption: 'Rohit Ratnam ka best contribution' },
  { month: 'October 2024', file: 'Oct-2024.jpeg', short: 'Oct ’24', yearGroup: 'Year 1', title: 'BBQ Nation ki jai ho', caption: 'Banger food, horrible stomach' },

  // Year 2: Nov 2024 - Oct 2025
  { month: 'November 2024', file: 'Nov-2024.jpeg', short: 'Nov ’24', yearGroup: 'Year 2', title: '1 saal yayyyy', caption: 'Congratulations * 1/3' },
  { month: 'December 2024', file: 'Dec-2024.jpeg', short: 'Dec ’24', yearGroup: 'Year 2', title: 'Kween', caption: 'If Divination was real' },
  { month: 'January 2025', file: 'Jan-2025.jpeg', short: 'Jan ’25', yearGroup: 'Year 2', title: 'Twinning', caption: 'School photo jumpscare' },
  { month: 'February 2025', file: 'Feb-2025.jpeg', short: 'Feb ’25', yearGroup: 'Year 2', title: 'Alcheringa se poses', caption: 'to my favorite days of college with my favorite person (Nirmit)' },
  { month: 'March 2025', file: 'Mar-2025.jpeg', short: 'Mar ’25', yearGroup: 'Year 2', title: 'Ewww', caption: 'Little Italy aur kabhi nhi jaana (Note to self)' },
  { month: 'April 2025', file: 'April-2025.jpeg', short: 'Apr ’25', yearGroup: 'Year 2', title: 'Meri Mumtaz', caption: 'Kolkata me welcome ji' },
  { month: 'May 2025', file: 'May-2025.jpeg', short: 'May ’25', yearGroup: 'Year 2', title: 'Intern waali harkatein', caption: '#Genpact_it_izz , still so proud of you for that one' },
  { month: 'June 2025', file: 'Jun-2025.jpeg', short: 'Jun ’25', yearGroup: 'Year 2', title: 'Sky is Pink', caption: 'Traditions suit you *2' },
  { month: 'July 2025', file: 'Jul-2025.jpeg', short: 'Jul ’25', yearGroup: 'Year 2', title: 'Pet khush toh madam khush', caption: 'Say hiiiii' },
  { month: 'August 2025', file: 'Aug-2025.jpeg', short: 'Aug ’25', yearGroup: 'Year 2', title: 'Lipgloss on top', caption: "Elf launga waha se , don't you worry" },
  { month: 'September 2025', file: 'Sep-2025.jpeg', short: 'Sep ’25', yearGroup: 'Year 2', title: 'Baby ka Week Out', caption: 'Ankit ki mkc (the fact you stayed while I was getting railed at Nescafe aww)' },
  { month: 'October 2025', file: 'Oct-2025.jpeg', short: 'Oct ’25', yearGroup: 'Year 2', title: 'Chaandni Raat', caption: 'One of our fav pics' },

  // Year 3: Nov 2025 - Nov 2026
  { month: 'November 2025', file: 'November-2025.jpg', short: 'Nov ’25', yearGroup: 'Year 3', title: '2 saal slayyy', caption: 'Congratulations * 2/3' },
  { month: 'December 2025', file: 'Dec-2025.jpg', short: 'Dec ’25', yearGroup: 'Year 3', title: 'Starbhakk', caption: 'Address the mj in the room' },
  { month: 'January 2026', file: 'Jan-2026.jpg', short: 'Jan ’26', yearGroup: 'Year 3', title: 'Pati patni aur woh', caption: 'woh being you, duh' },
  { month: 'February 2026', file: 'Feb-2026.jpeg', short: 'Feb ’26', yearGroup: 'Year 3', title: 'Your food and my food', caption: 'Plain dosa >>> Masala dosa' },
  { month: 'March 2026', file: 'Mar-2026.jpg', short: 'Mar ’26', yearGroup: 'Year 3', title: 'Kissies lo', caption: 'Take all the kisses you want and more' },
  { month: 'April 2026', file: 'Apr-2026.jpg', short: 'Apr ’26', yearGroup: 'Year 3', title: 'Comfort place', caption: 'Taobao is wao wao' },
  { month: 'May 2026', file: 'May-2026.jpg', short: 'May ’26', yearGroup: 'Year 3', title: 'Hana ka khaana', caption: 'halal khaana ke liye sacrifices ooof' },
  { month: 'June 2026', file: 'June-2026.jpg', short: 'Jun ’26', yearGroup: 'Year 3', title: 'Pixel 10a flex', caption: 'aur selfies liya kro' },
  { month: 'July 2026', file: 'July-2026.jpg', short: 'Jul ’26', yearGroup: 'Year 3', title: 'One with the fam', caption: 'gotta pay my respects to them of coutse' },
  { month: 'August 2026', file: 'Aug-2026.jpg', short: 'Aug ’26', yearGroup: 'Year 3', title: 'your bf is a dustbin', caption: 'matching colors that too' },
  { month: 'September 2026', file: 'Sept-2026.jpeg', short: 'Sep ’26', yearGroup: 'Year 3', title: 'hello bolo', caption: 'hui hui' },
  { month: 'October 2026', file: 'Oct-2026.jpg', short: 'Oct ’26', yearGroup: 'Year 3', title: 'till gmeet do us part', caption: 'in sickness and in health' },
  { month: 'November 2026', file: 'Nov-2026.jpg', short: 'Nov ’26', yearGroup: 'Year 3', title: 'snap back to reality', caption: 'HIEEEEEEEEEEEEEEEEEEEEEE' }
];

const tapeColors = ['rgba(232, 206, 176, 0.78)', 'rgba(214, 159, 148, 0.68)', 'rgba(186, 198, 175, 0.72)', 'rgba(225, 190, 145, 0.72)'];
const tiltAngles = [-2.6, 1.8, -1.4, 2.4, -2.1, 1.3, -0.9, 2.1];

export const MONTHLY_COLLAGE = rawMonths.map((item, idx) => {
  const num = String(idx + 1).padStart(2, '0');
  return {
    id: `month-${num}`,
    monthNumber: idx + 1,
    ...item,
    image: `/Scrapbook/${item.file}`,
    placeholderImage: createPolaroidPlaceholder(item.title, idx, `/Scrapbook/${item.file}`),
    tilt: tiltAngles[idx % tiltAngles.length],
    tapeColor: tapeColors[idx % tapeColors.length]
  };
});

// ============================================================================
//  2. INTERACTIVE QUESTIONS (EACH ON ITS OWN PAGE)
//  - Only Question 3 has `funFactPopup` attached so the surprise "My Fav Pic of Us!"
//    pop-up appears specifically after Question 3!
// ============================================================================
export const INTERACTIVE_QUESTIONS = [
  {
    id: 'q-why-i-love-you',
    type: 'reveal',
    badge: 'Question 1 of 4 • Heart Reveal',
    question: 'Why do you think I love you?',
    promptHint: 'guess loooo',
    dropdownButtonText: 'Unfold My Answer & Photo',
    answerTitle: 'Because with you, everything feels like home.',
    answerText:
      "Cuz you're you. You're perfection, you mean everything to me. From your unkempt sleepy side to your highly curated makeups, I've found myself highly crushing on you for every version that you are. You push me to new heights, you've made me reach places that I never believed I possibly could fly to and you've been the pilot in those journeys. I am no one without you, I will be no one without you in my life. I wake up due to you, I sleep with a smile on my face due to you and I breathe due to you. I love you babe, you've changed my life for the better and I can't thank you enough for that.",
    photoCaption: 'My favorite smile in the whole world ♥',
    photoUrl: '/photos/questions/reveal-1.jpg?v=2',
    placeholderPhotoUrl: '/photos/questions/reveal-1.jpg?v=2'
  },
  {
    id: 'q-anniversary-outfit',
    type: 'mcq',
    badge: 'Question 2 of 4 • Your Choice for 14th Nov',
    question: 'Date me kya pehnu?',
    promptHint: 'jo tum chahoge mai wo pehnunga',
    options: [
      'Zudio waala denim jacket',
      'white shirt with overshirt',
      'constricted shirt with white pants',
      'None of the above (call me bata dena ji)'
    ]
  },
  {
    id: 'q-when-i-knew',
    type: 'reveal',
    badge: 'Question 3 of 4 • Memory Reveal',
    question: 'What is that one thing about us that still gives me butterflies after 3 years?',
    promptHint: 'Click the dropdown below to open my note and picture...',
    dropdownButtonText: 'Reveal My Secret Note & Photo',
    answerTitle: 'The way you love and ground me.',
    answerText:
      "Your unrelentless care for me, whether I'm in the pits of dukh or am happy as fuck. It makes me feel warm , fuzzy and so so loved. The fact you push me to be better, the fact you want the best for me and you'll leave no stone unturned in order to screw the bolts on my otherwise loose head.\n\nAlso, a huge fan of elevators , stairs and washrooms, whatever they might mean. Never fail to give me the biggest butterflies ever.",
    photoCaption: 'Meri Marilyn',
    photoUrl: '/photos/questions/reveal-2.jpg?v=2',
    placeholderPhotoUrl: '/photos/questions/reveal-2.jpg?v=2',
    // Surprise Fun Fact Popup triggered ONLY after Question 3!
    funFactPopup: {
      badge: 'WAIT A SECOND!! 📸 FUN FACT TIME!',
      exclamation: 'Fav Picture of Us after 37 iterations',
      description:
        'You relying on my head for support while you smile in content, is this what Nirvana feels like?',
      photoCaption: 'My #1 All-Time Favorite Picture of Us ♥',
      photoUrl: '/Scrapbook/PopUp.jpeg',
      placeholderPhotoUrl: createPolaroidPlaceholder('My #1 Fav Pic of Us!', 1, '/Scrapbook/PopUp.jpeg'),
      audioUrl: '/Scrapbook/popup-song.mp3'
    }
  },
  {
    id: 'q-date-vibe',
    type: 'mcq',
    badge: 'Question 4 of 4 • Date Night Plan',
    question: 'Fav kind of dates with me?',
    promptHint: 'Just curious <3',
    options: [
      'Dinner Date at Brubeck',
      'NIT Gate and Beyond',
      'Annapurna me bhaiyya ke saath gupchup',
      'QuNITe auction me bid hona'
    ]
  }
];

// ============================================================================
//  3. THE FINALE ("DO YOU SEE US TOGETHER / STAY WITH ME FOREVER?" + VIDEO API)
// ============================================================================
export const FINALE_CONFIG = {
  questionId: 'q-stay-forever',
  badge: 'Final Page • Forever & Always',
  question: 'Together Forever?',
  subtitle: 'Sochke choose karo hehe',
  yesLabel: 'Yes, Forever ♥',
  noLabel: 'No',
  vanishedWhisper: 'You thought? No chance ji. Ab yes choose karo',
  blackScreenText: '?? the end',
  blackScreenSubtext: '...or just the beginning of our forever?',
  blackScreenDurationMs: 3600,
  videoUrl: '/Scrapbook/finale-video.mp4',
  videoApiEndpoint: '/api/video'
};
