// winograd.js - synchroner Ansatz mit fixen Daten als Fallback

// Definieren wir die Winograd-Timeline als globales Objekt
var winogradTimeline = [];

// Einfache HTML-Escaper Funktion
const esc = s => (s || "")
  .replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");

// Instruktionen für Winograd-Schema-Aufgabe
const winogradInstructions = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
    <div class="instructions" style="max-width:900px;">
      <h2>Sprachverständnis im Alltag</h2>
      <p>In diesem Teil des Experiments werden wir testen, wie Sie sprachliche Mehrdeutigkeiten auflösen.</p>
      <p>Sie werden kurze Sätze sehen, die in mehreren Teilen präsentiert werden:</p>
      <ul style="text-align: left; margin: 0 auto;">
        <li>Zuerst sehen Sie einen <strong>Kontext</strong> (z.B. "Die Stadtratsmitglieder verweigerten den Demonstranten eine Genehmigung, ")</li>
        <li>Dann folgt ein <strong>Pronomen</strong> (z.B. "weil sie ")</li>
        <li>Schließlich wird ein <strong>disambiguierender Satzteil</strong> gezeigt (z.B. "Gewalt befürchteten.")</li>
      </ul>
      <p>Nach jedem Satz werden Sie gefragt, <strong>worauf sich das Pronomen bezieht</strong>.</p>
      <p>Bitte antworten Sie so schnell wie möglich. Sie haben jeweils <strong>maximal 3 Sekunden</strong> Zeit für Ihre Antwort.</p>
      <p>Wenn Sie bereit sind, klicken Sie auf "Starten".</p>
    </div>
  `,
  choices: ["Starten"],
  data: { trial: "winograd_instructions" }
};

// Ein Beispiel-Trial, der immer angezeigt wird
const practiceExample = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
    <div class="instructions" style="max-width:900px;">
      <h3>Beispiel</h3>
      <p>Hier ist ein Beispiel, wie die Aufgabe ablaufen wird:</p>
      <p style="font-size:24px; margin-top:20px;">"Die Stadtratsmitglieder verweigerten den Demonstranten eine Genehmigung, weil sie Gewalt befürchteten."</p>
      <p>Frage: <strong>Wer befürchtete Gewalt?</strong></p>
      <p>In diesem Fall bezieht sich "sie" auf "Die Stadtratsmitglieder", die richtige Antwort wäre also "Die Stadtratsmitglieder".</p>
      <p>Die Aufgaben werden schnell präsentiert. Bitte konzentrieren Sie sich und antworten Sie so schnell wie möglich.</p>
    </div>
  `,
  choices: ["Verstanden, los geht's"],
  data: { trial: "winograd_practice_example" }
};

