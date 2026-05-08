
let tablaData;
let viajeSeleccionadoId = 0;

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

    cargarViajesDetalles();

})

function cargarViajesDetalles() {

    const request = {
        IdRuta: parseInt($("#cboRutasTable").val()),
        Estado: parseInt($("#cboEstadosTable").val())
    };

    $.ajax({
        url: "ConsultasPasajes.aspx/ListaViajesDetalles",
        type: "POST",
        data: JSON.stringify(request),
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            if (response.d.Estado) {
                const lista = response.d.Data;
                let html = '';

                if (lista != null && lista.length > 0) {
                    $.each(lista, function (i, item) {
                        // Color del reloj: Verde si está Programado, Amarillo si ya está En Ruta
                        let badgeClass = item.Estado === 1 ? "bg-success-subtle text-success border-success-subtle" : "bg-warning-subtle text-warning border-warning-subtle";

                        // Pasamos el IdViaje Y la CapacidadAsientos en el onclick
                        html += `
                        <div class="list-group-item viaje-item p-3" onclick="seleccionarViaje(this, ${item.IdViaje}, '${item.NombreRuta}')">
                            <h6 class="mb-2 fw-bold text-dark">
                                <i class="ti ti-map-2 text-primary me-1 fs-15"></i>${item.NombreRuta}
                            </h6>
                            <div class="d-flex justify-content-between align-items-center mb-2">
                                <span class="fs-13 text-muted fw-medium">
                                    <i class="ti ti-calendar-event me-1"></i>${item.FechaSalidaStr}
                                </span>
                                <span class="badge ${badgeClass} border px-2 py-1">
                                    <i class="ti ti-clock me-1"></i>${item.HoraSalidaStr}
                                </span>
                            </div>
                            
                            <button class="btn btn-sm btn-soft-info border-info rounded-pill w-100 d-flex justify-content-center align-items-center mt-1">
                                <i class="ti ti-steering-wheel me-1 fs-15"></i> Bus ${item.TipoBus}
                            </button>

                        </div>
                        `;
                    });
                    $("#listaViajesDisponibles").html(html);
                } else {
                    // Si no hay viajes disponibles
                    $("#listaViajesDisponibles").html(`
                        <div class="p-4 text-center text-muted">
                            <i class="ti ti-bus-stop fs-4 mb-2 d-block"></i>
                            <p class="mb-0 fs-13">No hay salidas disponibles para hoy.</p>
                        </div>
                    `);
                }
            } else {
                console.error("Error backend:", response.d.Mensaje);
            }
        },
        error: function (xhr) {
            console.log(xhr.responseText);
            mostrarAlertaZero("¡Atención!", "Error de comunicación con el servidor.", "error");
        }
    });
}

function seleccionarViaje(elemento, idViaje, nombreTitulo) {
    // Quitamos selección anterior y marcamos el actual
    $('.viaje-item').removeClass('active');
    $(elemento).addClass('active');

    viajeSeleccionadoId = idViaje;
    // Cambiamos el título de la tabla
    $("#lblRuta").text("Pasajeros de: " + nombreTitulo);

    // LLAMAMOS A DATA TABLES
    cargarListaPasajeros(idViaje);
}

