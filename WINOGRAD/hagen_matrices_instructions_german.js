// INSTRUCTIONS HAGEN MATRICES --------------------------------------------------------------------------------------
var example1 = {
    type: jsPsychSurveyMultiChoiceImage,
    preamble:
    `<br><br>
    <svg class="statement hidden">
          <filter id="wavy2">
              <feTurbulence x="0" y="0" baseFrequency="0.02" numOctaves="5" seed="1" />
              <feDisplacementMap in="SourceGraphic" scale="20" />
          </filter>
    </svg>
    <div id="parchment" align="justify">
    <div class="instructions" style="max-width:${instructionsWidth}px;">
        Bei dem folgenden Test geht es darum, Regeln in abstrakten Mustern zu erkennen und sie logisch richtig fortzusetzen. 
        Bei jeder Aufgabe ist eine unvollständige Figur zu sehen. Die dargestellten Muster folgen dabei Regeln, die per 
        Spalte, per Zeile und in der Diagonale gelten können. Sie können sich auf die ganze Figur oder nur auf Teile 
        beziehen. Sie können Hinzufügungen (Addition) oder Wegnahmen (Subtraktion) sowie die Ausrichtung von Figuren oder 
        Einzelkomponenten zum Inhalt haben. Wichtig ist, verschiedene Regeln gleichzeitig zu berücksichtigen. Nur eins der 
        sechs Teile ergänzt die Figur richtig.<br>
        Deine Aufgabe besteht darin, die Lösung auszuwählen, das die Figur richtig ergänzt. Für die Bearbeitung der 
        Aufgaben hast du jeweils 2:00 Minuten Zeit.
    </div>
    
    <br>

    <div class="instructions">
       <b> Welche Lösung ergänzt die dargestellte Figur richtig?<br>
        (Bitte anklicken und anschließend auf "weiter" klicken.)</b>
    </div>
    </div>`,
    questions: 
    [
        {
            prompt: `<img src="${imagePath}Example 1ar.png" width=${matrixWidth}><hr>`, 
            options: exampleQuestionOptions1,
            required: true,
            horizontal: true
        }
    ],
    button_label: ['weiter'],
    data: {
        trial: 'example_choice1',
        correctAnswer: 1
    },
    on_finish: function(data) {
        // Entferne unnötige Daten
        delete data.question_order;
    
        // Extrahiere die Antwort
        data.response = data.response['Q0'].match(/(\d+)(?=[^\d]+$)/)[0];
        console.log(data.response);
    
        // Speichere, ob die Antwort korrekt war
        data.correct = data.response == data.correctAnswer;
        console.log("1", data.correct)
    
        // Speichere die Antwort für den Zugriff in solution1
        responseExample1 = data.response;

    }
};

var solution1_incorrect = {
    type: jsPsychSurveyMultiChoiceImage,
    preamble:
    `<br><br>
    <svg class="statement hidden">
          <filter id="wavy2">
              <feTurbulence x="0" y="0" baseFrequency="0.02" numOctaves="5" seed="1" />
              <feDisplacementMap in="SourceGraphic" scale="20" />
          </filter>
    </svg>
    <div id="parchment" align="justify">
    <div class="instructions" style="max-width:${instructionsWidth}px;">
        <span style="color:red;"><b>Das war leider falsch:</b></span><br>
        Die erste Lösung ist die einzige richtige Lösung. Bei dieser Aufgabe besteht die Regel darin, dass die 
        Lage der Linie und des schwarzen Vierecks systematisch variiert: Die Linie dreht sich in jeder Zeile im 
        Uhrzeigersinn und das schwarze Viereck wandert in den Zeilen und Spalten im Uhrzeigersinn. Deshalb muss das 
        Viereck bei dem zu ergänzenden Stück unten in der Mitte sein.<br><br>
        <b>Bitte klicke auf "weiter", um zur nächsten Beispielaufgabe zu gelangen.</b>
    </div>
    </div>`,
    questions: [
        {
            // Der prompt wird später dynamisch angepasst, zunächst ein Platzhalter
            prompt: `<img src="${imagePath}Example 1br.png" width=${matrixWidth}><hr>`,
            options: exampleSolutionOptions1_incorrect,
            required: false,
            horizontal: true
        }
    ],
    button_label: ['weiter'],
    data: { trial: 'example_solution1' },
    on_finish: function(data) {
        data.response['Q0'] ?
            data.response = data.response['Q0'].match(/(\d+)(?=[^\d]+$)/)[0]:
            data.response = null;
        delete data.question_order;
    }
};

