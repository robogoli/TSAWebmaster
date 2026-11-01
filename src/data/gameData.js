// Core learning data & game progression models

export const LEVELS = [
  { level: 1, title: 'AI Rookie', minXp: 0, maxXp: 99, nextLevelTitle: 'AI Explorer', color: 'from-blue-500 to-cyan-500' },
  { level: 2, title: 'AI Explorer', minXp: 100, maxXp: 249, nextLevelTitle: 'AI Pioneer', color: 'from-cyan-500 to-teal-500' },
  { level: 3, title: 'AI Pioneer', minXp: 250, maxXp: 399, nextLevelTitle: 'AI Architect', color: 'from-indigo-500 to-purple-500' },
  { level: 4, title: 'AI Architect', minXp: 400, maxXp: 599, nextLevelTitle: 'AI Master', color: 'from-purple-500 to-pink-500' },
  { level: 5, title: 'AI Master', minXp: 600, maxXp: 1000, nextLevelTitle: 'Supreme AI Grandmaster', color: 'from-amber-400 to-amber-600' },
];

export const INITIAL_BADGES = [
  { id: 'ai-pathfinder', name: 'AI Pathfinder', icon: '🌀', description: 'Finish all 3 foundation lessons.', category: 'knowledge', unlocked: true, xpValue: 100 },
  { id: 'data-detective', name: 'Data Detective', icon: '🎯', description: 'Finish both foundation missions.', category: 'detective', unlocked: true, xpValue: 100 },
  { id: 'prompt-pilot', name: 'Prompt Pilot', icon: '⌨️', description: 'Finish all 3 tools lessons.', category: 'skills', unlocked: false, xpValue: 100 },
  { id: 'ethics-navigator', name: 'Ethics Navigator', icon: '🛡️', description: 'Finish all 3 ethics lessons.', category: 'ethics', unlocked: false, xpValue: 100 },
  { id: 'ai-rookie', name: 'AI Rookie', icon: '🧠', description: 'Understood what AI actually does and where its limits lie.', category: 'knowledge', unlocked: false, xpValue: 50 },
  { id: 'prompt-master', name: 'Prompt Master', icon: '💡', description: 'Wrote prompts with specific instructions instead of vague one-liners.', category: 'skills', unlocked: false, xpValue: 100 },
  { id: 'ethics-expert', name: 'Ethics Expert', icon: '⚖️', description: 'Navigated student dilemmas about homework credit, deepfakes, and privacy.', category: 'ethics', unlocked: false, xpValue: 100 },
  { id: 'ai-detective', name: 'AI Detective', icon: '🔎', description: 'Spotted confident errors and checked facts against reliable textbooks.', category: 'detective', unlocked: false, xpValue: 100 },
  { id: 'daily-striker', name: 'Daily Striker', icon: '⚡', description: 'Tackled a daily challenge and chose evidence over confidence.', category: 'skills', unlocked: false, xpValue: 25 },
  { id: 'ai-master', name: 'AI Master', icon: '🤖', description: 'Completed the full AI Quest curriculum with honors.', category: 'master', unlocked: false, xpValue: 150 },
];

