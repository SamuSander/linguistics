<?php

header("Content-Type: text/plain");

// FUNCTIONS -------------------------------------------------------------------------------------------

/*
 * Calculates the difference between two DateTimes in minutes.
 * (Second minus first, i.e. how many minutes have passed since
 * first until second.)
 */
function diff_in_min(DateTime $first, DateTime $second) {
	$diff = $first->diff($second);
	$delta = $diff->d * 24 * 60;
	$delta += $diff->h * 60;
	$delta += $diff->i;

	$delta = $diff->invert == 1 ? -1 * $delta : $delta;

	return $delta;
}

/*
 * Send a reminder when there are $send_before or less hours until $studytime, 
 * and when $email_status is equal to $req_email_status (i.e., the email status is 
 * the "required email status" for this event).
 * Don't send an email when the study time is already over; i.e., when part 1 time 
 * has passed for part 1, when part 2 time has passed for part 2. 
 * For the initial study reminder, we set study time to $now, so the email will be 
 * sent as long as $email_status matches $req_email status, regardless of time.
 * In our case, we sent emails: 
 * - after participants complete the screening ($req_email_status = 0, $studytime 
 * does not matter)
 * - 2 h before session 1 ($req_email_status = 1, $now + 2 >= $studytime part 1)
 * - 2 h before session 2 ($req_email_status = 1, $now + 2 >= $studytime part 2)
 */

function isTimeToSendMail(
	DateTime $now, 
	DateTime $studytime,
    int $email_status,
	array $req_email_status,
    int $send_before
) {
	
	$studytime->setTimezone(new DateTimeZone('Europe/Berlin'));

	$delta = diff_in_min($now, $studytime);
    echo "delta:".$delta." -- ";
    $is_time = in_array($email_status, $req_email_status) & ($delta < $send_before) & ($delta >= 0);
    return $is_time;
}

// SETUP -----------------------------------------------------------------------------------------------

require_once("database_access.php");

$now = new DateTime();

$mailBody = array();

$mailBody['study_info'] = '
<html>
    <head></head>
    <body>
        <p>Herzlich willkommen zu unserer Studie <b>"das Zahlenspiel"</b>!</p><br>
        In dieser E-Mail erhälst du einige wichtige Informationen für deine Teilnahme.<br><br>

        <li><b>Termin 1:</b> %s - %s Uhr</li>
        <li><b>Termin 2:</b> %s - %s Uhr</li>
        <li><b>Deine ID:</b> %s</li>

        <br><br>

        <b>Wegbeschreibung</b><br><br>

        <b>Ort der Studie</b><br>
        Psychologisches Institut der Universität Heidelberg<br>
        Hauptstraße 47-51,<br>
        69117 Heidelberg<br>
        Im Zentralen Verhaltenslabor (ZVL)
        <br><br>
        
        <b>Zugang zum Psychologischen Institut (PI)</b><br>
        <li>Entweder durch den Haupteingang -> durch das Vordergebäude (VG) laufen zum Innenhof (IH)</li>
        <li><b>ODER</b> falls der Haupteingang verschlossen ist: Seitlicher Eingang von der Brunnengasse 
        durch das Tor (hinter dem Vordergebäude (VG)) direkt zum Innenhof (IH)</li>

        <br><br>
        
        <b>Zugang zum Zentralen Verhaltenslabor (ZVL)</b><br>
        <li>In das Hintergebäude (HG) hinein -> links die Treppe hinunter -> durch die Glastür, rechts zum ZVL</li>
        <li><b>ODER</b> vor dem Hintergebäude (HG) links die Außentreppe hinunter durch die Glastür und dann links 
        durch den Gang zum ZVL</li>
        <li><b>ODER</b> links an der ersten Außentreppe vorbei zur hinteren Außentreppe rechts und hinunter direkt 
        ins ZVL</li>
        <li>Das Labor befindet sich im Untergeschoss!</li>
        
        <br><br>

        <img src="https://klips.zi-mannheim.de/insight_lab/pics/wegbeschreibung.png" alt="Wegbeschreibung" style="max-width: 300px;">

        <br><br>

        Dies ist eine automatisch generierte Mail - bitte antworte nicht! Wenn du Fragen hast, 
        wende dich stattdessen bitte an 
        <a href = "mailto: juliane.nagel@zi-mannheim.de" target="_blank">juliane.nagel@zi-mannheim.de</a>.

        <br><br>

        Solange du Teil 1 der Studie noch nicht begonnen hast, kannst du deinen Termin jederzeit 
        unter 
        <a href="https://klips.zi-mannheim.de/insight_lab/001_reschedule.html">diesem Link</a> 
        ändern.
        
        <br><br>

        <b>Bitte beachte, dass du deine Vergütung (Geld oder Versuchspersonenstunden) erst nach 
        Abschluss beider Studienteile erhältst!</b>

        <br><br>

        Wir freuen uns auf deine Teilnahme!<br><br>
        Dein Studienteam<br>
        Aileen, Dagmar & Juli
    </body>
