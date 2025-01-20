// INSTRUCTIONS
var pvtStartScreen = {
  type: jsPsychInstructions,
  pages: 
  [
    `<br><br>
    <div class="instructions" style="max-width:${instructionsWidth}px;"> 
        Die nächste Aufgabe testet deine Aufmerksamkeit. 
        Eine <b>Stoppuhr</b> in der Mitte des Bildschirms wird irgendwann beginnen, rasch hochzuzählen. 
        Wenn das passiert, ist es deine Aufgabe, so schnell wie möglich die <b>Leertaste zu drücken. 
        Bitte verwende deine dominante Hand</b> (die Hand, mit der du normalerweise schreibst). 
        Dann stoppt die Uhr, und deine Reaktionszeit wird für einen kurzen Moment angezeigt.
    </div>
    <br><br>`,
  
    `<br><br>
    <div class="instructions" style="max-width:${instructionsWidth}px;"> 
        <b>Du musst die Uhr innerhalb von ${lapseTime/1000} s stoppen</b>, aber "übermenschliche" 
        Reaktionszeiten unter ${prematureTime/1000} s zählen ebenfalls als Fehler. 
        <p style="color:#8B0000"><b>Zu viele Fehler führen zum Ausschluss von der Studie!</b></p>
        Aber keine Sorge, wenn du die Leertaste drückst, sobald die Uhr beginnt hochzuzählen, 
        wirst du auf jeden Fall rechtzeitig genug reagieren.<br>
        Du kannst die Aufgabe nun kurz üben.
    </div>
    <br><br>`
    ],
    show_clickable_nav: true,
    button_label_next: "weiter",
    button_label_previous: "zurück",
  
    data: { trial: 'pvt_start_screen' },
    on_finish: () => {
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
    var feedback = `<span style="font-size:40px">Du hast ${pvtTrialsPractice - pvtLapseCount - pvtPrematureCount} ` + 
    `von ${pvtTrialsPractice} Stoppuhren rechtzeitig gestoppt!!</span><br><br>`;

    /* Add "well done" when they got at least 2 out of 3 correct (i.e. more than 1 correct) */
    if (pvtTrialsPractice - pvtLapseCount - pvtPrematureCount > 1) feedback = feedback + '<br>Well done!<br><br>'

    return(feedback);
  },
  choices: ['ok']
};

/* If participants failed the practice phase, they get one more try. */
wrongPracticePVT = {
  on_load: () => {
    disp = document.querySelector('.jspsych-display-element');
    disp.style.background = '#ffffff';
  },
  type: jsPsychHtmlButtonResponse,
  data: { trial: 'failed_practice_pvt' },
  stimulus:
  `<div class="instructions" style="max-width:${instructionsWidth}px;">
    Sorry, aber du musst mindestens <b>2 von 3</b> Stoppuhren rechtzeitig stoppen!<br>
    Du musst jede Uhr innerhalb von ${lapseTime/1000} Sekunden stoppen, aber implausible 
    Reaktuonszeiten (< ${prematureTime/1000} s) zählen als Fehler! 
    Bitte versuche es noch einmal.<br><br>
  </div>`,
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
  
  `<br><br>
  <div class="instructions" style="max-width:${instructionsWidth}px;"> 
    Super, du bist bereit für die Aufgabe!<br>
    Drücke die Leertaste mit deiner dominanten Hand. 
    Wenn du auf "weiter" clickst, beginnt die Aufgabe. 
    Sie wird ${pvtTimeLimit/60000} in Anspruch nehmen.</b> 
  </div>`,
  choices: ['weiter'],
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
  
  `<br><br>
  <div class="instructions" style="max-width:${instructionsWidth}px;">
    Gut gemacht, das war's!
  </div>
  <br><br>`,
  choices: ['weiter'],
  button_html: '<button class="jspsych-btn" tabindex="-1">%choice%</button>',
  data: { trial: 'pvt_instructions' }
};