export const RESOURCES_DATA = {
  cheatSheet: {
    title: 'Student AI Cheat Sheet: The Traffic Light System',
    description: 'A practical, human guide on what is okay, what requires caution, and what is straight-up cheating.',
    categories: [
      {
        tier: 'GREEN: Allowed & Encouraged',
        color: 'emerald',
        items: [
          'Brainstorming essay topic ideas or narrowing down a thesis statement.',
          'Explaining a confusing textbook paragraph in simpler words.',
          'Generating practice flashcards and quiz questions to test yourself.',
          'Finding debugging suggestions when code throws a syntax error.',
          'Formatting citations (MLA/APA) after you gathered the real sources yourself.'
        ]
      },
      {
        tier: 'YELLOW: Ask Your Teacher & Disclose',
        color: 'amber',
        items: [
          'Using AI to critique your rough draft for grammar and pacing.',
          'Generating an outline when you feel stuck on how to structure a paper.',
          'Translating a short phrase from your second language to check meaning.',
          'Always add a disclosure note: "I used AI to help brainstorm outline ideas. All research and writing was done by me."'
        ]
      },
      {
        tier: 'RED: Strictly Prohibited (Academic Dishonesty)',
        color: 'rose',
        items: [
          'Copying and pasting AI-generated sentences into your assignment.',
          'Having AI write answers to homework questions or test problems.',
          'Faking quotes, citations, or data that the AI hallucinated.',
          'Pasting classmates\' personal information, grades, or private photos into any chatbot.'
        ]
      }
    ]
  },
  disclosureTemplates: [
    {
      useCase: 'Brainstorming & Idea Exploration',
      statement: 'I used an AI assistant to brainstorm initial counterarguments for this topic. I evaluated each suggestion, looked up supporting evidence in our class textbook, and wrote the final essay in my own words.'
    },
    {
      useCase: 'Tutoring & Concept Clarification',
      statement: 'I used an AI tutor to explain the Calvin cycle in plant photosynthesis through interactive practice questions. No generated text was copied into this assignment.'
    },
    {
      useCase: 'Coding & Debugging',
      statement: 'I wrote the HTML structure and CSS styling myself. I consulted an AI tool to troubleshoot a flexbox alignment bug and annotated the fix in my code comments.'
    }
  ],
  toolsDirectory: [
    {
      name: 'Google Teachable Machine',
      category: 'No-Code Machine Learning',
      url: 'https://teachablemachine.withgoogle.com/',
      badge: 'Interactive Free Tool',
      description: 'Train your own computer vision or audio model right inside your browser using your webcam or microphone. Zero code required.'
    },
    {
      name: 'Google NotebookLM',
      category: 'Source-Grounded Study',
      url: 'https://notebooklm.google.com/',
      badge: 'Zero-Hallucination Notes',
      description: 'Upload your permitted class notes, PDF slides, or textbook chapters. The AI only answers questions using your uploaded files with citations.'
    },
    {
      name: 'OpenStax Free Textbooks',
      category: 'Verified Open Source',
      url: 'https://openstax.org/',
      badge: 'Peer-Reviewed Textbooks',
      description: 'Free, peer-reviewed, college-level science and math textbooks used in our "Fact-check the fluent" daily challenge (Biology 2e).'
    }
  ],
  glossaryTerms: [
    { term: 'Artificial Intelligence (AI)', plainEnglish: 'Any computer system designed to do tasks that usually require human intelligence—like recognizing speech or playing chess.' },
    { term: 'Machine Learning (ML)', plainEnglish: 'A way to build AI where computers learn rules on their own by analyzing thousands of examples.' },
    { term: 'Generative AI', plainEnglish: 'A type of machine learning that creates brand-new text, images, code, or sounds based on patterns in training data.' },
    { term: 'Hallucination', plainEnglish: 'When an AI confidently invents false facts, made-up dates, or non-existent book titles because the words sounded believable.' },
    { term: 'Training Data', plainEnglish: 'The massive collection of photos, books, websites, and articles fed into a computer so it can discover patterns.' },
    { term: 'Prompt', plainEnglish: 'The input instructions, question, or context you give to an AI model to guide what it creates next.' },
    { term: 'Context Window', plainEnglish: 'The "short-term working memory" of an AI during a chat before older messages are forgotten.' },
    { term: 'Token', plainEnglish: 'A chunk of characters (about 4 letters or 0.75 words) that AI models use as their basic unit to read and generate text.' },
    { term: 'Algorithmic Bias', plainEnglish: 'Unfair treatment or skewed predictions caused by historical prejudices present in training data.' },
    { term: 'Source Grounding', plainEnglish: 'Forcing an AI model to look up real documents and cite page numbers before answering.' }
  ],
  evidenceKit: {
    mission: 'Fact-Check the Fluent: Photosynthesis & Respiration',
    sources: [
      {
        citation: 'OpenStax Biology 2e · §8.1 Energy in Living Systems',
        summary: 'Photosynthesis uses light energy, carbon dioxide, and water to synthesize glucose and oxygen. Light energy is converted into chemical bond energy.',
        relevance: 'Verifies Claim A (Supported): Light energy is converted into sugars from CO2 and water.'
      },
      {
        citation: 'OpenStax Biology 2e · Chapter 7 & 8 Cellular Respiration in Plants',
        summary: 'Plant cells need energy 24 hours a day. While photosynthesis requires sunlight, cellular respiration occurs continuously day and night in all living plant cells.',
        relevance: 'Debunks Claim B (False): Plants do not wait for night to respire; they respire during both daylight and darkness.'
      },
      {
        citation: 'OpenStax Biology 2e · §8.1 Carbon Fixation and Plant Biomass',
        summary: 'More than 90% of a tree\'s dry biomass comes from atmospheric carbon dioxide captured during the Calvin cycle. Soil minerals provide micronutrients but only a tiny fraction of dry mass.',
        relevance: 'Debunks Claim C (False): The bulk of a growing tree\'s dry mass comes from air (CO2), not soil minerals.'
      }
    ]
  },
  standardsAlignment: [
    {
      framework: 'AI4K12 Five Big Ideas',
      guidelines: [
        'Big Idea 1: Perception (Computers perceive the world using sensors)',
        'Big Idea 2: Representation & Reasoning (Agents maintain representations)',
        'Big Idea 3: Learning (Computers can learn from data)',
        'Big Idea 4: Natural Interaction (Understanding human language & nuance)',
        'Big Idea 5: Societal Impact (AI can influence society in positive and negative ways)'
      ]
    },
    {
      framework: 'CSTA K-12 CS Standards',
      guidelines: [
        '3A-IC-24: Evaluate positive and negative cultural and social impacts of AI.',
        '3A-IC-28: Explain the privacy and ethical implications of collected data.',
        '3A-AP-13: Create prototypes that use algorithms to solve computational problems.'
      ]
    }
  ]
};