function cargarListaPasajeros(idViaje) {
    if ($.fn.DataTable.isDataTable("#tbAsientosVendidos")) {
        $("#tbAsientosVendidos").DataTable().destroy();
        $('#tbAsientosVendidos tbody').empty();
    }

    const request = {
        IdViaje: parseInt(idViaje)
    };

    tablaData = $("#tbAsientosVendidos").DataTable({
        responsive: true,
        searching: true,
        info: false,
        "ajax": {
            "url": 'ConsultasPasajes.aspx/ListaPasajerosViaje',
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
            // 1. Columna Clientes (Nombre y CI)
            {
                "data": "NombreCliente",
                "render": function (data, type, row) {
                    return `<div class="fw-medium text-dark">${data}</div>
                            <div class="fs-12 text-muted"><i class="ti ti-id me-1"></i>CI: ${row.NroCi}</div>`;
                }
            },
            // 2. Columna Ruta (Origen -> Destino)
            {
                "data": "CiudadOrigen",
                "render": function (data, type, row) {
                    return `<div class="fs-13">
                                <span class="text-dark fw-medium">${data}</span> 
                                <i class="ti ti-arrow-right mx-1 text-muted"></i> 
                                <span class="text-dark fw-medium">${row.CiudadDestino}</span>
                            </div>`;
                }
            },
            // 3. Columna Detalle & Pasaje (Precio, Menor, Estado y Asiento)
            {
                "data": "Estado",
                "render": function (data, type, row) {
                    let estadoBadge = '';
                    if (data === 1) estadoBadge = `<span class="badge bg-warning-subtle text-warning border border-warning-subtle fs-11">Reserva</span>`;
                    else if (data === 2) estadoBadge = `<span class="badge bg-success-subtle text-success border border-success-subtle fs-11">Vendido</span>`;
                    else estadoBadge = `<span class="badge bg-danger-subtle text-danger border border-danger-subtle fs-11">Cancelado</span>`;

                    let menorIcon = row.LlevaMenorEdad ? `<i class="ti ti-baby-carriage fs-14 text-info ms-1" title="Lleva menor"></i>` : '';
                    let asientoFormateado = row.NroAsiento.toString().padStart(2, '0');

                    return `<div class="d-flex flex-column gap-1">
                                <div><span class="fw-bold text-success fs-14">Bs. ${row.CostoPasaje.toFixed(2)}</span> ${menorIcon}</div>
                                <div class="d-flex align-items-center gap-1">
                                    ${estadoBadge} 
                                    <span class="fs-12 text-dark fw-bold ms-1">Asiento #${asientoFormateado}</span>
                                </div>
                            </div>`;
                }
            },
            // 4. Columna Opciones (Botones por clases)
            {
                "data": null,
                "render": function (data, type, row) {
                    // Si el pasaje está vendido o reservado, mostramos el botón de imprimir. Si está cancelado, no.
                    // Botón imprimir con clase "btn-imprimir"
                    let btnImprimir = (row.Estado === 1 || row.Estado === 2)
                        ? `<button class="btn btn-soft-primary btn-icon btn-sm rounded-circle me-1 btn-imprimir" title="Imprimir Ticket">
                               <i class="ti ti-printer fs-16"></i>
                           </button>`
                        : '';

                    // Botón detalle con clase "btn-detalle"
                    let btnDetalle = `<button class="btn btn-soft-info btn-icon btn-sm rounded-circle btn-detalle" title="Ver Detalles">
                                           <i class="ti ti-eye fs-16"></i>
                                      </button>`;

                    return `<div class="text-center">${btnImprimir}${btnDetalle}</div>`;
                },
                "orderable": false,
                "searchable": false
            }
        ],
        "order": [], // Mantiene el orden original de tu procedimiento almacenado (por asiento)
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
        }
    });
}

// EVENTO: BOTÓN IMPRIMIR
$('#tbAsientosVendidos tbody').on('click', '.btn-imprimir', function () {
    let fila = $(this).closest('tr');
    if (fila.hasClass('child')) {
        fila = fila.prev();
    }

    let data = tablaData.row(fila).data();

    // Llamas a tu función de impresión pasándole el IdBoleto que está en la fila
    imprimirTicket(data.IdBoleto);
});

