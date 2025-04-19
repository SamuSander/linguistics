// digit_span.js
// -------------
// Vollständiges jsPsych 7 Experiment für einen Vorwärts‑Digit‑Span‐Test
// Alle Trials sind als `var` deklariert, damit sie global erreichbar sind.
// Instruktionen und Feedback auf Deutsch.
// Plugin‑Klassen werden per Objekt statt als String referenziert.


// --- Experiment Parameter ---
var nTrials         = 14;               // Anzahl Haupt‑Trials
var minSetSize      = 3;                // Startlänge der Ziffernreihe
var stimuliDuration = 1000;             // ms zur Anzeige jeder Ziffer
var recallDuration  = null;             // ms zur Rekall‑Phase (null = unbegrenzt)
var possibleNumbers = ['0','1','2','3','4','5','6','7','8','9'];

// Adaptive Variablen
var nError      = 0;
var highestSpan = 0;
var consecError = 0;

// Pro Trial
var currentSequence = [];
var stimIndex       = 0;
var trialCount      = 0;

// Teilnehmer‑ID (optional)
var participantID = '';

// --- 1) Instruktions‑Screens auf Deutsch ---
var digitSpanInstr1 = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
    <div style="font-size:24px; text-align:center;">
      <h2>Digit‑Span‑Aufgabe</h2>
      <p>Sie sehen nacheinander eine Reihe von Ziffern in der Mitte des Bildschirms.</p>
      <p>Merken Sie sich jede Ziffer und ihre genaue Reihenfolge.</p>
    </div>
  `,
  choices: ['Weiter']
};

var digitSpanInstr2 = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
    <div style="font-size:24px; text-align:center;">
      <p>Zuerst folgen Übungsdurchgänge, danach der eigentliche Test.</p>
      <p>Drücken Sie <strong>Start</strong>, um zu beginnen.</p>
    </div>
  `,
  choices: ['Start']
};

// --- 2) Sequenz‑Präsentation ---
var sequencePresentation = {
  timeline: [{
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function() {
      // Wenn stimIndex 0, dann neue Sequenz durchmischen
      if (stimIndex === 0) {
        currentSequence = jsPsych.randomization.sampleWithoutReplacement(
          possibleNumbers, minSetSize
        );
      }
      // Zeige aktuelle Ziffer an und inkrementiere den Index
      return `<div style="font-size:60px;">${currentSequence[stimIndex++]}</div>`;
    },
    choices: 'NO_KEYS',
    trial_duration: stimuliDuration,
    post_trial_gap: 250
  }],
  loop_function: function() {
    // Wiederhole, bis alle Ziffern gezeigt wurden
    return stimIndex < currentSequence.length;
  },
  // Wenn eine neue Wiedergabe beginnt, Index zurücksetzen
  on_timeline_start: function() {
    stimIndex = 0;
  }
};

// --- 3) Rekall‑Trial ---
var recallTrial = {
  type: jsPsychDigitSpanRecall,
  correct_order: function() { return currentSequence; },
  trial_duration: recallDuration,
  size_cells: 80,
  on_finish: function(data) {
    // Adaptive Logik: Ansteigen oder Verringern der Span‑Länge
    if (data.accuracy === 1) {
      if (highestSpan < minSetSize) highestSpan = minSetSize;
      minSetSize++;
      nError = 0;
    }
    else if (nError < 1) {
      nError++;
    }
    else {
      if (consecError < minSetSize) consecError = minSetSize;
      minSetSize = Math.max(3, minSetSize - 1);
      nError = 0;
    }
  }
};

// --- 4) Feedback auf Deutsch ---
var feedback = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: function(data) {
    return data.accuracy === 1
      ? '<div style="font-size:35px; color:green;"><strong>Korrekt</strong></div>'
      : '<div style="font-size:35px; color:red;"><strong>Falsch</strong></div>';
  },
  choices: 'NO_KEYS',
  trial_duration: 1000,
  post_trial_gap: 250,
  on_finish: function() {
    trialCount++;
  }
};

// --- 5) Haupt‑Loop für Digit‑Span ---
var mainDigitSpan = {
  timeline: [ sequencePresentation, recallTrial, feedback ],
  loop_function: function() {
    // Wiederhole, bis die gewünschte Trial‑Anzahl erreicht ist
    return trialCount < nTrials;
  },
  // Wenn ein neuer Loop beginnt, Index und Zähler zurücksetzen
  on_timeline_start: function() {
    trialCount = 0;
  }
};


var dataLog = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '',
  choices: 'NO_KEYS',
  trial_duration: 100,
  on_finish: function() {
    // Nur Rekall‑Trials filtern und als CSV lokal speichern
    var ds = jsPsych.data.get().filter({
      trial_type: DigitSpanRecallPlugin.info.name
    });
    var filename = 'WM_digit_span_' +
                   (participantID || 'Teilnehmer') + '_' +
                   Date.now() + '.csv';
    ds.localSave('csv', filename);
  }
};

// --- 7) Abschluss‑Screen auf Deutsch ---
var conclusion = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: function() {
    return `
      <div style="font-size:24px; text-align:center;">
        <p><strong>Aufgabe beendet!</strong></p>
        <p>Maximale korrekt wiedergegebene Span‑Länge: <strong>${highestSpan}</strong></p>
        <p>Span‑Länge vor zwei Fehlern in Folge: <strong>${consecError}</strong></p>
        <p>Drücken Sie eine beliebige Taste, um zu beenden.</p>
      </div>
    `;
  },
  choices: 'ALL_KEYS'
};