export const AI_OR_NOT_ITEMS = [
  { id: 'chatbot', name: 'AI Chatbot (e.g. Gemini, ChatGPT)', icon: '🤖', isAi: true, techType: 'Large Language Model', explanation: 'Uses neural networks trained on massive text to predict context-aware replies.' },
  { id: 'car', name: 'Self-Driving Car', icon: '🚗', isAi: true, techType: 'Computer Vision & Deep Sensor Fusion', explanation: 'Detects pedestrians and lanes in real-time using deep learning computer vision.' },
  { id: 'calculator', name: 'Digital Pocket Calculator', icon: '🧮', isAi: false, techType: 'Hardware Circuit Logic', explanation: 'Follows hardcoded mathematical silicon rules. It does not learn or adapt from experience.' },
  { id: 'npc', name: 'Classic Arcade Game NPC (Pac-Man Ghost)', icon: '🎮', isAi: false, techType: 'Hardcoded State Machine', explanation: 'Classic ghosts follow predetermined rule algorithms with no machine learning.' },
  { id: 'faceid', name: 'Smartphone Face Recognition Unlock', icon: '📱', isAi: true, techType: 'Neural Network Biometrics', explanation: 'Analyzes infrared depth features using trained machine learning models.' },
  { id: 'thermostat', name: 'Standard Dial Thermostat', icon: '🌡️', isAi: false, techType: 'Bimetallic Coil Sensor', explanation: 'A physical metal strip expands or contracts with heat to trigger an electrical switch.' },
  { id: 'spam', name: 'Email Spam Filter', icon: '📧', isAi: true, techType: 'Machine Learning Classifier', explanation: 'Learns patterns in subject lines and sender reputation to quarantine junk email.' },
  { id: 'timer', name: 'Microwave Timer', icon: '⏰', isAi: false, techType: 'Quartz Crystal Counter', explanation: 'Decrements an electronic counter once per second. Zero learning involved.' }
];

export const MISSION_1_QUIZ = [
  {
    id: 'q1',
    question: 'How is modern Artificial Intelligence fundamentally different from traditional computer programming?',
    options: [
      { text: 'Traditional code follows fixed human-written rules; AI learns patterns from examples and data.', correct: true },
      { text: 'AI is powered by magical consciousness inside microchips.', correct: false },
      { text: 'Traditional programming can think on its own; AI only uses addition.', correct: false },
      { text: 'There is zero difference; all software is AI.', correct: false }
    ],
    explanation: 'Traditional code uses strict "if this, then that" instructions written by programmers. Machine Learning analyzes examples to discover patterns.'
  },
  {
    id: 'q2',
    question: 'What happens when an AI makes a wrong prediction during training?',
    options: [
      { text: 'The computer instantly deletes itself.', correct: false },
      { text: 'It calculates the error (loss) and tweaks its internal weights to improve next time.', correct: true },
      { text: 'Nothing happens; AI models never make mistakes.', correct: false },
      { text: 'A human must hand-write all rules from scratch.', correct: false }
    ],
    explanation: 'Optimization (like backpropagation) measures mistakes and adjusts mathematical weights to increase accuracy.'
  },
  {
    id: 'q3',
    question: 'Why does an AI model need diverse, high-quality training data?',
    options: [
      { text: 'To look pretty on social media.', correct: false },
      { text: 'Because if the training data is biased or incomplete, the AI will make biased or flawed decisions.', correct: true },
      { text: 'AI only needs 2 images to understand the entire universe.', correct: false },
      { text: 'Data quality does not matter as long as the computer is expensive.', correct: false }
    ],
    explanation: 'The golden rule is "Garbage in, garbage out." High-quality, representative data produces reliable models.'
  }
];