// EVENTO: BOTÓN DETALLE
$('#tbAsientosVendidos tbody').on('click', '.btn-detalle', function () {
    let fila = $(this).closest('tr');
    if (fila.hasClass('child')) {
        fila = fila.prev();
    }

    let data = tablaData.row(fila).data();
    let textoSms = `Asiento #${data.NroAsiento.toString().padStart(2, '0')}`;
    let asientoFormateado = data.NroAsiento.toString().padStart(2, '0');

    //mostrarAlertaZero("¡Mensaje!", textoSms, "info");

    // Llenamos los datos
    $("#txtIdBoleto").val(data.IdBoleto);
    $("#txtPasajeroDetalle").val(data.NombreCliente);
    $("#txtNroAsientoModal").val(asientoFormateado);
    $("#txtEstadoActual").val(data.EstadoTexto);

    // LA MAGIA: Mostrar u ocultar botones según el Estado
    if (data.Estado === 1) { // 1 = Reserva
        $("#divAccionesReserva").removeClass("d-none");
    } else { // 2 = Vendido, 0 = Cancelado
        $("#divAccionesReserva").addClass("d-none");
    }

    // Mostrar modal
    $("#modalLabeldetalle").text(textoSms);
    $("#modalDetalleBoleto").modal("show");
});

// EVENTO: PAGAR RESERVA
$("#btnConfirmarPago").on("click", function () {
    let idBoleto = $("#txtIdBoleto").val();

    // texto traerá algo como "Asiento #05"
    let texto = $("#modalLabeldetalle").text();

    if (idBoleto === "0" || idBoleto === "") {
        ToastMaster.fire({
            icon: 'warning',
            title: 'Ocurrió un error, intente nuevamente.'
        });
        return;
    }

    // 1. SweetAlert de Confirmación
    Swal.fire({
        title: '¿Registrar Pago?',
        text: `Se generará el comprobante de venta para el ${texto}.`,
        icon: 'question',
        showCancelButton: true,
        //confirmButtonColor: '#28a745',
        //cancelButtonColor: '#6c757d',
        confirmButtonText: '<i class="ti ti-check me-1"></i> Sí, pagar',
        cancelButtonText: '<i class="ti ti-x me-1"></i> Cancelar',
        buttonsStyling: false,
        customClass: {
            confirmButton: "btn btn-danger me-2 mt-2",
            cancelButton: "btn btn-primary mt-2"
        }
    }).then((result) => {
        if (result.isConfirmed) {

            // Bloqueamos el botón para evitar que la secretaria haga doble clic por accidente
            let $btn = $("#btnConfirmarPago");
            let textoOriginal = $btn.html();
            $btn.prop("disabled", true).html('<i class="spinner-border spinner-border-sm me-1"></i>Procesando...');

            // 2. Petición AJAX al WebMethod
            $.ajax({
                url: "ConsultasPasajes.aspx/PagarReserva", // Asegúrate de que el WebMethod se llame exactamente así
                type: "POST",
                data: JSON.stringify({ IdBoleto: parseInt(idBoleto) }),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                success: function (response) {

                    // Restauramos el botón
                    $btn.prop("disabled", false).html(textoOriginal);

                    if (response.d.Estado) {
                        // a) Mostramos la alerta usando las variables mágicas de tu C#
                        //mostrarAlertaTimer('¡Excelente!', response.d.Mensaje, response.d.Valor);
                        ToastMaster.fire({ icon: 'success', title: 'Operación completada con éxito.' });

                        // b) Cerramos el modal
                        $("#modalDetalleBoleto").modal("hide");
                        $("#txtIdBoleto").val("0");

                        // c) Recargamos la tabla de pasajeros para que desaparezca el botón de "Pagar"
                        cargarListaPasajeros(viajeSeleccionadoId);

                        // e) Imprimimos el ticket que acaba de generarse
                        imprimirTicket(idBoleto);

                    } else {
                        // Si es caso 2 o 3, mostramos el warning/error que mandó C#
                        mostrarAlertaTimer('Atención', response.d.Mensaje, response.d.Valor);
                    }
                },
                error: function (xhr) {
                    $btn.prop("disabled", false).html(textoOriginal);
                    mostrarAlertaTimer('Error', 'Problema de comunicación con el servidor.', 'error');
                }
            });
        }
    });
});

