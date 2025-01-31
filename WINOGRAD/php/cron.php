<?php

header("Content-Type: text/plain");

require_once("email_setup.php");

// connect to db
$tblname = "drm_config";
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
	die("Connection failed: " . $conn->connect_error);
}

// STUDY INFO ------------------------------------------------------------------------------------------

/*
 * Select participants who:
 * - completed the screening
 * - are either in the wake or sleep condition (i.e., not excluded, did not quit)
 * - have not received any emails yet (email_reminder == 0)
 */

$sql = 
     "SELECT vpnCode, email, exp_condition, `status`, part1Time, "
    ."part2Time, email_reminder, n_failed_mails "
    ."FROM `$tblname` "
    ."WHERE `status` = 'completed screening' "
    ."AND exp_condition IN ('sleep', 'wake') "
    ."AND email_reminder = 0 "
    ."ORDER BY part1Time ASC";

$result = $conn->query($sql);

if($result){
	while($row = $result->fetch_assoc()) {

		$part1_time = new DateTime($row["part1Time"]);
		$part1_time->setTimezone(new DateTimeZone('Europe/Berlin'));
        $part2_time = new DateTime($row["part2Time"]);
		$part2_time->setTimezone(new DateTimeZone('Europe/Berlin'));

        if (isTimeToSendMail($now, $now, $row['email_reminder'], [0], 120)) {

            if (
                mail(
                    $row['email'], 
                    'Teilnahme-Info Studie das Zahlenspiel', 
                    sprintf(
                        $mailBody['study_info'], 
                        $part1_time->format('d.m.Y'), $part1_time->format('H:i'), 
                        $part2_time->format('d.m.Y'), $part2_time->format('H:i'),
                        $row['vpnCode']
                    ),
                    $headers, 
                    $evn_from
                )
            ) {

                // update email status in data base
                $sql = 	"UPDATE `$tblname` "
                ."SET email_reminder = 1 "
                ."WHERE vpnCode = '" . $row['vpnCode'] . "'";
                
                $conn->query($sql);

            } else {

                // When sending the email failed ten times, don't try the address anymore
                // Reset failed mail counter we try again to send an email when the session 
                // reminders come up.
                if ($row['n_failed_mails'] >= 10) {

                    $sql = 	"UPDATE `$tblname` "
                    ."SET email_reminder = 1, n_failed_mails = 0 "
                    ."WHERE vpnCode = '" . $row['vpnCode'] . "'";

                    $conn->query($sql);

                } else {

                    $sql = 	"UPDATE `$tblname` "
                    ."SET n_failed_mails = ".($row['n_failed_mails'] + 1)." "
                    ."WHERE vpnCode = '" . $row['vpnCode'] . "'";

                    $conn->query($sql);

                }

            }

        }

	}
} 

// REMINDER PART 1 -------------------------------------------------------------------------------------

/*
 * Select participants who:
 * - completed the screening
 * - are either in the wake or sleep condition (i.e., not excluded, did not quit)
 * - have not received any emails yet (email_reminder == 0), or have received the 
 *   study info mail (email_reminder == 1). This way, even when the study info mail 
 *   was not sent successfully, the reminder for part 1 will try to be sent
 */

 $sql = 
 "SELECT vpnCode, email, exp_condition, `status`, part1Time, "
."email_reminder, n_failed_mails "
."FROM `$tblname` "
."WHERE `status` = 'completed screening' "
."AND exp_condition IN ('sleep', 'wake') "
."AND email_reminder IN (0, 1) "
."ORDER BY part1Time ASC";

$result = $conn->query($sql);

if($result){
while($row = $result->fetch_assoc()) {

    $part1_time = new DateTime($row["part1Time"]);
    $part1_time->setTimezone(new DateTimeZone('Europe/Berlin'));

    if (isTimeToSendMail($now, $part1_time, $row['email_reminder'], [0, 1], 120)) {

        if (
            mail(
                $row['email'], 
                'Teilnahme-Erinnerung Studie das Zahlenspiel', 
                sprintf(
                    $mailBody['part1'], 
                    $part1_time->format('d.m.Y'), $part1_time->format('H:i'),
                    $row['vpnCode']
                ),
                $headers, 
                $evn_from
            )
        ) {

            // update email status in data base
            $sql = 	"UPDATE `$tblname` "
            ."SET email_reminder = 2 "
            ."WHERE vpnCode = '" . $row['vpnCode'] . "'";
            
            $conn->query($sql);

        } else {

            // When sending the email failed ten times, don't try the address anymore
            // Reset failed mail counter we try again to send an email when the session 
            // reminders come up.
            if ($row['n_failed_mails'] >= 10) {

                $sql = 	"UPDATE `$tblname` "
                ."SET email_reminder = 2, n_failed_mails = 0 "
                ."WHERE vpnCode = '" . $row['vpnCode'] . "'";

                $conn->query($sql);

            } else {

                $sql = 	"UPDATE `$tblname` "
                ."SET n_failed_mails = ".($row['n_failed_mails'] + 1)." "
                ."WHERE vpnCode = '" . $row['vpnCode'] . "'";

                $conn->query($sql);

            }

        }

    }

}
} 

// REMINDER PART 2 -------------------------------------------------------------------------------------

/*
 * Select participants who:
 * - started/completed part 1 (just in case part 1 completion was not logged properly)
 * - are either in the wake or sleep condition (i.e., not excluded, did not quit)
 * - have not received any emails yet (email_reminder == 0), or have received the 
 *   study info mail (email_reminder == 1), or have received the part 1 reminder (email_reminder == 2). 
 *  This way, previous mails were not sent successfully, the reminder for part 2 will try to be sent
 */

 $sql = 
 "SELECT vpnCode, email, exp_condition, `status`, part2Time, "
