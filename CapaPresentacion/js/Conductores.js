
let tablaDataChofe;
let idEditarChofe = 0;

let tablaDataBus;
let idEditarBus = 0;

$(document).ready(function () {
    listaChoferes();
    listaBuses();
    cargarBuscadorChoferes();
    cargarTipoBuses();
});

function cargarTipoBuses() {

    $("#cboTipobus").html('<option value="">Cargando...</option>');

    $.ajax({
        url: "Conductores.aspx/ListaTipoBuses",
        type: "POST",
        data: "{}", // <-- Mejor compatibilidad con WebMethods sin parámetros
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            if (response.d.Estado) {

                // 1. Empezamos con la opción por defecto
                let opcionesHTML = '<option value="">-- Seleccione un Tipo --</option>';

                // 2. Concatenamos todas las opciones en la variable (en memoria)
                $.each(response.d.Data, function (i, row) {
                    opcionesHTML += `<option value="${row.IdTipoBus}">${row.NombreTipo}</option>`;
                });

                //$.each(response.d.Data, function (i, row) {
                //    if (row.Estado === true) {
                //        opcionesHTML += `<option value="${row.IdTipoBus}">${row.NombreTipo}</option>`;
                //    }
                //});

                // 3. Inyectamos todo al DOM en un solo movimiento
                $("#cboTipobus").html(opcionesHTML);

            } else {
                $("#cboTipobus").html('<option value="">Error al cargar</option>');
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
            $("#cboTipobus").html('<option value="">Error de conexión</option>');
        }
    });
}

// Configuración del Select2 (AJAX)
function cargarBuscadorChoferes() {
    $("#cboBuscarChofer").select2({
        dropdownParent: $("#modalBus"),

        ajax: {
            type: "POST",
            url: "Conductores.aspx/FiltroChoferes",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            delay: 250,
            data: function (params) {
                // params.term es lo que el usuario va escribiendo
                return JSON.stringify({ busqueda: params.term || "" });
            },
            processResults: function (data) {
                // 1. VALIDACIÓN: ¿Respondió bien el WebMethod? (Estado == true)
                if (!data.d.Estado) {
                    // Mostramos el mensaje que mandó C# (Ej: "Su sesión ha expirado" o error del Catch)
                    mostrarAlertaZero("Atención", data.d.Mensaje, "warning");

                    // Retornamos un array vacío para que Select2 no colapse
                    return { results: [] };
                }

                // 2. Si todo está bien, mapeamos los datos
                return {
                    results: data.d.Data.map((item) => ({
                        id: item.IdChofer,
                        text: item.NombreCompleto,
                        nroci: item.NroCi,
                        celu: item.Celular,
                        dataCompleta: item // Guardamos todo el objeto por si lo ocupas al seleccionar
                    }))
                };
            },
            // 3. VALIDACIÓN DE RED: Por si se corta el internet o falla el servidor
            error: function (xhr, ajaxOptions, thrownError) {
                // IGNORAR SI EL ERROR ES PORQUE SELECT2 CANCELÓ LA PETICIÓN VIEJA
                if (xhr.status === 0 || thrownError === 'abort') {
                    return; // Salimos silenciosamente sin mostrar alerta
                }

                // Si es un error real (500, 404, etc.), sí mostramos la alerta
                console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
                mostrarAlertaZero("Error de Conexión", "No se pudo comunicar con el servidor.", "error");
            }
        },
        language: "es",
        placeholder: 'Buscar por Nombre o CI...',
        minimumInputLength: 3, // Muy buena práctica para no saturar la BD
        templateResult: formatoResultados
    });
}

function formatoResultados(data) {
    if (data.loading) return data.text;

    // logo a mostrar
    var imagenMostrar = 'Imagenes/selectimg.png';

    var contenedor = $(
        `<div class="d-flex align-items-center">
            <img src="${imagenMostrar}" style="height:40px; width:40px; margin-right:10px; border-radius:50%; object-fit:cover;"/>
            <div>
                <div style="font-weight: bold;">${data.text}</div>
                <div style="font-size: 0.85em; color: #666;">CI: ${data.nroci} | Cel: ${data.celu}</div>
            </div>
         </div>`
    );

    return contenedor;
}

// 4. Evento al SELECCIONAR
$("#cboBuscarChofer").on("select2:select", function (e) {
    const data = e.params.data.dataCompleta;
    $("#txtIdChofer").val(data.IdChofer);
    $("#txtCiChoferSelec").val(data.NroCi);
    $("#txtChoferSelec").val(data.NombreCompleto);

    $("#cboBuscarChofer").val(null).trigger("change");
});

// Choferes

