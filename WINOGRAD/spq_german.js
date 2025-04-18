// spq_german.js
// SPQ-G ---------------------------------------------------------------------------------------------

// Schizotypal Personality Questionnaire - German Version

var spqGOptions = [
    "Ja",
    "Nein"
];

var spqGQuestions = [
    { 
        prompt: "Haben Sie manchmal das Gefühl, daß Dinge, die Sie im Fernsehen sehen oder in der Zeitung lesen, für Sie eine ganz besondere Bedeutung haben?", 
        subscale: "RI" 
    },
    { 
        prompt: "Ich vermeide es manchmal, an Orte zu gehen, wo sich viele Menschen aufhalten, weil ich dort Angst bekomme.", 
        subscale: "SA" 
    },
    { 
        prompt: "Haben Sie Erfahrungen mit dem Übersinnlichen gemacht?", 
        subscale: "MD" 
    },
    { 
        prompt: "Haben Sie oftmals Gegenstände oder Schatten für Menschen gehalten, oder Geräusche für Stimmen?", 
        subscale: "UW" 
    },
    { 
        prompt: "Andere Menschen halten mich für ein wenig seltsam.", 
        subscale: "EV" 
    },
    { 
        prompt: "Ich bin wenig daran interessiert, andere Menschen kennen zu lernen.", 
        subscale: "KEF" 
    },
    { 
        prompt: "Andere Leute finden es manchmal schwierig, zu verstehen, was ich sage.", 
        subscale: "EV" 
    },
    { 
        prompt: "Die Leute finden mich manchmal unnahbar und distanziert.", 
        subscale: "EA" 
    },
    { 
        prompt: "Ich bin sicher, daß man hinter meinem Rücken über mich redet.", 
        subscale: "AW" 
    },
    { 
        prompt: "Wenn ich zum Essen oder ins Kino ausgehe, merke ich, daß mich die Leute beobachten.", 
        subscale: "RI" 
    },
    { 
        prompt: "Ich werde sehr nervös, wenn ich höfliche Konversation machen muß.", 
        subscale: "SA" 
    },
    { 
        prompt: "Glauben Sie an Gedankenübertragung?", 
        subscale: "MD" 
    },
    { 
        prompt: "Haben Sie jemals gespürt, daß irgendeine Person oder Kraft um Sie herum ist, auch wenn niemand zu sehen ist?", 
        subscale: "UW" 
    },
    { 
        prompt: "Die Leute machen manchmal Bemerkungen über mein ungewöhnliches Gehabe und meine eigentümlichen Gewohnheiten.", 
        subscale: "EV" 
    },
    { 
        prompt: "Ich ziehe es vor, für mich allein zu bleiben.", 
        subscale: "KEF" 
    },
    { 
        prompt: "Wenn ich spreche, springe ich manchmal schnell von einem Thema zum anderen.", 
        subscale: "EV" 
    },
    { 
        prompt: "Ich kann meine wahren Gefühle nicht gut durch Sprechweise und Mimik ausdrücken.", 
        subscale: "EA" 
    },
    { 
        prompt: "Haben Sie oft das Gefühl, daß andere Leute es auf Sie abgesehen haben?", 
        subscale: "AW" 
    },
    { 
        prompt: "Lassen manche Menschen Bemerkungen über Sie fallen, oder sagen sie Dinge mit einer doppelten Bedeutung?", 
        subscale: "RI" 
    },
    { 
        prompt: "Werden Sie jemals nervös, wenn jemand hinter Ihnen geht?", 
        subscale: "AW" 
    },
    { 
        prompt: "Sind Sie sich manchmal sicher, daß andere Menschen Ihre Gedanken lesen können?", 
        subscale: "RI" 
    },
    { 
        prompt: "Wenn Sie einen Menschen anschauen oder sich selbst im Spiegel betrachten, haben Sie jemals beobachtet, daß sich das Gesicht vor Ihren Augen verändert?", 
        subscale: "UW" 
    },
    { 
        prompt: "Manchmal denken andere Leute, daß ich ein bißchen merkwürdig bin.", 
        subscale: "EV" 
    },
    { 
        prompt: "In Gegenwart anderer Menschen bin ich meistens ganz still.", 
        subscale: "KEF" 
    },
    { 
        prompt: "Ich vergesse manchmal, was ich gerade zu sagen versuchte.", 
        subscale: "EV" 
    },
    { 
        prompt: "Ich lache oder lächle selten.", 
        subscale: "EA" 
    },
    { 
        prompt: "Machen Sie sich manchmal Sorgen darüber, ob Freunde oder Kollegen wirklich redlich und vertrauenswürdig sind?", 
        subscale: "AW" 
    },
    { 
        prompt: "Haben Sie jemals ein gewöhnliches Ereignis oder einen gewöhnlichen Gegenstand bemerkt, das oder der für Sie ein besonderes Zeichen darstelle?", 
        subscale: "MD" 
    },
    { 
        prompt: "Wenn ich Menschen zum ersten Mal begegne, werde ich ängstlich.", 
        subscale: "SA" 
    },
    { 
        prompt: "Glauben Sie an das Hellsehen?", 
        subscale: "MD" 
    },
    { 
        prompt: "Ich höre oft eine Stimme meine Gedanken laut aussprechen.", 
        subscale: "UW" 
    },
    { 
        prompt: "Manche Menschen denken, daß ich eine sehr wunderliche Person bin.", 
        subscale: "EV" 
    },
    { 
        prompt: "Ich finde es schwierig, einen engen emotionalen Kontakt zu anderen Menschen zu haben.", 
        subscale: "KEF" 
    },
    { 
        prompt: "Beim Sprechen schwanke ich oft zu sehr ab.", 
        subscale: "EV" 
    },
    { 
        prompt: "Meine \"nicht-sprachliche\" Kommunikation (z.B. Nicken oder Lächeln im Gespräch) ist nicht sehr ausgeprägt.", 
        subscale: "EA" 
    },
    { 
        prompt: "Ich spüre, daß ich selbst bei meinen Freunden auf der Hut sein muß.", 
        subscale: "AW" 
    },
    { 
        prompt: "Sehen Sie manchmal besondere Bedeutungen in Anzeigen, Schaufenstern oder in der Art, wie Dinge um Sie herum angeordnet sind?", 
        subscale: "RI" 
    },
    { 
        prompt: "Fühlen Sie sich oft ängstlich, wenn Sie sich in einer Gruppe fremder Menschen befinden?", 
        subscale: "SA" 
    },
    { 
        prompt: "Können andere Menschen Ihre Gefühle fühlen, auch wenn sie gar nicht anwesend sind?", 
        subscale: "MD" 
    },
    { 
        prompt: "Haben Sie jemals Dinge gesehen, die für andere Menschen unsichtbar waren?", 
        subscale: "UW" 
    },
    { 
        prompt: "Sind Sie der Meinung, daß es außerhalb ihrer engsten Verwandtschaft niemanden gibt, dem Sie wirklich alles anvertrauen können oder mit dem Sie über persönliche Probleme reden können?", 
        subscale: "KEF" 
    },
    { 
        prompt: "Manche Menschen finden, daß ich im Gespräch etwas unbestimmt und schwer zu begreifen bin.", 
        subscale: "EV" 
    },
    { 
        prompt: "Höflichkeiten und gesellige Gesten kann ich nicht gut erwidern.", 
        subscale: "EA" 
    },
    { 
        prompt: "Erkennen Sie in dem was andere sagen oder tun oft versteckte Drohungen oder Demütigungen?", 
        subscale: "AW" 
    },
    { 
        prompt: "Haben Sie während des Einkaufens das Gefühl, daß andere Menschen Notiz von Ihnen nehmen?", 
        subscale: "RI" 
    },
    { 
        prompt: "Unter Menschen, die ich nicht näher kenne, fühle ich mich sehr unwohl.", 
        subscale: "SA" 
    },
    { 
        prompt: "Hatten Sie bereits Erfahrungen mit Astrologie, Vorhersehen der Zukunft, UFOs, übersinnlicher Wahrnehmung oder dem Sechsten Sinn?", 
        subscale: "MD" 
    },
    { 
        prompt: "Erscheinen alltägliche Gegenstände ungewöhnlich groß oder klein?", 
        subscale: "UW" 
    },
    { 
        prompt: "Briefe an Freunde zu schreiben bringt mehr Schwierigkeiten als Gewinn.", 
        subscale: "KEF" 
    },
    { 
        prompt: "Ich benutze Worte manchmal in einer unüblichen Weise.", 
        subscale: "EV" 
    },
    { 
        prompt: "Wenn ich mich mit anderen unterhalte, neige ich dazu, den Blickkontakt zu vermeiden.", 
        subscale: "EA" 
    },
    { 
        prompt: "Haben Sie die Erfahrung gemacht, daß es am besten ist, andere Leute nicht zu viel über Sie wissen zu lassen?", 
        subscale: "AW" 
    },
    { 
        prompt: "Wenn Sie sehen, daß andere Menschen sich unterhalten, fragen Sie sich dann öfters, ob sie nicht über Sie unterhalten?", 
        subscale: "RI" 
    },
    { 
        prompt: "Ich würde mich sehr ängstlich fühlen, wenn ich vor einer großen Gruppe von Menschen eine Rede halten müßte.", 
        subscale: "SA" 
    },
    { 
        prompt: "Haben Sie jemals das Gefühl gehabt, mit einer anderen Person mittels Gedankenübertragung zu kommunizieren?", 
        subscale: "MD" 
    },
    { 
        prompt: "Wird Ihr Geruchssinn manchmal ungewöhnlich sensibel?", 
        subscale: "UW" 
    },
    { 
        prompt: "Bei geselligen Ereignissen neige ich dazu, im Hintergrund zu bleiben.", 
        subscale: "KEF" 
    },
    { 
        prompt: "Neigen Sie in einem Gespräch dazu, vom Thema abzukommen?", 
        subscale: "EV" 
    },
    { 
        prompt: "Ich habe oft das Gefühl, daß andere es auf mich abgesehen haben.", 
        subscale: "AW" 
    },
    { 
        prompt: "Haben Sie manchmal das Gefühl, daß andere Menschen Sie beobachten?", 
        subscale: "RI" 
    },
    { 
        prompt: "Fühlen Sie sich jemals plötzlich von entfernten Geräuschen abgelenkt, die Sie normalerweise nicht wahrnehmen?", 
        subscale: "UW" 
    },
    { 
        prompt: "Enge Freunde zu haben bedeutet mir nicht viel.", 
        subscale: "KEF" 
    },
    { 
        prompt: "Haben Sie manchmal das Gefühl, daß die Leute über Sie reden?", 
        subscale: "RI" 
    },
    { 
        prompt: "Sind Ihre Gedanken manchmal so stark, daß Sie sie fast hören können?", 
        subscale: "UW" 
    },
    { 
        prompt: "Müssen Sie oft darauf acht geben, daß andere Sie nicht übervorteilen?", 
        subscale: "AW" 
    },
    { 
        prompt: "Haben Sie das Gefühl, daß Sie mit anderen Menschen nicht \"warm\" werden können?", 
        subscale: "KEF" 
    },
    { 
        prompt: "Ich bin eine merkwürdige, ungewöhnliche Person.", 
        subscale: "EV" 
    },
    { 
        prompt: "Meine Art zu reden ist weder ausdrucksvoll noch lebendig.", 
        subscale: "EA" 
    },
    { 
        prompt: "Ich finde es schwierig, meine Gedanken anderen klar mitzuteilen.", 
        subscale: "EV" 
    },
    { 
        prompt: "Ich habe ein paar exzentrische Gewohnheiten.", 
        subscale: "EV" 
    },
    { 
        prompt: "Mir ist sehr unbehaglich zumute, wenn ich mit Leuten spreche, die ich nicht gut kenne.", 
        subscale: "SA" 
    },
    { 
        prompt: "Die Leute sagen gelegentlich, daß das Gespräch mit mir verwirrend ist.", 
        subscale: "EV" 
    },
    { 
        prompt: "Ich neige dazu, meine Gefühle für mich zu behalten.", 
        subscale: "EA" 
    },
    { 
        prompt: "Manchmal starren mich die Leute wegen meines sonderbaren Auftretens an.", 
        subscale: "EV" 
    }
];

