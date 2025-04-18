// digit_span.js
// -------------
// A full jsPsych 7 experiment script for a forward digit‐span test.
// All `type:` fields reference the plugin *object*, not a string.
// English comments throughout.

// initialize jsPsych, registering plugins by object
const jsPsych = initJsPsych({
  show_progress_bar: false,
  auto_update_progress_bar: false,
  plugins: {
    'survey-text':    SurveyText,
    'instructions':   Instructions,
    'html-keyboard-response': HtmlKeyboardResponse,
    'fullscreen':     Fullscreen,
    'digit-span-recall': DigitSpanRecallPlugin
  },
  on_finish: () => {
    // display data in browser console at end
    jsPsych.data.displayData();
  }
});

// --- Experiment parameters ---
const nTrials        = 14;           // number of main trials
let minSetSize       = 3;            // starting sequence length
const stimuliDuration= 1000;         // ms to show each digit
const recallDuration = null;         // ms to allow recall (null = unlimited)
const possibleNumbers= ['0','1','2','3','4','5','6','7','8','9'];

// adaptive variables
let nError       = 0;
let highestSpan  = 0;
let consecError  = 0;

// for each sequence
let currentSequence = [];
let stimIndex       = 0;
let trialCount      = 0;

// participant ID
let participantID = '';

// --- 1) Participant ID screen ---
const p_details = {
  type: SurveyText,
  questions: [
    { prompt: 'Enter participant ID:', rows: 1, columns: 20, name: 'participantID' }
  ],
  on_finish: (data) => {
    participantID = data.response.participantID.trim();
    jsPsych.data.addProperties({ participantID });
  }
};

// --- 2) Instructions ---
const instructions = {
  type: Instructions,
  pages: [
    `<p><strong>Digit Span Task</strong></p>
     <p>You will see a sequence of digits, one at a time.</p>
     <p>Afterwards, you must recall them in order using an on-screen keypad.</p>`,
    `<p>You will first do practice trials, then the main test.</p>
     <p>Click <strong>Next</strong> when you are ready.</p>`
  ],
  allow_backward: false,
  button_label_next: 'Next'
};

// --- 3) Sequence presentation ---
// A looped timeline that shows each digit in turn.
const sequencePresentation = {
  timeline: [{
    type: HtmlKeyboardResponse,
    stimulus: () => {
      // sample a new sequence at the start of each trial
      currentSequence = jsPsych.randomization.sampleWithoutReplacement(possibleNumbers, minSetSize);
      stimIndex = 0;
      return `<div style="font-size:60px;">${currentSequence[stimIndex++]}</div>`;
    },
    choices: "NO_KEYS",
    trial_duration: stimuliDuration,
    post_trial_gap: 250
  }],
  loop_function: () => {
    // repeat until we've shown all digits
    return stimIndex < currentSequence.length;
  }
};

// --- 4) Recall trial ---
const recallTrial = {
  type: DigitSpanRecallPlugin,
  correct_order: () => currentSequence,
  trial_duration: recallDuration,
  size_cells: 80,
  on_finish: (data) => {
    // adaptive logic: advance or decrease sequence length
    if (data.accuracy === 1) {
      if (highestSpan < minSetSize) highestSpan = minSetSize;
      minSetSize++;
      nError = 0;
    } else if (nError < 1) {
      nError++;
    } else {
      if (consecError < minSetSize) consecError = minSetSize;
      minSetSize = Math.max(3, minSetSize - 1);
      nError = 0;
    }
  }
};

// --- 5) Feedback ---
const feedback = {
  type: HtmlKeyboardResponse,
  stimulus: (data) => {
    return data.accuracy === 1
      ? '<div style="font-size:35px; color:green;"><strong>Correct</strong></div>'
      : '<div style="font-size:35px; color:red;"><strong>Incorrect</strong></div>';
  },
  choices: "NO_KEYS",
  trial_duration: 1000,
  post_trial_gap: 250,
  on_finish: () => {
    trialCount++;
  }
};

// --- 6) Main digit span loop ---
const mainDigitSpan = {
  timeline: [ sequencePresentation, recallTrial, feedback ],
  loop_function: () => {
    // repeat until we've done nTrials
    return trialCount < nTrials;
  }
};

// --- 7) Exit fullscreen & save data ---
const exitFullscreen = {
  type: Fullscreen,
  fullscreen_mode: false
};

const dataLog = {
  type: HtmlKeyboardResponse,
  stimulus: '',
  choices: "NO_KEYS",
  trial_duration: 100,
  on_finish: () => {
    // save only recall trials
    const ds = jsPsych.data.get().filter({ trial_type: DigitSpanRecallPlugin.info.name });
    const filename = `WM_digit_span_${participantID}_${Date.now()}.csv`;
    ds.localSave('csv', filename);
  }
};

// --- 8) Conclusion ---
const conclusion = {
  type: HtmlKeyboardResponse,
  stimulus: () => `
    <p><strong>Task complete!</strong></p>
    <p>Highest span correct: ${highestSpan}</p>
    <p>Span before two consecutive errors: ${consecError}</p>
    <p>Press any key to finish.</p>
  `,
  choices: "ALL_KEYS"
};

// --- Assemble and run timeline ---
const timeline = [
  p_details,
  { type: Fullscreen, fullscreen_mode: true },
  instructions,
  mainDigitSpan,
  exitFullscreen,
  dataLog,
  conclusion
];

jsPsych.run(timeline);