function listaChoferes() {
    //if ($.fn.DataTable.isDataTable("#tbChofer")) {
    //    $("#tbChofer").DataTable().destroy();
    //    $('#tbChofer tbody').empty();
    //}

    tablaDataChofe = $("#tbChofer").DataTable({
        responsive: true,
        searching: false,
        info: false,
        "ajax": {
            "url": 'Conductores.aspx/ListaChoferes',
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
            { "data": "IdChofer", "visible": false, "searchable": false },
            {
                "data": "NombreCompleto",
                render: function (data) {
                    return `<span class="badge p-1 bg-light text-dark fs-14 me-1"><i class="ti ti-user-filled align-text-top fs-14 text-warning me-1"></i>${data}</span>`;
                }
            },
            {
                "data": "NroCi",
                render: function (data, type, row) {
                    return `
                        <div class="d-flex flex-column">
                            <span class="fw-semibold">Nro. CI: ${data}</span>
                            <span class="text-muted" style="font-size: 0.85em;">Lice: ${row.NroLicencia}</span>
                        </div>`;
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

$('#tbChofer tbody').on('click', '.btn-editar', function () {

    let fila = $(this).closest('tr');

    if (fila.hasClass('child')) {
        fila = fila.prev();
    }

    let data = tablaDataChofe.row(fila).data();
    idEditarChofe = data.IdChofer;
    $("#txtNombreChofer").val(data.NombreCompleto);
    $("#txtNroCi").val(data.NroCi);
    $("#txtNroLicencia").val(data.NroLicencia);
    $("#txtTipoSangre").val(data.TipoSangre);
    $("#txtNroCel").val(data.Celular);
    $("#cboEstado").val(data.Estado ? 1 : 0).prop("disabled", false);
    $("#modalLabelchofer").text("Editar Chofer");
    $("#modalChofer").modal("show");

});

$("#btnNuevoChofer").on("click", function () {

    idEditarChofe = 0;
    $("#txtNombreChofer").val("");
    $("#txtNroCi").val("");
    $("#txtNroLicencia").val("");
    $("#txtTipoSangre").val("");
    $("#txtNroCel").val("");
    $("#cboEstado").val(1).prop("disabled", true);
    $("#modalLabelchofer").text("Nuevo Registro");
    $("#modalChofer").modal("show");

})

$("#btnGuardarChofer").on("click", function () {

    // 1. Bloqueo inmediato
    $('#btnGuardarChofer').prop('disabled', true);

    const inputs = $("#modalChofer input.validze").serializeArray();
    const inputs_sin_valor = inputs.filter(item => item.value.trim() === "");

    if (inputs_sin_valor.length > 0) {
        const mensaje = `Debe completar el campo: "${inputs_sin_valor[0].name}"`;
        ToastMaster.fire({
            icon: 'warning',
            title: mensaje
        });
        $(`input[name="${inputs_sin_valor[0].name}"]`).focus();
        $('#btnGuardarChofer').prop('disabled', false);
        return;
    }

    const objeto = {
        IdChofer: idEditarChofe,
        NombreCompleto: $("#txtNombreChofer").val().trim(),
        NroCi: $("#txtNroCi").val().trim(),
        Celular: $("#txtNroCel").val().trim(),
        NroLicencia: $("#txtNroLicencia").val().trim(),
        TipoSangre: $("#txtTipoSangre").val().trim(),
        Estado: ($("#cboEstado").val() === "1" ? true : false)
    }

    $("#modalChofer").find("div.modal-content").LoadingOverlay("show");

    $.ajax({
        type: "POST",
        url: "Conductores.aspx/GuardarOrEditChoferes",
        data: JSON.stringify({ objeto: objeto }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $("#modalChofer").find("div.modal-content").LoadingOverlay("hide");
            mostrarAlertaTimer(
                response.d.Estado ? '¡Excelente!' : 'Atención',
                response.d.Mensaje,
                response.d.Valor
            );

            if (response.d.Estado) {
                $("#modalChofer").modal("hide");
                //listaCiudadesPara();

                // Recargamos la tabla suavemente sin perder la página actual
                if (tablaDataChofe) {
                    tablaDataChofe.ajax.reload(null, false);
                }
                idEditarChofe = 0;
            }
        },
        error: function (xhr) {
            console.log(xhr.responseText);
            $("#modalChofer").find("div.modal-content").LoadingOverlay("hide");
            mostrarAlertaZero("¡Atención!", "Error de comunicación con el servidor.", "error");
        },
        complete: function () {
            $('#btnGuardarChofer').prop('disabled', false);
        }
    });

});

// Buses
function listaBuses() {
    //if ($.fn.DataTable.isDataTable("#tbBuses")) {
    //    $("#tbBuses").DataTable().destroy();
    //    $('#tbBuses tbody').empty();
    //}

    tablaDataBus = $("#tbBuses").DataTable({
        responsive: true,
        searching: false,
        info: false,
        "ajax": {
            "url": 'Conductores.aspx/ListaBuses',
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
            { "data": "IdBus", "visible": false, "searchable": false },
            {
                "data": "Placa",
                render: function (data) {
                    return `<span class="badge p-1 bg-light text-dark fs-14 me-1"><i class="ti ti-bus align-text-top fs-14 text-warning me-1"></i>${data}</span>`;
                }
            },
            {
                "data": "CapacidadAsientos",
                render: function (data, type, row) {
                    return `
                        <div class="d-flex flex-column">
                            <span class="fw-semibold">${data} Asientos</span>
                            <span class="text-muted" style="font-size: 0.85em;">Bus: ${row.NombreTipo}</span>
                        </div>`;
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

$('#tbBuses tbody').on('click', '.btn-editar', function () {

    let fila = $(this).closest('tr');

    if (fila.hasClass('child')) {
        fila = fila.prev();
    }

    let data = tablaDataBus.row(fila).data();
    idEditarBus = data.IdBus;
    $("#txtNroPlaca").val(data.Placa);
    $("#cboTipobus").val(data.IdTipoBus);

    $("#txtNroAsiento").val(data.CapacidadAsientos);
    $("#cboEstadoBuss").val(data.Estado ? 1 : 0).prop("disabled", false);

    $("#txtIdChofer").val(data.IdChofer);
    $("#txtCiChoferSelec").val(data.NroCi);
    $("#txtChoferSelec").val(data.NombreCompleto);

    $("#modalLabelbus").text("Editar Bus");
    $("#modalBus").modal("show");

});

$("#btnNuevoBus").on("click", function () {

    idEditarBus = 0;
    $("#txtNroPlaca").val("");
    $("#cboTipobus").val("");
    $("#txtNroAsiento").val("");
    $("#cboEstadoBuss").val(1).prop("disabled", true);

    $("#txtIdChofer").val("0");
    $("#txtCiChoferSelec").val("");
    $("#txtChoferSelec").val("");

    $("#modalLabelbus").text("Nuevo Registro");
    $("#modalBus").modal("show");

})

$("#btnGuardarBus").on("click", function () {

    // 1. Bloqueo inmediato
    $('#btnGuardarBus').prop('disabled', true);

    if ($("#cboTipobus").val() === "") {
        ToastMaster.fire({
            icon: 'warning',
            title: 'Debe seleccionar un tipo de bus'
        });
        $("#cboTipobus").focus();
        $('#btnGuardarBus').prop('disabled', false);
        return;
    }

    if ($("#txtNroPlaca").val().trim() === "") {
        ToastMaster.fire({
            icon: 'warning',
            title: 'Debe completar el campo Nro Placa'
        });

        $("#txtNroPlaca").focus();
        $('#btnGuardarBus').prop('disabled', false);
        return;
    }

    if ($("#txtNroAsiento").val().trim() === "") {
        ToastMaster.fire({
            icon: 'warning',
            title: 'Debe completar el campo Nro Asientos'
        });

        $("#txtNroAsiento").focus();
        $('#btnGuardarBus').prop('disabled', false);
        return;
    }

    const idRev = $("#txtIdChofer").val();

    // MEJORA 1: Validar que realmente se haya seleccionado un docente
    if (idRev === "0" || idRev === "") {
        ToastMaster.fire({
            icon: 'warning',
            title: 'Debe seleccionar un Chofer'
        });
        $('#btnGuardarBus').prop('disabled', false);

        //$("#cboBuscarRevisores").select2('open');
        return;
    }

    const objeto = {
        IdBus: idEditarBus,
        Placa: $("#txtNroPlaca").val().trim(),
        IdTipoBus: parseInt($("#cboTipobus").val()),
        IdChofer: parseInt(idRev),
        CapacidadAsientos: parseInt($("#txtNroAsiento").val()),
        Estado: ($("#cboEstadoBuss").val() === "1" ? true : false)
    }
    //console.log(objeto);

    $("#modalBus").find("div.modal-content").LoadingOverlay("show");

    $.ajax({
        type: "POST",
        url: "Conductores.aspx/GuardarOrEditBuses",
        data: JSON.stringify({ objeto: objeto }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $("#modalBus").find("div.modal-content").LoadingOverlay("hide");
            mostrarAlertaTimer(
                response.d.Estado ? '¡Excelente!' : 'Atención',
                response.d.Mensaje,
                response.d.Valor
            );

            if (response.d.Estado) {
                $("#modalBus").modal("hide");

                if (tablaDataBus) {
                    tablaDataBus.ajax.reload(null, false);
                }
                idEditarBus = 0;
            }
        },
        error: function (xhr) {
            console.log(xhr.responseText);
            $("#modalBus").find("div.modal-content").LoadingOverlay("hide");
            mostrarAlertaZero("¡Atención!", "Error de comunicación con el servidor.", "error");
        },
        complete: function () {
            $('#btnGuardarBus').prop('disabled', false);
        }
    });

});

// fin