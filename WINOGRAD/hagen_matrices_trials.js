
var hagenMatrix = {
    on_load: function () {
        display = document.querySelector('#matrix-time');
        startCountdown(2 * 60, display); // 2 minutes

        // This plugin does not have a trial duration argument. So instead,
        // we end the trial when the countdown is over.
        //jsPsych.finishTrial();
      },
    type: jsPsychSurveyMultiChoiceImage,
    trial_duration: 2 * 60000, // 2 min
    preamble:
    '<br><br>' +
    '<div align="right"><span style="font-size:30px" id="matrix-time">2:00</span></div>',
    questions: 
    [
        {
            prompt: jsPsych.timelineVariable(['matrix']), 
            options: jsPsych.timelineVariable(['options']),
            required: true,
            horizontal: true
        }
    ],
    button_label: ['weiter'],
    data: {
        correctAnswer: jsPsych.timelineVariable(['correctAnswer']),
        trial: 'matrix',
        matrixNo: jsPsych.timelineVariable(['name'])
    },

    on_finish: function(data) {
        clearInterval(timer_interval);

        // We don't need the question order, because there is only one question. The question order
        // is not recorded when participants don't provide an answer within the time limit, so we delete
        // it for all trials for consistency.
        delete data.question_order;

        // Clean up response (response currently record the image path of the option chosen)
        // The response is recorded as Q0, because there is only one question.
        // We extract the last number in the string, which indicates the response option number.
        if (data.response) {
            data.response = data.response['Q0'].match(/(\d+)(?=[^\d]+$)/)[0]
            // Record whether the participant answered correctly.
            data.correct = data.response == data.correctAnswer;
        } else {
            data.correct = false;
        }
    }
};
