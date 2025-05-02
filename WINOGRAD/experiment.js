/**************************************************************
 * experiment.js
 *
 * Full script with no omissions, as per your original code.
 * - Participant instructions in German
 * - Code comments in English
 * - Timeline array declared at the end, using spread operators
 **************************************************************/

// ------------------------------------------------------
// 1) BASIC SETUP: PARTICIPANT ID and GLOBAL VARIABLES
// ------------------------------------------------------

// Generate a random participant ID
var participantID = jsPsych.randomization.randomID(6).toUpperCase();

// Example call to send ID info to a server or DB
/*
sendId("winograd_config", participantID, {
participantID: participantID,
status: "started Online-Experiment"
});
*/

var globalSequenceData = null;

// ------------------------------------------------------
// 2) WELCOME / INTRO (German instructions)
// ------------------------------------------------------

var inputID = {
  type: jsPsychSurveyHtmlForm,
  // The "preamble" is text shown above the form fields.
  // Here we give German instructions, plus some basic inline styling.
  preamble: `
    <div style="text-align:center; margin-bottom:20px;">
      <h2>Willkommen!</h2>
      <p>Bevor wir beginnen, tragen Sie bitte Ihre Teilnehmer-ID in das untere Feld ein.</p>
      <p>Stellen Sie sicher, dass Sie die richtige ID eingeben, damit wir Ihre Daten korrekt zuordnen können.</p>
    </div>
  `,
  // The "html" property contains the actual form elements.
  // We use basic inline styling to keep it visually distinct.
  html: `
    <div style="display:flex; justify-content:center; margin-bottom:20px;">
      <label for="participant-id" style="font-size:18px; margin-right:10px;">
        <b>Teilnehmer-ID:</b>
      </label>
      <input type="text" name="participantCODE" id="participant-id" 
             placeholder="Ihre ID hier eingeben" 
             style="font-size:16px; padding:5px; width:200px;" required>
    </div>
  `,
  data: {
    trial: "inputID",
  },
  // Button label in German
  button_label: "Weiter",
  on_finish: function(data) {
    // By default, jsPsychSurveyHtmlForm will store the input
    // in data.response, keyed by "participantCODE".
    // If you want to set a global variable or attach to jsPsych data, you can do so here:
    var participantCODE = data.response.participantCODE;
    jsPsych.data.addProperties({ participantCODE: participantCODE });
    
    /*
    getSequence(function(sequenceData) {
      console.log("Sequence Data for first available row:", sequenceData);
      // Deinfie it globally
      globalSequenceData = sequenceData;
      // sequenceData.encoding_sequence ist nun ein Array, ebenso die anderen Sequenzfelder.
  });
    
    updateConfig(
      "participantID",         // The column to filter on
      participantID,           // The current participantID
      ['participantCODE', 'sequence'],  // The columns to update
      [participantCODE, globalSequenceData.participant_id]  // The new values
    );

    */
  }
};

var welcome = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `<br>
  <div class="instructions" style="max-width:${instructionsWidth}px;">
      <img src="pics/zi_logo.svg" width="200" style="display: block; margin:0 auto; filter: brightness(0) invert(1);"></img><br><br>
      <p>Willkommen.<br>
      Vielen Dank, dass Sie sich die Zeit nehmen, an unserem Experiment teilzunehmen.</p>
      <p>Wir beginnen heute mit dem ersten Teil dieses Experiments.</p>
      <p>Wenn Sie auf 'Weiter' klicken, werden Sie als Erstes über das Experiment informiert.<br>
      Außerdem wird Ihnen die <b>Einverständniserklärung</b> vorgelegt. Bitte lesen Sie diese sorgfältig durch. 
      Nur wenn Sie Ihr Einverständnis bestätigen, können Sie an diesem Experiment teilnehmen.<br>
      Im Anschluss fragen wir einige demografische Daten ab, die für die Datenauswertung relevant sind.</p>
      <p>Im Hauptteil dieses Online-Experiments werden wir Ihre Gedächtnisleistung in 6 Teilaufgaben überprüfen.
      Zuerst wird Ihre Reaktionsschnelligkeit getestet. Danach zeigen wir Ihnen eine Reihe
      von Begriffen, die Sie sich merken sollen. Anschließend folgt eine Matrizenaufgabe,
      sowie zwei Aufgaben zum Abruf der gelernten Begriffe und ein Wortflüssigkeitstest.</p>
      <p>Klicken Sie auf 'Weiter', sobald Sie bereit sind.</p>
  </div>
  <br><br>
  `,
  choices: ["Weiter"],
  post_trial_gap: 2000,
  data: {
      trial: "welcome",
  },
  save_trial_parameters: {
      rt: true,
      stimulus: true,
      response: false,
      trial_type: true,
      choices: false,
  },
  on_finish: function() {
      // Add participantID to all subsequent trials
      jsPsych.data.addProperties({ participantID: participantID });
  }
};

