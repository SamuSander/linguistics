
// TRIALS
var PVT_fixation = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `<span class = "fixation">00000</span>`,
    choices: "NO_KEYS",
    trial_duration: jsPsych.timelineVariable('fixation_duration'),
    data: { pvt_iti: jsPsych.timelineVariable('fixation_duration')},
    on_finish: function(data) {
        data.trial = `${phase}_pvt_fixation`;
    }
}

var ifFixation = {
    timeline: [PVT_fixation],
    conditional_function: function(){
        // get the data from the previous trial,
        // and check how much time has passed until the end of the last trial
        var data = jsPsych.data.get().last(1).values()[0];
        if(data.time_elapsed > pvtTimeLimit){
            return false;
        } else {
            return true;
        }
    }
}

var stopwatch = {
    on_load: function () {
        startTimer();
    },
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `<div><span id="time" class="time">00000</span></div>`,
    trial_duration: 10000,
    choices: [" "],
    on_finish: function (data) {
        /* diff and elapsed time are not completely aligned, so diff will stop
        at 99998 or something. So if the participants did not make a response,
        we set the display to 10000.*/
        if (data.rt === null) diff = '10000';
        
        if (data.rt == null || data.rt > lapseTime) {
            pvtLapseCount = pvtLapseCount + 1;
            data.correct = 0;
        } else if (data.rt != null && data.rt < prematureTime) {
            pvtPrematureCount = pvtPrematureCount + 1;
            data.correct = 0;
        } else {
            data.correct = 1;
        }

        data.pvt_stopwatch = diff;
        clearInterval(timer_interval);

        pvtTrialCounter = pvtTrialCounter + 1;

        data.trial = `${phase}_pvt_stopwatch`;
    }
}

var ifStopwatch = {
    timeline: [stopwatch],
    conditional_function: function(){
        // get the data from the previous trial,
        // and check how much time has passed until the end of the last trial
        var data = jsPsych.data.get().last(1).values()[0];
        if(data.time_elapsed > pvtTimeLimit){
            return false;
        } else {
            return true;
        }
    }
}

// Leave the time when the stopwatch was stopped on the screen for a bit
var feedback = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function(){
        df = jsPsych.data.getLastTrialData().values()[0].pvt_stopwatch;

        return(`<div><span class="feedback">${df}</span></div>`);
    },
    choices: "NO_KEYS",
    trial_duration: 1500,
    on_finish: function(data) {
        data.trial = `${phase}_pvt_feedback`;
    }
}

var ifFeedback = {
    timeline: [feedback],
    conditional_function: function(){
        // get the data from the previous trial,
        // and check how much time has passed until the end of the last trial
        var data = jsPsych.data.get().last(1).values()[0];
        if(data.time_elapsed > pvtTimeLimit){
            return false;
        } else {
            return true;
        }
    }
}

// Add if trial to show before end screen if
// a) The duration is > maximum
// b) The previous trial was a stopwatch trial, which means that the experiment
//    stopped after the time limit was reached during a stopwatch trial. Which
//    means feedback was not shown and the trial ended abruptly.
var missing_feedback = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function(){
        df = jsPsych.data.getLastTrialData().values()[0].pvt_stopwatch;

        return(`<div><span class="feedback">${df}</span></div>`);
    },
    choices: "NO_KEYS",
    trial_duration: 1500,
    on_finish: function(data) {
        data.trial = `${phase}_pvt_feedback`;
    }
}

var ifMissingFeedback = {
    timeline: [missing_feedback],
    conditional_function: function(){
        var data = jsPsych.data.get().last(1).values()[0];
        if(data.trial === 'pvt_stopwatch'){
            return true;
        } else {
            return false;
        }
    }
}