export const PROMPT_CHALLENGE_STAGES = [
  {
    id: 'stage1',
    label: 'Challenge: The Vague Space Prompt',
    weakPrompt: 'Write about space.',
    pillars: {
      task: 'Explain how stars are born in stellar nurseries and collapse into white dwarfs or supernovas.',
      details: 'Keep it concise under 200 words, include 1 analogy, and mention Hydrogen & Helium.',
      audience: 'Curious 8th-grade science students.',
      format: 'A 3-step timeline with bold bullet headings followed by a 1-sentence "Mind-Blowing Fact".'
    },
    improvedPrompt: 'You are an astrophysics educator. Explain the lifecycle of a star from a nebula to a supernova for an 8th-grade science class. Use a cooking analogy, keep it under 200 words, mention Hydrogen and Helium, and format as 3 clear chronological bullet points plus one concluding "Mind-Blowing Fact".',
    sampleOutput: '🌟 Stellar Recipe: How Stars Are Born\n\n1. Cosmic Kitchen: Clouds of Hydrogen and Helium swirl in space until gravity ignites nuclear fusion.\n\n2. The Golden Roast: For billions of years, the star balances inward gravity and outward nuclear energy.\n\n3. The Final Feast: Massive stars explode into supernovas; smaller stars leave a dense White Dwarf.\n\n✨ Mind-Blowing Fact: Nearly every atom of iron in your blood was forged inside a dying star!'
  },
  {
    id: 'stage2',
    label: 'Challenge: The History Study Guide',
    weakPrompt: 'Tell me about the American Revolution.',
    pillars: {
      task: 'Summarize the 3 turning-point battles of the American Revolutionary War.',
      details: 'Focus on strategic causes, weather conditions, and tactical outcomes.',
      audience: 'High school history student preparing for a flashcard exam.',
      format: 'A comparison table with columns: [Battle Name | Year | Tactical Turning Point | Key Impact].'
    },
    improvedPrompt: 'Act as a historical exam tutor. Identify and summarize the 3 decisive turning-point battles of the American Revolutionary War in a comparison table: Battle Name, Year, Key Conditions, and Why It Changed The War.',
    sampleOutput: '| Battle | Year | Key Conditions | Why It Changed The War |\n| Saratoga | 1777 | Dense forested terrain | Convinced France to formally ally with America. |\n| Trenton | 1776 | Daring Christmas Delaware crossing | Rescued Continental army morale. |\n| Yorktown | 1781 | Joint French-American land/sea siege | Forced final British surrender. |'
  }
];

