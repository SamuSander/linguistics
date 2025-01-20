// FUNCTIONS

// Random number generator; uniform distribution
// See discussion here:
// https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min +1)) + min;
}

// Global variables that are defined here, and later used in the timer functions
var timer_interval;
var diff;

// Timer function - stopwatch counting up
function startTimer() {
    var start = Date.now();

    // Interval in a variable so it can be reset
    timer_interval = setInterval(timer, 1); // now set the value of the timer_interval variable, which also starts the timer

    function timer() {
        // get the number of seconds that have elapsed since 
        // startTimer() was called
        diff = (((Date.now() - start)) | 0);
        diff = String(diff);

        // add 00s if necessary
        if (diff.length == 4) {
            diff = `<span class = "stopwatch_p">0</span><span class = "stopwatch_a">${diff}</span>`;
        } else if (diff.length == 3) {
            diff = `<span class = "stopwatch_p">00</span><span class = "stopwatch_a">${diff}</span>`;
        } else if (diff.length == 2) {
            diff = `<span class = "stopwatch_p">000</span><span class = "stopwatch_a">${diff}</span>`;
        } else if (diff.length == 1) {
            diff = `<span class = "stopwatch_p">0000</span><span class = "stopwatch_a">${diff}</span>`;
        }

        display = document.querySelector('#time');
        display.innerHTML = diff;

    };
    // we don't want to wait a full second before the timer starts
    minutes = timer();
}
