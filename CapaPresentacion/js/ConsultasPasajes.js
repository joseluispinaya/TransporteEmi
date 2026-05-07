
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
            "url": 'ConsultasPasajes.aspx/ListaPasajerosViaje', // Asegúrate de que el WebMethod se llame así
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
            // 1. Columna ID (Asiento)
            {
                "data": "NroAsiento",
                "render": function (data) {
                    // Muestra algo como "#05" o "#12"
                    return `<span class="fw-bold fs-15 text-primary">#${data.toString().padStart(2, '0')}</span>`;
                }
            },
            // 2. Columna Clientes (Nombre y CI)
            {
                "data": "NombreCliente",
                "render": function (data, type, row) {
                    return `<div class="fw-medium text-dark">${data}</div>
                            <div class="fs-12 text-muted"><i class="ti ti-id me-1"></i>CI: ${row.NroCi}</div>`;
                }
            },
            // 3. Columna Ruta (Origen -> Destino)
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
            // 4. Columna Detalle & Pasaje (Precio, Menor, Estado, Comprobante)
            {
                "data": "Estado",
                "render": function (data, type, row) {
                    // Diseño del Badge según el estado
                    let estadoBadge = '';
                    if (data === 1) estadoBadge = `<span class="badge bg-warning-subtle text-warning border border-warning-subtle fs-11">Reserva</span>`;
                    else if (data === 2) estadoBadge = `<span class="badge bg-success-subtle text-success border border-success-subtle fs-11">Vendido</span>`;
                    else estadoBadge = `<span class="badge bg-danger-subtle text-danger border border-danger-subtle fs-11">Cancelado</span>`;

                    // Icono de bebé si lleva menor
                    let menorIcon = row.LlevaMenorEdad ? `<i class="ti ti-baby-carriage fs-14 text-info ms-1" title="Lleva menor"></i>` : '';

                    return `<div class="d-flex flex-column gap-1">
                                <div><span class="fw-bold text-success fs-14">Bs. ${row.CostoPasaje.toFixed(2)}</span> ${menorIcon}</div>
                                <div class="d-flex align-items-center gap-1">${estadoBadge} <span class="fs-11 text-muted">${row.NroComprobante}</span></div>
                            </div>`;
                }
            },
            // 5. Columna Opciones (Botones de acción dinámicos)
            {
                "data": "IdBoleto",
                "render": function (data, type, row) {
                    // Si el pasaje está vendido o reservado, mostramos el botón de imprimir. Si está cancelado, no.
                    let btnImprimir = (row.Estado === 1 || row.Estado === 2)
                        ? `<button class="btn btn-soft-primary btn-icon btn-sm rounded-circle me-1" onclick="imprimirTicket(${data})" title="Imprimir Ticket">
                               <i class="ti ti-printer fs-16"></i>
                           </button>`
                        : '';

                    // Solo podemos anular si no está ya cancelado (Estado != 0)
                    let btnAnular = (row.Estado !== 0)
                        ? `<button class="btn btn-soft-danger btn-icon btn-sm rounded-circle" onclick="anularBoleto(${data})" title="Anular/Cancelar">
                               <i class="ti ti-trash fs-16"></i>
                           </button>`
                        : '';

                    return `<div class="text-center">${btnImprimir}${btnAnular}</div>`;
                },
                "orderable": false,
                "searchable": false
            }
        ],
        "order": [[0, "asc"]], // Ordenar por la columna 0 (NroAsiento) por defecto
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
        }
    });
}

// fin