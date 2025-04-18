// aqK_german.js

// AQ-K ---------------------------------------------------------------------------------------------

// Autismus Spektrum Quotient - Kurzversion (AQ-K)
// Basierend auf Baron-Cohen et al., 2001 und der offiziellen deutschen Version von Christine Freitag

var aqKOptions = [
    "ich stimme eindeutig zu",
    "ich stimme ein wenig zu",
    "ich stimme eher nicht zu",
    "ich stimme überhaupt nicht zu"
];

// Die Items mit ihrer Bewertungsrichtung
// TRUE bedeutet: "ich stimme eindeutig zu" oder "ich stimme ein wenig zu" = 1 Punkt
// FALSE bedeutet: "ich stimme eher nicht zu" oder "ich stimme überhaupt nicht zu" = 1 Punkt
// Basierend auf Baron-Cohen et al. (2001)
var aqKQuestions = [
    {
        prompt: "Ich mache lieber Sachen mit anderen als alleine.",
        scoring: false // Punkt für Ablehnung
    },
    {
        prompt: "Ich mache bestimmte Sachen gerne immer wieder auf dieselbe Art und Weise.",
        scoring: true // Punkt für Zustimmung
    },
    {
        prompt: "Wenn ich mir etwas vorzustellen versuche, fällt es mir sehr leicht, ein Bild im Kopf entstehen zu lassen.",
        scoring: false // Punkt für Ablehnung
    },
    {
        prompt: "Andere Menschen sagen mir häufig, dass das, was ich gesagt habe, unhöflich war, obwohl ich denke, es sei höflich gewesen.",
        scoring: true // Punkt für Zustimmung
    },
    {
        prompt: "Wenn ich eine Geschichte lese, kann ich mir leicht vorstellen, wie die Figuren in der Geschichte aussehen könnten.",
        scoring: false // Punkt für Ablehnung
    },
    {
        prompt: "Ich kann in einer Gruppe leicht den Gesprächen von mehreren unterschiedlichen Menschen folgen.",
        scoring: false // Punkt für Ablehnung
    },
    {
        prompt: "In sozialen Situationen fühle ich mich wohl.",
        scoring: false // Punkt für Ablehnung
    },
    {
        prompt: "Ich würde lieber in die Bibliothek als zu einer Party gehen.",
        scoring: true // Punkt für Zustimmung
    },
    {
        prompt: "Mir fällt es leicht, Geschichten zu erfinden.",
        scoring: false // Punkt für Ablehnung
    },
    {
        prompt: "Ich fühle mich eher von Menschen als von Gegenständen angezogen.",
        scoring: false // Punkt für Ablehnung
    },
    {
        prompt: "Ich genieße Gespräche über Land und Leute.",
        scoring: false // Punkt für Ablehnung
    },
    {
        prompt: "Wenn ich eine Geschichte lese, fällt es mir schwer, mir die Absichten der Figuren auszumalen.",
        scoring: true // Punkt für Zustimmung
    },
    {
        prompt: "Mir fällt es schwer, neue Freunde kennen zu lernen.",
        scoring: true // Punkt für Zustimmung
    },
    {
        prompt: "Es macht mir nichts aus, wenn sich mein Tagesablauf verändert.",
        scoring: false // Punkt für Ablehnung
    },
    {
        prompt: "Ich stelle oft fest, dass ich nicht weiß, wie ich ein Gespräch aufrechterhalten kann.",
        scoring: true // Punkt für Zustimmung
    },
    {
        prompt: "Es fällt mir leicht, Zwischentöne zu verstehen, wenn sich jemand mit mir unterhält.",
        scoring: false // Punkt für Ablehnung
    },
    {
        prompt: "Wenn ich mit jemandem rede, merke ich, wenn es ihm/ihr langweilig wird.",
        scoring: false // Punkt für Ablehnung
    },
    {
        prompt: "Mir fällt es leicht, mehrere Sachen gleichzeitig zu machen.",
        scoring: false // Punkt für Ablehnung
    },
    {
        prompt: "Wenn ich mit jemandem telefoniere, weiß ich nicht genau, wann ich an der Reihe bin.",
        scoring: true // Punkt für Zustimmung
    },
    {
        prompt: "Ich bin gerne spontan.",
        scoring: false // Punkt für Ablehnung
    },
    {
        prompt: "Ich verstehe Pointen bei einem Witz oft als allerletzte/r.",
        scoring: true // Punkt für Zustimmung
    },
    {
        prompt: "Mir fällt es leicht herauszufinden, was jemand denkt, wenn ich nur auf ihr/sein Gesicht schaue.",
        scoring: false // Punkt für Ablehnung
    },
    {
        prompt: "Wenn ich unterbrochen worden bin, kann ich schnell mit meiner vorherigen Tätigkeit weitermachen.",
        scoring: false // Punkt für Ablehnung
    },
    {
        prompt: "Mir macht es Spaß, mich mit Leuten zu unterhalten.",
        scoring: false // Punkt für Ablehnung
    },
    {
        prompt: "Oft wird mir erzählt, dass ich ständig über dieselben Dinge spreche.",
        scoring: true // Punkt für Zustimmung
    },
    {
        prompt: "Als ich klein war, habe ich gerne Rollenspiele mit anderen Kindern gespielt.",
        scoring: false // Punkt für Ablehnung
    },
    {
        prompt: "Mir fällt es schwer, mich in andere Personen hineinzuversetzen.",
        scoring: true // Punkt für Zustimmung
    },
    {
        prompt: "Ich genieße soziale Ereignisse.",
        scoring: false // Punkt für Ablehnung
    },
    {
        prompt: "Mir fällt es schwer zu erkennen, was andere Menschen vorhaben.",
        scoring: true // Punkt für Zustimmung
    },
    {
        prompt: "Unbekannte Situationen ängstigen mich.",
        scoring: true // Punkt für Zustimmung
    },
    {
        prompt: "Ich lerne gerne neue Leute kennen.",
        scoring: false // Punkt für Ablehnung
    },
    {
        prompt: "Ich bin sehr diplomatisch.",
        scoring: false // Punkt für Ablehnung
    },
    {
        prompt: "Mit fällt es leicht, Rollen- oder Phantasiespiele mit Kindern zu spielen.",
        scoring: false // Punkt für Ablehnung
    }
];

