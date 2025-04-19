/**
 * digit_span.js
 * -------------
 * Vollständiges jsPsych 7 Experiment für einen Vorwärts‑Digit‑Span‐Test
 * Alle Trials sind als `var` deklariert, damit sie global erreichbar sind.
 * Instruktionen und Feedback auf Deutsch.
 * Plugin‑Klassen werden per Objekt statt als String referenziert.
 */

// --- Experiment Parameter ---
var nTrials = 14;               // Anzahl Haupt‑Trials
var minSetSize = 3;             // Startlänge der Ziffernreihe
var stimuliDuration = 1000;     // ms zur Anzeige jeder Ziffer
var recallDuration = null;      // ms zur Rekall‑Phase (null = unbegrenzt)
var possibleNumbers = ['0','1','2','3','4','5','6','7','8','9'];

// Adaptive Variablen
var nError = 0;
var highestSpan = 0;
var consecError = 0;

// Pro Trial
var currentSequence = [];
var stimIndex = 0;
var trialCount = 0;
var showingDigits = false;

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
  choices: ['Weiter'],
  on_finish: function() {
    console.log("Instruktion 1 abgeschlossen");
  }
};

var digitSpanInstr2 = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
    <div style="font-size:24px; text-align:center;">
      <p>Sie müssen sich eine Sequenz von Zahlen merken, die nacheinander auf dem Bildschirm angezeigt werden.</p>
      <p>Am Ende jedes Durchgangs geben Sie alle Zahlen in der <strong>richtigen Reihenfolge</strong> über das Nummernfeld auf dem Bildschirm ein.</p>
      <p><u>Beispiel:</u> Wenn die Sequenz '7 4 5 1' ist, geben Sie '7 4 5 1' in genau dieser Reihenfolge ein.</p>
      <p>Drücken Sie <strong>Start</strong>, um zu beginnen.</p>
    </div>
  `,
  choices: ['Start'],
  on_finish: function() {
    console.log("Instruktion 2 abgeschlossen - Experiment startet");
  }
};

// --- 2) Sequenz‑Präsentation mit verbessertem Debugging ---
var generateSequence = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: function() {
    console.log("generateSequence: Beginne die Erstellung einer neuen Sequenz");
    console.log("generateSequence: Aktuelle minSetSize =", minSetSize);
    
    // Erzeuge eine neue Sequenz
    currentSequence = jsPsych.randomization.sampleWithoutReplacement(
      possibleNumbers, minSetSize
    );
    
    console.log("generateSequence: Neue Sequenz erstellt:", currentSequence);
    
    // Setze den Zähler zurück
    stimIndex = 0;
    showingDigits = true;
    
    // Zeige einen leeren Bildschirm
    return "";
  },
  choices: "NO_KEYS",
  trial_duration: 250,
  on_finish: function() {
    console.log("generateSequence: Sequenzgenerierung abgeschlossen");
  }
};

// Trial für eine einzelne Ziffer mit mehr Debug-Ausgaben
var showSingleDigit = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: function() {
    if (stimIndex >= currentSequence.length) {
      console.error("showSingleDigit: FEHLER - stimIndex außerhalb des gültigen Bereichs:", 
                   stimIndex, "Sequenzlänge:", currentSequence.length);
      return "";
    }
    
    let digit = currentSequence[stimIndex];
    console.log("showSingleDigit: Zeige Ziffer:", digit, "Index:", stimIndex, "von", currentSequence.length);
    
    return `<div style="font-size:60px;">${digit}</div>`;
  },
  choices: "NO_KEYS",
  trial_duration: stimuliDuration,
  post_trial_gap: 250,
  on_finish: function() {
    stimIndex++;
    console.log("showSingleDigit: Nach Inkrementierung stimIndex =", stimIndex);
    
    if (stimIndex >= currentSequence.length) {
      console.log("showSingleDigit: Letzte Ziffer gezeigt, Sequenz vollständig");
      showingDigits = false;
    }
  }
};

// Zeige alle Ziffern der Sequenz nacheinander
var presentDigitSequence = {
  timeline: [showSingleDigit],
  loop_function: function() {
    console.log("presentDigitSequence: Loop-Funktion aufgerufen, stimIndex =", stimIndex);
    return stimIndex < currentSequence.length;
  }
};

// --- 3) Rekall‑Trial mit verbesserten Parametern ---
var recallTrial = {
  type: jsPsychDigitSpanRecall,
  correct_order: function() { 
    console.log("recallTrial: correct_order Funktion aufgerufen, gibt zurück:", currentSequence);
    return currentSequence; 
  },
  trial_duration: recallDuration,
  size_cells: 80,
  cell_spacing: 15, // Größerer Abstand zwischen den Zellen
  button_label_backspace: "Löschen",
  button_label_continue: "Weiter",
  on_finish: function(data) {
    console.log("recallTrial: Recall abgeschlossen");
    console.log("recallTrial: Sequenz:", currentSequence);
    console.log("recallTrial: Antwort:", data.recall);
    console.log("recallTrial: Genauigkeit:", data.accuracy);
    
    // Adaptive Logik: Ansteigen oder Verringern der Span‑Länge
    if (data.accuracy === 1) {
      if (highestSpan < minSetSize) highestSpan = minSetSize;
      minSetSize++;
      nError = 0;
      console.log("recallTrial: Korrekt! Neue minSetSize =", minSetSize);
    }
    else if (nError < 1) {
      nError++;
      console.log("recallTrial: Erster Fehler. nError =", nError);
    }
    else {
      if (consecError < minSetSize) consecError = minSetSize;
      minSetSize = Math.max(3, minSetSize - 1);
      nError = 0;
      console.log("recallTrial: Zweiter Fehler! consecError =", consecError, "Neue minSetSize =", minSetSize);
    }
  }
};

// --- 4) Feedback auf Deutsch ---
var feedback = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: function() {
    const lastTrial = jsPsych.data.get().filter({trial_type: 'digit-span-recall'}).last(1).values()[0];
    console.log("feedback: Letzter Trial:", lastTrial);
    
    const feedbackText = lastTrial.accuracy === 1
      ? '<div style="font-size:35px; color:green;"><strong>Korrekt</strong></div>'
      : '<div style="font-size:35px; color:red;"><strong>Falsch</strong></div>';
      
    console.log("feedback: Zeige Feedback:", lastTrial.accuracy === 1 ? "Korrekt" : "Falsch");
    return feedbackText;
  },
  choices: "NO_KEYS",
  trial_duration: 1000,
  post_trial_gap: 250,
  on_finish: function() {
    trialCount++;
    console.log("feedback: Trial abgeschlossen:", trialCount, "von", nTrials);
  }
};

// --- 5) Haupt‑Loop für Digit‑Span mit vereinfachtem Ablauf ---
var singleDigitSpanTrial = {
  timeline: [generateSequence, presentDigitSequence, recallTrial, feedback],
  on_timeline_start: function() {
    console.log("singleDigitSpanTrial: Neuer Durchgang beginnt");
  },
  on_timeline_finish: function() {
    console.log("singleDigitSpanTrial: Durchgang beendet");
  }
};

var mainDigitSpan = {
  timeline: [singleDigitSpanTrial],
  repetitions: nTrials,
  on_timeline_start: function() {
    console.log("mainDigitSpan: Experiment beginnt mit", nTrials, "Durchgängen");
    trialCount = 0;
  },
  on_timeline_finish: function() {
    console.log("mainDigitSpan: Experiment beendet");
    console.log("mainDigitSpan: Höchste Span =", highestSpan);
    console.log("mainDigitSpan: Span vor zwei Fehlern =", consecError);
  }
};

// --- 6) Daten speichern ---
var dataLog = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '',
  choices: "NO_KEYS",
  trial_duration: 100,
  on_finish: function() {
    console.log("dataLog: Speichere Daten");
    // Nur Rekall‑Trials filtern und als CSV lokal speichern
    var ds = jsPsych.data.get().filter({
      trial_type: 'digit-span-recall'
    });
    
    var filename = 'WM_digit_span_' +
                 (participantID || 'Teilnehmer') + '_' +
                 Date.now() + '.csv';
                 
    console.log("dataLog: Dateiname:", filename);
    
    // CSV speichern - entweder lokal oder auf Server
    // Verwendet die saveAs-Funktion aus FileSaver.js, die in der HTML geladen sein muss
    var csvString = ds.csv();
    var blob = new Blob([csvString], { type: 'text/csv;charset=utf-8' });
    
    try {
      saveAs(blob, filename);
      console.log("dataLog: Daten erfolgreich gespeichert");
    } catch (e) {
      console.error("dataLog: Fehler beim Speichern:", e);
    }
  }
};

// --- 7) Abschluss‑Screen auf Deutsch ---
var digitSpanConclusion = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: function() {
    console.log("digitSpanConclusion: Zeige Abschlussbildschirm");
    return `
      <div style="font-size:24px; text-align:center;">
        <p><strong>Aufgabe beendet!</strong></p>
        <p>Maximale korrekt wiedergegebene Span‑Länge: <strong>${highestSpan}</strong></p>
        <p>Span‑Länge vor zwei Fehlern in Folge: <strong>${consecError}</strong></p>
        <p>Drücken Sie eine beliebige Taste, um fortzufahren.</p>
      </div>
    `;
  },
  choices: "ALL_KEYS",
  on_finish: function() {
    console.log("digitSpanConclusion: Experiment komplett abgeschlossen");
  }
};

// CSS für das Digit-Span Plugin
document.head.insertAdjacentHTML('beforeend', `
<style>
  .jspsych-digit-span-recall {
    border: 1px solid #ccc;
    text-align: center;
    font-size: 24px;
    line-height: 1.5;
    padding: 10px;
    cursor: pointer;
    background-color: #f8f8f8;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.15s ease;
    color: black; /* Schwarze Zahlen */
  }
  
  .jspsych-digit-span-recall:hover {
    background-color: #e0e0e0;
  }
  
  .jspsych-btn-numpad {
    background-color: #3498db;
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 18px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.15s ease;
  }
  
  .jspsych-btn-numpad:hover {
    background-color: #2980b9;
  }
  
  .recall-space {
    border: 1px solid #ddd;
    background-color: white;
    padding: 10px;
    font-size: 24px;
    min-height: 50px;
    border-radius: 5px;
    box-shadow: inset 0 1px 3px rgba(0,0,0,0.1);
    text-align: center;
    color: black; /* Schwarze Zahlen */
  }
</style>
`);

// Wenn Sie den kompletten Digit Span Test alleine ausführen möchten, können Sie diese Zeilen aktivieren:
/*
const timeline = [
  digitSpanInstr1,
  digitSpanInstr2,
  mainDigitSpan,
  dataLog,
  digitSpanConclusion
];

jsPsych.run(timeline);
*/