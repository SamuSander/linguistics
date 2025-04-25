// winograd-schema-plugin.js
var jsPsychWinogradSchema = (function (jspsych) {
  'use strict';

  const info = {
    name: "winograd-schema",
    parameters: {
      // Context Satz
      context: {
        type: jspsych.ParameterType.STRING,
        pretty_name: 'Context sentence',
        default: undefined,
        description: 'The context part of the Winograd schema.'
      },
      // Pronomen-Teil
      pronoun: {
        type: jspsych.ParameterType.STRING,
        pretty_name: 'Pronoun phrase',
        default: undefined,
        description: 'The ambiguous pronoun phrase.'
      },
      // Disambiguierungsphrase
      disambiguation: {
        type: jspsych.ParameterType.STRING,
        pretty_name: 'Disambiguation phrase',
        default: undefined,
        description: 'The disambiguating phrase that resolves the ambiguity.'
      },
      // Frage für den Teilnehmer
      question: {
        type: jspsych.ParameterType.STRING,
        pretty_name: 'Question',
        default: undefined,
        description: 'The question to ask the participant about the pronoun reference.'
      },
      // Antwortalternativen
      choices: {
        type: jspsych.ParameterType.STRING,
        pretty_name: 'Choices',
        array: true,
        default: undefined,
        description: 'The answer choices for the participant.'
      },
      // Korrekte Antwort (Index 0 oder 1)
      correct_choice: {
        type: jspsych.ParameterType.INT,
        pretty_name: 'Correct choice index',
        default: 0,
        description: 'The index of the correct answer (0 or 1).'
      },
      // Kontext-Anzeigedauer
      context_duration: {
        type: jspsych.ParameterType.INT,
        pretty_name: 'Context duration',
        default: 3000,
        description: 'How long to show the context part (in milliseconds).'
      },
      // Pronomen-Anzeigedauer
      pronoun_duration: {
        type: jspsych.ParameterType.INT,
        pretty_name: 'Pronoun duration',
        default: 2000,
        description: 'How long to show the pronoun part (in milliseconds).'
      },
      // Disambiguierungs-Anzeigedauer
      disambiguation_duration: {
        type: jspsych.ParameterType.INT,
        pretty_name: 'Disambiguation duration',
        default: 2000,
        description: 'How long to show the disambiguation part (in milliseconds).'
      },
      // Antwort-Zeitlimit
      response_duration: {
        type: jspsych.ParameterType.INT,
        pretty_name: 'Response duration',
        default: 3000,
        description: 'Time limit for the response (in milliseconds).'
      },
      // Text für zu langsam-Warnung
      slow_message: {
        type: jspsych.ParameterType.STRING,
        pretty_name: 'Slow response message',
        default: "Zu langsam geantwortet.<br>Bitte versuchen Sie, schneller zu reagieren.",
        description: 'Message to display when the participant responds too slowly.'
      },
      // Dauer der zu langsam-Warnung
      slow_message_duration: {
        type: jspsych.ParameterType.INT,
        pretty_name: 'Slow message duration',
        default: 2000,
        description: 'How long to show the slow response message (in milliseconds).'
      },
      // Schema-ID
      schema_id: {
        type: jspsych.ParameterType.STRING,
        pretty_name: 'Schema ID',
        default: undefined,
        description: 'ID of the Winograd schema for data tracking.'
      },
      // Variante (A oder B)
      variant: {
        type: jspsych.ParameterType.STRING,
        pretty_name: 'Schema variant',
        default: undefined,
        description: 'Variant of the schema (A or B).'
      }
    }
  };

  /**
   * **winograd-schema**
   *
   * jsPsych plugin for Winograd schema resolution task
   *
   */
  class WinogradSchemaPlugin {
    constructor(jsPsych) {
      this.jsPsych = jsPsych;
    }

    trial(display_element, trial) {
      // Definiere Styling einmal, damit es nicht mehrfach wiederholt werden muss
      const stimulusStyle = 'font-size:32px; max-width:80%; margin:0 auto; min-height:100px;';
      const questionStyle = 'font-size:24px; margin:20px 0;';
      const buttonContainerStyle = 'display:flex; justify-content:center; flex-wrap:wrap; margin-top:20px;';
      const buttonStyle = 'margin:0 10px 10px 10px; padding:10px 20px; font-size:18px; min-width:150px;';
      
      // Schritt 1: Kontext anzeigen
      let html = `<div id="winograd-stimulus" style="${stimulusStyle}">${trial.context}</div>`;
      display_element.innerHTML = html;
      
      // Daten für aktuelle Phase speichern
      this.current_part = 'context';
      
      // Als nächstes -> Pronomen anzeigen
      this.jsPsych.pluginAPI.setTimeout(() => {
        this.showPronounPhase(display_element, trial, stimulusStyle);
      }, trial.context_duration);
    }
    
    showPronounPhase(display_element, trial, stimulusStyle) {
      display_element.innerHTML = `<div id="winograd-stimulus" style="${stimulusStyle}">${trial.pronoun}</div>`;
      this.current_part = 'pronoun';
      
      // Als nächstes -> Disambiguierung anzeigen
      this.jsPsych.pluginAPI.setTimeout(() => {
        this.showDisambiguationPhase(display_element, trial, stimulusStyle);
      }, trial.pronoun_duration);
    }
    
    showDisambiguationPhase(display_element, trial, stimulusStyle) {
      display_element.innerHTML = `<div id="winograd-stimulus" style="${stimulusStyle}">${trial.disambiguation}</div>`;
      this.current_part = 'disambiguation';
      
      // Als nächstes -> Frage und Antwortmöglichkeiten anzeigen
      this.jsPsych.pluginAPI.setTimeout(() => {
        this.showResponsePhase(display_element, trial);
      }, trial.disambiguation_duration);
    }
    
    showResponsePhase(display_element, trial) {
      this.current_part = 'response';
      const start_time = performance.now();
      
      // Bereite das HTML für die Antwortphase vor
      const questionStyle = 'font-size:24px; margin:20px 0;';
      const buttonContainerStyle = 'display:flex; justify-content:center; flex-wrap:wrap; margin-top:20px;';
      const buttonStyle = 'margin:0 10px 10px 10px; padding:10px 20px; font-size:18px; min-width:150px;';
      
      let html = `
        <div id="winograd-question" style="${questionStyle}">${trial.question}</div>
        <div id="winograd-buttons" style="${buttonContainerStyle}">`;
      
      // Füge Antwortbuttons hinzu
      for (let i = 0; i < trial.choices.length; i++) {
        html += `
          <button class="jspsych-btn" id="jspsych-winograd-button-${i}" 
                  data-choice="${i}" style="${buttonStyle}">
            ${trial.choices[i]}
          </button>`;
      }
      
      html += `</div>`;
      display_element.innerHTML = html;
      
      // Variable für Response-Tracking
      let response = {
        rt: null,
        button: null,
        correct: null
      };
      
      // Event-Listener für Antwortbuttons
      for (let i = 0; i < trial.choices.length; i++) {
        display_element.querySelector(`#jspsych-winograd-button-${i}`).addEventListener('click', (e) => {
          const choice = parseInt(e.currentTarget.getAttribute('data-choice'));
          after_response(choice);
        });
      }
      
      // Funktion zum Verarbeiten der Antwort
      const after_response = (choice) => {
        // Reaktionszeit berechnen
        const end_time = performance.now();
        const rt = Math.round(end_time - start_time);
        
        // Daten speichern
        response.button = choice;
        response.rt = rt;
        response.correct = (choice === trial.correct_choice) ? 1 : 0;
        
        // Timeout löschen, falls vorhanden
        this.jsPsych.pluginAPI.clearAllTimeouts();
        
        // Trial beenden
        end_trial();
      };
      
      // Timeout für zu langsame Antworten
      if (trial.response_duration !== null) {
        this.jsPsych.pluginAPI.setTimeout(() => {
          // Wenn keine Antwort gegeben wurde, zeige die "zu langsam"-Nachricht
          if (response.rt === null) {
            display_element.innerHTML = `
              <div style="color:red; font-size:24px; text-align:center;">
                ${trial.slow_message}
              </div>`;
            
            // Kurz die Warnung anzeigen, dann Trial beenden
            this.jsPsych.pluginAPI.setTimeout(() => {
              end_trial();
            }, trial.slow_message_duration);
          }
        }, trial.response_duration);
      }
      
      // Funktion zum Beenden des Trials
      const end_trial = () => {
        // Timeouts löschen
        this.jsPsych.pluginAPI.clearAllTimeouts();
        
        // Daten sammeln
        const trial_data = {
          schema_id: trial.schema_id,
          variant: trial.variant,
          rt: response.rt,
          button: response.button,
          correct: response.correct,
          correct_choice: trial.correct_choice,
          selected_answer: response.button !== null ? trial.choices[response.button] : null,
          correct_answer: trial.choices[trial.correct_choice]
        };
        
        // Display leeren
        display_element.innerHTML = '';
        
        // Trial beenden und Daten zurückgeben
        this.jsPsych.finishTrial(trial_data);
      };
    }
    
    simulate(trial, simulation_mode, simulation_options, load_callback) {
      if (simulation_mode == "data-only") {
        load_callback();
        this.simulate_data_only(trial, simulation_options);
      }
      if (simulation_mode == "visual") {
        this.simulate_visual(trial, simulation_options, load_callback);
      }
    }
    
    simulate_data_only(trial, simulation_options) {
      const default_data = {
        schema_id: trial.schema_id,
        variant: trial.variant,
        rt: this.jsPsych.randomization.sampleExGaussian(1500, 300, 0.01, true),
        button: trial.correct_choice,
        correct: 1,
        correct_choice: trial.correct_choice,
        selected_answer: trial.choices[trial.correct_choice], 
        correct_answer: trial.choices[trial.correct_choice]
      };
      
      // Möglicher Fehler in der Simulation
      if (simulation_options && simulation_options.simulate_error && Math.random() < simulation_options.error_probability) {
        default_data.button = trial.correct_choice === 0 ? 1 : 0;
        default_data.correct = 0;
        default_data.selected_answer = trial.choices[default_data.button];
      }
      
      // Daten zusammenführen
      const data = this.jsPsych.pluginAPI.mergeSimulationData(default_data, simulation_options);
      
      // Trial beenden
      this.jsPsych.finishTrial(data);
    }
    
    simulate_visual(trial, simulation_options, load_callback) {
      let choice;
      const correct_response = trial.correct_choice;
      
      // Simuliere mögliche Fehler
      if (simulation_options && simulation_options.simulate_error && Math.random() < simulation_options.error_probability) {
        choice = (correct_response === 0) ? 1 : 0;
      } else {
        choice = correct_response;
      }
      
      // Starte die visuelle Simulation
      this.trial(this.jsPsych.getDisplayElement(), trial, load_callback);
      
      // Simuliere den Schritt-für-Schritt-Prozess
      this.jsPsych.pluginAPI.setTimeout(() => {
        // Nach dem Kontext kommt automatisch das Pronomen...
        
        this.jsPsych.pluginAPI.setTimeout(() => {
          // Nach dem Pronomen kommt automatisch die Disambiguierung...
          
          this.jsPsych.pluginAPI.setTimeout(() => {
            // Simuliere das Klicken auf den Antwortbutton
            const button = this.jsPsych.getDisplayElement().querySelector(`#jspsych-winograd-button-${choice}`);
            if (button) {
              this.jsPsych.pluginAPI.clickTarget(button);
            }
          }, trial.disambiguation_duration + 500); // Zusätzliche 500ms für realistischeres Antwortverhalten
          
        }, trial.pronoun_duration);
        
      }, trial.context_duration);
    }
  }
  
  WinogradSchemaPlugin.info = info;

  return WinogradSchemaPlugin;
})(jsPsychModule);