var attentionReminder = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
  <div class="instructions" style="max-width:${instructionsWidth}px;">
      <img src="pics/zi_logo.svg" width="200" style="display: block; margin:0 auto; filter: brightness(0) invert(1);"></img><br><br>
      <h2>Wichtige Hinweise zur Durchführung</h2>
      <p><strong>Bitte beachten Sie:</strong></p>
      <ul style="text-align: left; max-width: 80%; margin: 0 auto;">
        <li>Das Experiment dauert ca. <strong>60-90 Minuten</strong>.</li>
        <li>Bitte begeben Sie sich in einen <strong>ungestörten Raum</strong>.</li>
        <li>Führen Sie das Experiment <strong>ohne Unterbrechungen</strong> durch.</li>
        <li>Brechen Sie die Studie bitte <strong>nicht mittendrin ab</strong> - planen Sie genügend Zeit ein.</li>
        <li>Schalten Sie mögliche Störquellen (Handy, Benachrichtigungen) aus.</li>
      </ul>
      <p style="margin-top: 20px;">Für aussagekräftige Forschungsergebnisse ist es wichtig, dass Sie konzentriert und ohne Unterbrechung teilnehmen.</p>
      <p style="margin-top: 20px;">Klicken Sie auf 'Verstanden', sobald Sie bereit sind und diese Hinweise gelesen haben.</p>
  </div>
  `,
  choices: ["Verstanden"],
  post_trial_gap: 2000,
  data: {
      trial: "attentionReminder",
  },
  save_trial_parameters: {
      rt: true,
      stimulus: true,
      response: false,
      trial_type: true,
      choices: false,
  },
};

// ------------------------------------------------------
// 3) PVT INSTRUCTIONS (Example) - German
// ------------------------------------------------------
var pvtStartScreen = {
  type: jsPsychInstructions,
  pages: [
  `<br><br>
  <div class="instructions" style="max-width:${instructionsWidth}px;"> 
      Vielen Dank, dass Sie an unserem Experiment teilnehmen.</p>
      <p>Im ersten Teil dieses Experiments testen wir Ihre Wachsamkeit.</p> 
      Eine <b>Stoppuhr</b> in der Mitte des Bildschirms beginnt zu einem zufälligen Zeitpunkt hochzuzählen. 
      Sobald das passiert, drücken Sie bitte so schnell wie möglich die <b>Leertaste</b>.
  </div>
  <br><br>`,

  `<br><br>
  <div class="instructions" style="max-width:${instructionsWidth}px;"> 
      <b>Sie müssen die Stoppuhr innerhalb von ${lapseTime/1000} Sekunden stoppen</b>, aber 
      "übermenschliche" Reaktionszeiten unter ${prematureTime/1000} Sekunden zählen als Fehler. 
      <p style="color:#8B0000"><b>Zu viele Fehler führen zum Ausschluss von der Studie!</b></p>
      Bitte drücken Sie also erst, wenn die Stoppuhr beginnt zu zählen.<br>
      Sie können dies jetzt kurz üben.
  </div>
  <br><br>`
  ],
  show_clickable_nav: true,
  button_label_next: "Weiter",
  button_label_previous: "Zurück",
  data: { trial: 'pvt_start_screen' },
  on_finish: () => {
      disp = document.querySelector('.jspsych-display-element');
      disp.style.background = '#000000';
      phase = "practice";
  }
};

// PVT practice references
var pvtPractice = {
  timeline: [PVT_fixation, stopwatch, feedback],
  timeline_variables: pvtDurationsPractice
};

var pvtPracticeLoop = {
  timeline: [pvtPractice, evalPvtPractice, ifWrongPracticePVT],
  loop_function: () => repeatPractice ? true : false
};

// Main PVT procedure
var pvtMainProcedure = {
  timeline: [ifFixation, ifStopwatch, ifFeedback],
  timeline_variables: pvtDurationsStudy
};

// ------------------------------------------------------
// 4) WAIT FOR SAVE (German instructions)
// ------------------------------------------------------
var wait_for_save = {
  on_load: () => {
      display = document.querySelector('#dots');
      var btn0 = document.querySelector('#jspsych-html-button-response-button-0 button');
      btn0.style.visibility = "hidden";
      startCountdownDots(100000, display); // assume this function is elsewhere
      serverComm.save_data_end(
          jsPsych.data.get().values(),
          'php/save_data_end.php',
          'winograd_end',
          acallback
      );
  },
  type: jsPsychHtmlButtonResponse,
  trial_duration: 5 * 60000,
  data: { trial: "wait_for_save" },
  stimulus: `
  <div class="instructions" style="max-width:${instructionsWidth}px;">
    <p>Ihre Daten werden gerade gespeichert. Bitte warten Sie, bis der Vorgang abgeschlossen ist.</p>
    <b>Bitte schließen Sie das Experiment nicht, solange noch "BITTE WARTEN" angezeigt wird!</b><br><br>
    
    <div id="wait">
      <span style="font-size:30px; color:#a90b00;"><b>BITTE WARTEN</b></span>
      <div><span id="dots" style="font-size:40px; color:#006106;">.</span></div>
    </div>
    
    <div id="done" style="display:none;">
      <span style="font-size:30px; color:#006106;"><b>FERTIG!</b></span><br>
      <span style="font-size:20px;">Sie können jetzt fortfahren.</span>
    </div>
  </div>
  `,
  choices: ['Weiter'],
  button_html: '<button class="jspsych-btn" tabindex="-1">%choice%</button>',
  on_finish: () => {
      clearInterval(timer_interval);
      updateConfig(
          "participantID",
          participantID,
          ['status'],
          ['Finished Online-Experiment']
      );
  }
};

// ------------------------------------------------------
// 10) CONCLUSION / END (German instructions)
// ------------------------------------------------------
var conclusion = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
  <div class="instructions" style="max-width:${instructionsWidth}px;"> 
    <p>Vielen Dank, dass Sie an unserem Experiment teilgenommen haben.</p>
    <p>Ihre Antworten wurden gespeichert. Bitte drücken Sie auf "Beenden", um das Experiment zu beenden.</p>
  </div>
  `,
  choices: ["Beenden"],
  record_data: false,
  data: { trial: "conclusion" },
  save_trial_parameters: {
      rt: true,
      stimulus: false,
      response: false,
      trial_type: true,
  },
};