// EVENTO: ANULAR RESERVA
$("#btnAnularReserva").on("click", function () {
    let idBoleto = $("#txtIdBoleto").val();

    // texto traerá algo como "Asiento #05"
    let texto = $("#modalLabeldetalle").text();

    if (idBoleto === "0" || idBoleto === "") {
        ToastMaster.fire({
            icon: 'warning',
            title: 'Ocurrió un error, intente nuevamente.'
        });
        return;
    }

    // 1. SweetAlert de Confirmación
    Swal.fire({
        title: '¿Anular Reserva?',
        text: `Se anulara la reserva para el ${texto}.`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: '<i class="ti ti-check me-1"></i> Sí, Anular',
        cancelButtonText: '<i class="ti ti-x me-1"></i> Cancelar',
        buttonsStyling: false,
        customClass: {
            confirmButton: "btn btn-danger me-2 mt-2",
            cancelButton: "btn btn-primary mt-2"
        }
    }).then((result) => {
        if (result.isConfirmed) {

            // Bloqueamos el botón para evitar que la secretaria haga doble clic por accidente
            let $btn = $("#btnAnularReserva");
            let textoOriginal = $btn.html();
            $btn.prop("disabled", true).html('<i class="spinner-border spinner-border-sm me-1"></i>Procesando...');

            // 2. Petición AJAX al WebMethod
            $.ajax({
                url: "ConsultasPasajes.aspx/EliminarReserva", // Asegúrate de que el WebMethod se llame exactamente así
                type: "POST",
                data: JSON.stringify({ IdBoleto: parseInt(idBoleto) }),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                success: function (response) {

                    // Restauramos el botón
                    $btn.prop("disabled", false).html(textoOriginal);

                    if (response.d.Estado) {
                        // a) Mostramos la alerta usando las variables mágicas de tu C#
                        mostrarAlertaTimer('¡Excelente!', response.d.Mensaje, response.d.Valor);

                        // b) Cerramos el modal
                        $("#modalDetalleBoleto").modal("hide");
                        $("#txtIdBoleto").val("0");

                        cargarListaPasajeros(viajeSeleccionadoId);

                    } else {
                        // Si es caso 2 o 3, mostramos el warning/error que mandó C#
                        mostrarAlertaTimer('Atención', response.d.Mensaje, response.d.Valor);
                    }
                },
                error: function (xhr) {
                    $btn.prop("disabled", false).html(textoOriginal);
                    mostrarAlertaTimer('Error', 'Problema de comunicación con el servidor.', 'error');
                }
            });
        }
    });
});

