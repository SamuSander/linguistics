
// Define word lists
var man = [
    "woman",
    "husband",
    "uncle",
    "lady",
    "mouse",
    "male",
    "father",
    "strong",
    "friend",
    "beard",
    "person",
    "handsome",
];
var spider = [
    "web",
    "insect",
    "bug",
    "fright",
    "fly",
    "arachnid",
    "crawl",
    "tarantula",
    "poison",
    "bite",
    "creepy",
    "animal",
];

var lists = [
    { name: "man", words: man },
    { name: "spider", words: spider },
];

// Randomize the order of lists
lists = jsPsych.randomization.shuffle(lists);

// create timeline
var timeline = [];

var participantID = jsPsych.randomization.randomID(6).toUpperCase();

// Define the welcome screen
var welcome = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `<br><br>
    <div class="instructions" style="max-width:${instructionsWidth}px;">
        <img src="pics/zi_logo.svg" width="200" style="display: block; margin:0 auto;"></img><br><br> 
        <p>Willkommen.<br>
        Danke, dass Sie sich die Zeit nehmen, an unserem Experiment teilzunehmen.</p>
        <p>Wir beginnen heute mit dem ersten Teil des Experimentes.</p>
        <p>Wenn Sie auf 'Weiter' drücken, werden Sie als erstes über das Experiment informiert.<br>
        Darüberhinaus werden wir Ihnen die <b>Einverständniserklärung</b> vorlegen. Bitte lesen Sie diese sorgfälltig. Nur, wenn Sie Ihr Einverständnis bestätigen können Sie an diesem Experiment teilnehmen.<br>
        Im nachfolgenden Schritt fragen wir einige demographischen Daten ab, welche für die Datenauswertung Relevanz haben.</p>
        <p>Im Hauptteil dieses Online-Experiments werden wir Ihre Gedächtnisleistung in 6 Teilaufgaben überprüfen.
        Zuerst werden Sie einen Reaktionsschnelligkeitstest durchlaufen. Daraufhin werden wir Ihnen eine Reihe
        von Begriffen zeigen und bitten SIe, sich diese zu merken. Anschließend erwartet Sie ein Test zur Vervollständigung 
        von Matrizen, sowie zwei Aufgaben zum Aufrufen der eingeprägten Begriffe und einem Wortflüssigkeitstest.</p>
        <p>Klicken Sie auf 'Weiter' sobald Sie bereit sind.</p>
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
        jsPsych.data.addProperties({'participantID': participantID});
      }
};
timeline.push(welcome);

sendId(
    "drm_config", participantID, 
    {
      'participantID': participantID,
      'status': "started Online-Experiment"
    }
 )

timeline.push(consentForm);

timeline.push(demographics); 

// PVT
// INSTRUCTIONS
var pvtStartScreen = {
    type: jsPsychInstructions,
    pages: 
    [
    `<br><br>
    <div class="instructions" style="max-width:${instructionsWidth}px;"> 
        <p>Die Datenerfassung ist abgeschlossen.<br>
        Dankeschön, dass Sie an unserem Experiment teilnehmen.</p>
        <p>Im ersten Teil dieses Experiments werden wir Ihre Aufmerksamkeit testen.</p> 
        Eine <b>Stoppuhr</b> in der Mitte des Bildschirms wird irgendwann beginnen, rasch hochzuzählen. 
        Wenn das passiert, ist es Ihre Aufgabe, so schnell wie möglich die <b>Leertaste zu drücken. 
        Bitte verwenden Sie Ihre dominante Hand</b> (die Hand, mit der Sie normalerweise schreiben). 
        Dann stoppt die Uhr, und Ihre Reaktionszeit wird für einen kurzen Moment angezeigt.
    </div>
    <br><br>`,
    
    `<br><br>
    <div class="instructions" style="max-width:${instructionsWidth}px;"> 
        <b>Sie müssen die Uhr innerhalb von ${lapseTime/1000} s stoppen</b>, aber "übermenschliche" 
        Reaktionszeiten unter ${prematureTime/1000} s zählen ebenfalls als Fehler. 
        <p style="color:#8B0000"><b>Zu viele Fehler führen zum Ausschluss von der Studie!</b></p>
        Aber keine Sorge, wenn Sie die Leertaste drücken, sobald die Uhr beginnt hochzuzählen, 
        werden Sie auf jeden Fall rechtzeitig genug reagieren.<br>
        Sie können die Aufgabe nun kurz üben.
    </div>
    <br><br>`
    ],
    show_clickable_nav: true,
    button_label_next: "weiter",
    button_label_previous: "zurück",
    
    data: { trial: 'pvt_start_screen' },
    on_finish: () => {
        // Turn background black for the PVT 
        disp = document.querySelector('.jspsych-display-element');
        disp.style.background = '#000000';
        
        // Record that we are in the practice phase right now.
        phase = "practice";
    }
};
// PVT practice
var pvtPractice = {
    timeline: [PVT_fixation, stopwatch, feedback],
    timeline_variables: pvtDurationsPractice
}

// Conditional: If participants get the practice trials wrong, they need to do them again
var pvtPracticeLoop = {
    timeline: [pvtPractice, evalPvtPractice, ifWrongPracticePVT],
    loop_function: () => repeatPractice ? true : false
};

// PVT main procedure
var pvtMainProcedure = {
    timeline: [ifFixation, ifStopwatch, ifFeedback],
    timeline_variables: pvtDurationsStudy
}

// ASSEMBLE FINAL TIMELINE
timeline.push(

    pvtStartScreen, pvtPracticeLoop,

    pvtMainInstructions, pvtMainProcedure, ifMissingFeedback,

    pvtEnd
);

var instructions = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `<br><br>
    <div class="instructions" style="max-width:${instructionsWidth}px;"> 
        <p>Im nächsten Teil dieses Experiments werden wir Ihnen eine Reihe von Wörtern präsentieren.<br>
        Jedes Wort wird Ihnen für eine kurze Zeit einzeln angezeigt.<br>
        Die Wörter sind in Abschnitte unterteilt. Nach jeden Abschnitt gibt es eine kurze Pause.</p>
        <p>Bitte prägen Sie sich die präsentierten Worte bestmöglich ein.</p>
        <p>Drücken Sie "Start" sobald Sie bereit sind.</p>
    </div>
    <br><br>
    `,
    choices: ["Start"],
    record_data: false,
    post_trial_gap: 2000,
    data: {
    trial: "introduction",
    },
    save_trial_parameters: {
    rt: true,
    stimulus: false,
    response: false,
    trial_type: true,
    choices: false,
    },
};
timeline.push(instructions);

//Encoding phase
var fixation_duration = 500;
var encoding_trial_duration = 3000; 

var fixation = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: '<div style="font-size:60px;">+</div>',
    choices: "NO_KEYS",
    trial_duration: fixation_duration,
    data: {
    trial: "fixation",
    trial_duration: fixation_duration,
    },
    save_trial_parameters: {
    rt: false,
    stimulus: false,
    response: false,
    trial_type: true,
    },
};

lists.forEach(function (list) {
    var list_timeline = [];

    // Add word presentation trials
    list.words.forEach(function (word) {
    list_timeline.push({
        type: jsPsychHtmlKeyboardResponse,
        stimulus: '<div style="font-size:60px;">' + word + "</div>",
        choices: "NO_KEYS",
        trial_duration: encoding_trial_duration,
        data: {
        trial: "word_encoding",
        list: list.name,
        trial_duration: encoding_trial_duration,
        word: word,
        },
        save_trial_parameters: {
        rt: false,
        stimulus: false,
        response: false,
        trial_type: true,
        },
    });
    });

    // Add a break trial after all words in the list
    list_timeline.push(fixation);

    // Add list timeline to the main timeline
    timeline.push({
    timeline: list_timeline,
    });
});

// Distraction Phase/Hagen Matrixes Task
// Distraction Instructions
var distractionInstructions = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `<br><br>
    <div class="instructions" style="max-width:${instructionsWidth}px;"> 
        <p>Danke für ihre Aufmerksamkeit.</p>
        <p>Im nächsten Teil des Experiments Überprüfen wir Ihr logisches Denkvermögen.<br>
        Wenn Sie bereit sind, klicken Sie auf 'Start' um eine erste Probeaufgabe mit Erleuterungen zu durchlaufen.</p>
    </div>
    <br><br>
    `,
    choices: ["Start"],
    record_data: false,
    post_trial_gap: 2000,
    data: {
    trial: "distractor_introduction",
    },
    save_trial_parameters: {
    rt: true,
    stimulus: false,
    response: false,
    trial_type: true,
    },
};
timeline.push(distractionInstructions);

var hagenMatrices = {
    timeline: [hagenMatrix],
    timeline_variables: matrixTimelineVars
};

// ASSEMBLE FINAL TIMELINE
timeline.push(

    preload,
  
    // HAGEN MATRICES TUTORIAL
    example1, example1conditional_incorrect, example1conditional_correct,
    example2, example2conditional_incorrect, example2conditional_correct, finalInstructions, 
  
    finalInstructions, 
  
    hagenMatrices,
  
    // Dont show the final score
    //finalScore
  );

// free recall
var freeRecallInstructions = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `<br><br>
    <div class="instructions" style="max-width:${instructionsWidth}px;"> 
        <p>Großartig, Sie haben die Aufgabe zum logischen Denkvermögen geschafft.</p>
        <p>Im dritten Teil des Experiments bitten wir Sie nun, so viele der Wörter, welche Sie zu Beginn des Experients gelernt haben, niederzuschreiben, wie Sie können.<br>
        Geben Sie bitte hierzu jeweils ein Wort in das Angezeigte Textfeld ein und bestätigen die Eingabe mit der Enter Taste.<br>
        Nach jeder Eingabe bitten wir Sie, einzuschätzen, wie sicher Sie sich sind, dass das von Ihnen eingegebene Wort in den gelernten Worten vorkam.<br>
        Für diese Aufgabe haben Sie 10 Minuten Zeit.</p>
        <p>Drücken Sie 'Start', sobald Sie bereit sind.</p>
    </div>
    <br><br>
    `,
    choices: ["Start"],
    record_data: false,
    post_trial_gap: 2000,
    data: {
    trial: "freeRecallIntroduction",
    },
    save_trial_parameters: {
    rt: true,
    stimulus: false,
    response: false,
    trial_type: true,
    },
};
timeline.push(freeRecallInstructions);

// Global variables that are defined here, and later used in the timer functions
var timer_interval;
var diff;

// Timer function - stopwatch counting down
function startCountdown(duration, display) {
    var start = Date.now();
    var diff;

    // Interval in a variable so it can be reset
    timer_interval = setInterval(timer, 1000); // now set the value of the timer_interval variable, which also starts the timer

    function timer() {
        // get the number of seconds that have elapsed since 
        // startTimer() was called
        diff = (((Date.now() - start) / 1000) | 0);
        diff = duration - diff;

        // does the same job as parseInt truncates the float
        minutes = (diff / 60) | 0;
        seconds = (diff % 60) | 0;

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.innerHTML = minutes + ":" + seconds;

    };
    // we don't want to wait a full second before the timer starts
    minutes = timer();
};

var TextInputTrialRecog = (function (jsPsych) {
    "use strict";

    const info = {
    name: "text_input_trial",
    parameters: {
        preamble: {
        type: jsPsych.ParameterType.FUNCTION,
        pretty_name: "Preamble",
        default: undefined,
        description: "Function that returns HTML formatted string to display at the top of the page above the text input.",
        },
        trial_duration: {
        type: jsPsych.ParameterType.INT,
        pretty_name: "Trial duration",
        default: null,
        description: "The maximum duration to wait for the subject to finish.",
        },
    },
    };

    class TextInputTrialRecog {
    constructor(jsPsych) {
        this.jsPsych = jsPsych;
    }
    trial(display_element, trial) {

        // display preamble
        let preamble = typeof trial.preamble === 'function' ? trial.preamble() : trial.preamble;
        if (preamble !== null) {
        display_element.innerHTML =
            '<div id="jspsych-text-input-preamble" class="jspsych-text-input-preamble">' +
            preamble +
            '</div>';
        }

        // add text input
        display_element.innerHTML +=
            '<input type="text" id="wordInput" name="wordInput" placeholder="Geben Sie hier das Wort ein" style="font-size: 20px; width: 300px;"><br>' +
            '<div id="enteredWords" style="margin-top: 20px;"></div>';

        let inputField = document.getElementById("wordInput");
        let displayWords = document.getElementById("enteredWords");
        let words = [];
        let ratings = [];

        // Function to display Likert scale and capture rating
        function showLikertScale(word) {
            // Create the Likert scale HTML
            let likertHTML = `
            <p>Wie sicher sind Sie darüber, dass das Wort: <b>${word}</b> zu Beginn dieses Experiments gezeigt wurde?</p>
            <div style="position: relative; height: 60px;">
                <div style="position: absolute; top: 6px; left: 0; right: 0; height: 4px; background-color: #efefef; z-index: 1;"></div>
                <div style="display: flex; justify-content: space-between; align-items: center; position: relative; z-index: 2;">
                    <div style="text-align: center;">
                        <input type="radio" name="likert" id="likert1" value="1" style="position: relative; transform: scale(2); display:block; position:relative; top:0; left:50%; margin-left:-6px;">
                        <label for="likert1" style="display: block; margin-top: 10px;">Sehr Unsicher</label>
                    </div>
                    <div style="text-align: center;">
                        <input type="radio" name="likert" id="likert2" value="2" style="position: relative; transform: scale(2); display:block; position:relative; top:0; left:50%; margin-left:-6px;">
                        <label for="likert2" style="display: block; margin-top: 10px;">Unsicher</label>
                    </div>
                    <div style="text-align: center;">
                        <input type="radio" name="likert" id="likert3" value="3" style="position: relative; transform: scale(2); display:block; position:relative; top:0; left:50%; margin-left:-6px;">
                        <label for="likert3" style="display: block; margin-top: 10px;">Sicher</label>
                    </div>
                    <div style="text-align: center;">
                        <input type="radio" name="likert" id="likert4" value="4" style="position: relative; transform: scale(2); display:block; position:relative; top:0; left:50%; margin-left:-6px;">
                        <label for="likert4" style="display: block; margin-top: 10px;">Sehr Sicher</label>
                    </div>
                </div>
            </div>
            <br><button class="jspsych-survey-likert jspsych-btn" id="submitRating">Weiter</button>
            `;

            // Append the Likert scale to the display element
            displayWords.innerHTML = likertHTML;

            // Add an event listener to the submit button
            document.getElementById("submitRating").addEventListener("click", function () {
            let selectedRating = document.querySelector('input[name="likert"]:checked').value;

            // Store the word and its rating
            ratings.push({ word: word, rating: selectedRating });

            // Clear the Likert scale and allow the user to enter the next word
            displayWords.innerHTML = "";
            // Show the input field again and focus on it
            inputField.style.visibility = "visible";
            inputField.disabled = false;
            inputField.focus();
            });
        }

        inputField.addEventListener("keypress", function (e) {
            if (e.key === "Enter") {
            e.preventDefault();

            // Get the entered word
            let enteredWord = inputField.value;

            // Add the entered word to the array
            words.push(enteredWord);

            // Clear the input field
            inputField.value = "";

            // Hide the input field until the rating is submitted
            inputField.style.visibility = "hidden";

            // Show the Likert scale for the entered word
            showLikertScale(enteredWord);
            }
        });
        
        var startTime = performance.now();

        // end trial if trial_duration is set
        if (trial.trial_duration !== null) {
        this.jsPsych.pluginAPI.setTimeout(() => {
            end_trial();
        }, trial.trial_duration);
        }

        const end_trial = () => {
        display_element.innerHTML = ""; // clear display

        let trialData = typeof trial.data === 'function' ? trial.data() : trial.data;
        var trial_data = {
            words_and_ratings: JSON.stringify(ratings),
            rt: performance.now() - startTime,
            ...trialData
        };

        this.jsPsych.finishTrial(trial_data);
        };
    }
    }

    TextInputTrialRecog.info = info;

    return TextInputTrialRecog;
})(jsPsychModule);

var freeRecall = {
    on_load: function () {
    var display = document.querySelector("#matrix-time");
    startCountdown(1 * 600, display); // 1 * 120
    
    },
    trial_duration: 600000, // 2 * 60000 
    preamble: function() {
    return `
    <div align="center"><span style="font-size:50px" id="matrix-time">2:00</span></div>
    <br><br>
    <b>Geben Sie so viele Wörter, an welche Sie sich erinnern können ein, wie möglich.<br> Drücken Sie nach jedem Wort die Eingabetaste.</b><br><br><br>`;
    },
    type: TextInputTrialRecog,
    data: function() {
    return {
        trial: "free recall",
    };
    },
};
timeline.push(freeRecall);

// recognition
var recognition_instructions = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `<br><br>
    <div class="instructions" style="max-width:${instructionsWidth}px;"> 
        <p>Im vierten Teil des Experiments zeigen wir ihnen erneut eine Reihe an Wörtern.<br>
        Bitte wählen Sie für jedes angezeigte Wort aus, ob Sie dieses Wort aus dem ersten Teil dieses Experiments kennen ('Alt'), oder ob es sich um ein neues Wort handelt, welches Ihnen zuvor nicht präsentiert wurde ('Neu').<br>
        Für diese Entscheidung haben Sie fünf Sekunden Zeit.<br>
        Nachdem Sie eine Auswahl getroffen haben, bitten wir Sie einzuschätzen, wie sicher Sie sich bei der Alt/Neu Einschätzung des vorangegangenen Wortes waren.</p>
        <p>Drücken Sie 'Start', sobald Sie bereit sind.</p>
    </div>
    <br><br>
    `,
    choices: ["Start"],
    record_data: false,
    post_trial_gap: 2000,
    data: {
    trial: "recognition_introduction",
    },
    save_trial_parameters: {
    rt: true,
    stimulus: false,
    response: false,
    trial_type: true,
    },
};
timeline.push(recognition_instructions);

// Function to start the experiment
function startRecognition(variables, lists) {
    var allWords = [];
    var recognition_timeline = [];
    var likert_scale = ["Sehr unsicher", "Unsicher", "Sicher", "Sehr sicher"];

    // Add predefined lists to wordsWithListNames and allWords
    lists.forEach((list) => {
    list.words.forEach((word) => {
        allWords.push({ word: word, listName: list.name });
    });
    allWords.push({ word: list.name, listName: list.name });
    });

    // Add Excel words
    Object.keys(variables).forEach((listName) => {
    variables[listName].forEach((word) => {
        allWords.push({ word: word, listName: listName });
    });
    });

    // Shuffle the array
    allWords = jsPsych.randomization.shuffle(allWords);

    // Iterate through each word in allWords to create trials and their confidence ratings
    allWords.forEach((item) => {
        var word_typ;

        // Determine the type of word
        if (item.listName === 'randomWords') {
            word_typ = 'new';
        } else if (item.listName === item.word) {
            word_typ = 'lure';
        } else {
            word_typ = 'studied';
        }

        // Define the recognition trial
        var recognitionTrial = {
            type: jsPsychHtmlButtonResponse,
            stimulus: `<div style="font-size:60px;"><p>${item.word}</p></div>`,
            choices: ["Alt", "Neu"],
            button_html: '<button class="jspsych-btn" style="font-size: 24px; padding: 15px 30px;">%choice%</button>',
            trial_duration: 5000,
            data: {
                trial: "recognition",
                listName: item.listName,
                word: item.word,
                word_typ: word_typ,
            },
            save_trial_parameters: {
                stimulus: false,
                trial_type: true,
            },
            on_finish: function (data) {
                // Save the selected choice for later use
                jsPsych.data.addDataToLastTrial({
                    selectedChoice: data.response,
                });
            }
        };

        // Define the confidence rating (Likert scale) trial
        var likertTrial = {
            type: jsPsychSurveyLikert,
            questions: [
                {
                    prompt: "Wie sicher sind Sie über das von Ihnen ausgewählte Label?",
                    labels: likert_scale,
                    required: true,
                    name: "Confidence",
                },
            ],
            button_label: "Weiter",
            data: {
                trial: "confidence_rating",
                listName: item.listName,
                word: item.word,
            },
            save_trial_parameters: {
                question_order: false,
                stimulus: false,
                trial_type: true,
            },
            on_finish: function (data) {
                // Stringify the response array to store in the database as a text field
                const confidenceRatingStr = JSON.stringify(data.response);
                
                // Add the stringified confidence rating to the trial data
                jsPsych.data.addDataToLastTrial({
                    confidenceRating: confidenceRatingStr
                });
            }
        };

        var too_slow = {
            type: jsPsychHtmlKeyboardResponse,
            stimulus:
            `<span style="color: red; font-size: 60px">Bitte antworten Sie schneller!</span><br>`,
            trial_duration: 2000,
            choices: "NO_KEYS",
            data: { trial: 'too_slow', block: jsPsych.timelineVariable('block') },
            // on_finish: () => {
            //     temp_nums_entered = [];
            // }
        };

        // Incorporating a conditional function
        var if_node_likert = {
            timeline: [likertTrial],
            conditional_function: function(){
                // If the last value recorded within our data is not null, so a button was pressed
                if (jsPsych.data.get().last(1).values()[0].response !== null) {
                    // ... do run this node in the timeline
                    return true;
                } 
                // Otherwise ...
                else {
                    // ... do not run this node within the timeline
                    return false;
                }
            }
        };

        var if_node_too_slow = {
            timeline: [too_slow],
            conditional_function: function(){
                // If the last value recorded within our data is not null, so a button was pressed
                if (jsPsych.data.get().last(1).values()[0].response === null) {
                    // ... do run this node in the timeline
                    return true;
                } 
                // Otherwise ...
                else {
                    // ... do not run this node within the timeline
                    return false;
                }
            }
        };

        recognition_timeline.push(recognitionTrial, if_node_likert, if_node_too_slow);
    });

    // Add recognition timeline to the main timeline
    timeline.push({
        timeline: recognition_timeline,
    });

}

// Load the Excel file to create the randomWords list
function loadExcelFile(filePath, callback) {
    fetch(filePath)
    .then((response) => response.arrayBuffer())
    .then((data) => {
        var workbook = XLSX.read(data, { type: "array" });
        var sheet = workbook.Sheets[workbook.SheetNames[0]];
        var rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        var variables = {};
        var listName = rows[0][0]; // First cell as the list name

        rows.slice(1).forEach((row) => {
        if (!variables[listName]) {
            variables[listName] = [];
        }
        variables[listName].push(row[0]);
        });

        console.log(variables);

        // Call the callback function with the loaded data
        if (callback && typeof callback === "function") {
        callback(variables);
        }
    })
    .catch((error) =>
        console.error("Error fetching the Excel file:", error)
    );
}


/////////////////////////////////
// Semantic Differential
////////////////////////////////

var jsPsychSemanticDifferential = (function (jspsych) {
    'use strict';
  
    const info = {
      name: 'semantic-differential',
      parameters: {
        stimulus: {
          type: jspsych.ParameterType.STRING,
          pretty_name: 'Stimulus',
          default: undefined,
          description: 'The word to be rated.'
        },
        dimensions: {
          type: jspsych.ParameterType.OBJECT,
          pretty_name: 'Dimensions',
          default: undefined,
          description: 'The dimensions on which to rate the stimulus.'
        },
        randomize_dimension_order: {
          type: jspsych.ParameterType.BOOL,
          pretty_name: 'Randomize dimension order',
          default: true,
          description: 'If true, the order of dimensions will be randomized.'
        }
      }
    };
  
    class SemanticDifferentialPlugin {
      constructor(jsPsych) {
        this.jsPsych = jsPsych;
      }
  
      trial(display_element, trial) {
        display_element.innerHTML = this.generateHTML(trial);
        this.setupResponseHandling(display_element, trial);
      }
  
      generateHTML(trial) {
        let dimensions = trial.dimensions;
        if (trial.randomize_dimension_order) {
          dimensions = this.jsPsych.randomization.shuffle(dimensions);
        }
  
        let html = `
          <div id="jspsych-semantic-differential-stimulus" style="font-size: 24px; font-weight: bold; margin-bottom: 20px;">${trial.stimulus}</div>
          <form id="jspsych-semantic-differential-form">
        `;
  
        for (let i = 0; i < dimensions.length; i++) {
          const dim = dimensions[i];
          html += `
            <div class="jspsych-semantic-differential-row" style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
              <div style="width: 20%; text-align: right; padding-right: 10px;">${dim.left}</div>
              <div style="width: 60%; display: flex; align-items: center;">
                <input type="range" name="${dim.name}" min="0" max="100" value="50" style="width: 100%;">
              </div>
              <div style="width: 20%; text-align: left; padding-left: 10px;">${dim.right}</div>
            </div>
          `;
        }
  
        html += `
          <button type="submit" id="jspsych-semantic-differential-next" class="jspsych-btn" style="display: block; margin: 20px auto;">Weiter</button>
          </form>
        `;
  
        return html;
      }
  
      setupResponseHandling(display_element, trial) {
        const endTrial = () => {
          const response_data = {};
          const inputs = display_element.querySelectorAll('input[type="range"]');
          for (let i = 0; i < inputs.length; i++) {
            const name = inputs[i].name;
            const value = parseInt(inputs[i].value);
            response_data[name] = value;
          }
  
          display_element.innerHTML = '';
          this.jsPsych.finishTrial({
            rt: performance.now() - start_time,
            response: response_data,
            stimulus: trial.stimulus
          });
        };
  
        display_element.querySelector('#jspsych-semantic-differential-form').addEventListener('submit', (e) => {
          e.preventDefault();
          endTrial();
        });
  
        var start_time = performance.now();
      }
    }
  
    SemanticDifferentialPlugin.info = info;
  
    return SemanticDifferentialPlugin;
  })(jsPsychModule);
  
  // Define the dimensions in German
  const dimensions = [
    { name: 'gut_schlecht', left: 'Gut', right: 'Schlecht' },
    { name: 'stark_schwach', left: 'Stark', right: 'Schwach' },
    { name: 'aktiv_passiv', left: 'Aktiv', right: 'Passiv' },
    { name: 'abstrakt_konkret', left: 'Abstrakt', right: 'Konkret' },
    { name: 'vertraut_unvertraut', left: 'Vertraut', right: 'Unvertraut' },
    { name: 'leicht_schwer_zu_merken', left: 'Leicht zu merken', right: 'Schwer zu merken' }
  ];
  
  // Combine all words from the lists and randomize their order
  const allWords = jsPsych.randomization.shuffle([...man, ...spider]);
  
  // Create the semantic differential trials
  const semantic_differential_trials = allWords.map(word => ({
    type: jsPsychSemanticDifferential,
    stimulus: word,
    dimensions: dimensions,
    randomize_dimension_order: true,
    data: { task: 'semantic_differential', word: word }
  }));
  
  // Instructions for the semantic differential task in German
  const semantic_differential_instructions = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
      <div class="instructions" style="max-width:${instructionsWidth}px;">
        <p>In diesem Teil der Studie werden Sie gebeten, verschiedene Wörter auf mehreren Dimensionen zu bewerten.</p>
        <p>Für jedes Wort sehen Sie sechs Skalen. Bitte bewerten Sie das Wort auf jeder Skala, indem Sie den Schieberegler zwischen den beiden Extremen bewegen.</p>
        <p>Die Mitte der Skala (50) repräsentiert einen neutralen Punkt.</p>
        <p>Nachdem Sie alle sechs Dimensionen für ein Wort bewertet haben, klicken Sie auf "Weiter", um zum nächsten Wort zu gelangen.</p>
        <p>Drücken Sie "Start", wenn Sie bereit sind zu beginnen.</p>
      </div>
    `,
    choices: ['Start'],
    data: { task: 'semantic_differential_instructions' }
  };
  
  // Add the semantic differential task to the timeline
  timeline.push(semantic_differential_instructions);
  semantic_differential_trials.forEach(trial => timeline.push(trial));

