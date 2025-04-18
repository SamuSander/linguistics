// DEMOGRAPHICS QUESTIONS -----------------------------------------------------------------------------
var condition = "";
var condition_s2 = "";
//var demographic = "";
var instructionsWidth = 900

// FUNCTIONS
// These functions show/hide an input field if the option "other" is selected/deselected for 
// some questions.
function checkInput(val, value, id){
    if (val==value) {
      document.getElementById(id).style.display = "block";
      document.getElementById(id).setAttribute('required','required');
  } else {
      document.getElementById(id).style.display = "none";
      document.getElementById(id).removeAttribute('required');
  } 
}

function checkResidency(val) {
    let div = document.getElementById("residency-details-div");
  if (val === "yes") {
    div.style.display = "block";
    document.getElementById("postcode").setAttribute('required', 'required');
    document.getElementById("area").setAttribute('required', 'required');
  } else {
    div.style.display = "none";
    document.getElementById("postcode").removeAttribute('required');
    document.getElementById("area").removeAttribute('required');
  }
}

function checkChildren(val) {
    let div = document.getElementById("children-details-div");
    if (val === "yes") {
        div.style.display = "block";
        document.getElementById("children-number").setAttribute('required', 'required');
    } else {
        div.style.display = "none";
        document.getElementById("children-number").removeAttribute('required');
        clearAgeInputs();
    }
}

function createAgeInputs(num) {
    let agesDiv = document.getElementById("children-ages-div");
    clearAgeInputs();

    for (let i = 0; i < num; i++) {
        let ageInput = document.createElement("input");
        ageInput.setAttribute("type", "number");
        ageInput.setAttribute("class", "large-input");
        ageInput.setAttribute("required", "required");
        ageInput.setAttribute("name", `children-age-${i}`);
        ageInput.setAttribute("style", "width: 3em");
        ageInput.setAttribute("placeholder","Jahre");
        agesDiv.appendChild(ageInput);
        agesDiv.appendChild(document.createTextNode(" "));
    }
}

function clearAgeInputs() {
    let agesDiv = document.getElementById("children-ages-div");
    while (agesDiv.firstChild) {
        agesDiv.removeChild(agesDiv.firstChild);
    }
}

