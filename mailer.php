<?php
error_reporting( E_ALL & ~( E_NOTICE | E_STRICT | E_DEPRECATED ) ); //Aquí se genera un control de errores "NO BORRAR NI SUSTITUIR"

require_once "Mail.php"; //Aquí se llama a la función mail "NO BORRAR NI SUSTITUIR"

$to = 'rubendr91@gmail.com'; //Aquí definimos quien recibirá el formulario
$from = 'rubenmailer91@gmail.com'; //Aquí definimos que cuenta mandará el correo, generalmente perteneciente al mismo dominio
$host = 'smtp.gmail.com'; //Aquí definimos cual es el servidor de correo saliente desde el que se enviaran los correos
$port = "587";
$username = 'rubenmailer91@gmail.com'; //Aqui se define el usuario de la cuenta de correo
$password = 'Mailerruben91'; //Aquí se define la contraseña de la cuenta d ecorreo que enviará el mensaje
$subject = $_POST['asunto']; //Aquí se define el asunto del correo
$nombre = $_POST['nombre'];
$emisor = $_POST['email'];
$body .= 'Nombre: ' . $nombre;
$body .= "\r\n" ;
$body .= 'Email: ' . $emisor ;
$body .= "\r\n";
$body .= "\r\n" ;
$body .= 'Mensaje:' . $_POST['texto'];

//A partir de aquí empleamos la función mail para enviar el formulario

$headers = array ('From' => $from,
'To' => $to,
'Subject' => $subject);
$smtp = Mail::factory('smtp',
array ('host' => $host,
'port'=> $port,
'auth' => true,
'username' => $username,
'password' => $password));

$mail = $smtp->send($to, $headers, $body);

//Una vez aquí habremos enviado el mensaje mediante el formulario

//El siguiente codigo muestra en pantalla un mensaje indicando que el mensaje ha sido enviado y a que cuenta ES OPCIONAL. Lo incluimos para verificar que el formulario de prueba esta funcionando

if (PEAR::isError($mail)) {
echo("
" . $mail->getMessage() . "

");
} else {
echo "<h2>Mensaje enviado con éxito, se le redireccionará en unos segundos.</h2> <br/> Si tras 5 segundos no se redirecciona automáticamente puede hacer click <a href='http://www.rudiradev.com/'>aquí</a>" ;
echo "<script>setTimeout(\"location.href = 'http://www.rudiradev.com/';\",5000);</script>";

}



?>
