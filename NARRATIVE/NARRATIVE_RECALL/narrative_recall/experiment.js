// experiment.js

// ---------------------
// Utility Function
// ---------------------

// Function to convert Base64 to Blob
function base64ToBlob(base64, mime) {
    // Check if the base64 string contains a data URI scheme
    if (base64.split(',')[0].indexOf('base64') >= 0) {
        base64 = base64.split(',')[1];
    }

    try {
        const byteCharacters = atob(base64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        return new Blob([byteArray], { type: mime });
    } catch (error) {
        console.error("Error converting Base64 to Blob:", error);
        return null;
    }
}

// ---------------------
// Initialize jsPsych
// ---------------------

const jsPsych = initJsPsych({
    on_data_update: function(data) {
        // Optional: Implement real-time data saving here if needed
    },
    on_finish: function() {
        // ---------------------
        // Save CSV Data
        // ---------------------
        const csv = jsPsych.data.get().csv();
        console.log("CSV Data:", csv); // Debugging
        
        if (csv) {
            const csvBlob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const csvUrl = URL.createObjectURL(csvBlob);
            const csvLink = document.createElement("a");
            csvLink.href = csvUrl;
            csvLink.download = "experiment_data.csv";
            document.body.appendChild(csvLink);
            csvLink.click();
            document.body.removeChild(csvLink);
            URL.revokeObjectURL(csvUrl);
            console.log("CSV Data downloaded successfully.");
        } else {
            alert("Keine CSV-Daten zum Speichern gefunden.");
            console.warn("CSV Data is empty.");
        }
        
        // ---------------------
        // Save Audio File
        // ---------------------
        const recallData = jsPsych.data.get().filter({ trial_type: 'free-recall' }).values();
        console.log("Recall Data:", recallData); // Debugging
    
        if (recallData.length > 0 && recallData[0].audio_url) {
            try {
                const audioUrl = recallData[0].audio_url;
                const audioLink = document.createElement("a");
                audioLink.href = audioUrl;
                audioLink.download = "recall_audio.webm";  // Change the extension to .webm
                document.body.appendChild(audioLink);
                audioLink.click();
                document.body.removeChild(audioLink);
                URL.revokeObjectURL(audioUrl);
                console.log("Audio file downloaded successfully.");
            } catch (error) {
                console.error("Error saving audio file:", error);
                alert("Es gab ein Problem beim Speichern Ihrer Audiodatei.");
            }
        } else {
            console.warn("No audio data found to save.");
            alert("Keine Audiodaten zum Speichern gefunden.");
        }

        // ---------------------
        // Optional: Redirect to Thank You Page
        // ---------------------
        // Uncomment the line below if you want to redirect after downloading
        // window.location.href = 'thank_you.html';
    },
});



// ---------------------
// Define Instructions Width
// ---------------------
const instructionsWidth = 800; // Adjust as needed

// ---------------------
// Create Timeline
// ---------------------
const timeline = [];

timeline.push(preloadAudio);

// ---------------------
// Generate Participant ID
// ---------------------
const participantID = jsPsych.randomization.randomID(6).toUpperCase();
jsPsych.data.addProperties({ participantID: participantID });

// ---------------------
// Initialize Microphone
// ---------------------
const init_mic = {
    type: jsPsychInitializeMicrophone, // Using plugin object
};
timeline.push(init_mic);

// ---------------------
// Welcome Screen
// ---------------------
const welcome = {
    type: jsPsychHtmlButtonResponse, // Using plugin object
    stimulus: `
        <div class="instructions" style="max-width:${instructionsWidth}px; text-align: center;"> 
            <img src="pics/zi_logo.svg" width="200" style="display: block; margin: 0 auto;"><br><br>
            <p>Willkommen.<br>Danke, dass Sie sich die Zeit nehmen, an unserem Experiment teilzunehmen.</p>
            <p>Klicken Sie auf 'Weiter', um zu beginnen.</p>
        </div>
    `,
    choices: ["Weiter"],
    data: { trial: "welcome" },
};
timeline.push(welcome);

// ---------------------
// Story Instructions
// ---------------------
const story_instructions = {
    type: jsPsychHtmlButtonResponse, // Using plugin object
    stimulus: `
        <div class="instructions" style="max-width:${instructionsWidth}px; text-align: center;"> 
            <p>Hören Sie sich die folgende Geschichte an. Klicken Sie auf "Start", um die Wiedergabe zu beginnen.</p>
        </div>
    `,
    choices: ['Start'],
    on_finish: function() {
        // Resume the AudioContext after user interaction
        if (jsPsych.audioContext && jsPsych.audioContext.state !== 'running') {
            jsPsych.audioContext.resume();
        }
    },
    data: { trial: 'story_instructions' },
};
timeline.push(story_instructions);

// ---------------------
// Story Presentation
// ---------------------
const story_trial = {
    type: jsPsychAudioButtonResponse, // Using plugin object
    stimulus: 'story.mp3', // Update with the actual path to your audio file
    choices: ['Weiter'],
    //button_html: '<button class="jspsych-btn" style="display: block; margin: 20px auto;">%choice%</button>',
    prompt: `
        <div class="instructions" style="max-width:${instructionsWidth}px; text-align: center;">
            <p>Die Geschichte wird abgespielt... Sie können "Weiter" klicken, um fortzufahren.</p>
        </div>
    `,
    response_allowed_while_playing: true,
    trial_ends_on_response: true,
    trial_ends_after_audio: false, // Allows the trial to end on response, regardless of audio status
    data: { trial: 'story_presentation' },
    on_start: function() {
        // Ensure AudioContext is resumed
        if (jsPsych.audioContext && jsPsych.audioContext.state !== 'running') {
            jsPsych.audioContext.resume();
        }
    },
};
timeline.push(story_trial);

// ---------------------
// Recall Trial with Microphone Visualization
/*
const recall_trial = {
    type: jsPsychHtmlAudioResponse, // Using plugin object
    stimulus: `
        <div class="instructions"> 
            <p>Bitte erzählen Sie die Geschichte so detailliert wie möglich nach.</p>
            <p>Sie können die Aufnahme jederzeit beenden, indem Sie auf "Aufnahme beenden" klicken.</p>
            <button id="stop-recording" class="jspsych-btn">Aufnahme beenden</button>
            <div id="visualizer"></div>
        </div>
    `,
    recording_duration: null, // Allow participant to control recording length
    stimulus_duration: null, // Keep stimulus visible until recording ends
    show_done_button: true, // Display the 'Stop Recording' button
    done_button_label: 'Aufnahme beenden',
    allow_playback: true,
    save_audio_url: true, // We'll handle audio saving manually
    data: { trial: 'story_recall' },
    on_start: function() {
        // Resume AudioContext
        if (jsPsych.audioContext && jsPsych.audioContext.state !== 'running') {
            jsPsych.audioContext.resume();
        }
    },
    on_load: function() {
        // Set up microphone visualization
        const visualizer = document.getElementById('visualizer');
        if (!visualizer) return;
        
        navigator.mediaDevices.getUserMedia({ audio: true, video: false })
            .then(stream => {
                const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                const analyser = audioContext.createAnalyser();
                const source = audioContext.createMediaStreamSource(stream);
                source.connect(analyser);
                analyser.fftSize = 256;
                const bufferLength = analyser.frequencyBinCount;
                const dataArray = new Uint8Array(bufferLength);
                
                function animateBall() {
                    requestAnimationFrame(animateBall);
                    analyser.getByteFrequencyData(dataArray);
                    let sum = 0;
                    for (let i = 0; i < dataArray.length; i++) {
                        sum += dataArray[i];
                    }
                    const average = sum / bufferLength;
                    // Scale the average to a suitable size (e.g., between 1 and 2)
                    const scale = 1 + (average / 128); // Adjust the divisor for sensitivity
                    visualizer.style.transform = `scale(${scale})`;
                }
                animateBall();
                
                // Store stream and audioContext to stop them later
                recall_trial.audioStream = stream;
                recall_trial.audioContext = audioContext;
            })
            .catch(err => {
                console.error('Error accessing microphone for visualization:', err);
            });
    },
    on_finish: function(data) {
        // Stop the audio visualization
        if (recall_trial.audioStream) {
            recall_trial.audioStream.getTracks().forEach(track => track.stop());
        }
        if (recall_trial.audioContext) {
            recall_trial.audioContext.close();
        }
    },
};
timeline.push(recall_trial);
*/

var jsPsychFreeRecall = (function (jspsych) {
    'use strict';

    const info = {
        name: "free-recall",
        parameters: {
            stimulus: {
                type: jspsych.ParameterType.HTML_STRING,
                default: undefined
            },
            recording_duration: {
                type: jspsych.ParameterType.INT,
                default: null
            },
            allow_playback: {
                type: jspsych.ParameterType.BOOL,
                default: true
            },
            visualizer_type: {
                type: jspsych.ParameterType.STRING,
                default: 'circle'
            },
            stop_button_text: {
                type: jspsych.ParameterType.STRING,
                default: 'Stop Recording'
            }
        }
    };

    class FreeRecallPlugin {
        constructor(jsPsych) {
            this.jsPsych = jsPsych;
        }

        trial(display_element, trial) {
            display_element.innerHTML = `
                <div id="jspsych-free-recall-stimulus">${trial.stimulus}</div>
                <div id="jspsych-free-recall-recording-container">
                    <button id="jspsych-free-recall-stop-btn" class="jspsych-btn">${trial.stop_button_text}</button>
                </div>
                <div id="jspsych-free-recall-visualizer" style="margin: 20px auto;"></div>
            `;
            let recorder;
            let audioContext;
            let analyser;
            let visualizer = document.getElementById('jspsych-free-recall-visualizer');
            let recordingStartTime;

            const stopButton = display_element.querySelector('#jspsych-free-recall-stop-btn');
            stopButton.addEventListener('click', () => {
                stopRecording();
            });

            const startRecording = () => {
                navigator.mediaDevices.getUserMedia({ audio: true })
                    .then(stream => {
                        audioContext = new (window.AudioContext || window.webkitAudioContext)();
                        analyser = audioContext.createAnalyser();
                        const source = audioContext.createMediaStreamSource(stream);
                        source.connect(analyser);

                        recorder = new MediaRecorder(stream);
                        let chunks = [];

                        recorder.ondataavailable = (e) => {
                            chunks.push(e.data);
                        };

                        recorder.onstop = () => {
                            const blob = new Blob(chunks, { 'type' : 'audio/webm;codecs=opus' });
                            const audioURL = URL.createObjectURL(blob);
                            endTrial(audioURL);
                        };

                        recorder.start();
                        recordingStartTime = Date.now();
                        visualize();
                    })
                    .catch(error => {
                        console.error("Error starting recording:", error);
                        // Handle the error, perhaps by showing a message to the user
                    });
            };

            const stopRecording = () => {
                if (recorder && recorder.state === "recording") {
                    recorder.stop();
                }
            };

            const visualize = () => {
                analyser.fftSize = 256;
                const bufferLength = analyser.frequencyBinCount;
                const dataArray = new Uint8Array(bufferLength);

                const draw = () => {
                    requestAnimationFrame(draw);
                    analyser.getByteFrequencyData(dataArray);
                    
                    let sum = dataArray.reduce((a, b) => a + b, 0);
                    let average = sum / bufferLength;
                    let scale = 1 + average / 128;

                    if (trial.visualizer_type === 'circle') {
                        visualizer.style.width = `${50 * scale}px`;
                        visualizer.style.height = `${50 * scale}px`;
                        visualizer.style.borderRadius = '50%';
                        visualizer.style.backgroundColor = 'blue';
                        visualizer.style.margin = '20px auto';
                    }
                    // Add more visualizer types here if needed
                };

                draw();
            };

            const endTrial = (audioURL) => {
                const trial_data = {
                    rt: Date.now() - recordingStartTime,
                    audio_url: audioURL,
                    response: audioURL  // Add this line to save the audio URL as the response
                };

                display_element.innerHTML = '';
                this.jsPsych.finishTrial(trial_data);
            };

            startRecording();

            // Add timeout for recording_duration if specified
            if (trial.recording_duration !== null) {
                this.jsPsych.pluginAPI.setTimeout(() => {
                    stopRecording();
                }, trial.recording_duration);
            }
        }
    }

    FreeRecallPlugin.info = info;

    return FreeRecallPlugin;
})(jsPsychModule);
const recall_trial = {
    type: jsPsychFreeRecall,
    stimulus: `
        <div class="instructions" style="max-width:${instructionsWidth}px; text-align: center;"> 
            <p>Bitte erzählen Sie die Geschichte so detailliert wie möglich nach.</p>
            <p>Die Aufnahme hat bereits begonnen. Klicken Sie auf "Aufnahme beenden", wenn Sie fertig sind.</p>
        </div>
    `,
    recording_duration: null, // Allow participant to control recording length
    allow_playback: false,
    visualizer_type: 'circle',
    stop_button_text: 'Aufnahme beenden'
};
timeline.push(recall_trial);
// ---------------------
// Conclusion
// ---------------------
const conclusion = {
    type: jsPsychHtmlButtonResponse, // Using plugin object
    stimulus: `
        <div class="instructions" style="max-width:${instructionsWidth}px; text-align: center;"> 
            <p>Danke, dass Sie an unserem Experiment teilgenommen haben.</p>
            <p>Ihre Antworten wurden aufgezeichnet. Bitte drücken Sie auf 'Beenden', um das Experiment zu beenden.</p>
        </div>
    `,
    choices: ["Beenden"],
    //button_html: '<button class="jspsych-btn" style="display: block; margin: 20px auto;">%choice%</button>',
    data: { trial: "conclusion" },
};
timeline.push(conclusion);

// ---------------------
// End Trial
// ---------------------
/*
const end_trial = {
    type: jsPsychHtmlKeyboardResponse, // Using plugin object
    stimulus: `
        <div class="instructions" style="max-width:${instructionsWidth}px; text-align: center;"> 
            <p>Sie können das Browserfenster nun schließen.</p>
        </div>
    `,
    choices: "NO_KEYS", // No response needed
    trial_duration: null, // Wait indefinitely until the browser is closed
    data: { trial: "endtrial" },
};
timeline.push(end_trial);
*/

// ---------------------
// Run the Experiment
// ---------------------
jsPsych.run(timeline);
