var rango = new Array(0, 2.9, 3.9, 4.5, 5.0); // Listado de notas validas entre 1.0 y 5.0
var escala = new Array('', 'Bajo', 'Basico', 'Alto', 'Superior');  //Categoriz<acion de notas 
var formData = new FormData(); //Formulario
var count = 3;
let total = 0;
let promedio = 0;
let codalumnoGlobal = 0;
let curseGlobal = "210A";

var th_action = "<th id='promedio'>Promedio</th><th>Desempeño</th>";
formData.append('curso', '210A');

$(document).ready(function () {
    $("#fecha").datepicker();
    $('input[type=button]').button();
    $("#mensaje").dialog({
        autoOpen: false, buttons: {
            Ok: function () { $(this).dialog("close"); }
        }
    });
    AdicionarColumna();
    const min = 0;
    const max = 5;
    $(document).on('keyup', '.numberValue', function () {
        var self = $(this);
        var value = self.val();
        if (value < min || value > max) {
            alert('El número ingresado no está dentro del rango permitido');
            self.val('');
        }
    });


    $('.numberValue').keyup(function (e) {
        if (e.keyCode == 37)//38 para arriba
            mover(e, -1);
        if (e.keyCode == 39)//40 para abajo
            mover(e, 1);
    });

});

function mover(event, to) {
    let list = $('.numberValue');
    let index = list.index($(event.target));
    index = (index + to) % list.length;
    list.eq(index).focus();
}

function CambiarColor(id, nota) {
    var CDesemp = 'W' + id.substr(1, 5);
    var CFinal = 'X' + id.substr(1, 5);
    if (nota <= rango[4]) {
        formData.append(id, nota);
        $("#" + CDesemp).html(Desempeno(nota));
        $("#" + CFinal).val(nota);
    }
    if (nota <= rango[1]) $('#' + id).css("color", "red");
    else if (nota <= rango[2]) $('#' + id).css("color", "orange");
    else if (nota <= rango[3]) $('#' + id).css("color", "green");
    else if (nota <= rango[4]) $('#' + id).css("color", "blue");
    else $('#' + id).val('');
}

function Desempeno(nota) {
    if (nota == '') return '';
    if (nota <= rango[1]) return 'Bajo';
    if (nota <= rango[2]) return 'Básico';
    if (nota <= rango[3]) return 'Alto';
    if (nota <= rango[4]) return 'Superior';
}

function AdicionarColumna() {
    var html = '';

    let array = [];
    let users = [];
    let ListNotas = [];

    var table = '<table id="tabla1" class="table table-bordered"></table>'
    var thead = '<thead id="thead"></thead>'
    var tr = '<tr id="tr_head"></tr>'
    var th = '';
    var td = '';


    $('#contenedor').append(table);
    $('#tabla1').append(thead);
    $('#thead').append(tr)
    var tbody = '<tbody id="body"></tbody>'
    $('#tabla1').append(tbody)

    for (let codalumno in Notas) {

        let NotasAlumno = Object.keys(Notas[codalumno])
        obj = {
            'code': codalumno,
            'notas': NotasAlumno
        }

        codalumnoGlobal = codalumno;

        for (let index = 0; index < obj['notas'].length; index++) {
            let clave = NotasAlumno[index];
            ListNotas.push([obj['code'], NotasAlumno[index], Notas[codalumno][clave]])

        }

    }
    let AlumnosList = Object.keys(Alumnos)

    for (let z = 0; z < AlumnosList.length; z++) {
        let value = AlumnosList[z];

        users.push([AlumnosList[z], Alumnos[value]])
    }
    $('#tr_head').append('<th>CODIGO</th><th>ALUMNO</th><th>N. 1</th><th>N. 2</th><th>N. 3</th><th>N. 4</th><th>N. 5</th><th>N. 6</th><th>N. 7</th><th>Promedio</th><th>Desempeño</th>')

    for (let y = 0; y < users.length; y++) {

        $('#body').append('<tr id="tr_body' + y + '">')
        $('#tr_body' + y).append('<td class="codealum">' + users[y][0] + '</td><td class="codealum">' + users[y][1] + '</td>')

        for (let i = 1; i < 10; i++) {
            $('#tr_body' + y).append('<td id=""><input type="number" max="5" min="0" id="col-nota' + i + y + '" class="numberValue form-control" readonly onchange="promedieNotas(' + 8 + y + ', ' + i + y + ', ' + 9 + y + ',)" data-value="' + users[y][0] + '"></td>')

        }


        for (let g = 0; g < ListNotas.length; g++) {
            $('#col-' + ListNotas[g][1] + y).prop('readonly', false);
            if (ListNotas[g][0] == users[y][0]) {

                if (ListNotas[g][2] == null) {
                    $('#col-' + ListNotas[g][1] + y).hide()
                } else {
                    $('#col-' + ListNotas[g][1] + y).val(ListNotas[g][2])

                }

            }

        }

    }

    $('#body').append('</tr>')

    for (let r = 0; r < 52; r++) {
        for (let p = 3; p < 8; p++) {
            $('#col-nota' + p + r).hide()
        }
    }

}

function addNote() {
    for (let i = 0; i < 52; i++) {

        for (let f = 0; f < 52; f++) {
            $('#col-nota' + count + [f]).show()

        }


    }
    if (count < 7) {
        count = count + 1
    }


}

function promedieNotas(value, campo, finish) {

    let nota1 = $('#col-nota' + campo).val()
    if (nota1 == '') {
        nota1 = 0;
    }
    let nota2 = $('#col-nota' + campo).val()
    if (nota2 == '') {
        nota2 = 0;
    }
    let nota3 = $('#col-nota' + campo).val()
    if (nota3 == '') {
        nota3 = 0;
    }
    let nota4 = $('#col-nota' + campo).val()
    if (nota4 == '') {
        nota4 = 0;
    }
    let nota5 = $('#col-nota' + campo).val()
    if (nota5 == '') {
        nota5 = 0;
    }
    let nota6 = $('#col-nota' + campo).val()
    if (nota6 == '') {
        nota6 = 0;
    }
    let nota7 = $('#col-nota' + campo).val()
    if (nota7 == '') {
        nota7 = 0;
    }


    promedio = parseFloat(nota1) + parseFloat(nota2) + parseFloat(nota3) + parseFloat(nota4) + parseFloat(nota5) + parseFloat(nota6) + parseFloat(nota7);
    let residuo = promedio / 7;
    CambiarColor('col-nota' + value, Math.round(residuo))
    let k = Desempeno(Math.round(residuo));

    $('#col-nota' + finish).attr('type', 'text');
    $('#col-nota' + finish).val(k);



    $('#col-nota' + value).val(Math.round(residuo))

}

function GrabarNotas() {
    let arrayNotas = [];
    let h = $(':input[type="number"]')

    for (let d = 0; d < h.length; d++) {
        if(!$(h[d]).attr('readonly')){
            arrayNotas.push(
                $(h[d]).val()
            )
        }
    }

    // console.log(arrayNotas);
    

    $.post("insert.php",
        {
            code: codalumnoGlobal,
            curso: curseGlobal,
            notas: arrayNotas,
        },
        function (data, status) {
            alert("Data: " + data + "\nStatus: " + status);
        });
}
