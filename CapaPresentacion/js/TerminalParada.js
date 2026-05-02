
let tablaDataCiud;
let idEditarCiud = 0;

let tablaDataRuta;
let idEditarRuta = 0;

let tablaDataRutPara;
let idEditarRutPara = 0;

$(document).ready(function () {
    listaCiudadesPara();
    listaRutas();
});

// Ciudades paradas

function listaCiudadesPara() {
    //if ($.fn.DataTable.isDataTable("#tbTerminales")) {
    //    $("#tbTerminales").DataTable().destroy();
    //    $('#tbTerminales tbody').empty();
    //}

    tablaDataCiud = $("#tbTerminales").DataTable({
        responsive: true,
        searching: false,
        info: false,
        "ajax": {
            "url": 'TerminalParada.aspx/ListaCiudadesParada',
            "type": "POST",
            "contentType": "application/json; charset=utf-8",
            "dataType": "json",
            "data": function (d) {
                return JSON.stringify(d);
            },
            "dataSrc": function (json) {
                if (json.d.Estado) {
                    return json.d.Data;
                } else {
                    return [];
                }
            }
        },
        "columns": [
            { "data": "IdCiudad", "visible": false, "searchable": false },
            {
                "data": "Nombre",
                render: function (data) {
                    return `<span class="badge p-1 bg-light text-dark fs-14 me-1"><i class="ti ti-map-pin-filled align-text-top fs-14 text-warning me-1"></i>${data}</span>`;
                }
            },
            {
                "data": "Estado",
                "className": "text-center",
                render: function (data) {
                    // Badges modernos (subtle) de Bootstrap 5
                    if (data === true)
                        return '<span class="badge bg-success-subtle text-success border border-success-subtle px-2 py-1"><i class="ti ti-check me-1"></i>Activo</span>';
                    else
                        return '<span class="badge bg-danger-subtle text-danger border border-danger-subtle px-2 py-1"><i class="ti ti-x me-1"></i>Inactivo</span>';
                }
            },
            {
                "defaultContent": '<button class="btn btn-soft-primary btn-icon btn-sm rounded-circle btn-editar me-2"><i class="ti ti-pencil-plus"></i></button>' +
                    '<button class="btn btn-soft-info btn-icon btn-sm rounded-circle btn-detalle"><i class="ti ti-eye"></i></button>',
                "orderable": false,
                "searchable": false,
                "className": "text-center"
            }
        ],
        "order": [[0, "desc"]],
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
        }
    });
}

$('#tbTerminales tbody').on('click', '.btn-editar', function () {

    let fila = $(this).closest('tr');

    if (fila.hasClass('child')) {
        fila = fila.prev();
    }

    let data = tablaDataCiud.row(fila).data();
    idEditarCiud = data.IdCiudad;
    $("#txtNombreCiudadPa").val(data.Nombre);
    $("#cboEstado").val(data.Estado ? 1 : 0).prop("disabled", false);
    $("#modalLabelterminal").text("Editar Ciudad");
    $("#modalTerminal").modal("show");

});

$("#btnNuevaTerminal").on("click", function () {

    idEditarCiud = 0;
    $("#txtNombreCiudadPa").val("");
    $("#cboEstado").val(1).prop("disabled", true);

    $("#modalLabelterminal").text("Nueva Ciudad");

    $("#modalTerminal").modal("show");

})

$("#btnGuardarRegCiudad").on("click", function () {

    // 1. Bloqueo inmediato
    $('#btnGuardarRegCiudad').prop('disabled', true);

    if ($("#txtNombreCiudadPa").val().trim() === "") {
        ToastMaster.fire({
            icon: 'warning',
            title: 'Debe completar el campo Ciudad Terminal'
        });

        $("#txtNombreCiudadPa").focus();
        $('#btnGuardarRegCiudad').prop('disabled', false);
        return;
    }

    const objeto = {
        IdCiudad: idEditarCiud,
        Nombre: $("#txtNombreCiudadPa").val().trim(),
        Estado: ($("#cboEstado").val() === "1" ? true : false)
    }

    $("#modalTerminal").find("div.modal-content").LoadingOverlay("show");

    $.ajax({
        type: "POST",
        url: "TerminalParada.aspx/GuardarOrEditCiudadParada",
        data: JSON.stringify({ objeto: objeto }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $("#modalTerminal").find("div.modal-content").LoadingOverlay("hide");
            mostrarAlertaTimer(
                response.d.Estado ? '¡Excelente!' : 'Atención',
                response.d.Mensaje,
                response.d.Valor
            );

            if (response.d.Estado) {
                $("#modalTerminal").modal("hide");
                //listaCiudadesPara();

                // Recargamos la tabla suavemente sin perder la página actual
                if (tablaDataCiud) {
                    tablaDataCiud.ajax.reload(null, false);
                }
                idEditarCiud = 0;
            }
        },
        error: function (xhr) {
            console.log(xhr.responseText);
            $("#modalTerminal").find("div.modal-content").LoadingOverlay("hide");
            mostrarAlertaZero("¡Atención!", "Error de comunicación con el servidor.", "error");
        },
        complete: function () {
            $('#btnGuardarRegCiudad').prop('disabled', false);
        }
    });

});