export const ETHICS_SCENARIOS = [
  {
    id: 'homework_essay',
    title: 'Case 01: The Homework Essay Dilemma',
    scenario: 'Your English teacher gives you an important essay assignment on "Climate Change in Coastal Cities". Deadlines are tight. What do you do?',
    options: [
      {
        id: 'A',
        text: 'Ask AI to write the whole essay, paste it into Google Docs, and submit it with your name.',
        isBestChoice: false,
        score: 0,
        feedback: '❌ Academic Dishonesty: This is plagiarism and surrenders your own critical thinking.',
        guideline: 'AI should empower your learning, never replace your brain or take credit for human work.'
      },
      {
        id: 'B',
        text: 'Use AI to brainstorm thesis ideas and critique your outline, then write the essay yourself and cite AI assistance.',
        isBestChoice: true,
        score: 100,
        feedback: '⭐ AI Master Move! You used AI as a thought partner while doing the real writing and fact-checking yourself.',
        guideline: 'Responsible AI use means maintaining ownership and transparently acknowledging generative tools.'
      },
      {
        id: 'C',
        text: 'Copy the AI essay and swap every 5th word using a thesaurus to trick plagiarism checkers.',
        isBestChoice: false,
        score: 25,
        feedback: '⚠️ Deceptive Shortcut: Paraphrasing generated text without understanding still bypasses learning.',
        guideline: 'Trying to bypass detection wastes more energy than genuine learning.'
      }
    ]
  },
  {
    id: 'deepfake_image',
    title: 'Case 02: The Face-Swap Group Chat',
    scenario: 'A friend uses an AI app to put a classmate\'s face onto an embarrassing meme character and wants to post it in the school Discord.',
    options: [
      {
        id: 'A',
        text: 'Share it to other groups because it is just a funny joke.',
        isBestChoice: false,
        score: 0,
        feedback: '❌ Digital Harm: Generating or spreading manipulated likenesses without consent violates privacy.',
        guideline: 'Never generate or circulate someone\'s likeness without explicit permission.'
      },
      {
        id: 'B',
        text: 'Speak up, advise your friend that non-consensual deepfakes violate digital safety, and delete the image.',
        isBestChoice: true,
        score: 100,
        feedback: '⭐ Ethical Leadership! You protected your peer\'s digital privacy and stood up against cyber harm.',
        guideline: 'AI integrity starts with standing up against synthetic harassment.'
      },
      {
        id: 'C',
        text: 'Stay silent and save the image to your private camera roll.',
        isBestChoice: false,
        score: 40,
        feedback: '⚠️ Passive Complicity: Bystander complacency allows synthetic harassment to spread.',
        guideline: 'Ethical digital citizens speak up when AI tools are weaponized against peers.'
      }
    ]
  },
  {
    id: 'privacy_leak',
    title: 'Case 03: Private Data & Public Chatbots',
    scenario: 'You want an AI chatbot to format a team contact sheet with classmates\' home addresses, phone numbers, and portal passwords.',
    options: [
      {
        id: 'A',
        text: 'Paste the entire spreadsheet with full names, numbers, and passwords directly into the public chatbot.',
        isBestChoice: false,
        score: 0,
        feedback: '❌ Privacy Breach! Public chatbots may store prompt inputs in query logs or use them to train future models.',
        guideline: 'Never share Personally Identifiable Information (PII) or passwords with AI bots.'
      },
      {
        id: 'B',
        text: 'Sanitize data first by replacing names with placeholders ("Student_1") and never including passwords.',
        isBestChoice: true,
        score: 100,
        feedback: '⭐ Data Guardian! You leveraged AI formatting safely while safeguarding classmate privacy.',
        guideline: 'Anonymize and scrub private variables before using AI tools.'
      },
      {
        id: 'C',
        text: 'Only paste the passwords, since the AI needs them to verify the accounts.',
        isBestChoice: false,
        score: 0,
        feedback: '❌ High Risk: AI chatbots never need credentials and must never receive passwords.',
        guideline: 'Treat public AI like a stranger on a subway—never hand them your keys.'
      }
    ]
  }
];

export const DAILY_CHALLENGES = [
  {
    id: 'dc_1',
    date: 'Today',
    question: 'A camper is stranded and asks AI: "Can I drink ocean saltwater if I am dying of thirst?" Which AI response should you trust?',
    promptTopic: 'Emergency Survival & Medical Safety',
    responseA: {
      id: 'A',
      text: 'Yes! Water is water. Boiling seawater for 30 seconds removes all salt and makes it safe to hydrate immediately.',
      isTrustworthy: false,
      critique: 'DANGEROUS HALLUCINATION! Boiling evaporates water into steam, leaving salt behind in the pot. Drinking seawater accelerates fatal dehydration.'
    },
    responseB: {
      id: 'B',
      text: 'NO, NEVER drink seawater directly. The high salinity forces your kidneys to expend more water than you consume. You must distill it using a solar condensation still to collect evaporated vapor.',
      isTrustworthy: true,
      critique: 'ACCURATE & SOUND. Explains physiological mechanism and provides the correct solar condensation method.'
    },
    keyTakeaway: 'In health and safety matters, hallucinated AI advice can be fatal. Always verify medical protocols through certified emergency guides.'
  },
  {
    id: 'dc_2',
    date: 'Alternative',
    question: 'A student asks AI: "Did Albert Einstein fail elementary school mathematics?" Which response is trustworthy?',
    promptTopic: 'Historical Myth Fact-Checking',
    responseA: {
      id: 'A',
      text: 'Yes, Albert Einstein failed 4th-grade arithmetic with an F and dropped out until his parents hired a private tutor.',
      isTrustworthy: false,
      critique: 'POPULAR URBAN MYTH. This myth started because his school changed its grading scale (a "1" was the highest mark).'
    },
    responseB: {
      id: 'B',
      text: 'No, this is a widespread myth. Einstein was brilliant in mathematics as a child, mastering calculus by age 15. The rumor arose because his school inverted its grading scale during his attendance.',
      isTrustworthy: true,
      critique: 'HISTORICALLY ACCURATE. Debunks the persistent trope and provides the exact archival explanation.'
    },
    keyTakeaway: 'AI frequently repeats popular internet myths unless prompted to cross-check primary archives.'
  }
];