// Content-Array für die jsPsych-Fragen erstellen
var spqGContent = [];

for (let i = 0; i < spqGQuestions.length; i++) {
    spqGContent.push({
        prompt: `<b>${i+1}. ${spqGQuestions[i].prompt}</b>`,
        name: `spqg${i}`,
        labels: spqGOptions,
        required: true,
        subscale: spqGQuestions[i].subscale
    });
}

var spqG = {
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
    <p>Sie werden auf diesen Seiten eine Reihe von Aussagen und Fragen zu persönlichen Meinungen, Erlebnissen und Verhaltensweisen finden. Bitte geben Sie zu jeder Aussage oder Frage an, ob Sie ihr zustimmen oder nicht zustimmen. Antworten Sie dabei bitte so, wie es für Sie in den letzten Jahren im allgemeinen zutrifft.</p>
    </div>
    `,
    questions: spqGContent,
    button_label: "weiter",
    on_finish: function(data) {
        let responses = data.response;
        let total_score = 0;
        let subscale_scores = {
            "RI": 0,   // Referenzideen
            "SA": 0,   // Soziale Angst
            "MD": 0,   // Magisches Denken
            "UW": 0,   // Ungewöhnliche Wahrnehmungen
            "EV": 0,   // Exzentrisches Verhalten
            "KEF": 0,  // Keine engen Freunde
            "EA": 0,   // Eingeschränkter Affekt
            "AW": 0    // Argwohn
        };

        // Alle Antworten auswerten (0 = Nein, 1 = Ja, da in den Bildern immer Ja links ist)
        for (let i = 0; i < spqGQuestions.length; i++) {
            // Wert invertieren, da bei jsPsychSurveyLikert der Index 0 der erste Wert ist (also "Ja")
            // und 1 der zweite Wert ist (also "Nein")
            let score = responses[`spqg${i}`] === 0 ? 1 : 0;
            
            total_score += score;
            subscale_scores[spqGQuestions[i].subscale] += score;
        }

        // Speichern der berechneten Scores im data-Objekt
        data.spq_g = {
            total_score: total_score,
            subscales: subscale_scores
        };
        
        // Auch als einzelne Werte abspeichern für einfachere Analyse
        data.spq_g_total = total_score;
        console.log(total_score)
        data.spq_g_ri = subscale_scores.RI;
        data.spq_g_sa = subscale_scores.SA;
        data.spq_g_md = subscale_scores.MD;
        data.spq_g_uw = subscale_scores.UW;
        data.spq_g_ev = subscale_scores.EV;
        data.spq_g_kef = subscale_scores.KEF;
        data.spq_g_ea = subscale_scores.EA;
        data.spq_g_aw = subscale_scores.AW;

        // Zurücksetzen von Elementen, falls benötigt
        let jsPsychContent = document.getElementById('jspsych-content');
        if (jsPsychContent) {
            jsPsychContent.style.maxWidth = '95%';
        }
    }
};