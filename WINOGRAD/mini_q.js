/**
 * mini_q.js - jsPsych implementation
 * 
 * Based on the computerized version of the mini-q
 * Updated for jsPsych 7 compatibility
 */
console.log("loding miniq")

// Function to create the timeline - will be called from HTML after jsPsych is initialized
function createMiniQTimeline(jsPsych) {
  console.log("Creating mini-q timeline with jsPsych:", jsPsych);
  
  // First, validate that we have a proper jsPsych instance
  if (!jsPsych || typeof jsPsych.run !== 'function') {
    console.error("Invalid jsPsych instance provided to createMiniQTimeline");
    return [];
  }

  // Add CSS styles directly to document head
  var styleElement = document.createElement('style');
  styleElement.textContent = `
    .mini-q-container {
      max-width: 870px;
      margin: 0 auto;
      font-family: Arial, sans-serif;
    }
  
    /* Tabellen-Styling mit Überschreibungen für die alternierenden Zeilen */
    .mini-q-table {
      width: 100%;
      border-spacing: 0;
      margin-bottom: 20px;
      border-collapse: collapse;
    }
    
    /* Überschreibe jegliches Styling für Tabellenzeilen */
    .mini-q-table tr,
    .mini-q-table tr:nth-child(odd),
    .mini-q-table tr:nth-child(even),
    .mini-q-table tbody tr,
    .mini-q-table tbody tr:nth-child(odd),
    .mini-q-table tbody tr:nth-child(even) {
      background-color: transparent !important;
    }
    
    /* Überschreibe jegliches Styling für Tabellenzellen */
    .mini-q-table th,
    .mini-q-table td,
    .mini-q-table tbody th,
    .mini-q-table tbody td {
      padding: 10px;
      text-align: center;
      vertical-align: middle;
      border-bottom: 1px solid #ddd;
      background-color: transparent !important;
    }
    
    .mini-q-table th:first-child,
    .mini-q-table td:first-child {
      width: 55%;
      text-align: left;
    }
    
    .mini-q-table th:nth-child(2),
    .mini-q-table td:nth-child(2) {
      width: 30%;
    }
    
    .mini-q-table th:last-child,
    .mini-q-table td:last-child {
      width: 15%;
    }
    
    /* Styling für die geometrischen Figuren */
    .mini-q-shapes {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 40px;
    }
    
    .circle {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background-color: #000;
      margin-right: 5px;
    }
    
    .triangle {
      width: 0;
      height: 0;
      border-left: 15px solid transparent;
      border-right: 15px solid transparent;
      border-bottom: 30px solid #000;
      margin-right: 5px;
    }
    
    .square {
      width: 30px;
      height: 30px;
      background-color: #000;
      margin-right: 5px;
    }
    
    .space {
      width: 30px;
      height: 30px;
      margin-right: 5px;
    }
    
    /* Styling für die Auswahlknöpfe */
    .choice-btn-container {
      display: flex;
      justify-content: space-around;
      gap: 40px; /* Mehr Abstand zwischen den Buttons */
    }
    
    .choice-btn {
      display: inline-block;
      width: 80px;
      height: 30px;
      border: 1px solid #000;
      text-align: center;
      line-height: 30px;
      cursor: pointer;
      user-select: none;
      background-color: white;
    }
    
    .choice-btn.selected {
      background-color: #4CAF50; /* Grün wenn ausgewählt */
      color: white;
    }
    
    /* Animation für Fehlerhinweise */
    .errorshake {
      animation: shake 0.5s;
    }
    
    @keyframes shake {
      0% { transform: translateX(0); }
      25% { transform: translateX(-10px); }
      50% { transform: translateX(10px); }
      75% { transform: translateX(-10px); }
      100% { transform: translateX(0); }
    }
    
    /* Timer-Styling */
    .timer {
      font-size: 50px;
      font-weight: bold;
      text-align: center;
      margin-bottom: 20px;
      color: #d9534f;
      display: none; /* Hide timer as requested */
    }
    
    /* Allgemeines Container-Styling */
    .instruction-container {
      max-width: 870px;
      margin: 0 auto;
      text-align: center;
    }
    
    /* Styling für Benachrichtigungen */
    .alert {
      padding: 15px;
      margin-bottom: 20px;
      border: 1px solid transparent;
      border-radius: 4px;
      color: #31708f;
      background-color: #d9edf7;
      border-color: #bce8f1;
    }
    
    /* Kartenbox für Lösungshinweise */
    .card {
      position: relative;
      display: flex;
      flex-direction: column;
      min-width: 0;
      word-wrap: break-word;
      background-color: #f8f9fa;
      background-clip: border-box;
      border: 1px solid rgba(0, 0, 0, 0.125);
      border-radius: 0.25rem;
      padding: 15px;
      margin-top: 20px;
    }
    
    /* Trennerlinien */
    .line {
      height: 1px;
      background-color: #ddd;
      margin: 20px 0;
    }
    
    /* Box für den "Test beginnen" Text */
    .test-begin-box {
      display: inline-block;
      padding: 5px 10px;
      border: 1px solid #000;
      background-color: #f8f9fa;
      margin: 0 5px;
    }
    
    /* Container für die geometrischen Figuren */
    .figure-container {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 20px 0;
    }
    
    /* Inline-Figuren für die Erklärungen */
    .inline-figure {
      display: flex; 
      flex-direction: column;
      align-items: center;
      margin: 0 10px;
    }
    
    .inline-figure.horizontal {
      flex-direction: row;
    }
  `;
  document.head.appendChild(styleElement);

  // ====================== INSTRUCTION SCREENS ======================
  var miniq_introductionScreen = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
      <div class="instruction-container">
        <h3>Wichtige Hinweise zur Durchführung</h3>
        <p>Bitte beachten Sie, dass Sie diese Studie an einem Laptop oder PC durchführen sollten.</p>
        <p>Bitte beachten Sie zudem, dass Sie diese Studie in einer <b>ruhigen Umgebung</b> und <b>ohne Ablenkungen</b> durchführen sollten. Stellen Sie bitte sicher, dass Sie nicht durch Benachrichtigungen (E-Mails, Smartphone) oder durch andere Menschen gestört werden.</p>
      </div>
    `,
    choices: ['Weiter']
  };

  var miniq_explanation1 = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
      <div class="instruction-container">
        <h1 style="text-align: center;">Erklärung Ihrer Aufgabe</h1>
        <p>Im Folgenden werden Ihnen einige kurze Sätze dargeboten, jeweils gefolgt von einer Grafik. Die Grafik besteht immer aus einem Kreis, einem Dreieck und einem Viereck. Das Dreieck steht dabei immer zwischen den beiden anderen Figuren. Es ist immer näher an der einen Figur als an der anderen. Das kann dann so aussehen:</p>
        
        <div class="figure-container">
          <div class="circle"></div>
          <div class="triangle"></div>
          <div class="space"></div>
          <div class="square"></div>
        </div>
        
        <p>In diesem Beispiel ist das Dreieck näher am Kreis als am Viereck. Wenn das Dreieck nah bei einer anderen Figur ist, bedeutet das, dass es diese Figur <b>vorzieht</b>. Wenn das Dreieck dagegen fern von einer anderen Figur ist, bedeutet das, dass es diese Figur <b>ablehnt</b>.</p>
      </div>
    `,
    choices: ['Weiter']
  };

  var miniq_explanation2 = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `<br><br>
      <div class="instruction-container">
        <div class="figure-container horizontal">
          <div class="circle"></div>
          <div class="triangle"></div>
          <div class="space"></div>
          <div class="square"></div>
        </div>
        
        <p>Die Grafik oben kann man also auf verschiedene Arten beschreiben, zum Beispiel: (1) Das Dreieck zieht den Kreis vor, (2) das Dreieck lehnt das Viereck ab, (3) das Viereck wird vom Dreieck abgelehnt, (4) das Viereck wird vom Dreieck nicht vorgezogen etc.</p>
        
        <p>Alle diese Aussagen beschreiben die Grafik</p>
        
        <div style="display: flex; flex-direction: column; align-items: center; margin: 10px 0;">
          <div style="display: flex; align-items: center; margin-bottom: 5px;">
            <div class="circle"></div>
            <div class="triangle"></div>
            <div class="space"></div>
            <div class="square"></div>
          </div>
          <div><b>richtig.</b></div>
        </div>
        
        <p>Sie stimmen auch für diese Grafik:</p>
        
        <div style="display: flex; flex-direction: column; align-items: center; margin: 10px 0;">
          <div style="display: flex; align-items: center; margin-bottom: 5px;">
            <div class="square"></div>
            <div class="space"></div>
            <div class="triangle"></div>
            <div class="circle"></div>
          </div>
          <div>(wenn sie also spiegelverkehrt ist).</div>
        </div>
        
        <p>Sieht die Grafik allerdings so</p>
        
        <div style="display: flex; flex-direction: column; align-items: center; margin: 10px 0;">
          <div style="display: flex; align-items: center; margin-bottom: 5px;">
            <div class="circle"></div>
            <div class="space"></div>
            <div class="triangle"></div>
            <div class="square"></div>
          </div>
        </div>
        
        <p>oder so</p>
        
        <div style="display: flex; flex-direction: column; align-items: center; margin: 10px 0;">
          <div style="display: flex; align-items: center; margin-bottom: 5px;">
            <div class="square"></div>
            <div class="triangle"></div>
            <div class="space"></div>
            <div class="circle"></div>
          </div>
          <div>aus (hier ist das Dreieck näher am Viereck als der Kreis), so sind die Aussagen <b>falsch</b>.</div>
        </div>
      </div><br>
    `,
    choices: ['Weiter']
  };

  var miniq_explanation3 = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
      <div class="instruction-container">
        <p><b>Auf den folgenden Seiten werden Ihnen einige Beispielaufgaben gezeigt.</b></p>
        <p>Ihre Aufgabe wird es sein, die Ihnen präsentierten Sätze zu lesen und für jeden Satz zu entscheiden, ob er die darauf folgende Grafik richtig beschreibt. Wenn Sie der Meinung sind, dass die Beschreibung richtig ist, klicken Sie auf den linken Quaderschalter. Wenn Sie der Meinung sind, dass die Beschreibung falsch ist, klicken Sie auf den rechten Quaderschalter.</p>
      </div>
    `,
    choices: ['Weiter']
  };

  // ====================== PRACTICE TRIALS ======================
  var miniq_practiceTrials = {
    type: jsPsychHtmlButtonResponse,
    stimulus: function() {
      return `
        <div class="instruction-container">
          <p>Schauen Sie sich die folgenden Übungsbeispiele an. Beispiel 1 und 2 sind schon angekreuzt, lesen Sie sich die Beispiele durch und lösen Sie dann die Übungsaufgaben 3 bis 6.</p>
          
          <div class="mini-q-container">
            <table class="mini-q-table">
              <thead>
                <tr>
                  <th>Aufgabe</th>
                  <th></th>
                  <th>
                    <div class="choice-btn-container">
                      <span>richtig</span>
                      <span>falsch</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <!-- Example 1 (pre-checked) -->
                <tr>
                  <td>1. &nbsp; &nbsp; Das Dreieck zieht den Kreis vor</td>
                  <td>
                    <div class="mini-q-shapes">
                      <div class="square"></div>
                      <div class="space"></div>
                      <div class="triangle"></div>
                      <div class="circle"></div>
                    </div>
                  </td>
                  <td>
                    <div class="choice-btn-container">
                      <div class="choice-btn selected" data-value="1" data-name="bsp1"></div>
                      <div class="choice-btn" data-value="0" data-name="bsp1"></div>
                    </div>
                  </td>
                </tr>
                
                <!-- Example 2 (pre-checked) -->
                <tr>
                  <td>2. &nbsp; &nbsp; Das Dreieck lehnt den Kreis ab</td>
                  <td>
                    <div class="mini-q-shapes">
                      <div class="circle"></div>
                      <div class="triangle"></div>
                      <div class="space"></div>
                      <div class="square"></div>
                    </div>
                  </td>
                  <td>
                    <div class="choice-btn-container">
                      <div class="choice-btn" data-value="1" data-name="bsp2"></div>
                      <div class="choice-btn selected" data-value="0" data-name="bsp2"></div>
                    </div>
                  </td>
                </tr>
                
                <!-- Practice Question 3 -->
                <tr>
                  <td>3. &nbsp; &nbsp; Der Kreis wird vom Dreieck abgelehnt</td>
                  <td>
                    <div class="mini-q-shapes">
                      <div class="square"></div>
                      <div class="triangle"></div>
                      <div class="space"></div>
                      <div class="circle"></div>
                    </div>
                  </td>
                  <td>
                    <div class="choice-btn-container">
                      <div class="choice-btn practice-btn" data-value="1" data-name="bsp3" data-correct="1"></div>
                      <div class="choice-btn practice-btn" data-value="0" data-name="bsp3"></div>
                    </div>
                  </td>
                </tr>
                
                <!-- Practice Question 4 -->
                <tr>
                  <td>4. &nbsp; &nbsp; Das Dreieck zieht das Viereck nicht vor</td>
                  <td>
                    <div class="mini-q-shapes">
                      <div class="square"></div>
                      <div class="triangle"></div>
                      <div class="space"></div>
                      <div class="circle"></div>
                    </div>
                  </td>
                  <td>
                    <div class="choice-btn-container">
                      <div class="choice-btn practice-btn" data-value="1" data-name="bsp4"></div>
                      <div class="choice-btn practice-btn" data-value="0" data-name="bsp4" data-correct="1"></div>
                    </div>
                  </td>
                </tr>
                
                <!-- Practice Question 5 -->
                <tr>
                  <td>5. &nbsp; &nbsp; Das Viereck wird vom Dreieck vorgezogen</td>
                  <td>
                    <div class="mini-q-shapes">
                      <div class="circle"></div>
                      <div class="space"></div>
                      <div class="triangle"></div>
                      <div class="square"></div>
                    </div>
                  </td>
                  <td>
                    <div class="choice-btn-container">
                      <div class="choice-btn practice-btn" data-value="1" data-name="bsp5" data-correct="1"></div>
                      <div class="choice-btn practice-btn" data-value="0" data-name="bsp5"></div>
                    </div>
                  </td>
                </tr>
                
                <!-- Practice Question 6 -->
                <tr>
                  <td>6. &nbsp; &nbsp; Der Kreis wird vom Dreieck nicht abgelehnt</td>
                  <td>
                    <div class="mini-q-shapes">
                      <div class="circle"></div>
                      <div class="triangle"></div>
                      <div class="space"></div>
                      <div class="square"></div>
                    </div>
                  </td>
                  <td>
                    <div class="choice-btn-container">
                      <div class="choice-btn practice-btn" data-value="1" data-name="bsp6" data-correct="1"></div>
                      <div class="choice-btn practice-btn" data-value="0" data-name="bsp6"></div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            
            <div class="card">
              <p><strong>Lösung:</strong><br>
              Aussage 3 ist richtig. Aussage 4 ist falsch. Die Aussagen 5 und 6 sind beide richtig. Überprüfen Sie bitte, ob Sie die Übungsaufgaben richtig gelöst haben.</p>
            </div>
          </div>
        </div>
      `;
    },
    choices: ['Weiter'],
    button_html: '<button class="jspsych-btn" id="practice-next" disabled>%choice%</button>',
    on_load: function() {
      // Setup event handlers for practice trial validation
      const practiceButtons = document.querySelectorAll('.practice-btn');
      const nextButton = document.getElementById('practice-next');
      
      // Track selected choices
      const selections = {};
      
      // Add click handler to each button
      practiceButtons.forEach(btn => {
        btn.addEventListener('click', function() {
          const name = this.getAttribute('data-name');
          const value = this.getAttribute('data-value');
          
          // Deselect any previously selected button in this group
          document.querySelectorAll(`.practice-btn[data-name="${name}"]`).forEach(b => {
            b.classList.remove('selected');
          });
          
          // Select this button
          this.classList.add('selected');
          selections[name] = value;
          
          // Check if this choice is correct
          const isCorrect = this.hasAttribute('data-correct');
          
          // If not correct, shake both buttons
          if (!isCorrect) {
            const container = this.parentElement;
            container.classList.add('errorshake');
            setTimeout(() => {
              container.classList.remove('errorshake');
            }, 750);
          }
          
          // Check if all required answers are selected correctly
          const allGroups = new Set();
          const correctGroups = new Set();
          
          // Get all groups with correct answers
          document.querySelectorAll('.practice-btn[data-correct="1"]').forEach(r => {
            allGroups.add(r.getAttribute('data-name'));
          });
          
          // Get all correctly answered groups
          document.querySelectorAll('.practice-btn[data-correct="1"].selected').forEach(r => {
            correctGroups.add(r.getAttribute('data-name'));
          });
          
          // Enable button if all answers are correct
          if (allGroups.size === correctGroups.size) {
            nextButton.disabled = false;
          } else {
            nextButton.disabled = true;
          }
        });
      });
    }
  };

var miniq_startTestScreen = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
      <div class="instruction-container">
        <p class="fw-bold">Sobald Sie unten auf <span class="test-begin-box">Test beginnen</span> klicken, beginnt der eigentliche Test. Sie haben ab diesem Zeitpunkt 3 Minuten Zeit, um die Aufgaben zu lösen. Nach 3 Minuten wird der Test automatisch abgebrochen.</p>
        <p>Bearbeiten Sie die folgenden Aufgaben bitte so schnell und genau wie möglich. Beginnen Sie mit der ersten Aufgabe und bearbeiten Sie die Aufgaben eine nach der anderen. Lassen Sie keine Aufgabe aus.</p>
      </div>
    `,
    choices: ['Test beginnen']
  };

  // ====================== HELPER FUNCTIONS ======================
  // Helper function to generate HTML for the test
  function generateTestHTML(items) {
    let shapesHTML = '';
    
    // Convert shape code to HTML elements
    function shapeCodeToHTML(code) {
      const shapes = code.split('-');
      let html = '<div class="mini-q-shapes">';
      
      shapes.forEach(shape => {
        if (shape === 'C') {
          html += '<div class="circle"></div>';
        } else if (shape === 'T') {
          html += '<div class="triangle"></div>';
        } else if (shape === 'V') {
          html += '<div class="square"></div>';
        } else if (shape === 'S') {
          html += '<div class="space"></div>';
        }
      });
      
      html += '</div>';
      return html;
    }
    
    // Generate table rows for all items
    items.forEach((item, index) => {
      shapesHTML += `
        <tr>
          <td>${index + 1}. &nbsp; &nbsp; ${item.question}</td>
          <td>${shapeCodeToHTML(item.shapes)}</td>
          <td>
            <div class="choice-btn-container">
              <div class="choice-btn test-btn" data-value="1" data-name="item${index + 1}"></div>
              <div class="choice-btn test-btn" data-value="0" data-name="item${index + 1}"></div>
            </div>
          </td>
        </tr>
      `;
    });
    
    // Return the complete HTML
    return `
      <div class="mini-q-container">
        <div class="timer">3:00</div>
        <p>Bitte bearbeiten Sie nun die folgenden Aufgaben so schnell und genau wie möglich – eine nach der anderen. Lassen Sie keine Aufgabe aus!</p>
        <form id="mini-q-form">
          <table class="mini-q-table">
            <thead>
              <tr>
                <th>Aufgabe</th>
                <th></th>
                <th>
                  <div class="choice-btn-container">
                    <span>richtig</span>
                    <span>falsch</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              ${shapesHTML}
            </tbody>
          </table>
          <div style="text-align: center; margin-top: 20px;">
            <button type="submit" class="jspsych-btn">Weiter</button>
          </div>
        </form>
      </div>
    `;
  }

  // ====================== CUSTOM PLUGIN ======================
  // Create a custom plugin compatible with jsPsych 7.x
  var jsPsychMiniQTest = (function() {
    // Define the plugin
    class MiniQTestPlugin {
      constructor(jsPsych) {
        this.jsPsych = jsPsych;
      }
      
      trial(display_element, trial) {
        // Display the form with all questions
        display_element.innerHTML = generateTestHTML(trial.test_items);
        
        // Setup event handlers for the choice buttons
        const testButtons = display_element.querySelectorAll('.test-btn');
        const selections = {};
        
        testButtons.forEach(btn => {
          btn.addEventListener('click', function() {
            const name = this.getAttribute('data-name');
            const value = this.getAttribute('data-value');
            
            // Deselect any previously selected button in this group
            display_element.querySelectorAll(`.test-btn[data-name="${name}"]`).forEach(b => {
              b.classList.remove('selected');
            });
            
            // Select this button
            this.classList.add('selected');
            selections[name] = value;
          });
        });
        
        // Start the timer
        const timerEl = display_element.querySelector('.timer');
        let timeLeft = trial.test_duration / 1000;
        
        function updateTimer() {
          const minutes = Math.floor(timeLeft / 60);
          const seconds = timeLeft % 60;
          timerEl.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
          
          if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endTrial();
          } else {
            timeLeft--;
          }
        }
        
        updateTimer();
        const timerInterval = setInterval(updateTimer, 1000);
        
        // Set up form submission
        const form = display_element.querySelector('#mini-q-form');
        form.addEventListener('submit', function(e) {
          e.preventDefault();
          clearInterval(timerInterval);
          endTrial();
        });
        
        // Function to end the trial and collect data
        const endTrial = () => {
          // Collect the responses
          const responses = [];
          trial.test_items.forEach(function(item, index) {
            const name = `item${index + 1}`;
            const selected = display_element.querySelector(`.test-btn[data-name="${name}"].selected`);
            
            responses.push({
              question: item.question,
              shapes: item.shapes,
              answer: selected ? parseInt(selected.getAttribute('data-value')) : null,
              correct: selected ? (parseInt(selected.getAttribute('data-value')) === item.correctAnswer) : null
            });
          });
          
          // Calculate score
          const answeredQuestions = responses.filter(r => r.answer !== null);
          const correctAnswers = responses.filter(r => r.correct === true);
          
          // Clear the display
          display_element.innerHTML = '';
          
          // End the trial
          this.jsPsych.finishTrial({
            responses: responses,
            total_questions: trial.test_items.length,
            answered_questions: answeredQuestions.length,
            correct_answers: correctAnswers.length,
            score: correctAnswers.length,
            rt: trial.test_duration - (timeLeft * 1000) // Time taken in ms
          });
        };
      }
    }
    
    // Define the plugin info
    MiniQTestPlugin.info = {
      name: 'mini-q-test',
      parameters: {
        test_items: {
          type: 'object',
          default: undefined
        },
        test_duration: {
          type: 'int',
          default: 180000
        }
      }
    };
    
    return MiniQTestPlugin;
  })();

  // ====================== MAIN TEST ======================
var miniq_mainTest = {
    type: jsPsychMiniQTest,
    test_items: testItems,
    test_duration: 180000, // 3 minutes
    on_finish: function(data) {
      // Store the total score as global data
      jsPsych.data.addProperties({
        mini_q_score: data.score,
        mini_q_questions_answered: data.answered_questions,
        mini_q_total_questions: data.total_questions
      });
    }
  };

  // ====================== END SCREEN ======================
var miniq_endScreen = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
      <div class="instruction-container">
        <h2>Die Aufgabe ist nun zuende. Wir bedanken uns herzlich für Ihre Teilnahme!</h2>
        <p>Sie werden anschließend zur nächsten Aufgabe weitergeleitet. Klicken Sie dafür bitte auf "Daten speichern".</p>
      </div>
    `,
    choices: ['Daten speichern']
  };

  // Return the timeline - this will be used by jsPsych.run()
  return [
    miniq_introductionScreen,
    miniq_explanation1,
    miniq_explanation2,
    miniq_explanation3,
    miniq_practiceTrials,
    miniq_startTestScreen,
    miniq_mainTest,
    miniq_endScreen
  ];
}

// Export the function to make it available to the HTML file
window.createMiniQTimeline = createMiniQTimeline;