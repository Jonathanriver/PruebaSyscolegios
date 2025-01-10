<?php 
// estableciendo parametros de conexion  
$link = mysqli_connect("localhost", "root", "", "examen24");
if (mysqli_connect_errno()) {
    printf("Connect failed: %s\n", mysqli_connect_error());
    exit();
}

// establecoendo la conexion 
mysqli_select_db($link, "examen24");


$curso = $_POST['curso'];
$notas = $_POST['notas'];

foreach ($notas as $key => $value) {
    $consulta = "INSERT INTO notasa24 VALUES ($value[0],'$curso',$value[nota1],$value[nota2],$value[nota3],$value[nota4],$value[nota5],$value[nota6],$value[nota7])";
}

$result = mysqli_query($link, $consulta) or die ("* ERROR EN $archnotas *". mysqli_error($link));


?>