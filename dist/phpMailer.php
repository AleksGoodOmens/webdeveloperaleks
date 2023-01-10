<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader
require 'vendor/autoload.php';

// data from my form

$name = $_POST['name'];
// $phone = $_POST['phone'];
$email = $_POST['email'];
$message = $_POST['message'];
$file = $_FILES['file'];

//Create an instance; passing `true` enables exceptions
$mail = new PHPMailer(true);

try {
    //Server settings
    $mail->SMTPDebug = 2;                      //Enable verbose debug output
    $mail->isSMTP();                                            //Send using SMTP
    $mail->Host       = 'smtp.gmail.com';                     //Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
    $mail->Username   = 'agsfinks@gmail.com';                     //SMTP username
    $mail->Password   = 'kdkyzqgwydofnlqe';                               //SMTP password
    $mail->SMTPSecure = 'tls';            //Enable implicit TLS encryption
    $mail->Port       = 587;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

    //Recipients
    $mail->setFrom('julija.gomenyuk@gmail.com', 'Aleks Portfolio');
    $mail->addAddress('postfuctumagsfinks@yandex.ru', 'Aleks Portfolio');     //Add a recipient
    // $mail->addAddress('ellen@example.com');               //Name is optional
    // $mail->addReplyTo('info@example.com', 'Information');
    // $mail->addCC('cc@example.com');
    // $mail->addBCC('bcc@example.com');

    //Attachments
    // $mail->addAttachment('/var/tmp/file.tar.gz');         //Add attachments
    // $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    //Optional name

    //Content
    $mail->isHTML(true);
    
    // Прикрипление файлов к письму
if (!empty($file['name'][0])) {
    for ($ct = 0; $ct < count($file['tmp_name']); $ct++) {
		$uploadfile = tempnam(sys_get_temp_dir(), sha1($file['name'][$ct]));
		$filename = $file['name'][$ct];
		if (move_uploaded_file($file['tmp_name'][$ct], $uploadfile)) {
			$mail->addAttachment($uploadfile, $filename);
			$rfile[] = "Файл $filename прикреплён";
		} else {
			$rfile[] = "Не удалось прикрепить файл $filename";
		}
    }
}
    
    //Set email format to HTML
    $mail->Subject = 'Here is the subject';
    $mail->Body    = '
                        Пользователь оставил данные <br> 
                        Имя: ' . $name . ' <br>
                        Сообщение: ' . $message . ' <br>
                        Приложенные файлы: ' . $file . ' <br>
                        E-mail: ' . $email . '';

    $mail->AltBody = 'Hi this is Aleks Portfolio ';

    $mail->send();
    echo 'Message has been sent';
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}