// QUESTIONNAIRE
var demographics = {
    on_load: function() {
        btn = document.querySelector('.jspsych-btn');
        btn.classList.remove('.jspsych-btn');
        btn.classList.add('white-btn');
        disp = document.querySelector('.jspsych-display-element');
        // disp.style.background = '#f2f2f2'
        
        // Function to check if the emails match
        function checkEmailMatch() {
        var email = document.getElementById('email').value;
        var confirmEmail = document.getElementById('confirm_email').value;
        var warningSpan = document.getElementById('email-warning');
    
        if (email !== confirmEmail) {
            warningSpan.style.display = 'inline'; // Show the warning message
        } else {
            warningSpan.style.display = 'none'; // Hide the warning message
        }
    }

    // Attach the function to the email input fields
    document.getElementById('email').onchange = checkEmailMatch;
    document.getElementById('confirm_email').onchange = checkEmailMatch;
        
    }, 
    type: jsPsychSurveyHtmlForm,
    data: { trial: 'screening' },
    html:
    `
    <br><br>
    <div class="instructions" style="padding: 30px; margin: 10px; font-size: 18px; width:800px; border-radius: 10px;">

    <p><b>Bitte beantworten Sie die folgenden demografischen Fragen:</b></p>
 
    <p>Alter: <input class="large-input" type="number" id="age" required="required" name="age" style="width: 3em"></p>

    <p>Was ist Ihr biologisches Geschlecht?<br>
    <select class="large-select" id="sex" required="required" name="sex">
        <option value=""></option>
        <option value="Male">männlich</option>
        <option value="Female">weiblich</option>
    </select>
    </p>

    <p>Mit welchem Geschlecht identifizieren Sie sich?<br>
        <select class="large-select" id="gender" required="required" name="gender" 
        onchange="checkInput(this.value, 'self_describe', 'identity')">
            <option value=""></option>
            <option value="male">männlich</option>
            <option value="female">weiblich</option>
            <option value="dont_say">möchte ich nicht angeben</option>
            <option value="self_describe">selbst beschreiben</option>
        </select>
    </p>
    <p>
        <input class="large-input" type="text" name="identity" id="identity" style="display:none;"
        placeholder="Wie würden Sie Ihr Geschlecht beschreiben?" size ="40">
    </p>

    <!-- 
    <p>Was ist Ihre Staatsangehörigkeit?<br>
        <input class="large-input" type="text" name="ethnicity" id="ethnicity" required="required"
        placeholder="Staatsangehörigkeit" size ="40">
    </p>
    -->

    <!-- Staatangehörigkeit -->
    <p>Was ist Ihre Staatsangehörigkeit?<br>
<select class="large-select" id="ethnicity" required="required" name="ethnicity">
    <option value=""></option>
    <option value="Ägypten">Ägypten</option>
    <option value="Äquatorialguinea">Äquatorialguinea</option>
    <option value="Äthiopien">Äthiopien</option>
    <option value="Afghanistan">Afghanistan</option>
    <option value="Albanien">Albanien</option>
    <option value="Algerien">Algerien</option>
    <option value="Amerika">Amerika</option>
    <option value="Andorra">Andorra</option>
    <option value="Angola">Angola</option>
    <option value="Antigua und Barbuda">Antigua und Barbuda</option>
    <option value="Argentinien">Argentinien</option>
    <option value="Armenien">Armenien</option>
    <option value="Aserbaidschan">Aserbaidschan</option>
    <option value="Australien">Australien</option>
    <option value="Bahamas">Bahamas</option>
    <option value="Bahrain">Bahrain</option>
    <option value="Bangladesch">Bangladesch</option>
    <option value="Barbados">Barbados</option>
    <option value="Belgien">Belgien</option>
    <option value="Belize">Belize</option>
    <option value="Benin">Benin</option>
    <option value="Bhutan">Bhutan</option>
    <option value="Bolivien">Bolivien</option>
    <option value="Bosnien-Herzegowina">Bosnien-Herzegowina</option>
    <option value="Botsuana">Botsuana</option>
    <option value="Brasilien">Brasilien</option>
    <option value="Brunei Darussalam">Brunei Darussalam</option>
    <option value="Bulgarien">Bulgarien</option>
    <option value="Burkina Faso">Burkina Faso</option>
    <option value="Burundi">Burundi</option>
    <option value="Chile">Chile</option>
    <option value="China">China</option>
    <option value="Cookinseln">Cookinseln</option>
    <option value="Costa Rica">Costa Rica</option>
    <option value="Côte d'Ivoire">Côte d'Ivoire</option>
    <option value="Dänemark">Dänemark</option>
    <option value="Deutschland">Deutschland</option>
    <option value="Dominica">Dominica</option>
    <option value="Dominikanische Republik">Dominikanische Republik</option>
    <option value="Dschibuti">Dschibuti</option>
    <option value="Ecuador">Ecuador</option>
    <option value="El Salvador">El Salvador</option>
    <option value="Eritrea">Eritrea</option>
    <option value="Estland">Estland</option>
    <option value="Fidschi">Fidschi</option>
    <option value="Finnland">Finnland</option>
    <option value="Frankreich">Frankreich</option>
    <option value="Gabun">Gabun</option>
    <option value="Gambia">Gambia</option>
    <option value="Georgien">Georgien</option>
    <option value="Ghana">Ghana</option>
    <option value="Grenada">Grenada</option>
    <option value="Griechenland">Griechenland</option>
    <option value="Guatemala">Guatemala</option>
    <option value="Guinea">Guinea</option>
    <option value="Guinea-Bissau">Guinea-Bissau</option>
    <option value="Guyana">Guyana</option>
    <option value="Haiti">Haiti</option>
    <option value="Honduras">Honduras</option>
    <option value="Indien">Indien</option>
    <option value="Indonesien">Indonesien</option>
    <option value="Irak">Irak</option>
    <option value="Iran">Iran</option>
    <option value="Irland">Irland</option>
    <option value="Island">Island</option>
    <option value="Israel">Israel</option>
    <option value="Italien">Italien</option>
    <option value="Jamaika">Jamaika</option>
    <option value="Japan">Japan</option>
    <option value="Jemen">Jemen</option>
    <option value="Jordanien">Jordanien</option>
    <option value="Jugoslawien">Jugoslawien</option>
    <option value="Kambodscha">Kambodscha</option>
    <option value="Kamerun">Kamerun</option>
    <option value="Kanada">Kanada</option>
    <option value="Kap Verde">Kap Verde</option>
    <option value="Kasachstan">Kasachstan</option>
    <option value="Katar">Katar</option>
    <option value="Kenia">Kenia</option>
    <option value="Kirgisistan">Kirgisistan</option>
    <option value="Kiribati">Kiribati</option>
    <option value="Kolumbien">Kolumbien</option>
    <option value="Komoren">Komoren</option>
    <option value="Kongo">Kongo</option>
    <option value="Korea, Demokratische Volksrepublik">Korea, Demokratische Volksrepublik</option>
    <option value="Korea, Republik">Korea, Republik</option>
    <option value="Kroatien">Kroatien</option>
    <option value="Kuba">Kuba</option>
    <option value="Kuwait">Kuwait</option>
    <option value="Laos">Laos</option>
    <option value="Lesotho">Lesotho</option>
    <option value="Lettland">Lettland</option>
    <option value="Libanon">Libanon</option>
    <option value="Liberia">Liberia</option>
    <option value="Libysch-Arabische Jamahiriya">Libysch-Arabische Jamahiriya</option>
    <option value="Liechtenstein">Liechtenstein</option>
    <option value="Litauen">Litauen</option>
    <option value="Luxemburg">Luxemburg</option>
    <option value="Madagaskar">Madagaskar</option>
    <option value="Malawi">Malawi</option>
    <option value="Malaysia">Malaysia</option>
    <option value="Malediven">Malediven</option>
    <option value="Mali">Mali</option>
    <option value="Malta">Malta</option>
    <option value="Marokko">Marokko</option>
    <option value="Marshallinseln">Marshallinseln</option>
    <option value="Mauretanien">Mauretanien</option>
    <option value="Mauritius">Mauritius</option>
    <option value="Mazedonien">Mazedonien</option>
    <option value="Mexiko">Mexiko</option>
    <option value="Mikronesien, Föderierte Staaten von">Mikronesien, Föderierte Staaten von</option>
    <option value="Moldau">Moldau</option>
    <option value="Monaco">Monaco</option>
    <option value="Mongolei">Mongolei</option>
    <option value="Mosambik">Mosambik</option>
    <option value="Myanmar">Myanmar</option>
    <option value="Namibia">Namibia</option>
    <option value="Nauru">Nauru</option>
    <option value="Nepal">Nepal</option>
    <option value="Neuseeland">Neuseeland</option>
    <option value="Nicaragua">Nicaragua</option>
    <option value="Niederlande">Niederlande</option>
    <option value="Niger">Niger</option>
    <option value="Nigeria">Nigeria</option>
    <option value="Niue">Niue</option>
    <option value="Nördliche Marianen">Nördliche Marianen</option>
    <option value="Norwegen">Norwegen</option>
    <option value="Österreich">Österreich</option>
    <option value="Oman">Oman</option>
    <option value="Pakistan">Pakistan</option>
    <option value="Palau">Palau</option>
    <option value="Panama">Panama</option>
    <option value="Papua-Neuguinea">Papua-Neuguinea</option>
    <option value="Paraguay">Paraguay</option>
    <option value="Peru">Peru</option>
    <option value="Philippinen">Philippinen</option>
    <option value="Polen">Polen</option>
    <option value="Portugal">Portugal</option>
    <option value="Ruanda">Ruanda</option>
    <option value="Rumänien">Rumänien</option>
    <option value="Russische Föderation">Russische Föderation</option>
    <option value="Salomonen">Salomonen</option>
    <option value="Sambia">Sambia</option>
    <option value="Samoa">Samoa</option>
    <option value="San Marino">San Marino</option>
    <option value="São Tomé und Príncipe">São Tomé und Príncipe</option>
    <option value="Saudi-Arabien">Saudi-Arabien</option>
    <option value="Schweden">Schweden</option>
    <option value="Schweiz">Schweiz</option>
    <option value="Senegal">Senegal</option>
    <option value="Seychellen">Seychellen</option>
    <option value="Sierra Leone">Sierra Leone</option>
    <option value="Simbabwe">Simbabwe</option>
    <option value="Singapur">Singapur</option>
    <option value="Slowakei">Slowakei</option>
    <option value="Slowenien">Slowenien</option>
    <option value="Somalia">Somalia</option>
    <option value="Spanien">Spanien</option>
    <option value="Sri Lanka">Sri Lanka</option>
    <option value="St. Kitts und Nevis">St. Kitts und Nevis</option>
    <option value="St. Lucia">St. Lucia</option>
    <option value="St. Vincent und die Grenadinen">St. Vincent und die Grenadinen</option>
    <option value="Südafrika">Südafrika</option>
    <option value="Sudan">Sudan</option>
    <option value="Suriname">Suriname</option>
    <option value="Swasiland">Swasiland</option>
    <option value="Syrien">Syrien</option>
    <option value="Tadschikistan">Tadschikistan</option>
    <option value="Tansania">Tansania</option>
    <option value="Thailand">Thailand</option>
    <option value="Togo">Togo</option>
    <option value="Tonga">Tonga</option>
    <option value="Trinidad und Tobago">Trinidad und Tobago</option>
    <option value="Tschad">Tschad</option>
    <option value="Tschechische Republik">Tschechische Republik</option>
    <option value="Türkei">Türkei</option>
    <option value="Tunesien">Tunesien</option>
    <option value="Turkmenistan">Turkmenistan</option>
    <option value="Tuvalu">Tuvalu</option>
    <option value="Uganda">Uganda</option>
    <option value="Ukraine">Ukraine</option>
    <option value="Ungarn">Ungarn</option>
    <option value="Uruguay">Uruguay</option>
    <option value="Usbekistan">Usbekistan</option>
    <option value="Vanuatu">Vanuatu</option>
    <option value="Vatikanstadt">Vatikanstadt</option>
    <option value="Venezuela">Venezuela</option>
    <option value="Vereinigte Arabische Emirate">Vereinigte Arabische Emirate</option>
    <option value="Vereinigte Staaten">Vereinigte Staaten</option>
    <option value="Vereinigtes Königreich">Vereinigtes Königreich</option>
    <option value="Vietnam">Vietnam</option>
    <option value="Weißrußland (Belarus)">Weißrußland (Belarus)</option>
    <option value="Zaire">Zaire</option>
    <option value="Zentralafrikanische Republik">Zentralafrikanische Republik</option>
    <option value="Zypern">Zypern</option>
    <option value="Ohne Angabe">Ohne Angabe</option>
</select>


    <p>Was ist Ihre Muttersprache?<br>
    <select class="large-select" id="language" required="required" name="language" 
    onchange="checkInput(this.value, 'other', 'other_lang')">
        <option value=""></option>
        <option value="German">Deutsch</option>
        <option value="other">andere</option>
    </select>
    </p>
    <p>
    <input class="large-input" type="text" name="other_lang" id="other_lang" style="display:none";
    placeholder="Muttersprache" size ="40">
    </p>

    <p>Beherrschen Sie Deutsch fließend?<br>
    <select class="large-select" id="fluency" required="required" name="fluency">
    <option value=""></option>
    <option value="yes">ja</option>
    <option value="no">nein</option>
    </select>
    </p>

    <hr>

    <!-- E-Mail-Adresse -->
    <p>Was ist Ihre E-Mail-Adresse?<br>
    <input class="large-input" type="email" id="email" required="required" name="email" placeholder="E-Mail-Adresse" size ="40">
    <!-- Bestätigung der E-Mail-Adresse -->
    <br><br>
    <input class="large-input" type="email" id="confirm_email" required="required" name="confirm_email" placeholder="E-Mail-Adresse bestätigen" size ="40">
    <!-- Element für die Warnmeldung -->
    <br>
    <span id="email-warning" style="color: red; display: none;">Die E-Mail-Adressen stimmen nicht überein.</span>


    <!-- Telefonnummer -->
    <p>Was ist Ihre Telefonnummer?<br>
    <input class="large-input" type="tel" id="phone" required="required" name="phone" 
           placeholder="Telefonnummer" size="40" 
           pattern="[0-9+\s-]+"
           title="Bitte geben Sie eine gültige Telefonnummer ein">
    </p>

    <hr>

    <!-- Hier fangen die neuen Fragen an -->

    <p>Was ist Ihr höchster schulischer Abschluss?<br>
        <select class="large-select" id="school_degree" required="required" name="school_degree">
            <option value=""></option>
            <option value="A level/subject restricted A level (Abitur)">Abitur</option>
            <option value="Entrance qualif. for studies at Fachochschule">Zugangsberechtigung für die Fachhochschule</option>
            <option value="Interm. school leaving certif./upper sec. level">Mittlere Reife (Mittlerer Schulabschluss)</option>
            <option value="Haupt/ Volksschulabschluss">Hauptschulabschluss</option>
            <option value="Without certificate or qaulification">Ohne Abschluss oder Qualifikation</option>
        </select>
    </p>

    <p>Was ist Ihre höchste berufliche Qualifikation?<br>
        <select class="large-select" id="professional_degree" required="required" name="professional_degree">
            <option value=""></option>
            <option value="Doctorate">Promotion (Doktor)</option>
            <option value="Universty degree">Universitätsabschluss</option>
            <option value="Qual. from a university of applied sciences">Abschluss in angewandten Wissenschaften (Fachhochschulabschluss)</option>
            <option value="Qaul. f. spec. academy/college of adv. voc. stud.">Berufliche Qualifikation (Fachwirt, Meister, etc.):</option>
            <option value="Certificate from a specialised technical college">Fachschulabschluss (Techniker)</option>
            <option value="Apprenticeship">Lehre/Berufsausbildung im dualen System</option>
            <option value="Without certificate or qualification">Keine Qualifikationen</option>
        </select>
    </p>
    
    <p>Was ist Ihre derzeitige Berufstätigkeit?<br>
    <input class="large-input" type="text" name="occupation" id="occupation" required="required" placeholder="Derzeitige Berufstätigkeit" size ="40">
    </p>

    <hr>
    <p>Wie ist Ihr Beziehungsstatus?<br>
        <select class="large-select" id="relationship_status" required="required" name="relationship_status">
        <option value=""></option>
        <option value="single">ledig</option>
        <option value="living_with_partner">in einer Partnerschaft lebend</option>
        <option value="married">verheiratet</option>
        <option value="separated">getrennt</option>
        <option value="widowed">verwitwet</option>
        <option value="divorced">geschieden</option>
        <option value="prefer_not_say">keine Angabe</option>
        </select>
    </p>
    
    <p>Leben Sie derzeit in Deutschland?<br>
        <select class="large-select" id="living_in_germany" required="required" name="living_in_germany" onchange="checkResidency(this.value)">
            <option value=""></option>
            <option value="yes">ja</option>
            <option value="no">nein</option>
        </select>
    </p>
    
    <div name="residency-details-div" id="residency-details-div" style="display:none;">
    <p>Wenn ja, geben Sie bitte Ihre Postleitzahl an:<br>
        <input class="large-input" type="text" name="postcode" id="postcode"
        placeholder="Postleitzahl" size ="40" maxlength="5">
    </p>
    <p>Leben Sie in einer städtischen oder ländlichen Gegend?<br>
        <select class="large-select" id="area" required="required" name="area">
            <option value=""></option>
            <option value="urban">städtisch</option>
            <option value="rural">ländlich</option>
        </select>
    </p>
    </div>
    </div>
    `,

    button_label: "weiter",

    on_finish : function(data) {
    var responses = data.response;
    var email = responses.email;
    var confirmEmail = responses.confirm_email;

    demographic = JSON.stringify(data.response);
    console.log(demographic);

    // Check if the email addresses match
    if (email !== confirmEmail) {
            // If emails do not match, show a message and then restart the trial
            jsPsych.finishTrial();

            var emailMismatchTrial = {
                type: 'html-keyboard-response',
                stimulus: '<p>Die eingegebenen E-Mail-Adressen stimmen nicht überein. Bitte versuchen Sie es erneut.</p>',
                choices: "NO_KEYS", 
                trial_duration: 2000, // display message for 2 seconds
                on_finish: function() {
                    jsPsych.addNodeToEndOfTimeline({ timeline: [demographics] });
                    jsPsych.resumeExperiment();
                }
            };

            jsPsych.addNodeToEndOfTimeline({ timeline: [emailMismatchTrial] });
        } else {

            console.log(email)
            updateConfig(
                "participantID", // varwhere
                participantID, // vareqls
                ['email'], // colnames
                [email] // values 
              );
            // // Send demographics and email to the config table
            // sendConfigurationStatusUpdate(
            //     "orseeId", // varwhere
            //     orseeId, // vareqls
            //     ['demographic'], // colnames
            //     [demographic], // values
            //     "orseeId"  // idType (the type of the ID column) 
            // );

            // sendEmailStatusUpdate(
            //     "orseeId", // varwhere
            //     orseeId, // vareqls
            //     ['email'], // colnames
            //     [email], // values
            //     "orseeId"  // idType (the type of the ID column) 
            // );
        }

    // Stringify, because array can not be saved in the database
    data.response = JSON.stringify(data.response);

    updateConfig(
        "participantID",
        participantID,
        ['demographics'],
        [data.response]
    );

    }
};

var checkEmailTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: '',
    choices: "NO_KEYS",
    trial_duration: 0,
    on_load: function() {
        // Get the last trial data
        var lastTrialData = jsPsych.data.get().last(1).values()[0];
        var email = lastTrialData.response.email;
        var confirmEmail = lastTrialData.response.confirm_email;

        if (email === confirmEmail) {
            // If emails match, set a flag to true
            jsPsych.data.addProperties({ emailsMatch: true });
        } else {
            // If emails do not match, set the flag to false
            jsPsych.data.addProperties({ emailsMatch: false });
        }
    }
};

var checkDemographicsLoop = {
    timeline: [demographics, checkEmailTrial],
    loop_function: function(data){
        // Check if emails match
        if(jsPsych.data.get().last(1).select('emailsMatch').values[0] === true){
            // If they match, break the loop
            return false;
        } else {
            // If they do not match, continue the loop
            return true;
        }
    }
};