// rutas

function listaRutas() {
    //if ($.fn.DataTable.isDataTable("#tbRutas")) {
    //    $("#tbRutas").DataTable().destroy();
    //    $('#tbRutas tbody').empty();
    //}

    tablaDataRuta = $("#tbRutas").DataTable({
        responsive: true,
        searching: false,
        info: false,
        "ajax": {
            "url": 'TerminalParada.aspx/ListaRutas',
            "type": "POST",
            "contentType": "application/json; charset=utf-8",
            "dataType": "json",
            "data": function (d) {
                return JSON.stringify(d);
            },
            "dataSrc": function (json) {
                if (json.d.Estado) {
                    return json.d.Data;
                } else {
                    return [];
                }
            }
        },
        "columns": [
            { "data": "IdRuta", "visible": false, "searchable": false },
            {
                "data": "NombreRuta",
                render: function (data) {
                    return `<span class="badge p-1 bg-light text-dark fs-14 me-1"><i class="ti ti-map-pin-filled align-text-top fs-14 text-warning me-1"></i>${data}</span>`;
                }
            },
            {
                "defaultContent": '<button class="btn btn-soft-primary btn-icon btn-sm rounded-circle btn-editar me-2"><i class="ti ti-pencil-plus"></i></button>' +
                    '<button class="btn btn-soft-info btn-icon btn-sm rounded-circle btn-detalle"><i class="ti ti-eye"></i></button>',
                "orderable": false,
                "searchable": false,
                "className": "text-center"
            }
        ],
        "order": [[0, "desc"]],
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
        }
    });
}

$('#tbRutas tbody').on('click', '.btn-editar', function () {

    let fila = $(this).closest('tr');

    if (fila.hasClass('child')) {
        fila = fila.prev();
    }

    let data = tablaDataRuta.row(fila).data();
    idEditarRuta = data.IdRuta;
    $("#txtNombreRuta").val(data.NombreRuta);
    $("#modalLabelrutas").text("Editar Ruta");
    $("#modalRutas").modal("show");

});

$("#btnNuevaRuta").on("click", function () {

    idEditarRuta = 0;
    $("#txtNombreRuta").val("");

    $("#modalLabelrutas").text("Nueva Ruta");

    $("#modalRutas").modal("show");

})

$("#btnGuardarRegRuta").on("click", function () {

    // 1. Bloqueo inmediato
    $('#btnGuardarRegRuta').prop('disabled', true);

    if ($("#txtNombreRuta").val().trim() === "") {
        ToastMaster.fire({
            icon: 'warning',
            title: 'Debe completar el campo Ruta'
        });

        $("#txtNombreRuta").focus();
        $('#btnGuardarRegRuta').prop('disabled', false);
        return;
    }

    const objeto = {
        IdRuta: idEditarRuta,
        NombreRuta: $("#txtNombreRuta").val().trim()
    }

    $("#modalRutas").find("div.modal-content").LoadingOverlay("show");

    $.ajax({
        type: "POST",
        url: "TerminalParada.aspx/GuardarOrEditRutas",
        data: JSON.stringify({ objeto: objeto }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $("#modalRutas").find("div.modal-content").LoadingOverlay("hide");
            mostrarAlertaTimer(
                response.d.Estado ? '¡Excelente!' : 'Atención',
                response.d.Mensaje,
                response.d.Valor
            );

            if (response.d.Estado) {
                $("#modalRutas").modal("hide");

                // Recargamos la tabla suavemente sin perder la página actual
                if (tablaDataRuta) {
                    tablaDataRuta.ajax.reload(null, false);
                }
                idEditarRuta = 0;
            }
        },
        error: function (xhr) {
            console.log(xhr.responseText);
            $("#modalRutas").find("div.modal-content").LoadingOverlay("hide");
            mostrarAlertaZero("¡Atención!", "Error de comunicación con el servidor.", "error");
        },
        complete: function () {
            $('#btnGuardarRegRuta').prop('disabled', false);
        }
    });

});

// fin