// Abschlussbildschirm
const winogradComplete = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
    <div class="instructions" style="max-width:900px;">
      <h2>Sprachverständnisteil abgeschlossen</h2>
      <p>Vielen Dank! Sie haben den Sprachverständnisteil erfolgreich abgeschlossen.</p>
      <p>Klicken Sie auf "Weiter", um mit dem nächsten Teil des Experiments fortzufahren.</p>
    </div>
  `,
  choices: ["Weiter"],
  data: { trial: "winograd_complete" }
};

// Erstelle ein fest codiertes Fallback-Array mit den ersten drei Schemas aus der CSV
const fallbackSchemas = [
  {
    id: "1",
    context: "Die Stadtratsmitglieder verweigerten den Demonstranten eine Genehmigung, ",
    pronoun: "weil sie ",
    disambiguation: "Gewalt befürchteten./Gewalt befürworteten.",
    question: "Wer [befürchtete/befürwortete] Gewalt?",
    answers: "Die Stadtratsmitglieder|Die Demonstranten"
  },
  {
    id: "2",
    context: "Die Trophäe passt nicht in den braunen Koffer, ",
    pronoun: "weil sie zu ",
    disambiguation: "klein ist./groß ist.",
    question: "Was ist zu [klein/groß]?",
    answers: "Der Koffer|Die Trophäe"
  },
  {
    id: "3",
    context: "Joan achtete darauf, Susan für all die Hilfe zu danken, ",
    pronoun: "die sie ",
    disambiguation: "gegeben hatte./erhalten hatte.",
    question: "Wer hatte Hilfe [gegeben/erhalten]?",
    answers: "Susan|Joan"
  }
];

// Funktion, die die Trial-Items für ein Schema erstellt
function createTrialsForSchema(row) {
  const trials = [];
  
  const id = row.id?.trim();
  const context = esc(row.context);
  const pronoun = esc(row.pronoun || "");
  const variants = row.disambiguation.split("/").map(v => esc(v.trim()));
  
  // Frage-Template & Antwort-Optionen aus CSV
  const qTemplate = row.question || "Wähle die richtige Antwort.";
  const answers = (row.answers || "").split("|").map(a => a.trim()).filter(a => a);
  
  // Zufällige Auswahl einer Variante (A oder B)
  const variantIdx = Math.floor(Math.random() * 2);
  const label = ["A", "B"][variantIdx];
  const disamb = variants[variantIdx] || "";
  const question = qTemplate.replace(/\[([^\]]+)\]/, disamb.replace(/\.$/,""));
  
  // Jittered Intervall für fMRT (Variable Dauer zwischen 4-8 Sekunden)
  const jitteredDuration = Math.floor(Math.random() * 4000) + 4000;
  
  // 1) Kontext-Präsentation (3000ms)
  trials.push({
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `<div style="font-size:32px;">${context}</div>`,
    choices: "NO_KEYS",
    trial_duration: 3000,
    data: { wsc_id: id, variant: label, part: "context" }
  });
  
  // 2) Pronomenphase (2000ms) (falls vorhanden)
  if (pronoun) {
    trials.push({
      type: jsPsychHtmlKeyboardResponse,
      stimulus: `<div style="font-size:32px;">${pronoun}</div>`,
      choices: "NO_KEYS",
      trial_duration: 2000,
      data: { wsc_id: id, variant: label, part: "pronoun" }
    });
  }
  
  // 3) Disambiguierungsphase (2000ms)
  trials.push({
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `<div style="font-size:32px;">${disamb}</div>`,
    choices: "NO_KEYS",
    trial_duration: 2000,
    data: { wsc_id: id, variant: label, part: "disambiguation" }
  });
  
  // 4) Jittered Intervall (4000-8000ms)
  trials.push({
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `<div style="font-size:32px;">+</div>`, // Fixationskreuz
    choices: "NO_KEYS",
    trial_duration: jitteredDuration,
    data: { wsc_id: id, variant: label, part: "jittered_interval" }
  });
  
  // 5) Antwortphase (3000ms)
  trials.push({
    type: jsPsychSurveyMultiChoice,
    trial_duration: 3000,
    questions: [
      {
        prompt: esc(question),
        name: "wsc_answer",
        options: answers.length ? answers : ["Antwort 1","Antwort 2"],
        required: true
      }
    ],
    data: { 
      wsc_id: id, 
      variant: label, 
      part: "response", 
      expected_answer: answers[variantIdx === 0 ? 0 : 1] || "Unbekannt" 
    },
    on_finish: function(data) {
      // Prüfen, ob zu langsam geantwortet wurde
      if (!data.rt || data.rt >= 3000) {
        jsPsych.addNodeToEndOfTimeline({
          type: jsPsychHtmlKeyboardResponse,
          stimulus: `<div style="color:red; font-size:24px; text-align:center;">
                       Zu langsam geantwortet.<br>
                       Bitte versuchen Sie, schneller zu reagieren.
                     </div>`,
          choices: "NO_KEYS",
          trial_duration: 2000,
          data: { wsc_id: id, variant: label, part: "slow_warning" }
        });
      }
      
      // Speichern, ob die Antwort korrekt war
      const response = JSON.parse(data.response).wsc_answer;
      data.correct = response === data.expected_answer;
    }
  });
  
  return trials;
}

// Füge die Instruktionen und das Beispiel zur Timeline hinzu
winogradTimeline.push(winogradInstructions);
winogradTimeline.push(practiceExample);

// Direktes Laden der Winograd-Schemas (synchron)
function initWinogradTrials() {
  // Bei Fehlern oder nicht gefundener CSV verwenden wir die Fallback-Daten
  let dataToUse = fallbackSchemas;
  
  try {
    // Wir verwenden einen synchronen XMLHttpRequest, um die CSV zu laden
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'winograd_schemas/wino_schemas.csv', false); // false macht es synchron
    xhr.send(null);
    
    if (xhr.status === 200) {
      // Manuelles Parsen der CSV
      const lines = xhr.responseText.split('\n');
      const headers = lines[0].split(',');
      
      // Erstelle ein Array von Objekten aus der CSV
      const parsedData = [];
      for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue; // Leere Zeilen überspringen
        
        const values = lines[i].split(',');
        const row = {};
        
        // Zuweisung der Werte zu den entsprechenden Header-Feldern
        // Wir wissen aus der Beschreibung, dass die CSV folgende Spalten hat:
        // id,context,pronoun,disambiguation,question,answers
        row.id = values[0] || "";
        row.context = values[1] || "";
        row.pronoun = values[2] || "";
        row.disambiguation = values[3] || "";
        row.question = values[4] || "";
        row.answers = values[5] || "";
        
        parsedData.push(row);
      }
      
      console.log("CSV manuell geladen, Anzahl der Schemas:", parsedData.length);
      
      if (parsedData.length > 0) {
        dataToUse = parsedData;
      }
    }
  } catch (error) {
    console.error("Fehler beim Laden der CSV, verwende Fallback-Daten:", error);
  }
  
  // Wähle bis zu 40 Schemas (oder so viele wie vorhanden sind)
  const selectedData = dataToUse.length <= 40 ? dataToUse : 
                      jsPsych.randomization.sampleWithoutReplacement(dataToUse, 40);
  
  console.log("Verwende", selectedData.length, "Schemas für die Winograd-Trials");
  
  // Erstelle für jedes Schema die entsprechenden Trials
  let allTrials = [];
  selectedData.forEach(schema => {
    const schemaTrials = createTrialsForSchema(schema);
    allTrials = allTrials.concat(schemaTrials);
  });
  
  // Füge alle Schema-Trials in die Winograd-Timeline ein
  allTrials.forEach(trial => {
    winogradTimeline.push(trial);
  });
  
  // Füge den Abschlussbildschirm hinzu
  winogradTimeline.push(winogradComplete);
  
  console.log("Winograd-Timeline fertig initialisiert mit", winogradTimeline.length, "Trials");
}

// Initialisiere die Winograd-Trials sofort
initWinogradTrials();

// Exportiere die fertige Timeline für die Haupttimeline
var winogradTrials = {
  timeline: winogradTimeline
};