$("#btnAnularReservaOriginal").on("click", function () {

    //$('#btnAnularReserva').prop('disabled', true);
    let idBoleto = $("#txtIdBoleto").val();
    let texto = $("#modalLabeldetalle").text();

    if (idBoleto === "0" || idBoleto === "") {
        ToastMaster.fire({
            icon: 'warning',
            title: 'Ocurrio un error intente nuevamente.'
        });
        //$('#btnAnularReserva').prop('disabled', false);
        return;
    }

    Swal.fire({
        title: '¿Está seguro?',
        text: `Se anulara la reserva del ${texto}.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, Anular',
        cancelButtonText: 'No, Cancelar',
        buttonsStyling: false,
        // 1. ACTIVAMOS EL LOADER NATIVO
        showLoaderOnConfirm: true,
        customClass: {
            confirmButton: "btn btn-danger me-2 mt-2",
            cancelButton: "btn btn-primary mt-2"
        },
        // 2. EVITAMOS QUE EL USUARIO CIERRE LA ALERTA DANDO CLIC AFUERA MIENTRAS CARGA
        allowOutsideClick: () => !Swal.isLoading(),

        // 3. LA MAGIA: METEMOS EL AJAX AQUÍ ADENTRO
        preConfirm: () => {
            // Retornamos una "Promesa" para que SweetAlert sepa cuándo termina
            return new Promise((resolve, reject) => {
                $.ajax({
                    type: "POST",
                    url: "ConsultasPasajes.aspx/EliminarReserva",
                    data: JSON.stringify({ IdBoleto: parseInt(idBoleto) }),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (response) {
                        // Si todo va bien, le pasamos la respuesta de tu C# a SweetAlert
                        resolve(response);
                    },
                    error: function (xhr) {
                        console.log(xhr.responseText);
                        // Si falla la red o el servidor, detenemos el loader
                        reject(new Error("Error de comunicación con el servidor."));
                    }
                });
            }).catch(error => {
                // Si hubo un error (reject), mostramos el texto rojo dentro del mismo SweetAlert
                Swal.showValidationMessage(`<i class="ti ti-alert-triangle me-1"></i> ${error.message}`);
            });
        }
    }).then((result) => {
        // 4. ESTO SE EJECUTA CUANDO EL AJAX TERMINÓ CON ÉXITO
        if (result.isConfirmed) {
            $("#modalDetalleBoleto").modal("hide");

            // La respuesta de tu servidor viene guardada en "result.value"
            let response = result.value;

            mostrarAlertaTimer(
                response.d.Estado ? '¡Excelente!' : 'Atención',
                response.d.Mensaje,
                response.d.Valor
            );

            // Recargamos la tabla si fue exitoso
            if (response.d.Estado) {
                cargarListaPasajeros(viajeSeleccionadoId);
                $("#txtIdBoleto").val("0");
            }
        }
        // Si hizo clic en Cancelar, result.isDismissed será true, 
        // y el SweetAlert simplemente se cerrará sin hacer nada más.
    });

});

function imprimirTicket(idBoletoNuevo) {

    const request = {
        IdBoleto: parseInt(idBoletoNuevo)
    };

    $.ajax({
        url: "VentaPasajes.aspx/ObtenerDetalleBoletoImpresion",
        type: "POST",
        data: JSON.stringify(request),
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            if (response.d.Estado) {
                const datosBoleto = response.d.Data;
                // Llenamos el ticket oculto
                $("#tck_Tipo").text(datosBoleto.TipoTransaccion);
                $("#tck_Comprobante").text(datosBoleto.NroComprobante);
                $("#tck_Fecha").text(datosBoleto.FechaSalidaStr);
                $("#tck_Hora").text(datosBoleto.HoraSalidaStr);
                $("#tck_Bus").text(datosBoleto.TipoBus + ' | ' + datosBoleto.PlacaBus);

                $("#tck_Origen").text(datosBoleto.CiudadOrigen.toUpperCase());
                $("#tck_Destino").text(datosBoleto.CiudadDestino.toUpperCase());

                $("#tck_Pasajero").text(datosBoleto.NombrePasajero.toUpperCase());
                $("#tck_CI").text(datosBoleto.CIPasajero);

                // Controlamos el asiento y el menor
                let textoAsiento = datosBoleto.NroAsiento.toString();
                if (datosBoleto.LlevaMenorEdad) {
                    textoAsiento += " (+BEBÉ)";
                }
                $("#tck_Asiento").text(textoAsiento);

                $("#tck_Precio").text(datosBoleto.CostoPasaje.toFixed(2));

                // Le damos al navegador 200 milisegundos para dibujar los textos antes de abrir la impresora
                setTimeout(function () {
                    window.print();
                }, 200);

                // Ejecutamos la impresión nativa del navegador
                //window.print();

                //mostrarAlertaTimer("¡Excelente!", response.d.Mensaje, "success");
            } else {
                mostrarAlertaTimer("¡Atención!", response.d.Mensaje, "warning");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
            mostrarAlertaZero("¡Atención!", "Error de comunicación con el servidor.", "error");
        }
    });
}

// fin