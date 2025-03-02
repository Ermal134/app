<?php

function sanitize_input($data) {
    return htmlspecialchars(stripslashes(trim($data)));
}

$name = sanitize_input($_POST['name']);
$visitor_email = filter_var(sanitize_input($_POST['email']), FILTER_VALIDATE_EMAIL);
$phone_number = sanitize_input($_POST['phNumber']);
$address = sanitize_input($_POST['address']);
$message = sanitize_input($_POST['message']);

if (!$visitor_email) {
    die("Invalid email format");
}

$email_from = 'probeRightInspection.com';
$email_subject = "New form submission from $name";
$email_body = "Client Name: $name.\n".
              "Client Email: $visitor_email.\n".
              "Phone Number: $phone_number.\n".
              "Address: $address.\n".
              "Message: $message.\n";

$to = "test@test.com";
$headers = "From: $email_from\r\n";
$headers .= "Reply-To: $visitor_email\r\n";

if (mail($to, $email_subject, $email_body, $headers)) {
    header("Location: contactUs.html");
} else {
    echo "Error sending email.";
}

?>