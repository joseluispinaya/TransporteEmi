
let tablaData;
let idEditar = 0;

function ObtenerFecha() {
    const d = new Date();
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${day}/${month}/${d.getFullYear()}`;
}

$(document).ready(function () {

    $.datepicker.setDefaults($.datepicker.regional["es"])
    $("#txtFechaSalida").datepicker({ dateFormat: "dd/mm/yy" });

    $("#txtFechaSalida").val(ObtenerFecha());

    $('#timepicker2').timepicker({ showMeridian: false });

});

$("#btnNuevore").on("click", function () {
    $("#modalLabeldetalle").text("Nuevo Registro");

    $("#modalAdd").modal("show");
});

$("#btnGuardarCambios").on("click", function () {

    var modelo = {
        FechaSalida: $("#txtFechaSalida").val(),
        HoraSalida: $("#timepicker2").val()
    }
    console.log(modelo);

    mostrarAlertaZero("¡Atención!", "Todo bien ver por consola.", "success");
});

// fin