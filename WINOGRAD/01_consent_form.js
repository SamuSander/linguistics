
// Functions -------------------------------------------------------------------------------------------

// Show an alert if the participants say their questions have not been answered
function questionAlert(val) {
    if (val == "No") {
        alert(
            'Wenn du teilnehmen möchtest, aber noch Fragen hast, kontaktiere bitte Samuel Sander ' +
            'unter samuel.sander@zi-mannheim.de bevor du weiter machst. Wenn du keine Fragen ' + 
            'hast, wähle bitte die Option "Ich habe keine Fragen".'
        );
    } 
}

// Consent form ----------------------------------------------------------------------------------------

var consentForm = {
    type: jsPsychSurveyHtmlForm,
    on_load: () => {
        jsPsych.data.addProperties({participantID: participantID});
        
        disp = document.querySelector('.jspsych-display-element');
        disp.style.background = '';
    },

    preamble: 
    `<div style="width: 100%; display: table;">
        <div style="display: table-row">

            <div style="display: table-cell; text-align: right; font-size: 16px; line-height: 20px;">
                <img src="pics/zi_logo.svg" width="200"></img><br><br>
                <b>Abteilung Klinische Psychologie</b><br>
                Prof. Dr. Peter Kirsch<br><br>
                <b>AG Psychology and Neurobiology<br>
                of Sleep and Memory</b><br>
                Dr. Gordon Feld<br><br>
                Tel  +49 621 1703-6540<br>
                <a href = "mailto: gordon.feld@zi-mannheim.de" target="_blank">gordon.feld@zi-mannheim.de</a><br>
                <a href="https://www.zi-mannheim.de/" target="_blank">https://www.zi-mannheim.de/</a>
            </div>
        </div>
    </div>

    <hr>
    
    <div class="consent">
        <h1>Information für Teilnehmer:innen</h1>
        <h2>Titel der Studie: <i>Semantische Netzwerke im Gehirn: Wie wir Worte verarbeiten</i></h2>

        <h2>Studieninformation - Übersicht</h2>
        
        Sehr geehrte Studieninteressierte,
        Wir fragen Sie hier an, ob Sie bereit wären, an unserem Forschungsvorhaben mitzuwirken.
        Ihre Teilnahme ist freiwillig. Alle Daten, die in diesem Forschungsprojekt erhoben werden, unterliegen strengen Datenschutzvorschriften.
        Das Forschungsvorhaben wird durchgeführt von Dr. Gordon Feld. Bei Interesse informieren wir Sie gerne über die Ergebnisse aus diesem Forschungsprojekt.
        In diesem Informationsblatt erklären wir Ihnen die wichtigsten Punkte und beantworten Ihre Fragen per E-Mail oder auch 
        persönlich während Ihrer Teilnahme vor Ort. 
        
        <h3>Warum führen wir dieses Forschungsprojekt durch?</h3>
        
        <p>
            Sprache ermöglicht den Menschen eine, wenn auch nicht die einzig existente, Möglichkeit zur Erschaffung und Kontrolle komplexer Gedanken. Dabei spielen viele Faktoren, wie Syntaktik, Phonetik, oder Grammatik eine wichtige Rolle. Wir interessieren uns für den Einfluss der Semantik, also der Bedeutung von Wörtern.
        </p>

        <p>
            In dieser Studie wollen wir messen, in welchem Detail Wortähnlichkeiten sowie auch Wortdimensionen im Gehirn gespeichert sind, und wie diese sich im Gehirn als Aktivitätsmuster wiederspiegeln.
        </p>
        
        <h3>Was muss ich bei einer Teilnahme tun? - Was geschieht mit mir bei einer Teilnahme?</h3>
        <p>
            <li>
                Wenn Sie sich bereit erklären, an der Studie teilzunehmen, werden Sie zuerst online eine Gedächtnisaufgabe durchführen, bevor wir Sie nach mindestens 3 Wochen Wartezeit am ZI Mannheim empfangen werden. Hier werden Sie einem funktionalen MRT unterzogen, wobei sie eine Kategorisierungsaufgabe bearbeiten.
            </li>
            <li>
                Die Studie besteht also aus zwei Teilen. Im ersten Teil werden Sie gebeten, 
                In mehreren Teilaufgaben eine Gedächtnisprüfung zu durchlaufen. Bei den Teilaufgaben
                handelt es sich um einen Test zur Reaktionszeit, eine Phase des Einprägens, einem Test zur Vervollständigung 
                von Matrizen, sowie zwei Aufgaben zum Aufrufen der eingeprägten Begriffe und einem Wortflüssigkeitstest.
            </li>
            <li>
                In der zweiten Sitzung durchlaufen Sie ein funktionales MRT. Während der fMRT Messung werden wir Sie bitten eine Kategorisierungsaufgabe zu bearbeiten.   
                Diese zweite Sitzung kann frühestens 3 Wochen (21 Tage) nach Abschluss des online Experiments stattfinden.
            </li>
            <li>
                Den Termin für die zweite Sitzung besprechen wir mit Ihnen telefonisch nach Abschluss des Online Experiments.
            </li>
        </p>
        
        <h3>Welcher Nutzen und welches Risiko sind damit verbunden?</h3>
        <p>
            <li>
                Abgesehen von der Entschädigung (60 Euro) 
                haben Sie keinen direkten Nutzen von der Teilnahme an dieser Studie. Die 
                Versuchsleitung kann jedoch mehr darüber erfahren, wie sich semantische Strukturen im Gehirn 
                entwicken und wie sich ihre Interkonnektivität auf unser Verständnis auswirkt. 
                Sie tragen also zum wissenschaftlichen Erkenntnisgewinn bei.
            </li>
            <li>
                Die Teilnahme an dieser Studie ist mit keinerlei Risiken verbunden. Allerdings 
                können Sie während der Teilnahme an unserer Studie Unannehmlichkeiten wie 
                Frustration, Langeweile und/oder Müdigkeit empfinden. 
                Es gibt keine Hinweise auf negative Langzeiteffekte der MRT-Technologie auf den menschlichen Körper. Durch das Betätigen eines Alarmknopfes hin können Sie jederzeit aus dem MR-Tomographen hinausgefahren werden. Abgesehen von möglichen Unbequemlichkeiten, die vom langen, stillen Liegen resultieren, sollten Sie keine Beschwerden während der Untersuchung haben.
                Sollten Sie sich unwohl fühlen, können Sie jederzeit das Experiment abbrechen.  
            </li>
        </p>
        
        Mit Ihrer Zustimmung am Ende dieses Dokuments bestätigen Sie, dass Sie freiwillig 
        teilnehmen und dass Sie den Inhalt des gesamten Dokumentes verstanden haben.
        
        <h2>Detaillierte Information</h2>
        
        <h3>1. Ziel und Auswahl</h3>
        
        Unser Forschungsvorhaben bezeichnen wir in dieser Informationsschrift als 
        <i>Forschungsprojekt</i>. Wenn Sie an diesem Forschungsprojekt teilnehmen, sind Sie ein:e 
        <i>Teilnehmer:in</i>. In diesem Forschungsprojekt möchten wir untersuchen, wie die Art, in der wir Wörter 
        kategorisieren und die graduellen Unterschiede von Wortbedeutungen die neuronalen Muster 
        im Gehirn beeinflussen, die mit semantischen Konzepten verbunden sind. Dazu vergleichen 
        wir die Gedächtnisleistung mit neuronalen Mustern, die durch bildgebende Verfahren 
        erfasst wurden. Außerdem prüfen wir, ob computergestützte semantische Modelle (DSMs) 
        eine nützliche Methode zur Quantifizierung semantischer Beziehungen darstellen.
        Wir fragen Sie an, da alle Personen teilnehmen können, die zwischen 18 und 35 Jahre alt, 
        englische Muttersprachler sind, und die MRT-Kriterien (z.B. keine Metalle im Körper, 
        siehe unten) erfüllen. Außerdem können Sie nur teilnehmen, wenn Sie zustimmen, 
        über Zufallsbefunde (siehe unten) benachrichtigt zu werden. Ausgeschlossen währen Probanden 
        mit Erkrankungen und/oder Einnahme von Medikamenten und/oder Drogen, die das 
        Nervensystem und/oder die Lernfähigkeit beeinträchtigen, Personen, welche unter 
        Klaustrophobie leiden, und Schwangere.
        
        <h3>2. Allgemeine Informationen</h3>
        
        Die Bedeutung von Wörtern wird im Gehirn im sogenannten semantischen Zentrum gespeichert. 
        Wenn wir ein Wort lesen oder hören, wird dieses Zentrum aktiviert, wobei einzelne Wörter 
        charakteristische Muster hervorrufen, die sich voneinander unterscheiden. In diesem 
        Forschungsprojekt wollen wir untersuchen, ob und wie die Bedeutungsbeziehungen von Wörtern 
        (Ähnlichkeitsgradienten) und semantischen Dimensionen im Gehirn Einfluss auf die semantischen 
        Muster haben. Dieses Grundlagenwissen benötigen wir, um später in weiteren Forschungsprojekten 
        untersuchen zu können, wie wir gezielt die Entstehung und Abrufung von semantischen Konzepten 
        im Gehirn beeinflussen können. Darüber hinaus wollen wir untersuchen, in welchem Maße 
        verschiedene computergestützte Modelle dem der neuronalen Verarbeitung von 
        Bedeutungsbeziehungen entsprechen.
        Im Rahmen des Forschungsprojekts werden wir 30 Teilnehmer*innen untersuchen. Die Erhebung 
        findet online und am Zentralinstitut für Seelische Gesundheit, Mannheim, statt. Wir gestallten 
        dieses Forschungsprojekt so, wie es die Regularien und Gesetze vorschreiben. Außerdem beachten 
        wir alle international anerkannten Richtlinien. Die zuständige Ethikkommission hat das 
        Forschungsprojekt begutachtet und bewertet.

        <h3>3. Ablauf</h3>
        
        Zu Beginn des Online-Experiments beantworten Sie einige Fragen zu Ihrer Person. Im 
        Online-Experimente bearbeiten Sie mehrere Aufgaben zur Erfassung der Gedächtnissleistung.
        Dabei überprüfen wir zuerst ihrer Reaktionsfähigkeit. Anschließened werden Ihnen eine Reihe
        von Begriffen zum Einprägen gezeigt. Anschließend vervollständigen Sie eine Reihe von Matrizen.
        Im letzten Abschnitt des Online-Experiments bearbeiten Sie zwei Aufgaben zur Abfrage der 
        eingeprägten Begriffe sowie einen Wortflüssigkeitstest.  
        Zum zweiten Termin mindestens 3 Wochen später bearbeiten Sie während einer fMRT Messung
        eine Reihe von Kategorisierungsaufgaben. Das 
        Online-Experiment dauert etwa <b>2 Stunden</b>. Die fMRT Messung am ZI Mannheim 
        wird etwa <b>90 Minuten</b> dauern. Der Termin zur fMRT Untersuchung wir telefonisch vereinbart.
        
        <h3>4. Freiwilligkeit und Pflichten</h3>
        
        Ihre Teilnahme ist freiwillig. Wenn Sie nicht an diesem Forschungsprojekt 
        teilnehmen möchten oder Ihre Teilnahme zu einem späteren Zeitpunkt widerrufen wollen, 
        können Sie dies ohne Angabe von Gründen tun. Wenn Sie an diesem Experiment teilnehmen, 
        werden Sie gebeten, sich während der gesamten Zeit an die Vorgaben und Anforderungen 
        des Forschungsprojekts zu halten.
        
        <h3>5. Ergebnisse</h3>
        
        Wenn Sie Interesse haben, können wir Sie nach Abschluss des Forschungsprojekts über 
        die Gesamtergebnisse informieren.
        
        <h3>6. Vertraulichkeit der Daten</h3>
        
        <h4>6.1. Datenverarbeitung und Verschlüsselung</h4>

        Die Rechtsgrundlage für die Verarbeitung Ihrer Daten ist Ihre freiwillige Einwilligung 
        zur Teilnahme an diesem Forschungsprojekt (Art. 6 Abs. 1 lit. A i.V.m Art. 9 Abs. 2 lit. 
        A der Europäischen Datenschutz-Grundverordnung - kurz DSGVO). Dieses Forschungsprojekt 
        wird über eine sichere Internetverbindung (mit https-Zertifikat) gehostet und die Daten 
        werden auf einem DGVSO-konformen Server unter der Verwaltung der IT-Abteilung des 
        Zentralinstituts für Seelische Gesundheit gespeichert. In diesem Forschungsprojekt ist 
        Dr. Gordon Feld, <a href = "mailto: Gordon.Feld@zi-mannheim.de" target="_blank">
        Gordon.Feld@zi-mannheim.de</a>, für die Datenverarbeitung verantwortlich.<br>
        In diesem Forschungsprojekt werden Daten über Sie erhoben und verarbeitet, teilweise in 
        automatisierter Form. Während der Datenerhebung werden Ihre Daten verschlüsselt. 
        Verschlüsselung bedeutet, dass keine Informationen gespeichert werden, mit denen Sie 
        identifiziert werden können (Name, Geburtsdatum etc.) und Sie nur durch einen Code und 
        eine Ihnen zugewiesene ID bekannt sind (= pseudo-anonymisiert). Ihre ID ist nur Ihnen 
        und den an dieser Studie beteiligten Forschern bekannt und wird verwendet, um Sie über 
        die unterschiedlichen Studientermine hinweg zu identifizieren. Zu Zwecken der 
        Absprache erheben wir zudem Ihre E-Mail-Adresse. Sollten Sie uns (z.B. im Fall 
        von Rückfragen) per E-Mail kontaktieren, werden die von Ihnen zur Verfügung gestellten 
        personenbezogenen Daten während der Korrespondenz sicher und vorübergehend auf einem 
        passwortgeschützten E-Mail-Konto gespeichert, das am Zentralinstitut für Seelische 
        Gesundheit unter der Verwaltung der IT-Abteilung gehostet wird und DGVSO-konform ist. 
        Nach Abschluss der Korrespondenz wird die Korrespondenz zusammen mit Ihrer E-Mail-Adresse 
        gelöscht. Personen, die keinen Zugriff auf die Daten haben, können Sie nicht 
        identifizieren. Die Liste der Teilnehmer:innen verbleibt immer in der Abteilung für 
        Klinische Psychologie, ZI Mannheim, bzw. der Abteilung Allgemeine Psychologie und 
        kognitive Selbstregulation, Universität Heidelberg.<br>
        Nur sehr wenige Fachleute werden Ihre verschlüsselten Daten sehen, und auch nur, um die 
        im Rahmen des Forschungsprojekts notwendigen Aufgaben zu erfüllen. Diese Personen 
        unterliegen der Schweigepflicht. Sobald die Forschungszwecke es zulassen, wird Ihre 
        ID gelöscht, so dass es nicht mehr möglich ist, Ihre Daten mit Ihrer ID zu verbinden. 
        Zu diesem Zeitpunkt sind die Daten anonymisiert. Als Teilnehmer haben Sie das Recht, 
        Ihre Daten einzusehen und zu korrigieren. Bitte beachten Sie, dass dies nur möglich 
        ist, solange die Zuordnungsliste mit der Ihnen zugewiesenen ID noch nicht gelöscht 
        wurde, da wir nach der Löschung der Zuordnungsliste nicht mehr wissen, welche Daten 
        zu Ihnen gehören. Nach Beendigung oder Abbruch des Forschungsprojekts werden die 
        Daten dauerhaft und gegen unbefugten Zugriff gesichert gespeichert. Darüber hinaus 
        werden die anonymisierten Daten in einer internetbasierten Forschungsdatenbank namens 
        PsychArchives (<a href = https://leibniz-psychology.org/angebote/archivieren/>Leibniz-Institut für Psychologie (ZPID)</a>, 
        die Server befinden sich in Deutschland) anderen Forschern zur Verfügung gestellt. 
        Damit folgen wir den Empfehlungen der Deutschen Forschungsgemeinschaft (DFG), die 
        empfiehlt, alle in dieser Studie erhobenen anonymisierten Daten der Öffentlichkeit 
        zugänglich zu machen. Dies ist wichtig, um die Qualitätssicherung im Hinblick auf die 
        Überprüfbarkeit und Reproduzierbarkeit wissenschaftlicher Ergebnisse (z.B. 
        Ergebnisse in Publikationen) zu gewährleisten und die Weiterverwendung der Daten 
        zu ermöglichen. Reproduzierbarkeit bedeutet, dass andere Forscher überprüfen können, 
        ob die Ergebnisse korrekt sind und ob sie zu identischen Ergebnissen kommen würden.
        
        <h4>6.2. Datenschutz</h4>

        Alle datenschutzrechtlichen Anforderungen werden streng eingehalten. Es ist möglich, 
        dass Ihre Daten in anonymisierter Form in Länder außerhalb der EU übermittelt werden 
        müssen, z. B. zum Zwecke der Veröffentlichung, und dass sie anderen Forschern zur 
        Verfügung gestellt werden. Im Ausland kann nicht das gleiche Datenschutzniveau wie in 
        der EU garantiert werden. Die weitergegebenen Daten sind jedoch anonymisiert und 
        können nicht mehr mit Ihrer Person in Verbindung gebracht werden.
        
        <h3>7. Ausstieg aus dem Forschungsprojekt</h3>

        Bitte beachten Sie, dass eine Löschung Ihrer Daten nur möglich ist, wenn die 
        Zuordnungsliste der IDs noch nicht vernichtet wurde, da wir Ihre Daten ansonsten 
        nicht mehr zuordnen können.<br><br>
        Sie können Ihre Einwilligung jederzeit ohne Angabe von Gründen schriftlich oder 
        mündlich widerrufen, ohne dass Ihnen daraus ein Nachteil entsteht. Wenn Sie Ihre 
        Einwilligung widerrufen, werden keine weiteren Daten mehr erhoben. Die bis zum 
        Widerruf erfolgte Datenverarbeitung bleibt jedoch rechtmäßig. Im Falle eines 
        Widerrufs können Sie auch die Löschung Ihrer Daten verlangen. Wir möchten Sie 
        darum bitten Ihre bis dahin gesammelten Daten in anonymisierter Form für die 
        Auswertung verwenden zu dürfen. Anonymisiert bedeutet, die Daten können nicht 
        mehr oder nur mit einem unverhältnismäßig großen Aufwand an Zeit, Kosten und 
        Arbeitskraft Ihrer Person zugeordnet werden.<br><br>
        
        Wenn Sie Bedenken hinsichtlich der Datenverarbeitung und der Einhaltung der 
        Datenschutzbestimmungen haben, können Sie sich auch an den folgenden 
        Datenschutzbeauftragten wenden:<br>

        <p style="line-height: 1.3;">
            <b>Dr. Jana Maier, Datenschutzbeauftragte</b><br>
            J 5, 68159 Mannheim<br>
            E-Mail: <a href = "mailto: datenschutzbeauftragter@zi-mannheim.de" target="_blank">datenschutzbeauftragter@zi-mannheim.de</a>
        </p>
        
        Sie haben das Recht, sich bei jeder Datenschutzaufsichtsbehörde zu beschweren. Eine 
        Liste der Aufsichtsbehörden in Deutschland finden Sie unter 
        <a href = https://www.bfdi.bund.de/DE/Infothek/Anschriften_Links/anschriften_links-node.html>
        diesem Link</a>.
        
        <h3>8. Finanzierung</h3>

        Diese Studie wird hauptsächlich durch das Zentralinstitut für Seelische Gesundheit, 
        Mannheim, Deutschland und der Ruprecht-Karls-Universität Heidelberg, Deutschland 
        finanziert.

        <h3>9. Haftungsausschluss</h3>

        Bitte beachten Sie, dass Ihre Teilnahme an dieser Studie rein freiwillig ist und zu keiner Zeit eine 
        Geschäftsbeziehung zwischen der Studienleitung und Ihnen entsteht. Entsprechend sind auch der Anfahrts- 
        und Abfahrtsweg nicht versichert.
        
        <h3>13. Kontaktperson(en)</h3>
        
        Bei Fragen zur Projektteilnahme oder bei Unklarheiten, die während des 
        Forschungsprojekts oder danach auftreten, können Sie sich jederzeit an uns wenden:

        <p style="line-height: 1.3;">
            <b>Samuel Sander</b> (Doktorand am ZI Mannheim)<br>
            Abteilung für Klinische Psychologie<br>
            AG Psychology and Neurobiology of Sleep and Memory<br>
            Zentralinstitut für Seelische Gesundheit<br>
            J 5, 68159, Mannheim, Germany<br>
            Email: <a href = "mailto: Samuel.Sander@zi-mannheim.de" target="_blank">Samuel.Sander@zi-mannheim.de</a><br>
        </p>
    
    </div>`,
    
    html:
    `<div class="questions" style="padding: 30px; margin: 10px; font-size: 18px; border: 5px solid white;">
    
        <h1>Einwilligungserklärung</h1>
        <h2>Studientitel: <i>Semantische Netzwerke im Gehirn: Wie wir Worte verarbeiten</i></h2>
    
        Bitte lesen Sie dieses Formular sorgfältig durch. Bitte fragen Sie nach, wenn Sie 
        etwas nicht verstanden haben oder wissen möchten. Ihre Einwilligung ist für die 
        Teilnahme erforderlich.<br><br>
    
        Ich bin schriftlich über den Zweck, den Ablauf des Forschungsprojekts, mögliche 
        Vor- und Nachteile sowie mögliche Risiken informiert worden.<br>
        
        <select class="large-select" id="consent0" required="required" name="consentSelect0" class="questions">
            <option value=""></option>
            <option value="Yes">Ja</option>
            <option value="No">Nein</option>
        </select>

        <p></p>

        <hr>
    
        Ich nehme freiwillig an diesem Forschungsprojekt teil und akzeptiere den Inhalt der 
        schriftlichen Informationen über das oben genannte Forschungsprojekt. Ich habe 
        ausreichend Zeit gehabt, meine Entscheidung zu treffen.<br>
    
        <select class="large-select" id="consent1" required="required" name= "consentSelect1">
            <option value=""></option>
            <option value="Yes">Ja</option>
            <option value="No">Nein</option>
        </select>

        <p></p>

        <hr>
    
        Meine Fragen im Zusammenhang mit der Teilnahme an diesem Forschungsprojekt sind 
        beantwortet worden. Ich kann die schriftlichen Informationen auf meinem Computer 
        speichern <a href="javascript:void(0);" onclick="downloadConsent();">[Download PDF]</a>, 
        oder mir bei meiner Teilnahme an der Hauptstudie eine Kopie aushändigen lassen.<br>
    
        <select class="large-select" id="consent2" required="required" name="consentSelect2" 
        onchange="questionAlert(this.value)">
            <option value=""></option>
            <option value="Yes">Ja</option>
            <option value="No">Nein</option>
            <option value="I did not have any questions">Ich habe keine Fragen</option>
        </select>

        <p></p>

        <hr>
    
        Ich bin damit einverstanden, dass die zuständigen Experten der Projektleitung meine 
        personenbezogenen Daten in der oben beschriebenen Weise verarbeiten dürfen, wobei 
        die Vertraulichkeit strikt gewahrt bleibt.<br>
    
        <select class="large-select" id="consent3" required="required" name="consentSelect3">
            <option value=""></option>
            <option value="Yes">Ja</option>
            <option value="No">Nein</option>
        </select>

        <p></p>

        <hr>
    
        Mir ist bekannt, dass meine anonymisierten Daten zur Nachnutzung in einem 
        öffentlichen Repositorium (PsychArchives) bereitgestellt werden.<br>
    
        <select class="large-select" id="consent4" required="required" name="consentSelect4">
            <option value=""></option>
            <option value="Yes">Ja</option>
            <option value="No">Nein</option>
        </select>

        <p></p>

        <hr>
    
        Ich kann jederzeit und ohne Angabe von Gründen von der Teilnahme zurücktreten. 
        Die bis dahin erhobenen Daten werden, sofern ich keine Löschung meiner Daten 
        beantrage, weiterhin für die Auswertung des Forschungsprojekts verwendet.<br>
        
        <select class="large-select" id="consent5" required="required" name="consentSelect5">
            <option value=""></option>
            <option value="Yes">Ja</option>
            <option value="No">Nein</option>
        </select>

        <p></p>

        <hr>
    
        Ich bin damit einverstanden, dass meine Daten in anonymisierter Form 
        weiterverwendet werden, wenn ich meine Einwilligung zurückziehe. Eine Löschung 
        bzw. Einsicht meiner Daten kann ich nur beantragen, solange die Zuordnungsliste 
        noch nicht vernichtet wurde.<br>
    
        <select class="large-select" id="consent6" required="required" name="consentSelect6">
            <option value=""></option>
            <option value="Yes">Ja</option>
            <option value="No">Nein</option>
        </select>

        <p></p>

        <hr>
    
        <b>Ich bin mit der Teilnahme und der Verarbeitung der oben genannten Daten 
        einverstanden.</b><br>
    
        <select class="large-select" id="consent7" required="required" name="consentSelect7">
            <option value=""></option>
            <option value="Yes">Ja</option>
            <option value="No">Nein</option>
        </select>
    </div>`,
    
    button_label: 'weiter',

    data: { trial: 'consent_form' },

    on_finish: function(data) {
        // Stringify responses because an array cannot be saved into the data base.
        data.response = JSON.stringify(data.response);
        disp = document.querySelector('.jspsych-display-element');
        disp.style.background = '';
    }
};

// Message when participants are excluded from the experiment
var noConsent = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus:
    `<div class="instructions" style="font-size: 30px">
        <b>Du hast keine Einwilligung zur Studienteilnahme gegeben.</b><br>
        Danke für deine Zeit! Du kannst das Fenster nun schließen.
    </div>`,
    choices: "NO_KEYS"
};

// Conditional: If participants did not give their consent, end experiment
var ifNoConsent = {
    timeline: [noConsent],
    conditional_function: function() {
      // Extract consent form answers
      var consent = jsPsych.data.getLastTrialData().values()[0].response;
      consent = JSON.parse(consent);
      consent = Object.keys(consent).map(function (key) { return consent[key]; })
  
      // Does the consent form contain at least one "no" as an answer?
      // If so, end the experiment
      if (consent.some(r=> "No".includes(r))) {
        return true;
      } else {
        return false;
      }
    }
};