/////////////////////////////////
// Regensburger Wordfluency Task
////////////////////////////////


// Function to handle the completion of loading the Excel file
function handleExcelDataLoaded(variables) {
    startRecognition(variables, lists);
    // RWT
    timeline.push(rwtIntro, rwtPorM, rwtProfessionsorHobbies)

    var wait_for_save = {
        on_load: () => {
          display = document.querySelector('#dots');
          var btn0 = document.querySelector('#jspsych-html-button-response-button-0 button');
          btn0.style.visibility = "hidden";
          
          startCountdownDots(100000, display);
          
          serverComm.save_data_end(jsPsych.data.get().values(), 'php/save_data_end.php', 'drm_end', acallback)
        },
        type: jsPsychHtmlButtonResponse,
        trial_duration: 5 * 60000, // Abort after 5 min
        data: { trial: `wait_for_save` },
        stimulus: 
        `<br><br>
        <div class="instructions" style="max-width:${instructionsWidth}px;">
          Ihre Daten werden gerade gespeichert. Bitte warten Sie, bis der Vorgang 
          abgeschlossen ist.<br>
          <b>Bitte schließen Sie das Experiment auf keinen Fall, solange unten noch 
          "BITTE WARTEN" zu lesen ist! Das Speichern kann einige Minuten dauern.</b>
          <br><br>
          
          <div id="wait">
            <span style="font-size: 30px; color: #a90b00;"><b>BITTE WARTEN </b></span>
            <div><span id="dots" style="font-size: 40px; color: #006106;">.</span></div>
          </div>
          
          <div id ="done" style ="display: none;">
            <span style="font-size: 30px; color: #006106;"><b>FERTIG!</b></span><br>
            <span style="font-size: 20px;">Sie können jetzt fortfahren.</span>
          </div>
        </div>`,
        
        choices: ['weiter'],
        button_html: '<button class="jspsych-btn" tabindex="-1">%choice%</button>',
        on_finish: () => {
          clearInterval(timer_interval);
          updateConfig(
            "participantID", // varwhere
            participantID, // vareqls
            ['status'], // colnames
            ['Finished Online-Experiment'] // values 
          );
        }
    };

    timeline.push(wait_for_save)



    var conclusion = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `<br><br>
    <div class="instructions" style="max-width:${instructionsWidth}px;"> 
            <p>Danke, dass Sie an unserem Experiment teilgenommen haben.</p>
            <p>Ihre Antworten wurden aufgezeichnet. Bitte drücken sie auf 'Beenden', um das Experiment zu beenden.</p>
            <p>Wir freuen uns darauf, Sie bald am ZI Mannheim zum zweiten Versuchstag begrüßen zu dürfen.</p>
    </div>
    <br><br>
        `,
    choices: ["Beenden"],
    record_data: false,
    data: {
        trial: "conclusion",
    },
    save_trial_parameters: {
        rt: true,
        stimulus: false,
        response: false,
        trial_type: true,
    },
    };
    timeline.push(conclusion);

    var EndTrial = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: `<br><br>
        <div class="entrial" style="max-width:${instructionsWidth}px;">
            <p>Sie können das Browserfenster nun schließen.</p>
        </div>
        <br><br>
        `,
        choices: "NO_KEYS", 
        data: {
        trial: "endtrial",
        },
        save_trial_parameters: {
        rt: true,
        stimulus: false,
        response: false,
        trial_type: true,
        },
    };
    timeline.push(EndTrial);

    jsPsych.run(timeline);
}

// Load the Excel file to create the randomWords list
loadExcelFile("sampled_random_words_debug.xlsx", handleExcelDataLoaded);