var solution1_correct = {
    type: jsPsychSurveyMultiChoiceImage,
    preamble:
    `<br><br>
    <svg class="statement hidden">
          <filter id="wavy2">
              <feTurbulence x="0" y="0" baseFrequency="0.02" numOctaves="5" seed="1" />
              <feDisplacementMap in="SourceGraphic" scale="20" />
          </filter>
    </svg>
    <div id="parchment" align="justify">
    <div class="instructions" style="max-width:${instructionsWidth}px;">
        <span style="color:green;"><b>Das war richtig:</b></span><br>
        Die erste Lösung ist die einzige richtige Lösung. Bei dieser Aufgabe besteht die Regel darin, dass die 
        Lage der Linie und des schwarzen Vierecks systematisch variiert: Die Linie dreht sich in jeder Zeile im 
        Uhrzeigersinn und das schwarze Viereck wandert in den Zeilen und Spalten im Uhrzeigersinn. Deshalb muss das 
        Viereck bei dem zu ergänzenden Stück unten in der Mitte sein.<br><br>
        <b>Bitte klicke auf "weiter", um zur nächsten Beispielaufgabe zu gelangen.</b>
    </div>
    </div>`,
    questions: [
        {
            // Der prompt wird später dynamisch angepasst, zunächst ein Platzhalter
            prompt: `<img src="${imagePath}Example 1br_correct.png" width=${matrixWidth}><hr>`,
            options: exampleSolutionOptions1_correct,
            required: false,
            horizontal: true
        }
    ],
    button_label: ['weiter'],
    data: { trial: 'example_solution1' },
    on_finish: function(data) {
        data.response['Q0'] ?
            data.response = data.response['Q0'].match(/(\d+)(?=[^\d]+$)/)[0]:
            data.response = null;
        delete data.question_order;
    }
};

var example1conditional_correct = {
    timeline: [solution1_correct],
    conditional_function: function() {
        // Zugriff auf die Daten des letzten Trials
        var lastTrialData = jsPsych.data.get().last(1).values()[0];
        console.log("2", lastTrialData.correct)
        // Überprüfe, ob die letzte Antwort korrekt war
        if (lastTrialData.correct === true) {
            return true; // Führe den korrekten Lösungs-Trial aus, wenn die letzte Antwort korrekt war
        } else {
            return false; // Überspringe diesen Trial, wenn die letzte Antwort nicht korrekt war
        }
    }
};


var example1conditional_incorrect = {
    timeline: [solution1_incorrect],
    conditional_function: function() {
        // Zugriff auf die Daten des letzten Trials
        var lastTrialData = jsPsych.data.get().last(1).values()[0];
        console.log("3", lastTrialData.correct)
        // Überprüfe, ob die letzte Antwort falsch war
        if (lastTrialData.correct === false) {
            return true; // Führe den inkorrekten Lösungs-Trial aus, wenn die letzte Antwort falsch war
        } else {
            return false; // Überspringe diesen Trial, wenn die letzte Antwort korrekt war
        }
    }
};


var example2 = {
    type: jsPsychSurveyMultiChoiceImage,
    preamble:
    `<br><br>
    <svg class="statement hidden">
          <filter id="wavy2">
              <feTurbulence x="0" y="0" baseFrequency="0.02" numOctaves="5" seed="1" />
              <feDisplacementMap in="SourceGraphic" scale="20" />
          </filter>
    </svg>
    <div id="parchment" align="justify">
    <div class="instructions">
        <b>Welche Lösung ergänzt die dargestellte Figur richtig?<br>
        (Bitte anklicken und anschließend auf "weiter" klicken.)</b>
    </div>
    </div>`,
    questions: 
    [
        {
            prompt: `<img src="${imagePath}Example 2r.png" width=${matrixWidth}><hr>`, 
            options: exampleQuestionOptions2, 
            required: true,
            horizontal: true
        }
    ],
    button_label: ['weiter'],
    data: {
        trial: 'example_choice2',
        correctAnswer: 4
    },
    on_finish: function(data) {
        delete data.question_order;
        data.response = data.response['Q0'].match(/(\d+)(?=[^\d]+$)/)[0];
        data.correct = data.response == data.correctAnswer;
    }
};

var solution2_incorrect = {
    type: jsPsychSurveyMultiChoiceImage,
    preamble:
    `<br><br>
    <svg class="statement hidden">
          <filter id="wavy2">
              <feTurbulence x="0" y="0" baseFrequency="0.02" numOctaves="5" seed="1" />
              <feDisplacementMap in="SourceGraphic" scale="20" />
          </filter>
    </svg>
    <div id="parchment" align="justify">
    <div class="instructions" style="max-width:${instructionsWidth}px;">
        <span style="color:red;"><b>Das war leider falsch:</b></span><br>
        Die 4. Lösung ist die einzige richtige Lösung. Bei dieser Aufgabe muss man in jeder Zeile eine Subtraktion 
        durchführen. Die Elemente, die an zweiter Stelle stehen, werden jeweils von den Elementen der ersten Spalte 
        abgezogen. In der dritten Spalte müssen somit die Elemente vorhanden sein, die sich in der ersten Spalte 
        befinden, in der zweiten jedoch nicht. Der quadratische Rahmen ist ausgenommen und wird beibehalten.<br>
        Bitte klicke auf "weiter", um zur ersten Aufgabe zu gelangen.
    </div>
    </div>`,
    questions: 
    [
        {
            prompt: `<img src="${imagePath}Example 2r_incorrect.png" width=${matrixWidth}><hr>`, 
            options: exampleSolutionOptions2_incorrect,
            required: false,
            horizontal: true
        }
    ],
    button_label: ['weiter'],
    data: { trial: 'example_solution2' },
    on_finish: function(data) {
        data.response['Q0'] ?
            data.response = data.response['Q0'].match(/(\d+)(?=[^\d]+$)/)[0]:
            data.response = null;

        delete data.question_order;
    }
};