</html>
';

$mailBody['part1'] = '
<html>
    <head></head>
    <body>
        <p>Dein erster Termin für die Studie <b>"das Zahlenspiel"</b> beginnt bald!</p><br><br>
        
        Zur Erinnerung, dies ist dein erster Termin:<br>
        <b>%s - %s Uhr</b><br>
        <b>Deine ID:</b> %s

        <br><br>

        <b>Wegbeschreibung</b><br><br>

        <b>Ort der Studie</b><br>
        Psychologisches Institut der Universität Heidelberg<br>
        Hauptstraße 47-51,<br>
        69117 Heidelberg<br>
        Im Zentralen Verhaltenslabor (ZVL)
        <br><br>
        
        <b>Zugang zum Psychologischen Institut (PI)</b><br>
        <li>Entweder durch den Haupteingang -> durch das Vordergebäude (VG) laufen zum Innenhof (IH)</li>
        <li><b>ODER</b> falls der Haupteingang verschlossen ist: Seitlicher Eingang von der Brunnengasse 
        durch das Tor (hinter dem Vordergebäude (VG)) direkt zum Innenhof (IH)</li>

        <br><br>
        
        <b>Zugang zum Zentralen Verhaltenslabor (ZVL)</b><br>
        <li>In das Hintergebäude (HG) hinein -> links die Treppe hinunter -> durch die Glastür, rechts zum ZVL</li>
        <li><b>ODER</b> vor dem Hintergebäude (HG) links die Außentreppe hinunter durch die Glastür und dann links 
        durch den Gang zum ZVL</li>
        <li><b>ODER</b> links an der ersten Außentreppe vorbei zur hinteren Außentreppe rechts und hinunter direkt 
        ins ZVL</li>
        <li>Das Labor befindet sich im Untergeschoss!</li>
        
        <br><br>

        <img src="https://klips.zi-mannheim.de/insight_lab/pics/wegbeschreibung.png" alt="Wegbeschreibung" style="max-width: 300px;">

        <br><br>

        Solltest du uns nicht finden, erreichst du uns unter:<br>
        <li>+49 163-570 41 48</li>
        <li>+49 172-684 90 44</li>
        
        <br><br>

        Dies ist eine automatisch generierte Mail - bitte antworte nicht! Wenn du Fragen hast, 
        wende dich stattdessen bitte an 
        <a href = "mailto: juliane.nagel@zi-mannheim.de" target="_blank">juliane.nagel@zi-mannheim.de</a>.

        <br><br>

        Solange du Teil 1 der Studie noch nicht begonnen hast, kannst du deinen Termin jederzeit 
        unter 
        <a href="https://klips.zi-mannheim.de/insight_lab/001_reschedule.html">diesem Link</a> 
        ändern.
        
        <br><br>

        <b>Bitte beachte, dass du deine Vergütung (Geld oder Versuchspersonenstunden) erst nach 
        Abschluss beider Studienteile erhältst!</b>

        <br><br>

        Bis später!<br><br>
        Dein Studienteam<br>
        Aileen, Dagmar & Juli
    </body>
