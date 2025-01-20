
// BUILD TIMELINE
var timeline = [];

// PVT practice
var pvtPractice = {
  timeline: [PVT_fixation, stopwatch, feedback],
  timeline_variables: pvtDurationsPractice
}

// Conditional: If participants get the practice trials wrong, they need to do them again
var pvtPracticeLoop = {
  timeline: [pvtPractice, evalPvtPractice, ifWrongPracticePVT],
  loop_function: () => repeatPractice ? true : false
};

// PVT main procedure
var pvtMainProcedure = {
  timeline: [ifFixation, ifStopwatch, ifFeedback],
  timeline_variables: pvtDurationsStudy
}

// ASSEMBLE FINAL TIMELINE
timeline.push(

  pvtStartScreen, pvtPracticeLoop,

  pvtMainInstructions, pvtMainProcedure, ifMissingFeedback,

  pvtEnd
);
