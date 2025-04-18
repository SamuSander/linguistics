/**************************************************************
 * winograd.js
 * Lädt eine deutsche WSC-JSON-Datei, erzeugt Wort-für-Wort-
 * Präsentation und fügt Frage-/Antwort-Trials hinzu.
 **************************************************************/

// Ein Array, in das wir alle Trials packen
var timeline = [];

/**
 * Erzeugt eine Wort-für-Wort-Präsentation des Satzes (sentence),
 * gefolgt von einer Frage (question) mit den Antwortoptionen (answers).
 *
 * @param {string} sentence    - kompletter Satz (Variante A oder B)
 * @param {string} question    - passende Frage (Variante A oder B)
 * @param {string[]} answers   - Array von Antwortmöglichkeiten
 * @param {number} itemId      - ID des aktuellen WSC-Items
 * @param {string} variantLabel - "A" oder "B" zur Unterscheidung
 * @returns {object[]} - Ein Array von jsPsych-Trial-Objekten
 */
function createWordByWordTrials(sentence, question, answers, itemId, variantLabel) {
  // Satz in einzelne Wörter zerlegen (Whitespace als Trenner)
  const words = sentence.split(/\s+/);

  let trial_sequence = [];

  // 1. Wort-für-Wort-Präsentation
  words.forEach((word, i) => {
    trial_sequence.push({
      type: jsPsychHtmlKeyboardResponse,
      // Größere Schrift (48px); Sie können bei Bedarf anpassen
      stimulus: `<div style="font-size: 48px;">${word}</div>`,
      choices: "NO_KEYS",     
      // Längere Anzeigedauer (z. B. 1 Sekunde = 1000 ms)
      trial_duration: 1000,
      // Kurze Pause nach jedem Wort (z. B. 500 ms)
      post_trial_gap: 500,  
      data: {
        wsc_id: itemId,
        variant: variantLabel,
        part: "word_" + (i + 1)
      }
    });
  });

  // 2. Direkt danach die Frage (SurveyMultiChoice)
  trial_sequence.push({
    type: jsPsychSurveyMultiChoice,
    questions: [
      {
        prompt: question,
        name: "wsc_answer",
        options: answers,
        required: true
      }
    ],
    data: {
      wsc_id: itemId,
      variant: variantLabel,
      part: "question"
    }
  });

  return trial_sequence;
}

/**
 * Liest aus einem Satz den Klammerinhalt [A/B] aus und gibt
 * zwei Varianten zurück:
 *   sentenceA -> (A ersetzt)
 *   sentenceB -> (B ersetzt)
 * Falls keine Klammer gefunden wird, sind A und B identisch.
 */
function getTwoVariantsSentence(originalSentence) {
  const match = originalSentence.match(/\[(.*?)\]/);
  if(!match) {
    // Keine eckigen Klammern -> einfach zurückgeben
    return { sentenceA: originalSentence, sentenceB: originalSentence };
  }
  // Beispiel: "[Glück hat/einen roten Turban trägt]"
  const bracketContent = match[1]; // "Glück hat/einen roten Turban trägt"
  const [A, B] = bracketContent.split("/");

  const sentenceA = originalSentence.replace(`[${bracketContent}]`, A);
  const sentenceB = originalSentence.replace(`[${bracketContent}]`, B);

  return { sentenceA, sentenceB };
}

/**
 * Analoges Verfahren für die Frage,
 * falls auch dort [A/B] verwendet wird.
 */
function getTwoVariantsQuestion(originalQuestion) {
  const match = originalQuestion.match(/\[(.*?)\]/);
  if(!match) {
    return { questionA: originalQuestion, questionB: originalQuestion };
  }
  const bracketContent = match[1];
  const [A, B] = bracketContent.split("/");

  const questionA = originalQuestion.replace(`[${bracketContent}]`, A);
  const questionB = originalQuestion.replace(`[${bracketContent}]`, B);

  return { questionA, questionB };
}

// Laden des deutschen WSC-Datensatzes, z.B. "winograd_schemas/wsc_schemas_german.json"
fetch("winograd_schemas/wsc_schemas_german.json")
  .then(response => response.json())
  .then(wscData => {

    // Durchlaufen aller WSC-Items aus wscData.wsc_data
    wscData.wsc_data.forEach(item => {

      // 1) Zwei Satz-Varianten erzeugen
      const { sentenceA, sentenceB } = getTwoVariantsSentence(item.sentence);

      // 2) Zwei Fragen-Varianten (falls Klammern)
      const { questionA, questionB } = getTwoVariantsQuestion(item.question);

      // 3) Trials für Variante A
      let trialsA = createWordByWordTrials(
        sentenceA,
        questionA,
        item.answers,
        item.id,
        "A"
      );

      // 4) Trials für Variante B
      let trialsB = createWordByWordTrials(
        sentenceB,
        questionB,
        item.answers,
        item.id,
        "B"
      );

      // In unsere Timeline aufnehmen
      timeline = timeline.concat(trialsA, trialsB);
    });

    // Abschließendes Trial: Dankeschön/Ende
    var EndTrial = {
      type: jsPsychHtmlKeyboardResponse,
      stimulus: `
        <div style="max-width:600px; margin: auto; font-size: 18px;">
          <p>Vielen Dank für Ihre Teilnahme.<br>
          Sie können das Browserfenster jetzt schließen.</p>
        </div>
      `,
      choices: "NO_KEYS",
      data: { trial: "endtrial" }
    };
    timeline.push(EndTrial);

    // Starten des Experiments (nutzt das bereits definierte jsPsych in winograd.html)
    jsPsych.run(timeline);
  })
  .catch(error => {
    console.error("Fehler beim Laden der WSC-JSON:", error);
  });
