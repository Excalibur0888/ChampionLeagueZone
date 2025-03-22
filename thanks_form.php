<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $subject = $_POST["subject"];
    $message = $_POST["message"];
    $terms = isset($_POST["terms"]) ? "Agreed" : "Not agreed";
    
    $to = "contact@" . $_SERVER['HTTP_HOST'];
    $email_subject = "New Contact Form Submission: $subject";
    
    $body = "Name: $name\n";
    $body .= "Email: $email\n";
    $body .= "Subject: $subject\n";
    $body .= "Message:\n$message\n";
    $body .= "Privacy Policy: $terms\n";
    
    $headers = "From: $to \r\n";
    mail($to, $email_subject, $body, $headers);
    
    // Redirect to thank you page
    header("Location: thanks.html");
    exit();
}
?>
