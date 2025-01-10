<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Examen de Prueba</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
<link rel="stylesheet" href="./resources/css/style.css">
<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
<script src="./resources/js/script.js"></script>

<?php
$Frases=array('Esperamos que pueda suceder cualquier cosa, y nunca estamos prevenidos para nada. Sophie Soynonov',
'El pasado es como una lámpara colocada a la entrada del porvenir. Félicité Robert de Lamennais',
'Valor es lo que se necesita para levantarse y hablar, pero también es lo que se requiere para sentarse y escuchar.',
'Si no sueltas el pasado, ¿con qué mano agarras el futuro?');
$curso="210A";
$codcol="00026011";
$alucur="alucura24";
$archnotas='notasa24';
$link = mysqli_connect("localhost", "root", "", "examen24");
if (mysqli_connect_errno()) {
    printf("Connect failed: %s\n", mysqli_connect_error());
    exit();
}
mysqli_select_db($link, "examen24");

$consulta = "SELECT * FROM $archnotas WHERE curso='$curso'";
$result = mysqli_query($link, $consulta) or die ("* ERROR EN $archnotas *". mysqli_error($link));
$Alumnos=array();
while ($registro = mysqli_fetch_assoc($result)) {
	$codal=$registro['codigo'];
	$Notas[$codal]=array_slice($registro, 2, 7);
}

$consulta = "SELECT C.codigo,A.apellidos,A.nombres FROM $alucur C,alumnos A ";
$consulta.= " WHERE C.curso='$curso' AND C.codigo=A.codigo ORDER BY A.apellidos ASC ";
$result = mysqli_query($link, $consulta) or die ("* ERROR EN ALUMNOS *". mysqli_error($link));
$Alumnos=array();

while ($registro = mysqli_fetch_array($result)) {
	$codal=$registro['codigo'];
	$Alumnos[$codal]=utf8_encode($registro['apellidos'].' '.$registro['nombres']);
}
$n = rand(0,3);
$CodsAlum=array_keys($Alumnos); // Guardo el codigo del alumno para insertar las columnas
mysqli_close($link);
?>
<script>Alumnos=<?PHP echo json_encode($Alumnos);?></script>
<script>CodsAlum=<?PHP echo json_encode($CodsAlum);?></script>
<script>Notas=<?PHP echo json_encode($Notas);?></script>
</head>

<body>
<center>
<div id="principal">
<br />
<h1 class="text-white">COLEGIO DE PRUEBA SYSCOLEGIOS</h1>
<br>
<h2 class="text-dark fw-bold">PLANILLA DE INGRESO DE CALIFICACIONES</h2>
<hr />
<br>
<div class="container">
	<div class="row">
		<div class="col-3 text-end">
			<label class="fs-5 fw-bold">Fecha de Ingreso:</label>
		</div>
		<div class="col-8">
			<input type="text" id="fecha" readonly="readonly" size="8"  class="form-control" placeholder="dd/MM/YYYY" aria-label="fecha" aria-describedby="basic-addon1">
		</div>
	</div>
	<br>
	<div class="row">
		<div class="col">
			<div class="b-info-message">
				<p class="text-secondary">Si deseas agregar una nueva columna para notas por favor clickea el boton.</p>
				<button class="btn btn-dark btn-md margin-button-plus" id="" onclick="addNote()">Agregar Nota</button>
			</div>
		</div>
		<div class="col">
			<div class="b-info-message">
				<p class="text-secondary">Si deseas reiniciar el formulario por favor para mantener las notas clickea el boton.</p>
				<a href="" class="btn btn-dark btn-md margin-button-plus">Recargar Listado</a>
			</div>
		</div>
	</div>

</div>

<br>
<br>
<div class="container">
	<div class="row">
		<div class="col">
			<h2 class="text-dark fw-bold">Lista de Alumnos</h2>
			<hr class="w-hr">
		</div>
	</div>
</div>

<!-- <img src="SignoMas.jpg" id="masCol" width="50" height="50" title="Adicionar Columna" /> -->
<form id="Form1">
	<div class="container">
		<div id="contenedor"></div>
	</div>
</form>
<div id="mensaje" title="Mensaje syscolegios"></div>
<hr />

<button id="grabar" class="btn btn-primary" onclick="GrabarNotas()">Grabar</button>
<button id="regresar" class="btn btn-danger" onclick="window.history.go(-1);">Regresar</button>
<hr />
</div>
</center>
<div class="container">
	<marquee class="text-dark margin-message">
		<?php echo $Frases[$n].date('Y-m-d'); ?>
	</marquee>
</div>
</body>
</html>