var solution2_correct = {
    type: jsPsychSurveyMultiChoiceImage,
    preamble:
    `<br><br>
    <svg class="statement hidden">
          <filter id="wavy2">
              <feTurbulence x="0" y="0" baseFrequency="0.02" numOctaves="5" seed="1" />
              <feDisplacementMap in="SourceGraphic" scale="20" />
          </filter>
    </svg>
    <div id="parchment" align="justify">
    <div class="instructions" style="max-width:${instructionsWidth}px;">
        <span style="color:green;"><b>Das war richtig:</b></span><br>
        Die 4. Lösung ist die einzige richtige Lösung. Bei dieser Aufgabe muss man in jeder Zeile eine Subtraktion 
        durchführen. Die Elemente, die an zweiter Stelle stehen, werden jeweils von den Elementen der ersten Spalte 
        abgezogen. In der dritten Spalte müssen somit die Elemente vorhanden sein, die sich in der ersten Spalte 
        befinden, in der zweiten jedoch nicht. Der quadratische Rahmen ist ausgenommen und wird beibehalten.<br>
        Bitte klicke auf "weiter", um zur ersten Aufgabe zu gelangen.
    </div>
    </div>`,
    questions: 
    [
        {
            prompt: `<img src="${imagePath}Example 2r_correct.png" width=${matrixWidth}><hr>`, 
            options: exampleSolutionOptions2_correct,
            required: false,
            horizontal: true
        }
    ],
    button_label: ['weiter'],
    data: { trial: 'example_solution2' },
    on_finish: function(data) {
        data.response['Q0'] ?
            data.response = data.response['Q0'].match(/(\d+)(?=[^\d]+$)/)[0]:
            data.response = null;

        delete data.question_order;
    }
};

var example2conditional_correct = {
    timeline: [solution2_correct],
    conditional_function: function() {
        // Zugriff auf die Daten des letzten Trials
        var lastTrialData = jsPsych.data.get().last(1).values()[0];
        console.log("2", lastTrialData.correct)
        // Überprüfe, ob die letzte Antwort korrekt war
        if (lastTrialData.correct === true) {
            return true; // Führe den korrekten Lösungs-Trial aus, wenn die letzte Antwort korrekt war
        } else {
            return false; // Überspringe diesen Trial, wenn die letzte Antwort nicht korrekt war
        }
    }
};


var example2conditional_incorrect = {
    timeline: [solution2_incorrect],
    conditional_function: function() {
        // Zugriff auf die Daten des letzten Trials
        var lastTrialData = jsPsych.data.get().last(1).values()[0];
        console.log("3", lastTrialData.correct)
        // Überprüfe, ob die letzte Antwort falsch war
        if (lastTrialData.correct === false) {
            return true; // Führe den inkorrekten Lösungs-Trial aus, wenn die letzte Antwort falsch war
        } else {
            return false; // Überspringe diesen Trial, wenn die letzte Antwort korrekt war
        }
    }
};

var finalInstructions = {
    type: jsPsychHtmlButtonResponse,
    stimulus: 
    `<br><br>
    <svg class="statement hidden">
          <filter id="wavy2">
              <feTurbulence x="0" y="0" baseFrequency="0.02" numOctaves="5" seed="1" />
              <feDisplacementMap in="SourceGraphic" scale="20" />
          </filter>
    </svg>
    <div id="parchment" align="justify">
    <div class="instructions" style="max-width:${instructionsWidth}px;">
        Es folgen nun 20 Aufgaben.<br>
        Markiere die nach deiner Meinung richtige Lösung und klicke dann auf "weiter". Für jede Aufgabe 
        hast du <b>2:00 Minuten</b> Zeit zur Beantwortung. Nach dieser Zeit wird automatisch die nächste 
        Aufgabe gezeigt.<br><br>
        <b>Viel Erfolg!<b>
    </div>
    </div>
    <br>`,
  choices: ['weiter'],
  data: { trial: 'instructions' }
};

var finalScore = {
    type: jsPsychHtmlButtonResponse,
    stimulus: function() {
        // Get all matrix responses
        var matrixResponses = jsPsych.data.get().filterCustom(function(trial){
            return trial.trial === 'matrix';
        })
        
        matrixResponses = matrixResponses.trials.map(({ correct }) => correct);
        sumscore = matrixResponses.filter(Boolean).length

        stim =
        `<br><br>
        <div class="instructions" style="max-width:${instructionsWidth}px;">
            Du hast ${sumscore} von 20 Aufgaben richtig beantwortet.
        </div>
        <br><br>`

        return(stim);
    },
    choices: ['ok'],
    data: { trial: 'score' }
};