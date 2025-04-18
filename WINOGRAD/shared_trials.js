// shared_trials.js

// Shared trials ---------------------------------------------------------------------------------------

var enter_fullscreen = {
  type: jsPsychFullscreen,
  message: '<p>Der Browser wird nun in den Vollbildmodus wechseln.</p><br>',
  button_label: 'weiter',
  fullscreen_mode: true,
  data: {
      trial: "enterFullscreen",
  },
  delay_after: 500
}

var exit_fullscreen = {
  type: jsPsychFullscreen,
  fullscreen_mode: false,
  data: {
      trial: "exitFullscreen",
  },
  delay_after: 0
}
