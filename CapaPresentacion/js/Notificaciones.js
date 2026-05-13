

let tablaData;

$(document).ready(function () {
    cargarRutass();
});

function cargarRutass() {

    $("#cboRutasTable").html('<option value="">Cargando...</option>');

    $.ajax({
        url: "TerminalParada.aspx/ListaRutas",
        type: "POST",
        data: "{}", // <-- Mejor compatibilidad con WebMethods sin parámetros
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            if (response.d.Estado) {

                // 1. Empezamos con la opción por defecto
                let opcionesHTML = '<option value="">-- Seleccione una Ruta --</option>';

                // 2. Concatenamos todas las opciones en la variable (en memoria)
                $.each(response.d.Data, function (i, row) {
                    opcionesHTML += `<option value="${row.IdRuta}">${row.NombreRuta}</option>`;
                });

                $("#cboRutasTable").html(opcionesHTML);

            } else {
                $("#cboRutasTable").html('<option value="">Error al cargar</option>');
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
            $("#cboRutasTable").html('<option value="">Error de conexión</option>');
        }
    });
}

$("#btnBuscar").on("click", function () {

    if ($("#cboRutasTable").val() === "") {
        ToastMaster.fire({
            icon: 'warning',
            title: 'Debe seleccionar una Ruta'
        });
        $("#cboRutasTable").focus();
        return;
    }

    viajesProgramados();

})

function viajesProgramados() {

    if ($.fn.DataTable.isDataTable("#tbData")) {
        $("#tbData").DataTable().destroy();
        $('#tbData tbody').empty();
    }

    const request = {
        IdRuta: parseInt($("#cboRutasTable").val()),
        Estado: parseInt($("#cboEstadosTable").val())
    };

    tablaData = $("#tbData").DataTable({
        responsive: true,
        "ajax": {
            "url": 'ConsultasPasajes.aspx/ListaViajesDetalles',
            "type": "POST",
            "contentType": "application/json; charset=utf-8",
            "dataType": "json",
            "data": function () {
                return JSON.stringify(request);
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
            {
                "data": null,
                render: function (data, type, row) {
                    return `
                        <div class="d-flex flex-column">
                            <span class="fw-bold text-dark"><i class="ti ti-bus me-1 text-success"></i>Placa: ${row.PlacaBus}</span>
                            <span class="text-muted fs-12">${row.TipoBus} • ${row.CapacidadAsientos} Asientos</span>
                        </div>`;
                }
            },
            {
                "data": null,
                render: function (data, type, row) {
                    return `
                        <div class="d-flex flex-column">
                            <span class="fw-semibold text-dark"><i class="ti ti-calendar-event me-1"></i>${row.FechaSalidaStr}</span>
                            <span class="text-danger fw-bold fs-13"><i class="ti ti-clock me-1"></i>${row.HoraSalidaStr} hrs.</span>
                        </div>`;
                }
            },
            {
                "defaultContent": `
                    <button class="btn btn-info btn-sm btn-notifica" title="Envio de Notificaciones">
                        <i class="ti ti-message-2-star me-1"></i> Notificacion
                    </button>`,
                "orderable": false,
                "searchable": false,
                "className": "text-center"
            }
        ],
        "order": [],
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
        }
    });
}

$('#tbData tbody').on('click', '.btn-notifica', function () {
    let fila = $(this).closest('tr');
    if (fila.hasClass('child')) {
        fila = fila.prev();
    }

    let data = tablaData.row(fila).data();

    //if (data.Estado !== 3) {
    //    mostrarAlertaZero(
    //        "¡Atención!",
    //        "Solo se pueden enviar notificaciones los viajes en estado 'Finalizado'. Este viaje está " + data.EstadoTexto + ".",
    //        "warning"
    //    );
    //    return;
    //}

    let tituloSms = `El Viaje ${data.NombreRuta}`;
    let mensajeBody = `La flota con ruta ${data.NombreRuta} del ${data.FechaSalidaStr} llego a su destino.`;

    // Llenamos los datos
    $("#txtIdViajePro").val(data.IdViaje);
    $("#txtTituloSms").val("Aviso Flota Yungueña");
    $("#txtMensaje").val(mensajeBody);

    // Mostrar modal
    $("#modalLabelnoti").text(tituloSms);
    $("#modalNotificacion").modal("show");
});

$("#btnEnviarYa").on("click", function () {

    $('#btnEnviarYa').prop('disabled', true);

    let idViaje = $("#txtIdViajePro").val();

    if (idViaje === "0" || idViaje === "") {
        ToastMaster.fire({
            icon: 'warning',
            title: 'Ocurrió un error, intente nuevamente.'
        });
        $('#btnEnviarYa').prop('disabled', false);
        return;
    }

    const request = {
        IdViaje: parseInt(idViaje),
        Titulo: $("#txtTituloSms").val().trim(),
        Mensaje: $("#txtMensaje").val().trim()
    };

    $("#modalNotificacion").find("div.modal-content").LoadingOverlay("show");

    $.ajax({
        type: "POST",
        url: "Notificaciones.aspx/EnvioNotificacionPrueba",
        data: JSON.stringify(request),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $("#modalNotificacion").find("div.modal-content").LoadingOverlay("hide");
            mostrarAlertaTimer(
                response.d.Estado ? '¡Excelente!' : 'Atención',
                response.d.Mensaje,
                response.d.Valor
            );

            if (response.d.Estado) {
                $("#modalNotificacion").modal("hide");
                $("#txtIdViajePro").val("0");
            }
        },
        error: function (xhr) {
            console.log(xhr.responseText);
            $("#modalNotificacion").find("div.modal-content").LoadingOverlay("hide");
            mostrarAlertaZero("¡Atención!", "Error de comunicación con el servidor.", "error");
        },
        complete: function () {
            $('#btnEnviarYa').prop('disabled', false);
        }
    });

});

// fin