</html>
';

$mailBody['part2'] = '
<html>
    <head></head>
    <body>
        <p>Dein zweiter Termin für die Studie <b>"das Zahlenspiel"</b> beginnt bald!</p><br><br>
        
        Zur Erinnerung, dies ist dein zweiter Termin:<br>
        <b>%s - %s Uhr</b><br>
        <b>Deine ID:</b> %s

        <br><br>

        <b>Wegbeschreibung</b><br><br>

        <b>Ort der Studie</b><br>
        Psychologisches Institut der Universität Heidelberg<br>
        Hauptstraße 47-51,<br>
        69117 Heidelberg<br>
        Im Zentralen Verhaltenslabor (ZVL)
        <br><br>
        
        <b>Zugang zum Psychologischen Institut (PI)</b><br>
        <li>Entweder durch den Haupteingang -> durch das Vordergebäude (VG) laufen zum Innenhof (IH)</li>
        <li><b>ODER</b> falls der Haupteingang verschlossen ist: Seitlicher Eingang von der Brunnengasse 
        durch das Tor (hinter dem Vordergebäude (VG)) direkt zum Innenhof (IH)</li>

        <br><br>
        
        <b>Zugang zum Zentralen Verhaltenslabor (ZVL)</b><br>
        <li>In das Hintergebäude (HG) hinein -> links die Treppe hinunter -> durch die Glastür, rechts zum ZVL</li>
        <li><b>ODER</b> vor dem Hintergebäude (HG) links die Außentreppe hinunter durch die Glastür und dann links 
        durch den Gang zum ZVL</li>
        <li><b>ODER</b> links an der ersten Außentreppe vorbei zur hinteren Außentreppe rechts und hinunter direkt 
        ins ZVL</li>
        <li>Das Labor befindet sich im Untergeschoss!</li>
        
        <br><br>

        <img src="https://klips.zi-mannheim.de/insight_lab/pics/wegbeschreibung.png" alt="Wegbeschreibung" style="max-width: 300px;">

        <br><br>

        Solltest du uns nicht finden, erreichst du uns unter:<br>
        <li>+49 163-570 41 48</li>
        <li>+49 172-684 90 44</li>
        
        <br><br>

        Dies ist eine automatisch generierte Mail - bitte antworte nicht! Wenn du Fragen hast, 
        wende dich stattdessen bitte an 
        <a href = "mailto: juliane.nagel@zi-mannheim.de" target="_blank">juliane.nagel@zi-mannheim.de</a>.
        
        <br><br>

        <b>Bitte beachte, dass du deine Vergütung (Geld oder Versuchspersonenstunden) erst nach 
        Abschluss beider Studienteile erhältst!</b>

        <br><br>

        Bis später!<br><br>
        Dein Studienteam<br>
        Aileen, Dagmar & Juli
    </body>
</html>
';

$mailBody['thanks'] = '
<html>
    <head></head>
    <body>
        <p>Hi Moritz, hi Christoph</p><br><br>
        
        Wenn euch diese automatische E-Mail erreicht, dann ist die Datenerhebung für meine 
        aktuelle Studie erfolgreich beendet. (Oder ich habe den Code verhauen, der das prüfen soll.)

        <br><br>

        Wie ihr seht, klappt das mit den automatisierten E-Mails aus dem Container super. Vielen 
        Dank für eure Arbeit!

        <br><br>

        Tschöö!<br>
        Vergangenheits-Juli
    </body>
</html>
';

// set email headers
$headers = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";
$headers .= 'From: Zahlenspiel-Studie <noreply@zi-mannheim.de>' . "\r\n";
$evn_from = "-f noreply@zi-mannheim.de";

// connect to db
$tblname = "insight_config";
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
	die("Connection failed: " . $conn->connect_error);
}
