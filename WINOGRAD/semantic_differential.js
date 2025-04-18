var jsPsychSemanticDifferential = (function (jspsych) {
    'use strict';
  
    const info = {
      name: 'semantic-differential',
      parameters: {
        stimulus: {
          type: jspsych.ParameterType.STRING,
          pretty_name: 'Stimulus',
          default: undefined,
          description: 'The word to be rated.'
        },
        dimensions: {
          type: jspsych.ParameterType.OBJECT,
          pretty_name: 'Dimensions',
          default: undefined,
          description: 'The dimensions on which to rate the stimulus.'
        },
        randomize_dimension_order: {
          type: jspsych.ParameterType.BOOL,
          pretty_name: 'Randomize dimension order',
          default: true,
          description: 'If true, the order of dimensions will be randomized.'
        }
      }
    };
  
    class SemanticDifferentialPlugin {
      constructor(jsPsych) {
        this.jsPsych = jsPsych;
      }
  
      trial(display_element, trial) {
        display_element.innerHTML = this.generateHTML(trial);
        this.setupResponseHandling(display_element, trial);
      }
  
      generateHTML(trial) {
        let dimensions = trial.dimensions;
        if (trial.randomize_dimension_order) {
          dimensions = this.jsPsych.randomization.shuffle(dimensions);
        }
  
        let html = `
          <div id="jspsych-semantic-differential-stimulus">${trial.stimulus}</div>
          <form id="jspsych-semantic-differential-form">
        `;
  
        for (let i = 0; i < dimensions.length; i++) {
          const dim = dimensions[i];
          html += `
            <div class="jspsych-semantic-differential-row">
              <span class="jspsych-semantic-differential-left">${dim.left}</span>
              <input type="range" name="${dim.name}" min="0" max="100" value="50">
              <span class="jspsych-semantic-differential-right">${dim.right}</span>
            </div>
          `;
        }
  
        html += `
          <input type="submit" id="jspsych-semantic-differential-next" class="jspsych-btn" value="Next">
          </form>
        `;
  
        return html;
      }
  
      setupResponseHandling(display_element, trial) {
        const endTrial = () => {
          const response_data = {};
          const inputs = display_element.querySelectorAll('input[type="range"]');
          for (let i = 0; i < inputs.length; i++) {
            const name = inputs[i].name;
            const value = parseInt(inputs[i].value);
            response_data[name] = value;
          }
  
          display_element.innerHTML = '';
          this.jsPsych.finishTrial({
            rt: performance.now() - start_time,
            response: response_data,
            stimulus: trial.stimulus
          });
        };
  
        display_element.querySelector('#jspsych-semantic-differential-form').addEventListener('submit', (e) => {
          e.preventDefault();
          endTrial();
        });
  
        var start_time = performance.now();
      }
    }
  
    SemanticDifferentialPlugin.info = info;
  
    return SemanticDifferentialPlugin;
  })(jsPsychModule);