."email_reminder, n_failed_mails "
."FROM `$tblname` "
."WHERE `status` IN ('completed part 1', 'started part 1') "
."AND exp_condition IN ('sleep', 'wake') "
."AND email_reminder IN (0, 1, 2) "
."ORDER BY part2Time ASC";

$result = $conn->query($sql);

if($result){
while($row = $result->fetch_assoc()) {
    
    $part2_time = new DateTime($row["part2Time"]);
    $part2_time->setTimezone(new DateTimeZone('Europe/Berlin'));

    if (isTimeToSendMail($now, $part2_time, $row['email_reminder'], [0, 1, 2], 120)) {
        
        if (
            mail(
                $row['email'], 
                'Teilnahme-Erinnerung Studie das Zahlenspiel', 
                sprintf(
                    $mailBody['part2'], 
                    $part2_time->format('d.m.Y'), $part2_time->format('H:i'),
                    $row['vpnCode']
                ),
                $headers, 
                $evn_from
            )
            ) {
                
                // update email status in data base
                $sql = 	"UPDATE `$tblname` "
                ."SET email_reminder = 3 "
                ."WHERE vpnCode = '" . $row['vpnCode'] . "'";
        
                $conn->query($sql);
            
            } else {
                
                // When sending the email failed ten times, don't try the address anymore
                // Reset failed mail counter we try again to send an email when the session 
                // reminders come up.
                if ($row['n_failed_mails'] >= 10) {
                    
                    $sql = 	"UPDATE `$tblname` "
                    ."SET email_reminder = 3, n_failed_mails = 0 "
                    ."WHERE vpnCode = '" . $row['vpnCode'] . "'";
                    
                    $conn->query($sql);
                
                } else {
                    
                    $sql = 	"UPDATE `$tblname` "
                    ."SET n_failed_mails = ".($row['n_failed_mails'] + 1)." "
                    ."WHERE vpnCode = '" . $row['vpnCode'] . "'";
                    
                    $conn->query($sql);
                
                }
            }
        
        }
    
    }

} 

// VPN CODE WARNING ------------------------------------------------------------------------------------

/*
 * Send warning to myself in the very unlikely event that a vpn code is duplicated (in which case 
 * a manual correction would be required). Future Juli can find a more elegant solution for that.
 */

 $sql = 
 "SELECT vpnCode, COUNT(*) AS duplicate_count "
 ."FROM drm_config "
 ."GROUP BY vpnCode "
 ."HAVING COUNT(*) > 1;";

$result = $conn->query($sql);
$duplicateVpns = "";

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $duplicateVpns .= $row["vpnCode"] . ", ";
    }
    // Remove the trailing comma and space
    $duplicateVpns = rtrim($duplicateVpns, ", ");
}

// The cronjob is running every 5 min, but I definitely don't want an email every 5 min. 
// Control via a flag in the db whether I've already received an email about this.

$sql = 
     "SELECT duplicate_mail "
    ."FROM flags ";

$result = $conn->query($sql);
$result = $result->fetch_assoc();
$duplicate_mails = $result['duplicate_mail'];

if ($duplicateVpns != "" & $duplicate_mails == 0) {

    mail(
        'Juliane.Nagel@zi-mannheim.de', 
        'Warnung: duplicate vpnCodes', 
        'Folgende vpnCodes kommen doppelt vor: '.$duplicateVpns,
        $headers, 
        $evn_from
    );

    $sql = 
    "UPDATE flags " 
    ."SET duplicate_mail = 1";

    $conn->query($sql);

}

// THANK YOU -------------------------------------------------------------------------------------------

/*
 * I want to at least know whether this would have worked.
 * 
 * Criteria:
 * - Latest part2Time stamp is more than two weeks ago.
 * - We have collected at least 50 participants per condition.
 */

 $sql = 
 "SELECT COUNT(*) AS wake_completed "
."FROM drm_config "
."WHERE exp_condition = 'wake' AND `status` = 'completed part 2'";

$result = $conn->query($sql);

if ($result) {

    $row = $result->fetch_assoc();
    $wake_completed = $row['wake_completed'];

}

$sql = 
"SELECT COUNT(*) AS sleep_completed "
."FROM drm_config "
."WHERE exp_condition = 'sleep' AND `status` = 'completed part 2'";

$result = $conn->query($sql);

if ($result) {

    $row = $result->fetch_assoc();
    $sleep_completed = $row['sleep_completed'];

}

$sql = 
"SELECT MAX(CAST(part2Time AS datetime)) AS latest_part2Time "
."FROM drm_config;";

$result = $conn->query($sql);

$sql = 
     "SELECT ty_mail "
    ."FROM flags ";

$ty_flag = $conn->query($sql);
$ty_flag = $ty_flag->fetch_assoc();
$ty_flag = $ty_flag['ty_mail'];

if ($result) {

    $row = $result->fetch_assoc();

    if (!is_null($row['latest_part2Time'])) {

        $latest_part2Time =  new DateTime($row['latest_part2Time']);
        $latest_part2Time->setTimezone(new DateTimeZone('Europe/Berlin'));
        $diff_latest = diff_in_min($latest_part2Time, $now);
    
        if ($diff_latest > 20160 & ($sleep_completed >= 50) & ($wake_completed >= 50) & $ty_flag == 0) {
    
            mail(
                'julivnagel@gmail.com', 
                'Mail ist raus', 
                'You did it ... xoxo, Vergangenheits-Juli',
                $headers, 
                $evn_from
            );

            $sql = 
            "UPDATE flags " 
            ."SET ty_mail = 1";
        
            $conn->query($sql);
    
        }

    }
    
}
