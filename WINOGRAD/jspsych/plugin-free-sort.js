// jspsych-plugin-digit-span-recall.js
// -----------------------------------
// A jsPsych 7 plugin to collect a digit‐span recall via an on‑screen numpad.
// Displays a keypad, records the sequence the participant taps, and computes accuracy.
//
// Usage in timeline:
// {
//   type: DigitSpanRecallPlugin,
//   correct_order: () => currentSequence,    // function returning the array of digits to recall
//   trial_duration: null,                    // ms to wait before auto‑ending (null = no limit)
//   size_cells: 80                           // px size of each numpad button
// }

import { ParameterType } from '@jspsych/core';

const info = {
  name: 'digit-span-recall',
  parameters: {
    /** How long to allow recall (ms). null = no limit. */
    trial_duration: {
      type: ParameterType.INT,
      default: null
    },
    /** Size in px of each numpad cell */
    size_cells: {
      type: ParameterType.INT,
      default: 80
    },
    /** The correct sequence of digits, as an array of strings */
    correct_order: {
      type: ParameterType.COMPLEX,
      default: undefined
    }
  }
};

class DigitSpanRecallPlugin {

  constructor(jsPsych) {
    this.jsPsych = jsPsych;
  }

  trial(display_element, trial, on_load) {
    // copy the correct sequence
    const correct = trial.correct_order.slice();
    let recalled = [];
    let displayStr = '';
    const size = trial.size_cells;
    const buttons = ['1','2','3','4','5','6','7','8','9','0'];

    // render the numpad + recall display
    const render = () => {
      display_element.innerHTML = `
        <div id="recall-space" style="font-size:24px; margin-bottom:20px;">${displayStr}</div>
        <div id="button-grid" 
             style="display:grid; grid-template-columns:repeat(3, ${size}px); gap:5px;"></div>
        <div style="margin-top:10px;">
          <button id="btn-back">← Delete</button>
          <button id="btn-cont">Continue</button>
        </div>`;
      const grid = display_element.querySelector('#button-grid');
      // add buttons 1–9
      for (let i=0; i<9; i++){
        const btn = document.createElement('button');
        btn.textContent = buttons[i];
        btn.style.width = btn.style.height = size + 'px';
        btn.addEventListener('click', () => {
          recalled.push(buttons[i]);
          displayStr = recalled.join(' ');
          document.querySelector('#recall-space').textContent = displayStr;
        });
        grid.appendChild(btn);
      }
      // add zero in middle row
      const zeroBtn = document.createElement('button');
      zeroBtn.textContent = '0';
      zeroBtn.style.gridColumn = '2 / 3';
      zeroBtn.style.width = zeroBtn.style.height = size + 'px';
      zeroBtn.addEventListener('click', () => {
        recalled.push('0');
        displayStr = recalled.join(' ');
        document.querySelector('#recall-space').textContent = displayStr;
      });
      grid.appendChild(zeroBtn);

      // delete
      display_element.querySelector('#btn-back')
        .addEventListener('click', () => {
          recalled.pop();
          displayStr = recalled.join(' ');
          document.querySelector('#recall-space').textContent = displayStr;
        });

      // finish
      display_element.querySelector('#btn-cont')
        .addEventListener('click', () => finishTrial());
    };

    // set up trial timer if needed
    let timeoutID = null;
    if (trial.trial_duration !== null) {
      timeoutID = this.jsPsych.pluginAPI.setTimeout(() => {
        finishTrial();
      }, trial.trial_duration);
    }

    // end trial, compute accuracy, save data
    const finishTrial = () => {
      if (timeoutID) this.jsPsych.pluginAPI.clearAllTimeouts();
      const rt = Date.now() - startTime;
      let accuracy = 0;
      if (recalled.length === correct.length &&
          recalled.every((v,i) => v === correct[i])) {
        accuracy = 1;
      }
      const trialData = {
        rt,
        recall: recalled,
        stimuli: correct,
        accuracy
      };
      display_element.innerHTML = '';
      this.jsPsych.finishTrial(trialData);
    };

    // start
    const startTime = Date.now();
    render();
    if (on_load) on_load();
  }
}

DigitSpanRecallPlugin.info = info;
export default DigitSpanRecallPlugin;
