// INSTRUCTIONS
var example1 = {
    type: jsPsychSurveyMultiChoiceImage,
    preamble:
    '<br><br>' +
        `<div class="instructions" style="max-width:${instructionsWidth}px;">` + 
        'Sehr geehrte:r Teilnehmer:in,<br><br>' +
        'bei dem folgenden Test geht es darum, Regeln in abstrakten Mustern zu erkennen und sie logisch richtig fortzusetzen. Bei jeder Aufgabe ' +
        'ist eine unvollst&auml;ndige Figur zu sehen. Die dargestellten Muster folgen dabei Regeln, die per Spalte, per Zeile und in der Diagonale gelten ' + 
        'k&ouml;nnen. Sie k&ouml;nnen sich auf die ganze Figur oder nur auf Teile beziehen. Sie k&ouml;nnen Hinzuf&uuml;gungen (Addition) oder Wegnahmen ' + 
        '(Subtraktion) sowie die Ausrichtung von Figuren oder Einzelkomponenten zum Inhalt haben. Wichtig ist, verschiedene Regeln gleichzeitig zu ' + 
        'ber&uuml;cksichtigen. Nur eins der sechs Teile erg&auml;nzt die Figur richtig.<br>' +
        'Ihre Aufgabe besteht darin, die L&ouml;sung auszuw&auml;hlen, das die Figur richtig erg&auml;nzt. F&uuml;r die Bearbeitung der Aufgaben haben ' + 
        'Sie jeweils 2:00 Minuten Zeit.' + 
        '</div>' +
        '<br>' +

        '<div class="instructions">' +
            'Welche L&ouml;sung erg&auml;nzt die dargestellte Figur richtig?<br>' +
            '(Bitte anklicken und anschlie&szlig;end auf "Weiter" klicken.)' +
        '</div>',
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
        // There is only one question, so we don't need to record the question order. That makes the data cleaner.
        delete data.question_order;

        // Clean up response (response currently record the image path of the option chosen)
        // The response is recorded as Q0, because there is only one question.
        // We extract the last number in the string, which indicates the response option number.
        data.response = data.response['Q0'].match(/(\d+)(?=[^\d]+$)/)[0];

        // Record whether the participant answered correctly.
        data.correct = data.response == data.correctAnswer;
    }
};

var solution1 = {
    type: jsPsychSurveyMultiChoiceImage,
    preamble:
    '<br><br>' +
        `<div class="instructions" style="max-width:${instructionsWidth}px;">` + 
            'L&ouml;sung:<br>' +
            'Die erste L&ouml;sung ist die einzige richtige L&ouml;sung. Bei dieser Aufgabe besteht die Regel darin, dass die Lage der Linie ' + 
            'und des schwarzen Vierecks systematisch variiert: Die Linie dreht sich in jeder Zeile im Uhrzeigersinn und das schwarze ' + 
            'Viereck wandert in den Zeilen und Spalten im Uhrzeigersinn. Deshalb muss das Viereck bei dem zu erg&auml;nzenden St&uuml;ck unten in ' + 
            'der Mitte sein.<br>' +
            'Bitte klicken Sie auf "Weiter", um zur n&auml;chsten Beispielaufgabe zu gelangen.' + 
        '</div>',
    questions: 
    [
        {
            prompt: `<img src="${imagePath}Example 1br.png" width=${matrixWidth}><hr>`,  
            options: exampleSolutionOptions1,
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

var example2 = {
    type: jsPsychSurveyMultiChoiceImage,
    preamble:
    '<br><br>' +
        '<div class="instructions">' +
            'Welche L&ouml;sung erg&auml;nzt die dargestellte Figur richtig?<br>' +
            '(Bitte anklicken und anschlie&szlig;end auf "Weiter" klicken.)' +
        '</div>',
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

var solution2 = {
    type: jsPsychSurveyMultiChoiceImage,
    preamble:
    '<br><br>' +
        `<div class="instructions" style="max-width:${instructionsWidth}px;">` +
            'L&ouml;sung:<br>' +
            'Die 4. L&ouml;sung ist die einzige richtige L&ouml;sung. Bei dieser Aufgabe muss man in jeder Zeile eine Subtraktion ' + 
            'durchf&uuml;hren. Die Elemente, die an zweiter Stelle stehen, werden jeweils von den Elementen der ersten Spalte abgezogen. ' + 
            'In der dritten Spalte m&uuml;ssen somit die Elemente vorhanden sein, die sich in der ersten Spalte befinden, in der zweiten jedoch ' + 
            'nicht. Der quadratische Rahmen ist ausgenommen und wird beibehalten.<br>' + 
            'Bitte klicken Sie auf "Weiter", um zur ersten Aufgabe zu gelangen.' +
        '</div>',
    questions: 
    [
        {
            prompt: `<img src="${imagePath}Example 2r.png" width=${matrixWidth}><hr>`, 
            options: exampleSolutionOptions2,
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

var finalInstructions = {
  type: jsPsychHtmlButtonResponse,
  stimulus: 
  
  '<br><br>' +
  `<div class="instructions" style="max-width:${instructionsWidth}px;">` + 
    'Es folgen nun 20 Aufgaben.<br>' +
    'Markieren Sie die nach Ihrer Meinung richtige L&ouml;sung und klicken Sie auf den "Weiter". F&uuml;r jede Aufgabe haben Sie <b>2:00 ' + 
    'Minuten</b> Zeit zur Beantwortung. Nach dieser Zeit wird automatisch die n&auml;chste Aufgabe gezeigt.<br><br>' +
    '<b>Viel Erfolg!<b>' + 
  '</div>',
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
        '<br><br>' +
        `<div class="instructions" style="max-width:${instructionsWidth}px;">` + 
          `Du hast ${sumscore} von 20 Aufgaben richtig beantwortet.` + 
        '</div>' +
        '<br><br>'

        return(stim);
    },
    choices: ['ok'],
    data: { trial: 'score' }
};