// Content-Array für die jsPsych-Fragen erstellen
var aqKContent = [];

for (let i = 0; i < aqKQuestions.length; i++) {
    aqKContent.push({
        prompt: `<b>${i+1}. ${aqKQuestions[i].prompt}</b>`,
        name: `aqk${i}`,
        labels: aqKOptions,
        required: true,
        scoring: aqKQuestions[i].scoring
    });
}

var aqK = {
    on_load: () => {
        jsPsychContent = document.getElementById('jspsych-content');
        jsPsychContent.style.maxWidth = "900px";

        // Center jspsych-btn
        var btn = document.querySelector('.jspsych-btn');
        var parentDiv = btn.parentNode;
        parentDiv.style.setProperty('text-align', 'center');
    },
    type: jsPsychSurveyLikert,
    preamble: 
    `
    <br><br>
    <div align="justify">
    <p>Der Fragebogen besteht aus einer Liste von Sätzen. Bitte, lesen Sie jeden Satz <i>sehr aufmerksam</i> durch und überlegen Sie, ob und wie stark Sie dem Satz zustimmen können. Kreuzen Sie dann die entsprechende Antwort an. Die Antworten reichen von ganz <i>starker Zustimmung</i> („Ich stimme eindeutig zu") über <i>leichte Zustimmung</i> („Ich stimme ein wenig zu") und <i>leichte Ablehnung</i> („Ich stimme eher nicht zu") zu ganz <i>starker Ablehnung</i> („Ich stimme überhaupt nicht zu").</p>
    <p>Bitte, lassen Sie keinen Satz aus.</p>
    </div>
    `,
    questions: aqKContent,
    button_label: "weiter",
    on_finish: function(data) {
        let responses = data.response;
        let total_score = 0;

        // Alle Antworten auswerten entsprechend den Baron-Cohen et al. (2001) Scoring-Regeln
        for (let i = 0; i < aqKQuestions.length; i++) {
            let response = responses[`aqk${i}`];
            let scoring_direction = aqKQuestions[i].scoring;
            
            // Scoring-Logik:
            // Wenn scoring_direction == true: Punkt für "eindeutig zu" oder "ein wenig zu" (Index 0 oder 1)
            // Wenn scoring_direction == false: Punkt für "eher nicht zu" oder "überhaupt nicht zu" (Index 2 oder 3)
            if ((scoring_direction && (response == 0 || response == 1)) || 
                (!scoring_direction && (response == 2 || response == 3))) {
                total_score += 1;
            }
        }

        // Details zu den Antworten und dem Scoring speichern
        let detail_responses = {};
        for (let i = 0; i < aqKQuestions.length; i++) {
            let item_number = i + 1;
            let response_value = responses[`aqk${i}`];
            let response_text = aqKOptions[response_value];
            let scoring_direction = aqKQuestions[i].scoring;
            let point_awarded = 0;
            
            if ((scoring_direction && (response_value == 0 || response_value == 1)) || 
                (!scoring_direction && (response_value == 2 || response_value == 3))) {
                point_awarded = 1;
            }
            
            detail_responses[`Item_${item_number}`] = {
                response_text: response_text,
                scoring_direction: scoring_direction ? "Zustimmung=Punkt" : "Ablehnung=Punkt",
                point_awarded: point_awarded
            };
        }

        // Speichern der berechneten Scores im data-Objekt
        data.aq_k = {
            total_score: total_score,
            detail_responses: detail_responses
        };
        
        // Auch als einzelnen Wert abspeichern für einfachere Analyse
        data.aq_k_total = total_score;
        
        // Interpretation des Scores
        data.aq_k_interpretation = total_score >= 17 ? "Über Cut-off (17)" : "Unter Cut-off (17)";

        // Zurücksetzen von Elementen, falls benötigt
        let jsPsychContent = document.getElementById('jspsych-content');
        if (jsPsychContent) {
            jsPsychContent.style.maxWidth = '95%';
        }
    }
};