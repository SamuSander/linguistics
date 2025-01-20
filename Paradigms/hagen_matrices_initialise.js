// INITIALISE
// Initialise a few variables for experimental settings

let instructionsWidth = 800; // in px; display width of the instructions
let matrixWidth = 300;
let optionWidth = 100;

// Image paths
let imagePath = './hagen_matrices/';

// Example timeline variables
let nOptions = 6;

var exampleQuestionOptions1 = ["Example 1_Sol_1ar", "Example 1_Sol_2r", "Example 1_Sol_3r", "Example 1_Sol_4r", "Example 1_Sol_5r", "Example 1_Sol_6r"];
var exampleQuestionOptions2 = ["Example 2_Sol_1r", "Example 2_Sol_2r", "Example 2_Sol_3r", "Example 2_Sol_4ar", "Example 2_Sol_5r", "Example 2_Sol_6r"];
var exampleSolutionOptions1 = ["Example 1_Sol_1br", "Example 1_Sol_2r", "Example 1_Sol_3r", "Example 1_Sol_4r", "Example 1_Sol_5r", "Example 1_Sol_6r"];
var exampleSolutionOptions2 = ["Example 2_Sol_1r", "Example 2_Sol_2r", "Example 2_Sol_3r", "Example 2_Sol_4br", "Example 2_Sol_5r", "Example 2_Sol_6r"];

for (let i = 0; i < nOptions; i ++) {
    exampleQuestionOptions1[i] = `${imagePath}${exampleQuestionOptions1[i]}.png`;
    exampleQuestionOptions2[i] = `${imagePath}${exampleQuestionOptions2[i]}.png`;
    exampleSolutionOptions1[i] = `${imagePath}${exampleSolutionOptions1[i]}.png`;
    exampleSolutionOptions2[i] = `${imagePath}${exampleSolutionOptions2[i]}.png`;
};

// Main task timeline variables
let nTrials = 20;

var matrices = [];
var options = [];
var correctAnswers = [6, 4, 1, 6, 3, 6, 5, 3, 6, 2, 4, 2, 5, 6, 2, 2, 1, 3, 4, 3];
var leadingZero = "";

for (let i = 0; i < nTrials; i ++) {
    if (i + 1 < 10) leadingZero = "0"; 

    matrices[i] = `${imagePath}M${leadingZero}${[i + 1]}r.png`;

    tempOptions = [];

    for (let j = 0; j < nOptions; j ++) {
        tempOptions[j] = `${imagePath}M${leadingZero}${[i + 1]}_Sol_${j + 1}r.png`;
    }

    options[i] = tempOptions;

    leadingZero = "";
};

let matrixTimelineVars = [];

for (let i = 0; i < nTrials; i ++) {
    matrixTimelineVars.push({
        matrix: `<img src="${matrices[i]}" width=${matrixWidth}><hr>`,
        options: options[i],
        name: 'matrix' + [i + 1],
        correctAnswer: correctAnswers[i]
 });
};
