
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

function downloadConsent() {
    // Use more specific selectors to get the sections
    const headerDiv = document.querySelector('.jspsych-content-wrapper div[style*="margin: 0 auto"]');
    const consentInfo = document.querySelector('.consent');
    const consentForm = document.querySelector('.questions');
    
    // Create a new window
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html>
        <head>
            <title>Studieninformation und Einwilligungserklärung</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    padding: 20px;
                    max-width: 800px;
                    margin: 0 auto;
                }
                .consent, .questions {
                    width: 100%;
                    font-size: 12pt;
                }
                select, input {
                    margin: 10px 0;
                    padding: 5px;
                    width: 200px;
                }
                hr {
                    margin: 20px 0;
                    border: none;
                    border-top: 1px solid #ccc;
                }
                .large-select {
                    display: block;
                    margin: 10px 0;
                }
                h1 { font-size: 16pt; }
                h2 { font-size: 14pt; }
                h3 { font-size: 12pt; }
                h4 { font-size: 12pt; }
                p { margin: 10px 0; }
            </style>
        </head>
        <body>
            ${headerDiv?.outerHTML || ''}
            <hr>
            ${consentInfo?.outerHTML || ''}
            ${consentForm?.outerHTML || ''}
        </body>
        </html>
    `);
    
    printWindow.document.close();
    
    // Wait for content to load then print
    printWindow.onload = function() {
        printWindow.print();
    };
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
    `<div style="width: 60%; margin: 0 auto;">
    <div style="display: flex; justify-content: flex-end;">
        <div style="text-align: right; font-size: 16px; line-height: 20px;">
            <img src="pics/zi_logo.svg" width="200" style="display: block; margin:0 auto; filter: brightness(0) invert(1);"></img><br><br>
            <b>Abteilung Klinische Psychologie</b><br>
            Prof. Dr. Peter Kirsch<br><br>
            <b>AG Psychology and Neurobiology<br>
            of Sleep and Memory</b><br>
            Dr. Gordon Feld<br><br>
            Tel  +49 621 1703-6540<br>
            <a href="mailto:gordon.feld@zi-mannheim.de" target="_blank">gordon.feld@zi-mannheim.de</a><br>
            <a href="https://www.zi-mannheim.de/" target="_blank">https://www.zi-mannheim.de/</a>
        </div>
    </div>
    </div>
    <hr>

    <div class="consent" style="width: 60%; padding: 30px; margin: 10px auto; font-size: 18px;">
    <h1>Information für Teilnehmer:innen</h1>
    <h2>Studientitel: <em>Semantische Netzwerke im Gehirn: Wie wir Worte verarbeiten</em></h2>

    <p><strong>Allgemeine Information für Teilnehmende</strong></p>

    <hr>

    <div style="background-color: #e5ffe5; border: 3px solid #009900; padding: 20px; margin: 20px 0; border-radius: 5px; color: #000000;">
        <h2 style="color: #009900; margin-top: 0; border-bottom: 1px solid #009900; padding-bottom: 10px;">Kurzübersicht</h2>
        
        <p style="font-weight: 500;">
        Sehr geehrte Interessierte,<br>
        wir fragen Sie an, ob Sie bereit wären, an unserem Forschungsvorhaben teilzunehmen. Ihre Teilnahme ist freiwillig. Alle Daten, die in diesem Forschungsprojekt erhoben werden, unterliegen strengen Datenschutzvorschriften. Das Forschungsvorhaben wird durchgeführt von <strong>Dr. Gordon Feld</strong> am Zentralinstitut für Seelische Gesundheit (ZI Mannheim). Bei Interesse informieren wir Sie gerne über die Ergebnisse des Projekts.<br><br>
        In diesem Informationsblatt erhalten Sie die wichtigsten Punkte. Fragen beantworten wir Ihnen per E-Mail oder auch persönlich vor Ort.
        </p>

        <h3>Warum führen wir dieses Forschungsprojekt durch?</h3>
        <p>
        Sprache ist eines der Werkzeuge, die Menschen zur Erschaffung und Kontrolle komplexer Gedanken nutzen. Uns interessiert insbesondere der Einfluss der Semantik, also der <em>Bedeutung</em> von Wörtern. In dieser Studie wollen wir messen, in welchem Detail Wortähnlichkeiten sowie auch Wortdimensionen im Gehirn gespeichert sind und wie sich diese als Aktivitätsmuster widerspiegeln.
        </p>

        <h3>Was muss ich bei einer Teilnahme tun? – Was geschieht mit mir?</h3>
        <ul>
        <li><strong>Form der Teilnahme:</strong> Sie führen zunächst an Ihrem heimischen Endgerät (online) mehrere Gedächtnisaufgaben durch. Danach (frühestens drei Wochen später) nehmen Sie am ZI Mannheim an einer funktionellen MRT-Untersuchung teil, während der Sie eine Kategorisierungsaufgabe bearbeiten.</li>
        <li><strong>Ablauf der Teilnahme:</strong> 
            <ul>
            <li>Im ersten Teil (Online) lösen Sie verschiedene Gedächtnis- und Reaktionsaufgaben (Dauer ca. 60–90 Minuten).</li>
            <li>Nach einer Wartezeit von mindestens drei Wochen (21 Tagen) erfolgt der zweite Teil: Sie kommen ans ZI Mannheim und durchlaufen eine fMRT-Messung (ca. 90 Minuten). Währenddessen bearbeiten Sie eine Kategorisierungsaufgabe.</li>
            </ul>
        </li>
        <li><strong>Nutzen:</strong> Für Ihre Teilnahme erhalten Sie eine Aufwandsentschädigung von <strong>40 Euro</strong>. Darüber hinaus leisten Sie mit Ihrer Teilnahme einen Beitrag zum Verständnis, wie semantische Strukturen im Gehirn entstehen und vernetzt sind.</li>
        <li><strong>Risiko und Belastung:</strong> Die Teilnahme birgt nach heutigem Kenntnisstand keine gesundheitlichen Risiken. Die MRT-Technologie hat sich über viele Jahre bewährt und setzt keine ionisierende Strahlung frei. Während der Untersuchung erhalten Sie einen Gehörschutz sowie einen Alarmknopf, mit dem Sie die Untersuchung jederzeit abbrechen können. Abgesehen von möglichen Unbequemlichkeiten durch längeres, stilles Liegen sind keine Beschwerden zu erwarten.</li>
        </ul>

        <p>
        Mit Ihrer Zustimmung am Ende dieses Dokuments bestätigen Sie, dass Sie freiwillig teilnehmen und dass Sie den Inhalt des gesamten Dokumentes verstanden haben.
        </p>
    </div>

    <hr>
    <h2>Detaillierte Informationen</h2>

    <h3>1. Ziel und Auswahl</h3>
    <p>
    Wir bezeichnen unser Forschungsvorhaben in dieser Informationsschrift als <em>Forschungsprojekt</em>. Teilnehmende Personen sind zwischen 18 und 35 Jahren alt, deutsche Muttersprachler:innen und erfüllen die MRT-Tauglichkeitskriterien (z. B. keine Metalle im Körper; siehe hierzu die Erläuterungen unter "Risiken und Belastungen"). Zusätzlich können Sie nur teilnehmen, wenn Sie zustimmen, im Fall relevanter Zufallsbefunde (s. u.) informiert zu werden. Personen mit psychischen oder neurologischen Erkrankungen, unter Klaustrophobie leidende Personen, Schwangere sowie Personen, die bestimmte Medikamente oder Drogen einnehmen, sind von der Teilnahme ausgeschlossen.
    </p>

    <h3>2. Allgemeine Informationen</h3>
    <p>
    Die Bedeutung von Wörtern wird im Gehirn im sogenannten semantischen Zentrum gespeichert. Wenn wir ein Wort lesen oder hören, wird dieses Zentrum aktiviert. Verschiedene Wörter lösen dabei unterschiedliche Aktivitätsmuster aus. Wir möchten untersuchen, ob und wie die Bedeutungsbeziehungen von Wörtern (Ähnlichkeitsgradienten) und semantische Dimensionen im Gehirn Einfluss auf diese gemessenen Aktivitätsmuster haben. Dieses Grundlagenwissen benötigen wir, um später gezielt die Entstehung und den Abruf semantischer Konzepte im Gehirn untersuchen und beeinflussen zu können. Zusätzlich möchten wir prüfen, wie gut computergestützte semantische Modelle (DSMs) geeignet sind, solche Bedeutungsbeziehungen abzubilden.<br><br>
    Insgesamt planen wir, 44 Teilnehmende zu untersuchen. Die Datenerhebung findet online und am Zentralinstitut für Seelische Gesundheit in Mannheim statt. Wir befolgen dabei alle einschlägigen gesetzlichen sowie internationalen Vorgaben. Die zuständige Ethikkommission hat das Forschungsprojekt begutachtet und genehmigt.
    </p>

    <h3>3. Ablauf</h3>
    <p>
    <strong>Online-Phase (Teil 1):</strong><br>
    Zu Beginn bekommen Sie alle relevanten Informationen schriftlich und haben die Möglichkeit, Fragen zu stellen. Anschließend werden Sie gebeten, Ihr Einverständnis elektronisch zu erklären und demografische Daten (z. B. Alter, Geschlecht, Bildungsniveau) anzugeben. Danach führen Sie eine Gedächtnisaufgabe durch, welche mehrere Teilaufgaben umfasst, u. a. Reaktionsaufgaben, Lernphasen und das Wiedererkennen bzw. Abrufen zuvor präsentierter Wörter.
    </p>
    <p>
    <strong>fMRT-Untersuchung (Teil 2):</strong><br>
    Nach einer Wartezeit von mindestens 21 Tagen kommen Sie ans ZI Mannheim. Vor der fMRT-Messung werden Sie erneut mündlich aufgeklärt und unterschreiben eine analoge Einverständniserklärung. Dann erfolgt die ca. 90-minütige Messung im MRT-Scanner, während der Sie eine Kategorisierungsaufgabe bearbeiten.
    </p>
    <p>
    Bitte beachten Sie, dass wir Sie vom Forschungsprojekt ausschließen müssen, falls Sie die Einschlusskriterien nicht erfüllen (z. B. Unverträglichkeit gegenüber MRT oder relevante Vorerkrankungen).
    </p>

    <h3>4. Nutzen</h3>
    <p>
    Für die Teilnahme erhalten Sie <strong>40 Euro</strong>. Für die Allgemeinheit ist der Nachweis über die Entwicklung und Interkonnektivität semantischer Strukturen im Gehirn für zukünftige Projekte in größerem Maßstab wichtig.
    </p>

    <h3>5. Freiwilligkeit und Pflichten</h3>
    <p>
    Ihre Teilnahme ist freiwillig. Wenn Sie nicht teilnehmen möchten oder später Ihre Teilnahme widerrufen wollen, können Sie dies jederzeit ohne Angabe von Gründen tun.<br>
    Wenn Sie an diesem Forschungsprojekt teilnehmen, werden Sie gebeten, sich an die Vorgaben und Anforderungen (Prüfplan) zu halten.
    </p>

    <h3>6. Risiken und Belastungen</h3>
    <p>
    Im Rahmen des Forschungsprojekts wird eine MRT-Untersuchung (Magnetresonanztomographie, „Hirnscan“) durchgeführt. Diese Technologie gilt nach heutigem Kenntnisstand als unschädlich und nicht-invasiv; sie verwendet keine ionisierende Strahlung. 
    </p>
    <p>
    Während der Messung liegen Sie auf einer Untersuchungsliege, die in eine röhrenförmige Öffnung des MRT-Geräts fährt. Um Kopf und Hals wird eine Spule gelegt, und während der Messung hören Sie ein klopfendes Geräusch. Sie erhalten einen Gehörschutz und können jederzeit über eine Sprechanlage mit den Untersuchenden kommunizieren. Zudem bekommen Sie einen Alarmknopf (Druckball), mit dem Sie das Experiment bei Unwohlsein sofort abbrechen können.
    </p>
    <p>
    <strong>Wichtige Ausschlusskriterien:</strong> Personen mit elektrischen Implantaten (z. B. Herzschrittmacher), Medikamentenpumpen oder metallischen Fremdkörpern (z. B. Schrauben nach Knochenbrüchen) können <em>nicht</em> teilnehmen. Starke Rückenbeschwerden, extremes Übergewicht oder Klaustrophobie können ebenfalls gegen die Untersuchung sprechen. Schwangere sind ebenso ausgeschlossen.
    </p>
    <p>
    Weitere Details zur Funktionsweise des MRTs sowie möglichen Komplikationen 
    entnehmen Sie bitte dem <a href="pdfs/Informationsblatt_MRT.pdf" target="_blank">allgemeinen Informationsblatt für kernspintomographische Forschung</a>.
    </p>

    <h3>7. Ergebnisse</h3>
    <p>
    In diesem Forschungsprojekt können sogenannte Zufallsbefunde auftreten. Darunter versteht man Befunde, die im Rahmen der MRT eher zufällig entdeckt werden und nicht Gegenstand der Untersuchung sind. Sollten derartige Befunde für Ihre Gesundheit relevant sein, werden wir Sie informieren. Wenn Sie <em>nicht</em> informiert werden möchten („Recht auf Nicht-Wissen“), können Sie leider nicht teilnehmen.
    </p>
    <p>
    Gerne können Sie nach Abschluss der Studie eine Zusammenfassung der Gesamtergebnisse erhalten.
    </p>

    <h3>8. Vertraulichkeit von Daten und Proben</h3>

    <h4>8.1. Datenverarbeitung und Verschlüsselung</h4>
    <p>
    Rechtsgrundlage für die Datenverarbeitung ist Ihre freiwillige Einwilligung (Art. 6 Abs. 1 lit. A i.V.m. Art. 9 Abs. 2 lit. A DSGVO). Verantwortlich ist 
    <strong>Dr. Gordon Feld, Abteilung Klinische Psychologie, ZI Mannheim</strong> 
    (<a href="mailto:gordon.feld@zi-mannheim.de" target="_blank">gordon.feld@zi-mannheim.de</a>).
    </p>
    <p>
    Folgende Daten werden im Rahmen der Studie erhoben und verarbeitet:
    </p>
    <ul>
    <li>Identifizierungsdaten (Name, Geburtsdatum, Kontaktdaten)</li>
    <li>Demografische Daten (Alter, Geschlecht, Bildungsniveau, Beschäftigungsstatus)</li>
    <li>Gesundheitsdaten (Angaben zu psychologischen/neurologischen Erkrankungen, Fragebögen)</li>
    <li>MRT-Daten (funktionelle und strukturelle Bilddaten Ihres Gehirns)</li>
    <li>Studienbezogene Daten (Ergebnisse aus den Gedächtnis- und Kategorisierungsaufgaben)</li>
    </ul>
    <p>
    Bei der Datenerhebung werden Ihre Daten pseudonymisiert, d. h. alle Sie identifizierenden Merkmale werden entfernt und durch einen Code ersetzt. Die Zuordnung von Code und Identität ist nur über eine Schlüssel-Liste möglich, die sicher in der Abteilung Klinische Psychologie am ZI Mannheim verwahrt wird. Auf unverschlüsselte Daten greifen nur autorisierte Personen zu, die der Schweigepflicht unterliegen.
    </p>
    <p>
    Ihre Daten werden 10 Jahre nach Abschluss oder Abbruch des Forschungsprojekts am ZI Mannheim aufbewahrt und sind gegen unbefugten Zugriff gesichert. Danach werden sie anonymisiert, indem die Schlüssel-Liste zerstört wird, sodass ein Rückschluss auf Ihre Person unmöglich wird oder nur mit unverhältnismäßig großem Aufwand möglich wäre. Spätestens nach 10 Jahren werden die Daten aus der ZI-internen Datenbank gelöscht, verbleiben jedoch unbegrenzt in einer öffentlich zugänglichen Online-Datenbank (siehe unten).
    </p>

    <h4>8.2. Datenschutz und Schutz der Proben</h4>
    <p>
    Alle Vorgaben des Datenschutzes werden streng eingehalten. Die Auswertung Ihrer Daten erfolgt pseudonymisiert. Nach endgültiger Anonymisierung (d. h. wenn die Schlüssel-Liste zerstört ist) werden die Daten als „Open Data“ in der Forschungsdatenbank PsychArchives des Leibniz-Instituts für Psychologie (<a href="https://leibniz-psychology.org/angebote/archivieren/" target="_blank">ZPID</a>) zugänglich gemacht. Die Server stehen in Deutschland. Dieses Vorgehen entspricht den Empfehlungen der Deutschen Forschungsgemeinschaft (DFG), um wissenschaftliche Ergebnisse überprüfbar (Replizierbarkeit) zu machen und eine Nachnutzung zu ermöglichen.
    </p>
    <p>
    Da eine vollständige Reproduzierbarkeit nur gegeben ist, wenn <strong>alle</strong> einfließenden Daten als Open Data zur Verfügung stehen, ist die Zustimmung zu diesem Vorgehen Teilnahmevoraussetzung. Eine Löschung bereits publizierter Open Data ist nicht mehr möglich. Sekundäre Fragestellungen – die außerhalb der ursprünglichen Zweckbestimmung liegen können – sind ebenfalls abgedeckt. Sollten Sie diesem Vorgehen nicht zustimmen wollen, ist eine Teilnahme an dieser Studie leider nicht möglich.
    </p>
    <p>
    Eine (anonymisierte, verschlüsselte) Übermittlung Ihrer Daten in Länder außerhalb der EU (Drittländer) kann im Rahmen von Publikationen oder Kooperationen mit internationalen Forschungseinrichtungen erfolgen. Dabei stellen wir sicher, dass geeignete Datenschutzmaßnahmen gemäß Art. 46 DSGVO getroffen werden.
    </p>

    <h4>8.3. Datenschutz bei MRT-Forschung</h4>
    <p>
    MRT-Rohdaten (Hirnscans) sind hochindividuell und könnten in seltenen Fällen Rückschlüsse auf Ihre Identität zulassen. Um dieses Risiko zu minimieren, werden den Forschenden außerhalb unseres Teams nur verarbeitete Scans zur Verfügung gestellt. Dabei werden Hirnscans zudem auf ein „Standard-Gehirn“ übertragen, sodass Ihr individueller Hirnscan nicht in der Datenbank erscheint.
    </p>

    <h4>8.4. Datenschutz bei internetbasierter Forschung</h4>
    <p>
    Die Erhebung, Speicherung und Übermittlung Ihrer Daten über das Internet erfolgt unter Einhaltung hoher Sicherheitsstandards. Ihre Daten werden verschlüsselt übertragen und auf gesicherten Servern des ZI Mannheim gespeichert. Es erfolgt keine Speicherung auf privaten Geräten oder ungesicherten Netzwerken.
    </p>

    <h3>9. Widerruf</h3>
    <p>
    Sie können Ihre Einwilligung jederzeit schriftlich oder mündlich ohne Angabe von Gründen widerrufen, ohne dass Ihnen daraus Nachteile entstehen. Nach Ihrem Widerruf werden keine neuen Daten mehr erhoben. Die bis dahin erfolgte Datenverarbeitung bleibt rechtmäßig.
    </p>
    <p>
    Sie können zudem die Löschung Ihrer bis zum Widerruf gesammelten Daten verlangen, solange diese noch nicht anonymisiert sind. Sobald die Schlüssel-Liste zerstört ist, können wir einzelne Datensätze nicht mehr Ihrer Person zuordnen; eine nachträgliche Löschung ist dann nicht mehr möglich.
    </p>

    <h3>10. Welche weiteren Rechte habe ich bezogen auf den Datenschutz?</h3>
    <p>
    Sie haben folgende Rechte:
    </p>
    <ul>
    <li>Auskunftsrecht (Art. 15 DSGVO)</li>
    <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
    <li>Recht auf Löschung (Art. 17 DSGVO)</li>
    <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
    <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
    <li>Widerspruchsrecht (Art. 21 DSGVO)</li>
    <li>Beschwerderecht bei einer Aufsichtsbehörde (Art. 77 DSGVO)</li>
    </ul>
    <p>
    Bitte wenden Sie sich dafür in erster Linie an die Projektleitung, da dort die Pseudonymisierungslisten vorliegen und Auskunft gegeben werden kann.
    </p>
    <p>
    Bei Fragen zur Datenverarbeitung und zur Einhaltung der datenschutzrechtlichen Anforderungen können Sie sich auch an folgende Datenschutzbeauftragte wenden:
    </p>
    <p>
    <strong>Dr. Jana Maier, Datenschutzbeauftragte</strong><br>
    J 5, 68159 Mannheim<br>
    E-Mail: <a href="mailto:datenschutzbeauftragter@zi-mannheim.de" target="_blank">datenschutzbeauftragter@zi-mannheim.de</a>
    </p>
    <p>
    Eine Liste der Datenschutzaufsichtsbehörden in Deutschland finden Sie unter: <br>
    <a href="https://www.bfdi.bund.de/DE/Infothek/Anschriften_Links/anschriften_links-node.html" target="_blank">https://www.bfdi.bund.de/DE/Infothek/Anschriften_Links/anschriften_links-node.html</a>.
    </p>

    <h3>11. Entschädigung</h3>
    <p>
    Für Ihre Teilnahme erhalten Sie eine Aufwandsentschädigung von 40 Euro.
    </p>

    <h3>12. Haftung</h3>
    <p>
    Für Schäden, die Ihnen im Rahmen der Untersuchung entstehen und die von Versuchsleiter:innen bzw. Mitarbeiter:innen des Zentralinstituts für Seelische Gesundheit in Ausübung ihrer dienstlichen Verrichtung schuldhaft verursacht werden, besteht eine Haftpflichtversicherung des Zentralinstituts für Seelische Gesundheit beim BGV Badische Versicherungen (Vertragsnummer V20/217 237/001).
    </p>
    <p>
    Zusätzlich besteht eine Wege-Unfallversicherung beim BGV Badische Versicherungen (Vertragsnummer V001271124), die ausschließlich Unfälle auf den <em>direkten</em> Fahrten von Ihrer Wohnung zum Zentralinstitut für Seelische Gesundheit in Mannheim und zurück abdeckt. Der Versicherungsschutz entfällt, wenn der Fahrtweg durch private Aktivitäten (z. B. Einkäufe, Restaurantbesuche) unterbrochen oder erheblich verlängert wird.
    </p>

    <h3>13. Finanzierung</h3>
    <p>
    Dieses Forschungsprojekt wird mehrheitlich vom Zentralinstitut für Seelische Gesundheit (ZI Mannheim) finanziert.
    </p>

    <h3>14. Kontaktperson(en)</h3>
    <p>
    Bei Fragen oder Unsicherheiten – auch nach Abschluss Ihrer Teilnahme – wenden Sie sich bitte an:
    </p>
    <p>
    <strong>Samuel Sander (Doktorand)</strong><br>
    Abteilung für Klinische Psychologie<br>
    AG Psychology and Neurobiology of Sleep and Memory<br>
    Zentralinstitut für Seelische Gesundheit<br>
    J 5, 68159 Mannheim, Germany<br>
    E-Mail: <a href="mailto:Samuel.Sander@zi-mannheim.de" target="_blank">Samuel.Sander@zi-mannheim.de</a>
    </p>

    <hr>

    <p>
    <strong>Mit Ihrer Unterschrift (oder elektronischen Einverständniserklärung) erklären Sie sich einverstanden, 
    freiwillig an dieser Studie teilzunehmen und bestätigen, dass Sie alle Inhalte dieser Aufklärung 
    verstanden haben.</strong>
    </p>
    </div>`,
    
    html:
    `<div class="questions" style="width: 60%; padding: 30px; margin: 10px auto; font-size: 18px; border: 5px solid white;">
    
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
