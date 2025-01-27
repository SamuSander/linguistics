var stories = [
    "story.mp3", // Ensure this path is correct relative to your HTML file
  ];
  
  // If you have multiple nested arrays, you can use .flat(), but for a single-level array, it's optional
  var preloadStory = stories.flat();
  
  // Define the preload trial for audio
  var preloadAudio = {
    type: jsPsychPreload,
    audio: preloadStory
  };
  