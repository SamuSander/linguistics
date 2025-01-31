// FUNCTIONS
var arraySum = function(array) {
    sum = array.reduce((a, b) => a + b, 0);
    return(sum);
}

// Random number generator; uniform distribution
// See discussion here:
// https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min +1)) + min;
}

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
