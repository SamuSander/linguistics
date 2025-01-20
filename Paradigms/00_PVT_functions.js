
var timer_interval; // declare the variable in global scope, but leave it undefined so that you don't start the timer yet
var diff;

// FUNCTIONS

// Random number generator; uniform distribution
// See discussion here:
// https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min +1)) + min;
}

// Timer function 
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
            diff = `<span style="color: rgb(104, 30, 30)">0</span><span style="color:  rgb(241, 26, 26);">${diff}</span>`;
        } else if (diff.length == 3) {
            diff = `<span style="color: rgb(104, 30, 30)">00</span><span style="color:  rgb(241, 26, 26)">${diff}</span>`;
        } else if (diff.length == 2) {
            diff = `<span style="color: rgb(104, 30, 30)">000</span><span style="color:  rgb(241, 26, 26)">${diff}</span>`;
        } else if (diff.length == 1) {
            diff = `<span style="color: rgb(104, 30, 30)">0000</span><span style="color:  rgb(241, 26, 26)">${diff}</span>`;
        }

        display = document.querySelector('#time');
        display.innerHTML = diff;

    };
    // we don't want to wait a full second before the timer starts
    minutes = timer();
}
