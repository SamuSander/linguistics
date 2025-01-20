
// INSTRUCTIONS ----------------------------------------------------------------------------------------

var example1 = {
    type: jsPsychSurveyMultiChoiceImage,
    preamble:
    `<br><br>
    <div class="instructions" style="max-width:${instructionsWidth}px;">
        Dear participant,<br><br>
        This test is about finding rules in abstract patterns and to complete them in a logical way. 
        Each task shows an incomplete figure. The patterns you will see follow rules which may apply to 
        a row, a column or to a diagonal. They may apply to the figure as a whole or to parts of it 
        only. They may involve addition, subtraction, the alignment of figures or single components. 
        Only one of the six pieces is the correct one required to complete the design.<br>
        It is your task to select the piece, which completes the figure. Each task needs to be completed 
        within 2:00 minutes.
    </div>
    <br>
    
    <div class="instructions">
        Which piece is the one required to complete the design?<br>
        (Click on the correct piece and then on "Continue") 
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
    button_label: ['Continue'],
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
    `<br><br>
    <div class="instructions" style="max-width:${instructionsWidth}px;">
        Solution:<br>
        The first piece is the only correct one.<br>
        
        The rule which defines the figure is: The line and the black rectangle systematically vary: the 
        line move clockwise in each row and the black rectangle move clockwise in each column and row, 
        i.e. it has to be situated in the center of the lower part in the missing piece.
    </div>
    
    <br>

    <div class="instructions">
        Click "Continue" to go to the second sample task.
    </div>`,
    questions: 
    [
        {
            prompt: `<img src="${imagePath}Example 1br.png" width=${matrixWidth}><hr>`,  
            options: exampleSolutionOptions1,
            required: false,
            horizontal: true
        }
    ],
    button_label: ['Continue'],
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
    `<br><br>
    <div class="instructions">
        Which piece is the one required to complete the design?<br>
        (Click on the correct piece and then on "Continue")
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
    button_label: ['Continue'],
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
    `<br><br>
    <div class="instructions" style="max-width:${instructionsWidth}px;">
        Solution:<br>
        The fourth piece is the only correct solution.<br>
        In the task subtracting elements from each other was required. The elements in the second 
        position have to be subtracted from the elements in the first column, i.e. in the third column 
        those elements need to be present which are situated in the first column, but not in the second 
        one. The square frame is not considered and remains intact.

        <div class="instructions">
            Please click "Continue" to start the main task.
        </div>
    </div>`,
    questions: 
    [
        {
            prompt: `<img src="${imagePath}Example 2r.png" width=${matrixWidth}><hr>`, 
            options: exampleSolutionOptions2,
            required: false,
            horizontal: true
        }
    ],
    button_label: ['Continue'],
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
  `<br><br>
  <div class="instructions" style="max-width:${instructionsWidth}px;">
    Now you will be presented 20 tasks. Mark the piece which is in your opinion the correct one and click on the "Continue" 
    button. Each task is timed at 2:00 minutes. The next task will be shown automatically after the two-minute period has 
    elapsed.<br><br>
    <b>Good luck!</b>
  </div>`,
  choices: ['Continue'],
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
          You solved ${sumscore} out of 20 tasks correctly.
        </div>
        <br><br>`

        return(stim);
    },
    choices: ['ok'],
    data: { trial: 'score' }
};