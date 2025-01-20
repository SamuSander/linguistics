// INSTRUCTIONS
var pvtStartScreen = {
  type: jsPsychInstructions,
  pages: 
  [
    '<br><br>' +
    `<div class="instructions" style="max-width:${instructionsWidth}px;">` + 
      'In the following task, we will test your attention. ' +
      'A <b>stopwatch</b> in the middle of your screen will start counting up very quickly. Whenever that happens, ' + 
      'it is your task to <b>press the space bar</b> as quickly as possible. <b>Please use your dominant hand</b> ' + 
      '(the hand you normally write with). ' + 
      'This will stop the stopwatch and your reaction ' + 
      'time will be displayed for a brief moment.' + 
    '</div>' +
    '<br><br>',
  
    '<br><br>' +
    `<div class="instructions" style="max-width:${instructionsWidth}px;">` + 
      `<b>You have to stop the watch within ${lapseTime/1000} s</b>, but note that "superhuman" ` +
      `reaction times below ${prematureTime/1000} s (e.g. due to cheating) ` +
      'will also count as error. ' + 
      '<p style="color:#8B0000"><b>Too many errors will terminate the study!</b></p>' +
      'No worries, if you just press the space bar as soon as the ' +
      'clock starts counting up, you will be perfectly on time.<br>' +
      'You now have the opportunity to practise the task.' +
    '</div>' +
    '<br><br>'
    ],
    show_clickable_nav: true,
  
    data: { trial: 'pvt_start_screen' },
    on_finish: function() {
      /* Turn background black for the PVT */
      disp = document.querySelector('.jspsych-display-element');
      disp.style.background = '#000000';
      
      /* Record that we are in the practice phase right now. */
      phase = "practice";
    }
};

/* Evaluate the practice phase - participants need to get at least 2 out of 3 trials correct. */
var evalPvtPractice = {
  on_load: function() {
    disp = document.querySelector('.jspsych-display-element');
    disp.style.background = '#ffffff';
    disp.style.fontSize = "22px"
  },
  type: jsPsychHtmlButtonResponse,
  data: { trial: 'practice_pvt_evaluation' },
  stimulus: function () {

    /* Number of correct trials: Number of trials - lapses - prematures */
    var feedback = `<span style="font-size:40px">You caught ${pvtTrialsPractice - pvtLapseCount - pvtPrematureCount} ` + 
    `out of ${pvtTrialsPractice} stopwatches on time!</span><br><br>`;

    /* Add "well done" when they got at least 2 out of 3 correct (i.e. more than 1 correct) */
    if (pvtTrialsPractice - pvtLapseCount - pvtPrematureCount > 1) feedback = feedback + '<br>Well done!<br><br>'

    return(feedback);
  },
  choices: ['ok']
};

/* If participants failed the practice phase, they get one more try. */
wrongPracticePVT = {
  on_load: function() {
    disp = document.querySelector('.jspsych-display-element');
    disp.style.background = '#ffffff';
  },
  type: jsPsychHtmlButtonResponse,
  data: { trial: 'failed_practice_pvt' },
  stimulus:
  `<div class="instructions" style="max-width:${instructionsWidth}px;">` + 
    "Sorry, but you need to get at least <b>2 out of 3</b> stopwatches correct!<br>" +
    `You need to stop each watch within ${lapseTime/1000} second, but impossibly fast reactions ` + 
    `(< ${prematureTime/1000} s) count as errors! ` +
    "Please try again.<br><br>" +
  '</div>',
  choices: ['ok'],
  button_html: '<button class="jspsych-btn" tabindex="-1">%choice%</button>',

  on_finish: function() {
    disp = document.querySelector('.jspsych-display-element');
    disp.style.background = '#000000';
    // Reset counter for correct practice trials so practice can be repeated
    pvtLapseCount = 0;
    pvtPrematureCount = 0;
    repeatPractice = true;
  }
};

ifWrongPracticePVT = {
  timeline: [wrongPracticePVT],
  conditional_function: () => (pvtLapseCount + pvtPrematureCount) > 1 ? true : false
}

var pvtMainInstructions = {
  on_load: function() {
    // Reset counters after the practice phase
    pvtTrialCounter = 0;
    pvtLapseCount = 0;
    pvtPrematureCount = 0;
    disp = document.querySelector('.jspsych-display-element');
    disp.style.background = '#ffffff';
  },
  type: jsPsychHtmlButtonResponse,
  stimulus: 
  
  '<br><br>' +
  `<div class="instructions" style="max-width:${instructionsWidth}px;">` + 
    "Great, you're ready for the task!<br>" +
    'Press the space bar with your dominant hand. ' +
    'When you click "continue", the attention task will begin. ' + 
    `<b>It will take ${pvtTimeLimit/60000} minutes.</b> ` + 
  '</div>',
  choices: ['continue'],
  button_html: '<button class="jspsych-btn" tabindex="-1">%choice%</button>',
  data: { trial: 'pvt_instructions' },
  on_finish: function() {
    disp = document.querySelector('.jspsych-display-element');
    disp.style.background = '#000000';
    // Add time elapsed so far to time limit, because the time reading the instructions
    // and the practice trials doesn't count.
    var data = jsPsych.data.get().last(1).values()[0];
    pvtTimeLimit = pvtTimeLimit + data.time_elapsed;
    
    phase = "main";
  }
};

var pvtEnd = {
  on_load: function() {
    disp = document.querySelector('.jspsych-display-element');
    disp.style.background = '#ffffff';
  },
  type: jsPsychHtmlButtonResponse,
  stimulus: 
  
  '<br><br>' +
  `<div class="instructions" style="max-width:${instructionsWidth}px;">` +  
    "Well done, that was it!" +
  '</div>' +
  '<br><br>',
  choices: ['continue'],
  button_html: '<button class="jspsych-btn" tabindex="-1">%choice%</button>',
  data: { trial: 'pvt_instructions' }
};