// winograd.js - Verwendet das neue Plugin

// Lade die Winograd-Schema-Daten
const winogradSchemas = [
  {
    id: "1",
    context: "Die Stadtratsmitglieder verweigerten den Demonstranten eine Genehmigung, ",
    pronoun: "weil sie ",
    disambiguationA: "Gewalt befürchteten.",
    disambiguationB: "Gewalt befürworteten.",
    questionA: "Wer befürchtete Gewalt?",
    questionB: "Wer befürwortete Gewalt?",
    choices: ["Die Stadtratsmitglieder", "Die Demonstranten"],
    correctA: 0,
    correctB: 1
  },
  {
    id: "2",
    context: "Die Trophäe passt nicht in den braunen Koffer, ",
    pronoun: "weil sie zu ",
    disambiguationA: "klein ist.",
    disambiguationB: "groß ist.",
    questionA: "Was ist zu klein?",
    questionB: "Was ist zu groß?",
    choices: ["Der Koffer", "Die Trophäe"],
    correctA: 0,
    correctB: 1
  },
  {
    id: "3",
    context: "Joan achtete darauf, Susan für all die Hilfe zu danken, ",
    pronoun: "die sie ",
    disambiguationA: "gegeben hatte.",
    disambiguationB: "erhalten hatte.",
    questionA: "Wer hatte Hilfe gegeben?",
    questionB: "Wer hatte Hilfe erhalten?",
    choices: ["Susan", "Joan"],
    correctA: 0,
    correctB: 1
  },
  {
    id: "4",
    context: "Paul versuchte, George anzurufen, ",
    pronoun: "aber er war nicht ",
    disambiguationA: "erfolgreich.",
    disambiguationB: "verfügbar.",
    questionA: "Wer war nicht erfolgreich?",
    questionB: "Wer war nicht verfügbar?",
    choices: ["Paul", "George"],
    correctA: 0,
    correctB: 1
  },
  {
    id: "5",
    context: "Der Anwalt stellte dem Zeugen eine Frage, aber er war zögerlich, ",
    pronoun: "sie zu ",
    disambiguationA: "beantworten.",
    disambiguationB: "wiederholen.",
    questionA: "Wer war zögerlich, die Frage zu beantworten?",
    questionB: "Wer war zögerlich, die Frage zu wiederholen?",
    choices: ["Der Zeuge", "Der Anwalt"],
    correctA: 0,
    correctB: 1
  },
  {
    id: "6",
    context: "Der Lieferwagen raste am Schulbus vorbei, ",
    pronoun: "weil er so ",
    disambiguationA: "schnell fuhr.",
    disambiguationB: "langsam fuhr.",
    questionA: "Was fuhr so schnell?",
    questionB: "Was fuhr so langsam?",
    choices: ["Der Lieferwagen", "Der Bus"],
    correctA: 0,
    correctB: 1
  },
  {
    id: "7",
    context: "Frank fühlte sich ",
    pronoun: "",
    disambiguationA: "rehabilitiert, als sein langjähriger Rivale Bill offenbarte, dass er der Gewinner des Wettbewerbs war.",
    disambiguationB: "zerknirscht, als sein langjähriger Rivale Bill offenbarte, dass er der Gewinner des Wettbewerbs war.",
    questionA: "Wer war der Gewinner des Wettbewerbs?",
    questionB: "Wer war der Gewinner des Wettbewerbs?",
    choices: ["Frank", "Bill"],
    correctA: 0,
    correctB: 1
  },
  {
    id: "8",
    context: "Der Mann konnte seinen Sohn nicht hochheben, ",
    pronoun: "weil er so ",
    disambiguationA: "schwach war.",
    disambiguationB: "schwer war.",
    questionA: "Wer war schwach?",
    questionB: "Wer war schwer?",
    choices: ["Der Mann", "Der Sohn"],
    correctA: 0,
    correctB: 1
  },
  {
    id: "9",
    context: "Der große Ball krachte direkt durch den Tisch, ",
    pronoun: "weil er aus ",
    disambiguationA: "Stahl gemacht war.",
    disambiguationB: "Styropor gemacht war.",
    questionA: "Was war aus Stahl gemacht?",
    questionB: "Was war aus Styropor gemacht?",
    choices: ["Der Ball", "Der Tisch"],
    correctA: 0,
    correctB: 1
  },
  {
    id: "10",
    context: "John konnte die Bühne nicht sehen, weil Billy vor ihm stand ",
    pronoun: "und er so ",
    disambiguationA: "klein ist.",
    disambiguationB: "groß ist.",
    questionA: "Wer ist so klein?",
    questionB: "Wer ist so groß?",
    choices: ["John", "Billy"],
    correctA: 0,
    correctB: 1
  }
];