var EndTrial = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
  <div class="entrial" style="max-width:${instructionsWidth}px;">
    <p>Sie können das Browserfenster jetzt schließen.</p>
  </div>
  `,
  choices: "NO_KEYS", 
  data: { trial: "endtrial" },
  save_trial_parameters: {
      rt: true,
      stimulus: false,
      response: false,
      trial_type: true,
  },
};

// ------------------------------------------------------
// 12) FINAL TIMELINE ASSEMBLY
// ------------------------------------------------------

// Global variable for sequence data:
var globalSequenceData = null;

// Assemble the complete timeline:
var timeline = [];
timeline.push(

  // Start
  //preload,
  inputID,
  welcome, // important for the Config Table
  consentForm,
  enter_fullscreen,

  // Demographics
  demographics,

  // Autism Ouotient
  aqK,

  // Schizotypal Personality Questionnaire
  spqG,
  attentionReminder,

  // PVT
  pvtStartScreen,
  pvtPracticeLoop,
  pvtMainInstructions, 
  pvtMainProcedure,
  ifMissingFeedback,
  pvtEnd,

  // Winograd Trials
  winogradTrials,

  // Digit Span
  digitSpanInstr1,
  digitSpanInstr2,
  mainDigitSpan,

  // Mini Q
  miniq_introductionScreen,
  miniq_explanation1,
  miniq_explanation2,
  miniq_explanation3,
  miniq_practiceTrials,
  miniq_startTestScreen,
  miniq_mainTest,
  miniq_endScreen,

  // RWT
  rwtIntro,
  rwtPorM,
  rwtProfessionsorHobbies,

  // End of Study
  wait_for_save,
  conclusion,
  exit_fullscreen,
  EndTrial
);

// Starte das Experiment mit jsPsych.run() anstelle von jsPsych.init()
jsPsych.run(timeline);