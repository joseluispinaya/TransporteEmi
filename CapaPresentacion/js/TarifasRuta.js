
let tablaData;
let idEditar = 0;

$(document).ready(function () {
    listaTarifario();
    cargarTodasCiudades();
    cargarTipoBuses();
});

function listaTarifario() {

    //if ($.fn.DataTable.isDataTable("#tbRutas")) {
    //    $("#tbRutas").DataTable().destroy();
    //    $('#tbRutas tbody').empty();
    //}

    // Destruir si existe para evitar errores si la llamas varias veces
    // if ($.fn.DataTable.isDataTable("#tbTarifas")) {
    //     $("#tbTarifas").DataTable().destroy();
    // }

    tablaData = $("#tbTarifas").DataTable({
        responsive: true,
        searching: true, // Te sugiero habilitarlo, es muy útil para buscar rutas rápido
        info: false,
        "ajax": {
            "url": 'TarifasRuta.aspx/ListaTarifas',
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
            { "data": "IdTarifa", "visible": false, "searchable": false },

            // 1. COLUMNA RUTA (Fusionada: Origen -> Destino)
            {
                "data": null, // Usamos null para tener acceso a toda la fila (row)
                render: function (data, type, row) {
                    return `
                        <div class="d-flex align-items-center fw-medium text-dark">
                            <i class="ti ti-map-pin text-primary me-1 fs-15"></i> ${row.CiudadOrigen}
                            <i class="ti ti-arrow-narrow-right text-muted mx-2"></i>
                            <i class="ti ti-map-pin-filled text-success me-1 fs-15"></i> ${row.CiudadDestino}
                        </div>`;
                }
            },

            // 2. COLUMNA TIPO BUS Y PRECIO PASAJE
            {
                "data": "NombreTipo",
                render: function (data, type, row) {
                    // Formateamos para asegurar que siempre muestre 2 decimales (Ej: 50.00)
                    let precio = parseFloat(row.PrecioPasaje).toFixed(2);
                    return `
                        <div class="d-flex flex-column">
                            <span class="fw-bold text-dark"><i class="ti ti-bus me-1 text-muted"></i>Bus ${data}</span>
                            <span class="text-success fw-semibold" style="font-size: 0.85em;">
                                <i class="ti ti-cash me-1"></i>Pasaje: ${precio} Bs.
                            </span>
                        </div>`;
                }
            },

            // 3. COLUMNA ENCOMIENDA
            {
                "data": "PrecioKiloEncomienda",
                render: function (data) {
                    let precio = parseFloat(data).toFixed(2);
                    return `
                        <span class="badge bg-warning-subtle text-warning border border-warning-subtle fs-12 px-2 py-1">
                            <i class="ti ti-package me-1"></i>${precio} Bs. / Kg
                        </span>`;
                }
            },

            // 4. COLUMNA ESTADO (Activo/Inactivo)
            {
                "data": "Estado",
                "className": "text-center",
                render: function (data) {
                    if (data === true) {
                        return `<span class="badge bg-success-subtle text-success fs-12"><i class="ti ti-check me-1"></i>Activo</span>`;
                    } else {
                        return `<span class="badge bg-danger-subtle text-danger fs-12"><i class="ti ti-x me-1"></i>Inactivo</span>`;
                    }
                }
            },

            // 5. COLUMNA OPCIONES
            {
                "defaultContent": `
                    <button class="btn btn-soft-primary btn-icon btn-sm rounded-circle btn-editar me-1" title="Editar">
                        <i class="ti ti-pencil"></i>
                    </button>
                    <button class="btn btn-soft-info btn-icon btn-sm rounded-circle btn-detalle" title="Ver Detalles">
                        <i class="ti ti-eye"></i>
                    </button>`,
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

function cargarTodasCiudades() {

    let combosCiudadess = $("#cboCiudadOrigen, #cboCiudadDestino");

    // 2. Mostramos el mensaje de carga en todos a la vez
    combosCiudadess.html('<option value="">Cargando Ciudades...</option>');

    $.ajax({
        url: "TerminalParada.aspx/ListaCiudadesParada",
        type: "POST",
        data: "{}",
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            if (response.d.Estado) {

                let opcionesHTML = '<option value="">-- Seleccione una Ciudad --</option>';

                $.each(response.d.Data, function (i, row) {
                    opcionesHTML += `<option value="${row.IdCiudad}">${row.Nombre}</option>`;
                });

                // 3. ¡LA MAGIA! Inyectamos el HTML en los 4 selects al mismo tiempo
                combosCiudadess.html(opcionesHTML);

            } else {
                combosCiudadess.html('<option value="">Error al cargar</option>');
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
            combosCiudadess.html('<option value="">Error de conexión</option>');
        }
    });
}


$('#tbTarifas tbody').on('click', '.btn-editar', function () {

    let fila = $(this).closest('tr');

    if (fila.hasClass('child')) {
        fila = fila.prev();
    }

    let data = tablaData.row(fila).data();
    idEditar = data.IdTarifa;
    $("#cboCiudadOrigen").val(data.IdOrigen);
    $("#cboCiudadDestino").val(data.IdDestino);
    $("#cboTipobus").val(data.IdTipoBus);

    $("#txtPrePasaje").val(data.PrecioPasaje);
    $("#txtPreKilo").val(data.PrecioKiloEncomienda);

    $("#cboEstado").val(data.Estado ? 1 : 0).prop("disabled", false);
    $("#modalLabeltarifa").text("Editar Tarifa");
    $("#modalTarifa").modal("show");

});

$("#btnNuevoRegistro").on("click", function () {

    idEditar = 0;

    $("#cboCiudadOrigen").val("");
    $("#cboCiudadDestino").val("");
    $("#cboTipobus").val("");
    $("#txtPrePasaje").val("");
    $("#txtPreKilo").val("");

    $("#cboEstado").val(1).prop("disabled", true);

    // 4. Mostramos el modal
    $("#modalLabeltarifa").text("Nuevo Registro");
    $("#modalTarifa").modal("show");
});

$("#btnGuardarTarifa").on("click", function () {

    // 1. Bloqueo inmediato
    $('#btnGuardarTarifa').prop('disabled', true);

    let idOrigen = $("#cboCiudadOrigen").val();
    let idDestino = $("#cboCiudadDestino").val();
    let idTipoBus = $("#cboTipobus").val();

    // Obtenemos los valores en texto
    let pasaje = $("#txtPrePasaje").val();
    let preKilo = $("#txtPreKilo").val();

    // Los convertimos a decimales (flotantes) de JavaScript
    let pasajeDecimal = parseFloat(pasaje);
    let preKiloDecimal = parseFloat(preKilo);

    // Validación Precio Pasaje (Vacío, no numérico, o menor/igual a 0)
    if (pasaje === "" || isNaN(pasajeDecimal) || pasajeDecimal <= 0) {
        ToastMaster.fire({
            icon: 'warning',
            title: 'Debe ingresar un precio de pasaje válido mayor a 0'
        });

        $("#txtPrePasaje").focus();
        $('#btnGuardarTarifa').prop('disabled', false);
        return;
    }

    // Validación Precio Kilo
    if (preKilo === "" || isNaN(preKiloDecimal) || preKiloDecimal <= 0) {
        ToastMaster.fire({
            icon: 'warning',
            title: 'Debe ingresar un precio por kilo válido mayor a 0'
        });

        $("#txtPreKilo").focus();
        $('#btnGuardarTarifa').prop('disabled', false);
        return;
    }

    if (idOrigen === "") {
        ToastMaster.fire({
            icon: 'warning',
            title: 'Debe seleccionar ciudad de Origen.'
        });
        $("#cboCiudadOrigen").focus();
        $('#btnGuardarTarifa').prop('disabled', false);
        return;
    }

    if (idDestino === "") {
        ToastMaster.fire({
            icon: 'warning',
            title: 'Debe seleccionar ciudad de Destino.'
        });
        $("#cboCiudadDestino").focus();
        $('#btnGuardarTarifa').prop('disabled', false);
        return;
    }

    if (idTipoBus === "") {
        ToastMaster.fire({
            icon: 'warning',
            title: 'Debe seleccionar un Tipo de Bus.'
        });
        $("#cboTipobus").focus();
        $('#btnGuardarTarifa').prop('disabled', false);
        return;
    }

    // Armamos el objeto enviando los decimales ya convertidos
    const objeto = {
        IdTarifa: idEditar,
        IdOrigen: parseInt(idOrigen),
        IdDestino: parseInt(idDestino),
        IdTipoBus: parseInt(idTipoBus),
        PrecioPasaje: pasajeDecimal,          // Enviamos el decimal limpio
        PrecioKiloEncomienda: preKiloDecimal  // Enviamos el decimal limpio
    }

    $("#modalTarifa").find("div.modal-content").LoadingOverlay("show");

    $.ajax({
        type: "POST",
        url: "TarifasRuta.aspx/GuardarOrEditTarifarios",
        data: JSON.stringify({ objeto: objeto }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $("#modalTarifa").find("div.modal-content").LoadingOverlay("hide");
            mostrarAlertaTimer(
                response.d.Estado ? '¡Excelente!' : 'Atención',
                response.d.Mensaje,
                response.d.Valor
            );

            if (response.d.Estado) {
                $("#modalTarifa").modal("hide");

                if (tablaData) {
                    tablaData.ajax.reload(null, false);
                }
                idEditar = 0;
            }
        },
        error: function (xhr) {
            console.log(xhr.responseText);
            $("#modalTarifa").find("div.modal-content").LoadingOverlay("hide");
            mostrarAlertaZero("¡Atención!", "Error de comunicación con el servidor.", "error");
        },
        complete: function () {
            $('#btnGuardarTarifa').prop('disabled', false);
        }
    });

});

// fin