// Winograd-Timeline erstellen
var winogradTimeline = [];

// Instruktionen für Winograd-Schema-Aufgabe
const winogradInstructions = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
    <div class="instructions" style="max-width:900px;">
      <h2>Sprachverständnis im Alltag</h2>
      <p>In diesem Teil des Experiments werden wir testen, wie Sie sprachliche Mehrdeutigkeiten auflösen.</p>
      <p>Sie werden kurze Sätze sehen, die in mehreren Teilen präsentiert werden:</p>
      <ul style="text-align: left; margin: 0 auto;">
        <li>Zuerst sehen Sie einen <strong>Kontext</strong></li>
        <li>Dann folgt ein <strong>Pronomen</strong> (z.B. "weil sie")</li>
        <li>Schließlich wird ein <strong>disambiguierender Satzteil</strong> gezeigt</li>
      </ul>
      <p>Nach jedem Satz werden Sie gefragt, <strong>worauf sich das Pronomen bezieht</strong>.</p>
      <p>Bitte antworten Sie so schnell wie möglich. Sie haben jeweils <strong>maximal 3 Sekunden</strong> Zeit für Ihre Antwort.</p>
      <p>Wenn Sie bereit sind, klicken Sie auf "Starten".</p>
    </div>
  `,
  choices: ["Starten"],
  data: { trial: "winograd_instructions" }
};

// Übungsbeispiel
const practiceExample = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
    <div class="instructions" style="max-width:900px;">
      <h3>Beispiel</h3>
      <p>Hier ist ein Beispiel, wie die Aufgabe ablaufen wird:</p>
      <div style="margin: 20px; padding: 10px; border: 1px solid #ccc; background-color: #f9f9f9;">
        <p style="font-size:24px;">Die Stadtratsmitglieder verweigerten den Demonstranten eine Genehmigung, </p>
        <p style="font-size:24px;">weil sie </p>
        <p style="font-size:24px;">Gewalt befürchteten.</p>
      </div>
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

// Füge Instruktionen und Übungsbeispiel zur Timeline hinzu
winogradTimeline.push(winogradInstructions);
winogradTimeline.push(practiceExample);

// Wähle 20 zufällige Schemas aus (oder alle, wenn weniger als 20 vorhanden)
const selectedSchemas = jsPsych.randomization.sampleWithoutReplacement(winogradSchemas, 
                                           Math.min(20, winogradSchemas.length));

// Erstelle Trials für jedes ausgewählte Schema
selectedSchemas.forEach(schema => {
  // Zufällig Variante A oder B auswählen
  const variant = Math.random() < 0.5 ? 'A' : 'B';
  
  // Text und Frage je nach Variante
  const disambiguation = variant === 'A' ? schema.disambiguationA : schema.disambiguationB;
  const question = variant === 'A' ? schema.questionA : schema.questionB;
  const correct_choice = variant === 'A' ? schema.correctA : schema.correctB;
  
  // Erstelle den Trial
  const trial = {
    type: jsPsychWinogradSchema,
    context: schema.context,
    pronoun: schema.pronoun,
    disambiguation: disambiguation,
    question: question,
    choices: schema.choices,
    correct_choice: correct_choice,
    schema_id: schema.id,
    variant: variant,
    // Standardwerte für Zeitintervalle
    context_duration: 3000,
    pronoun_duration: 2000,
    disambiguation_duration: 2000,
    response_duration: 3000,
    // Daten
    data: {
      task: 'winograd',
      schema_id: schema.id,
      variant: variant
    },
    on_finish: function(data) {
      console.log(`Schema ${schema.id} abgeschlossen. Korrekt: ${data.correct}, RT: ${data.rt}ms`);
    }
  };
  
  // Füge den Trial zur Timeline hinzu
  winogradTimeline.push(trial);
});

// Abschluss zur Timeline hinzufügen
winogradTimeline.push(winogradComplete);

// Die Haupttimeline-Komponente für das Experiment
var winogradTrials = {
  timeline: winogradTimeline
};

console.log("Winograd-Timeline erstellt mit", winogradTimeline.length, "Trials");