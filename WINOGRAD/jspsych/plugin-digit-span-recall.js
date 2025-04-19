var jsPsychDigitSpanRecall = (function (jspsych) {
  'use strict';

  const info = {
    name: "digit-span-recall",
    parameters: {
      trial_duration: {
        type: jspsych.ParameterType.INT,
        pretty_name: 'Trial duration',
        default: null,
        description: 'How long to show the trial.'
      },
      size_cells: {
        type: jspsych.ParameterType.INT,
        pretty_name: 'Size of cells',
        default: 80,
        description: 'Size of each cell of numpad.'
      },
      correct_order: {
        type: jspsych.ParameterType.COMPLEX,
        default: undefined,
        description: 'The correct sequence to be recalled'
      }
    }
  };

  /**
   * **digit-span-recall**
   *
   * jsPsych plugin for digit span recall task
   *
   */
  class DigitSpanRecallPlugin {
    constructor(jsPsych) {
      this.jsPsych = jsPsych;
    }

    trial(display_element, trial, on_load) {
      // Making matrix
      const grid = 3;
      let recalledGrid = [];
      const correctGrid = typeof trial.correct_order === 'function' ? trial.correct_order() : trial.correct_order;
      let display = " ";

      // Wichtig: Diese Mapping entspricht dem ursprünglichen Plugin
      const numbertobutton = {
        "0": "1",
        "1": "2",
        "2": "3",
        "3": "4",
        "4": "5",
        "5": "6",
        "6": "7",
        "7": "8",
        "8": "9",
        "9": "0"
      };

      // Create matrix positions
      let matrix = [];
      for (let i = 0; i < grid; i++) {
        for (let h = 0; h < grid; h++) {
          matrix.push([i, h]);
        }
      }
      matrix.push([3, 1]); // Add the extra button position (0)

      const paper_size = [(grid * trial.size_cells), ((grid + 1) * trial.size_cells) + 80];

      // Ähnlich wie die alte Version - HTML direkt setzen
      display_element.innerHTML = '<div id="jspsych-html-button-response-btngroup" style="position: relative; width:' + paper_size[0] + 'px; height:' + paper_size[1] + 'px"></div>';
      const paper = display_element.querySelector("#jspsych-html-button-response-btngroup");

      paper.innerHTML += '<div class="recall-space" style="position: absolute; top:'+ 0 +'px; left:'+(paper_size[0]/2-300)+'px; width:600px; height:64px" id="recall_space">'+ display +'</div>';

      const buttons = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

      // Definiere globale Funktionen für onClick, ähnlich wie im ursprünglichen Plugin
      window.recordClick = (data) => {
        const tt = data.getAttribute('id');
        const selector = "#" + tt;
        display_element.querySelector(selector).className = 'jspsych-digit-span-recall';
        const recalledN = data.getAttribute('data-choice');
        recalledGrid.push(numbertobutton[recalledN]);
        const div = display_element.querySelector('#recall_space');
        display += numbertobutton[recalledN] + " ";
        div.innerHTML = display;
      };

      window.clearSpace = () => {
        recalledGrid = recalledGrid.slice(0, (recalledGrid.length - 1));
        const div = display_element.querySelector('#recall_space');
        display = display.slice(0, (display.length - 2));
        div.innerHTML = display;
      };

      // Verwende den innerHTML-Ansatz wie im Originalcode
      for (let i = 0; i < matrix.length; i++) {
        const str = buttons[i];
        paper.innerHTML += '<div class="jspsych-digit-span-recall" style="position: absolute; top:'+ (matrix[i][0]*(trial.size_cells-3)+80) +'px; left:'+matrix[i][1]*(trial.size_cells-3)+'px; width:'+(trial.size_cells-6)+'px; height:'+(trial.size_cells-6)+'px" id="jspsych-spatial-span-grid-button-' + i +'" data-choice="'+i+'" onclick="recordClick(this)">'+str+'</div>';
      }

      // Control buttons auch mit innerHTML
      display_element.innerHTML += '<div class="jspsych-btn-numpad" style="display: inline-block; margin:'+0+' '+-10+'" id="jspsych-html-button-response-button-clear" onclick="clearSpace(this)">Backspace</div>';
      display_element.innerHTML += '<div class="jspsych-btn-numpad" style="display: inline-block; margin:'+20+' '+40+'" id="jspsych-html-button-response-button">Continue</div>';

      const start_time = performance.now();
      let response = {
        rt: null,
        button: null
      };

      // Event listener für den Continue-Button
      display_element.querySelector('#jspsych-html-button-response-button').addEventListener('click', () => {
        let accuracy = 1;
        
        // Überprüfe Genauigkeit
        if (correctGrid.length === recalledGrid.length) {
          for (let i = 0; i < correctGrid.length; i++) {
            if (recalledGrid[i] !== correctGrid[i]) {
              accuracy = 0;
              break;
            }
          }
        } else {
          accuracy = 0;
        }

        after_response(accuracy);
      });

      const after_response = (choice) => {
        // Measure RT
        const end_time = performance.now();
        const rt = Math.round(end_time - start_time);
        
        response.button = choice;
        response.rt = rt;

        end_trial();
      };

      // Set timeout if trial_duration is set
      if (trial.trial_duration !== null) {
        this.jsPsych.pluginAPI.setTimeout(() => {
          end_trial();
        }, trial.trial_duration);
      }

      const end_trial = () => {
        // Clear timeouts
        this.jsPsych.pluginAPI.clearAllTimeouts();

        // Gather data
        const trial_data = {
          rt: response.rt,
          recall: recalledGrid,
          stimuli: correctGrid,
          accuracy: response.button
        };

        // Clear display
        display_element.innerHTML = '';

        // Clean up global functions
        delete window.recordClick;
        delete window.clearSpace;

        // Finish trial
        this.jsPsych.finishTrial(trial_data);
      };

      // Signalisiere, dass der Trial geladen ist
      if (on_load) {
        on_load();
      }
    }

    simulate(trial, simulation_mode, simulation_options, load_callback) {
      if (simulation_mode == "data-only") {
        load_callback();
        this.simulate_data_only(trial, simulation_options);
      }
      if (simulation_mode == "visual") {
        this.simulate_visual(trial, simulation_options, load_callback);
      }
    }

    create_simulation_data(trial, simulation_options) {
      const correctGrid = typeof trial.correct_order === 'function' ? trial.correct_order() : trial.correct_order;
      const defaultData = {
        rt: this.jsPsych.randomization.sampleExGaussian(2000, 200, 0.01, true),
        recall: correctGrid.slice(), // Copy the correct sequence by default
        stimuli: correctGrid,
        accuracy: 1
      };

      // Randomly introduce errors if specified
      if (simulation_options && simulation_options.introduce_error) {
        const errorChance = simulation_options.error_chance || 0.2;
        if (Math.random() < errorChance) {
          // Modify one item in the recalled sequence
          const indexToChange = Math.floor(Math.random() * defaultData.recall.length);
          const originalValue = defaultData.recall[indexToChange];
          let newValue;
          do {
            newValue = String(Math.floor(Math.random() * 10));
          } while (newValue === originalValue);
          
          defaultData.recall[indexToChange] = newValue;
          defaultData.accuracy = 0;
        }
      }

      const data = this.jsPsych.pluginAPI.mergeSimulationData(defaultData, simulation_options);
      return data;
    }

    simulate_data_only(trial, simulation_options) {
      const data = this.create_simulation_data(trial, simulation_options);
      this.jsPsych.finishTrial(data);
    }

    simulate_visual(trial, simulation_options, load_callback) {
      const data = this.create_simulation_data(trial, simulation_options);
      const display_element = this.jsPsych.getDisplayElement();
      
      this.trial(display_element, trial, load_callback);
      
      // Simulate button clicks for each item in the recall sequence
      let rt = this.jsPsych.randomization.sampleExGaussian(500, 100, 0.01, true);
      
      // Map from button values (1-0) to button indices (0-9)
      const buttonIndexMap = {
        "1": 0, "2": 1, "3": 2, "4": 3, "5": 4, 
        "6": 5, "7": 6, "8": 7, "9": 8, "0": 9
      };
      
      const simulateRecall = () => {
        for (let i = 0; i < data.recall.length; i++) {
          setTimeout(() => {
            const buttonIndex = buttonIndexMap[data.recall[i]];
            const button = display_element.querySelector(`#jspsych-spatial-span-grid-button-${buttonIndex}`);
            if (button) {
              this.jsPsych.pluginAPI.clickTarget(button);
            }
          }, rt);
          rt += this.jsPsych.randomization.sampleExGaussian(500, 100, 0.01, true);
        }
        
        // Click the continue button after entering all digits
        setTimeout(() => {
          const continueButton = display_element.querySelector('#jspsych-html-button-response-button');
          if (continueButton) {
            this.jsPsych.pluginAPI.clickTarget(continueButton);
          }
        }, rt + 500);
      };
      
      setTimeout(simulateRecall, 500);
    }
  }
  DigitSpanRecallPlugin.info = info;

  return DigitSpanRecallPlugin;
})(jsPsychModule);