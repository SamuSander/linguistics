
// PSYCHOMOTOR VIGILANCE TASK TRIALS -------------------------------------------------------------------

var PVT_fixation = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `<span class = "fixation">00000</span>`,
    choices: "NO_KEYS",
    trial_duration: jsPsych.timelineVariable('fixation_duration'),
    data: { pvt_iti: jsPsych.timelineVariable('fixation_duration')},
    on_finish: function(data) {
        data.trial = `${phase}_pvt_fixation`;
        
        var progress = jsPsych.getProgressBarCompleted();
        jsPsych.setProgressBar(progress + progress_increment);
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

        var progress = jsPsych.getProgressBarCompleted();
        jsPsych.setProgressBar(progress + progress_increment);
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

        var progress = jsPsych.getProgressBarCompleted();
        jsPsych.setProgressBar(progress + progress_increment);
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

        var progress = jsPsych.getProgressBarCompleted();
        jsPsych.setProgressBar(progress + progress_increment);
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

// TIMELINE AND PROCEDURES
// Conditional: If participants get the practice trials wrong TWICE, they are excluded from the experiment
var ifFailedPvtPractice = {
    on_load: function() {
    disp = document.querySelector('.jspsych-display-element');
    disp.style.background = '#937d5f';
    // TO DO: Update configuration in on_load instead
    },
 timeline: [/*optionalStopPvt, */ youreOut_invis],
 conditional_function: function() {
     // Check how participants did before and exclude them if necessary
     if ((pvtLapseCount + pvtPrematureCount) > 1) {
         jsPsych.data.addProperties({inclusion: "failedPracticePvt"});
         return true;
        } else {
            return false;
        }
    }
};

// Conditional: If participants have more than 20% lapses or prematures
var ifFailedPvt = {
    on_load: function() {
        disp = document.querySelector('.jspsych-display-element');
        disp.style.background = '#937d5f';
    },
    timeline: [/*optionalStopPvt, */ youreOut_invis],
    conditional_function: function() {
      // Check how participants did before and exclude them if necessary
      if ((pvtLapseCount / pvtTrialCounter) > .2 || (pvtPrematureCount / pvtTrialCounter) > .2) {
        jsPsych.data.addProperties({inclusion: "failedPvt"});
        return true;
      } else {
        return false;
      }
    }
};
