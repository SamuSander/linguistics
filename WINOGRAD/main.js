
// Initialise ------------------------------------------------------------------------------------------

// const instructionsWidth = 900;
const defaultFontSize = '22px'
const backgroundColour = "#c1c1c1";

// PVT
var pvtTimeLimit = 3 * 60000;

// Counting how many (practice) PVT trials were valid.
var pvtTrialCounter = 0;
var pvtLapseCount = 0;
var pvtPrematureCount = 0;
var lapseTime = 1000;
var prematureTime = 150;

// How often people failed the practice runs
let nFailedPvt = 0;

// Date string options
const ds_options = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
};

// Global vars -----------------------------------------------------------------------------------------

// Will be edited throughout the task.
let previousResponse;

// Server comm -----------------------------------------------------------------------------------------

function sendId(table, vpnCode, data) {
    var data = Object.assign({'tblname': table, 'participantID': participantID}, data)
    data = JSON.stringify(data);

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "php/send_id.php");
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttp.send("x=" + data)
    
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            try {
                var response = JSON.parse(this.responseText);
                console.log("Server response:", response);
                if (response.success) {
                    console.log("Data successfully saved.");
                } else {
                    console.error("Error from server:", response.error);
                }
            } catch (e) {
                console.error("Error parsing server response:", e);
            }
        }
    }
}

// Server config update
function updateConfig(varwher, vareqls, columns, values) {
    let data = [];
    if (values.length != columns.length) {
        throw console.error('varnames and columns need to have the same length.');
    }

    // exclude values that are null
    null_idx = getAllIndexes(values, null);
    columns = columns.filter((_, index) => !null_idx.includes(index));
    values = values.filter((_, index) => !null_idx.includes(index));

    for (let i = 0; i < values.length; i++) {
        data.push({
            'tblname':"drm_config", 'colname':columns[i], 'varname':values[i], 
            'varwher':varwher, 'vareqls':vareqls
        })
    }

    data = JSON.stringify(data);

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "php/update_configuration.php");
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttp.send("x=" + data)
}

// Get lab booking information
function getBookings() {

    return new Promise(function (resolve, reject) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", "php/get_bookings.php");
        xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        xmlhttp.onload = function () {

            if (this.status == 200) {
                resolve(this.responseText);
            } else {
                reject(this.status);
            }
        };

        xmlhttp.send();
    });
}

// Send data on every trial update.
var serverComm = {};

serverComm.save_data = function(data, script, table) {
    var data = Object.assign({'tblname': table}, data)
    
    var xhr = new XMLHttpRequest();
    xhr.open('POST', script);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(data));
}

// Send data again to backup data base at the end of the study
serverComm.save_data_end = function(data, script, table, callback) {
    var data = Object.assign({'tblname': table}, data)
    
    var xhr = new XMLHttpRequest();
    xhr.open('POST', script);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = () => {
        if(xhr.status == 200){
            var response = JSON.parse(xhr.responseText);
        }
        callback(response);
    };
    xhr.send(JSON.stringify(data));
}

function acallback(json) {
    saveStatus = json;
    // Set "done" element to visible to display it to the participant
    allDone = document.getElementById("done");
    allDone.style.display = 'block';
    wait = document.getElementById("wait");
    wait.style.display = 'none';
    // Show continue button
    btn0 = document.querySelector('#jspsych-html-button-response-button-0 button');
    btn0.style.visibility = "visible";
  }

// Functions -------------------------------------------------------------------------------------------

// Pop up an additional text field when certain options are chosen.
// E.g. display the text field "identity"; triggered when people want to self-describe their gender.
// Remove the field when a different option is selected, and clear any input.

function checkInput(val, comparison, id) {
    el = document.getElementById(id)
    
    if (val==comparison) {
        el.style.display = "block";
        el.setAttribute('required','required');
    } else {
        el.style.display = "none";
        el.removeAttribute('required');
        el.value = "";
    }
};

function checkInputDiv(val, comparison, disp_id, req_id) {
  if (val==comparison) {
    document.getElementById(disp_id).style.display = "block";
    document.getElementById(req_id).setAttribute('required','required');
  } else {
    document.getElementById(disp_id).style.display = "none";
    document.getElementById(req_id).removeAttribute('required');
  }
};

// Random number generator
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Sum of values in an array. Attention - ignores undefined elements!
var arraySum = function(array) {
    sum = array.reduce((a, b) => (a == undefined ? 0 : a) + (b == undefined ? 0 : b), 0);
    return(sum);
}

// Find all indices where a value occurs in an array
// Two modi:
// 1) "equal": Checks whether the element in the array is equal to the desired value.
// 2) "contains": Checks whether the element contains the desired value.
function getAllIndexes(arr, val, mode = "equal") {
    var indexes = [], i;

    switch(mode) {
        case "equal":
            for (i = 0; i < arr.length; i++) {
                if (arr[i] === val) indexes.push(i);
            }
            break;
        case "contains":
            for (i = 0; i < arr.length; i++) {
                if (arr[i].includes(val)) indexes.push(i);
            }
            break;
        default:
            console.log("Invalid mode. Must either be 'equal' or 'contains'.");
    }

    return indexes;
}

// Pairwise comparisons of two arrays - find where both arrays are true
function pairsOfTrue(arr1, arr2) {
    if (arr1.length != arr2.length) {
        throw Error("Arrays must be of the same length.")
    }

    var indexes = [], i;
    for(i = 0; i < arr1.length; i++)
        if (arr1[i] == true && arr2[i] == true)
            indexes.push(i);
    return indexes;
}

// Add n hours to a date
Date.prototype.addHours = function(h) {
    this.setTime(this.getTime() + (h*60*60*1000));
    return this;
}

// Functions for displaying the current time.
var mytime;

// Show current local time (update every second)
function display_c() {
    var refresh = 1000; // Refresh rate in milli seconds
    mytime = setTimeout('display_ct()', refresh)
}

function display_ct() {
    var x = new Date()
    var x1=x.toLocaleString();
    document.getElementById('ct').innerHTML = x1;
    display_c();
}

// Function for "loading dots" that are displayed while data is saved
var displayDots = " ";

function startCountdownDots(duration, display) {
    var start = Date.now();
    var diff;

    // Start timer
    timer_interval = setInterval(timerDots, 1000);

    function timerDots() {
        // get the number of seconds that have elapsed since 
        // startTimer() was called
        diff = (((Date.now() - start) / 1000) | 0);
        diff = duration - diff;

        var dots = diff % 5;
        dots = (dots * -1) + 5
        dots = ".".repeat(dots);

        display.innerHTML = dots;
    };
    // we don't want to wait a full second before the timer starts
    dots = timerDots();
};

/* Takes a number from the insight task as input, and returns the correct 
sequence of numbers that solves the task. */
function solveNumberTask(number) {
    const all_nums = ['1', '4', '9'];
    number = number.split('');

    let solution = number.shift();

    for (num in number) {
        if (number[num] == solution[solution.length - 1]) {
            solution += number[num];
        } else {
            solution += all_nums.filter((x) => ![number[num], solution[solution.length - 1]].includes(x))[0];
        }
    }

    solution = solution.substr(1);

    return solution
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

// PVT timer function 
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

// Shared trials ---------------------------------------------------------------------------------------

var enter_fullscreen = {
    type: jsPsychFullscreen,
    message: '<p>Der Browser wird nun in den Vollbildmodus wechseln.</p><br>',
    button_label: 'weiter',
    fullscreen_mode: true,
    delay_after: 500
}

var exit_fullscreen = {
    type: jsPsychFullscreen,
    fullscreen_mode: false,
    delay_after: 0
}
