// INITIALISE
// Initialise a few variables for experimental settings

// Return link - where participants are directed when they fail the task
var redirectLink = "'https://www.youtube.com/watch?v=dQw4w9WgXcQ'";

// Task duration: 3 min
var pvtTimeLimit = 3 * 60000;

// Counting how many (practice) PVT trials were valid.
var pvtTrialCounter = 0;
var pvtLapseCount = 0;
var pvtPrematureCount = 0;
var repeatPractice = false;

/* The task automatically evaluates participants' performance. If they
fail the three practice trials twice (less than 2 out of 3 correct), or
if they make too many mistakes during the main task (more than 20% lapses
or more than 20% prematures), they are excluded from data analysis and can
either return the study or continue nonetheless.
Lapses are conservatively defined as 1000 (for data analysis, anything
slower than 500 ms is typically excluded), and prematures are defined
as 150 ms (for data analysis, anything faster than 100 ms is excluded). */

var lapseTime = 1000; // in ms; if longer, it's a lapse
var prematureTime = 150; // in ms; if shorter, it's a premature

// The PVT task length is determined by the time limit, but we have to generate
// the trials in advance. We don't know how much trials each participant will
// complete, because that depends on their reaction times. So we pre-generate
// a number of trials that can't possibly be completed within the time limit,
// to make sure there's enough trials that can be run within the time limit.
// A PVT trial is around 7 s long; we assume 6 s to be on the safe side.
var pvtTrials = Math.floor(pvtTimeLimit / 6000);
var pvtTrialsPractice = 3;

// Minimum and maximum waiting interval (when the stopwatch is not counting up).
var minWait = 2000;
var maxWait = 10000;

// Generate waiting time duration for the practice phase
var pvtDurationsPractice = [];

for (let i = 0; i < pvtTrialsPractice; i++) {
    pvtDurationsPractice.push({fixation_duration: getRandomInt(minWait, maxWait)});
}

// Generate waiting time durations for the main task
var pvtDurationsStudy = [];

for (let i = 0; i < pvtTrials; i++) {
    pvtDurationsStudy.push({fixation_duration: getRandomInt(minWait, maxWait)});
}
