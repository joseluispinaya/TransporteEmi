
let tablaData;
const { jsPDF } = window.jspdf;

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
                "data": "NombreRuta",
                render: function (data) {
                    return `
                        <div class="d-flex align-items-center fw-medium text-dark">
                            <i class="ti ti-map-2 text-danger fs-18 me-2"></i> ${data}
                        </div>`;
                }
            },
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
                "data": "Estado",
                "className": "text-center",
                render: function (data, type, row) {
                    let badgeClass = "";
                    let icon = "";

                    // Evaluamos el número del estado que viene de tu BD para pintar el color
                    switch (data) {
                        case 1: // Programado
                            badgeClass = "bg-primary-subtle text-dark";
                            icon = "ti-calendar-check";
                            break;
                        case 2: // En Ruta
                            badgeClass = "bg-warning-subtle text-warning";
                            icon = "ti-steering-wheel";
                            break;
                        case 3: // Finalizado
                            badgeClass = "bg-success-subtle text-success";
                            icon = "ti-flag-checkered";
                            break;
                        case 0: // Cancelado
                            badgeClass = "bg-danger-subtle text-danger";
                            icon = "ti-x";
                            break;
                        default:
                            badgeClass = "bg-secondary-subtle text-secondary";
                            icon = "ti-help";
                            break;
                    }

                    return `<span class="badge ${badgeClass} fs-12 px-2 py-1 border border-light"><i class="ti ${icon} me-1"></i>${row.EstadoTexto}</span>`;
                }
            },
            {
                "defaultContent": `
                    <button class="btn btn-soft-primary btn-icon btn-sm rounded-circle btn-detalle me-1" title="Detalle Viaje">
                        <i class="ti ti-eye"></i>
                    </button>
                    <button class="btn btn-soft-success btn-icon btn-sm rounded-circle btn-reportes me-1" title="Lista Pasajeros">
                        <i class="ti ti-printer"></i>
                    </button>
                    <button class="btn btn-soft-info btn-icon btn-sm rounded-circle btn-estado" title="Cambiar Estado">
                        <i class="ti ti-settings"></i>
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

$('#tbData tbody').on('click', '.btn-estado', function () {
    let fila = $(this).closest('tr');
    if (fila.hasClass('child')) {
        fila = fila.prev();
    }

    let data = tablaData.row(fila).data();
    let textoSms = `Ruta ${data.NombreRuta}`;

    //mostrarAlertaZero("¡Mensaje!", textoSms, "info");

    // Llenamos los datos
    $("#txtIdViajePro").val(data.IdViaje);
    $("#txtPlacaDetalle").val(data.PlacaBus);
    $("#txtTipoBus").val(data.TipoBus);
    $("#txtEstadoActual").val(data.EstadoTexto);
    $("#txtFechaSa").val(data.FechaSalidaStr);

    // LA MAGIA: Mostrar u ocultar botones según el Estado
    if (data.Estado === 1) { // 1 = Programado
        $("#divAccionesProgra").removeClass("d-none");
    } else if (data.Estado === 2) { // 2 = En Ruta
        $("#divAccionesRuta").removeClass("d-none");
    } else { // 3 = Finalizado, 0 = Cancelado
        $("#divAccionesProgra").addClass("d-none");
        $("#divAccionesRuta").addClass("d-none");
    }

    // Mostrar modal
    $("#modalLabeldetalle").text(textoSms);
    $("#modalDetalleOpcion").modal("show");
});

$('#tbData tbody').on('click', '.btn-reportes', function () {

    let fila = $(this).closest('tr');

    if (fila.hasClass('child')) {
        fila = fila.prev();
    }

    let data = tablaData.row(fila).data();

    $.ajax({
        url: "ConsultasPasajes.aspx/ListaPasajerosViaje",
        type: "POST",
        data: JSON.stringify({ IdViaje: parseInt(data.IdViaje) }),
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            if (response.d.Estado) {

                const listaPasa = response.d.Data;
                if (listaPasa.length < 1) {
                    mostrarAlertaTimer("¡Atención!", "No se puede generar reporte vacío, verifique que existan pasajeros.", "warning");
                } else {
                    generarReportesPrueba(data, listaPasa);
                }
            } else {
                mostrarAlertaTimer("¡Atención!", response.d.Mensaje, "warning");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
            mostrarAlertaTimer("¡Atención!", "Error de comunicación con el servidor.", "error");
        }
    });

});

function generarReportesPrueba(datos, lista) {
    // 1. Configuración Inicial
    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const fechaActual = new Date().toLocaleDateString("es-BO");
    const cantPasa = `Total Pasajeros: ${lista.length}`;

    // ==========================================
    // 2. ENCABEZADO MEJORADO
    // ==========================================

    // Logo (Izquierda)
    var img = new Image();
    img.src = "/Imagenes/logoflotas.png";
    try {
        doc.addImage(img, 'PNG', 15, 10, 45, 20); // Tamaño ajustado x, y, ancho, alto
    } catch (e) {
        console.warn("Logo no disponible");
    }

    // Título Principal (Derecha)
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(22, 160, 133); // Color Teal
    doc.text("PLANILLA DE CONTROL DE VIAJE", pageWidth - 15, 15, { align: "right" }); // x, y,

    doc.setTextColor(0); // Negro
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Sucrusal: Riberalta", pageWidth - 15, 25, { align: "right" });
    doc.text("Nro Cel: 73999726", pageWidth - 15, 30, { align: "right" });

    // Línea divisoria decorativa
    doc.setDrawColor(22, 160, 133);
    doc.setLineWidth(0.5);
    doc.line(15, 32, pageWidth - 15, 32);

    // --- Bloque de Información del Viaje (Dos Columnas) ---
    doc.setTextColor(0);
    doc.setFontSize(10);

    // Columna 1: Ruta y Bus
    doc.setFont("helvetica", "bold");
    doc.text("RUTA:", 15, 40);
    doc.setFont("helvetica", "normal");
    doc.text(datos.NombreRuta.toUpperCase(), 35, 40);

    doc.setFont("helvetica", "bold");
    doc.text("BUS:", 15, 45);
    doc.setFont("helvetica", "normal");
    doc.text(`${datos.TipoBus} - PLACA: ${datos.PlacaBus}`, 35, 45);

    // Columna 2: Fecha, Hora y Reporte
    doc.setFont("helvetica", "bold");
    doc.text("FECHA VIAJE:", 110, 40);
    doc.setFont("helvetica", "normal");
    doc.text(datos.FechaSalidaStr, 140, 40);

    doc.setFont("helvetica", "bold");
    doc.text("HORA SALIDA:", 110, 45);
    doc.setFont("helvetica", "normal");
    doc.text(datos.HoraSalidaStr + " Hrs.", 140, 45);

    doc.setFontSize(9);
    doc.setTextColor(100);
    doc.text(`Doc. Generado: ${fechaActual} | REP-0006`, pageWidth - 15, 52, { align: "right" });

    // ==========================================
    // 3. TABLA DE PASAJEROS (Concatenación aplicada)
    // ==========================================

    const headers = [["#", "PASAJEROS", "NRO. CI", "DESTINO", "ASIENTO Y ESTADO"]];

    const data = lista.map((item, index) => [
        (index + 1).toString().padStart(2, '0'), // Formato 01, 02...
        item.NombreCliente.toUpperCase(),
        item.NroCi,
        item.CiudadDestino.toUpperCase(),
        // CONCATENACIÓN: NroAsiento (int) + EstadoTexto (string)
        `ASIENTO ${item.NroAsiento.toString().padStart(2, '0')} - ${item.EstadoTexto}`
    ]);

    doc.autoTable({
        startY: 55,
        head: headers,
        body: data,
        theme: 'grid',
        styles: { fontSize: 8.5, cellPadding: 2.5, valign: 'middle' },
        headStyles: {
            fillColor: [22, 160, 133],
            textColor: 255,
            halign: 'center',
            fontStyle: 'bold'
        },
        columnStyles: {
            0: { cellWidth: 10, halign: 'center' },
            1: { cellWidth: 65 },
            2: { cellWidth: 25, halign: 'center' },
            3: { cellWidth: 35 },
            4: { cellWidth: 45, halign: 'center' } // Columna concatenada
        },
        margin: { left: 15, right: 15 },
        didDrawPage: function (data) {
            // Esto asegura que si hay muchas páginas, el pie de página se dibuje en todas
            const str = "Página " + doc.internal.getNumberOfPages();
            doc.setFontSize(8);
            doc.text(str, pageWidth - 25, pageHeight - 10);
        }
    });

    // ==========================================
    // 4. TOTALES Y FIRMA
    // ==========================================

    let finalY = doc.lastAutoTable.finalY;
    if (finalY + 40 > pageHeight) {
        doc.addPage();
        finalY = 20;
    }

    // Cuadro de Resumen
    doc.setFillColor(245, 245, 245);
    doc.rect(130, finalY + 5, 65, 10, 'F');
    doc.setFont("helvetica", "bold");
    doc.text(cantPasa, 190, finalY + 11.5, { align: "right" });

    // Firma
    const firmaY = finalY + 35;
    doc.setDrawColor(150);
    doc.line(70, firmaY, 140, firmaY); // Línea de firma centrada
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text("FIRMA DEL ENCARGADO DE TURNO", pageWidth / 2, firmaY + 5, { align: "center" });
    doc.text("TERMINAL RIBERALTA", pageWidth / 2, firmaY + 10, { align: "center" });

    // ==========================================
    // 5. GUARDAR
    // ==========================================
    doc.save(`PlanillaPrueba_${datos.NombreRuta}_${datos.FechaSalidaStr.replace(/\//g, "-")}.pdf`);
}

function generarReportes(datos, lista) {
    // 1. Configuración Inicial
    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const fechaActual = new Date().toLocaleDateString("es-BO");
    const cantPasa = `Total Pasajeros: ${lista.length}`;

    // ==========================================
    // 2. ENCABEZADO MEJORADO
    // ==========================================

    // Logo (Izquierda)
    var img = new Image();
    img.src = "/Imagenes/logoflotas.png";
    try {
        doc.addImage(img, 'PNG', 15, 10, 45, 20); // Tamaño ajustado
    } catch (e) {
        console.warn("Logo no disponible");
    }

    // Título Principal (Derecha)
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(22, 160, 133); // Color Teal
    doc.text("PLANILLA DE CONTROL DE VIAJE", pageWidth - 15, 18, { align: "right" });

    // Línea divisoria decorativa
    doc.setDrawColor(22, 160, 133);
    doc.setLineWidth(0.5);
    doc.line(15, 32, pageWidth - 15, 32);

    // --- Bloque de Información del Viaje (Dos Columnas) ---
    doc.setTextColor(0);
    doc.setFontSize(10);

    // Columna 1: Ruta y Bus
    doc.setFont("helvetica", "bold");
    doc.text("RUTA:", 15, 40);
    doc.setFont("helvetica", "normal");
    doc.text(datos.NombreRuta.toUpperCase(), 35, 40);

    doc.setFont("helvetica", "bold");
    doc.text("BUS:", 15, 45);
    doc.setFont("helvetica", "normal");
    doc.text(`${datos.TipoBus} - PLACA: ${datos.PlacaBus}`, 35, 45);

    // Columna 2: Fecha, Hora y Reporte
    doc.setFont("helvetica", "bold");
    doc.text("FECHA VIAJE:", 110, 40);
    doc.setFont("helvetica", "normal");
    doc.text(datos.FechaSalidaStr, 140, 40);

    doc.setFont("helvetica", "bold");
    doc.text("HORA SALIDA:", 110, 45);
    doc.setFont("helvetica", "normal");
    doc.text(datos.HoraSalidaStr + " Hrs.", 140, 45);

    doc.setFontSize(9);
    doc.setTextColor(100);
    doc.text(`Doc. Generado: ${fechaActual} | REP-0006`, pageWidth - 15, 52, { align: "right" });

    // ==========================================
    // 3. TABLA DE PASAJEROS (Concatenación aplicada)
    // ==========================================

    const headers = [["#", "PASAJEROS", "NRO. CI", "DESTINO", "ASIENTO Y ESTADO"]];

    const data = lista.map((item, index) => [
        (index + 1).toString().padStart(2, '0'), // Formato 01, 02...
        item.NombreCliente.toUpperCase(),
        item.NroCi,
        item.CiudadDestino.toUpperCase(),
        // CONCATENACIÓN: NroAsiento (int) + EstadoTexto (string)
        `ASIENTO ${item.NroAsiento.toString().padStart(2, '0')} - ${item.EstadoTexto}`
    ]);

    doc.autoTable({
        startY: 55,
        head: headers,
        body: data,
        theme: 'grid',
        styles: { fontSize: 8.5, cellPadding: 2.5, valign: 'middle' },
        headStyles: {
            fillColor: [22, 160, 133],
            textColor: 255,
            halign: 'center',
            fontStyle: 'bold'
        },
        columnStyles: {
            0: { cellWidth: 10, halign: 'center' },
            1: { cellWidth: 65 },
            2: { cellWidth: 25, halign: 'center' },
            3: { cellWidth: 35 },
            4: { cellWidth: 45, halign: 'center' } // Columna concatenada
        },
        margin: { left: 15, right: 15 },
        didDrawPage: function (data) {
            // Esto asegura que si hay muchas páginas, el pie de página se dibuje en todas
            const str = "Página " + doc.internal.getNumberOfPages();
            doc.setFontSize(8);
            doc.text(str, pageWidth - 25, pageHeight - 10);
        }
    });

    // ==========================================
    // 4. TOTALES Y FIRMA
    // ==========================================

    let finalY = doc.lastAutoTable.finalY;
    if (finalY + 40 > pageHeight) {
        doc.addPage();
        finalY = 20;
    }

    // Cuadro de Resumen
    doc.setFillColor(245, 245, 245);
    doc.rect(130, finalY + 5, 65, 10, 'F');
    doc.setFont("helvetica", "bold");
    doc.text(cantPasa, 190, finalY + 11.5, { align: "right" });

    // Firma
    const firmaY = finalY + 35;
    doc.setDrawColor(150);
    doc.line(70, firmaY, 140, firmaY); // Línea de firma centrada
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text("FIRMA DEL ENCARGADO DE TURNO", pageWidth / 2, firmaY + 5, { align: "center" });
    doc.text("TERMINAL RIBERALTA", pageWidth / 2, firmaY + 10, { align: "center" });

    // ==========================================
    // 5. GUARDAR
    // ==========================================
    doc.save(`Planilla_${datos.NombreRuta}_${datos.FechaSalidaStr.replace(/\//g, "-")}.pdf`);
}

function generarReportesOri(datos, lista) {
    // 1. Configuración Inicial (Portrait = Vertical)
    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

    // Variables de dimensiones de la hoja (Dinámicas)
    const pageWidth = doc.internal.pageSize.width;   // Aprox 210mm en A4 vertical
    const pageHeight = doc.internal.pageSize.height; // Aprox 297mm en A4 vertical
    const fechaActual = new Date().toLocaleDateString("es-BO");
    const cantPasa = `Total Pasajeros: ${lista.length}.`;

    // ==========================================
    // 2. ENCABEZADO Y LOGO
    // ==========================================

    // Intentar cargar logo
    var img = new Image();
    img.src = "/Imagenes/logoflotas.png";
    try {
        doc.addImage(img, 'PNG', 10, 10, 60, 30); // x, y, ancho, alto
    } catch (e) {
        console.warn("No se pudo cargar el logo, verifique la ruta.");
    }

    // Datos del Reporte (Derecha) - Alineado hacia la derecha
    doc.setTextColor(0); // Negro
    doc.setFontSize(12);
    doc.text(datos.NombreRuta, pageWidth - 15, 15, { align: "right" });

    doc.setFontSize(10);
    doc.text("Reporte: Pasajeros", pageWidth - 15, 25, { align: "right" });
    doc.text("Fecha: " + fechaActual, pageWidth - 15, 30, { align: "right" });
    doc.text("Nro Reporte: REP-0006", pageWidth - 15, 35, { align: "right" });

    // titulo centrado antes de la lista de pasajeros 
    doc.setFontSize(12);
    doc.text("Lista de Pasajeros", pageWidth / 2, 45, { align: "center" });

    // ==========================================
    // 3. CONFIGURACIÓN DE LA TABLA 
    // ==========================================

    const headers = [["#", "PASAJEROS", "NRO. CI", "DESTINO", "ASIENTO Y ESTADO"]];

    const data = lista.map((item, index) => [
        index + 1,
        item.NombreCliente,
        item.NroCi,
        item.CiudadDestino,
        `ASIENTO ${item.NroAsiento.toString().padStart(2, '0')} - ${item.EstadoTexto}`
    ]);

    doc.autoTable({
        startY: 50, // Posición Y donde empieza la tabla
        head: headers,
        body: data,
        theme: 'grid',
        styles: {
            fontSize: 8.5,
            cellPadding: 2,
            valign: 'middle'
        },
        headStyles: {
            fillColor: [22, 160, 133], // Color Verde Teal
            textColor: 255,
            halign: 'center',
            fontStyle: 'bold'
        },
        // DEFINICIÓN DE ANCHOS PERSONALIZADOS (Ajustados para los 180mm disponibles)
        columnStyles: {
            0: { cellWidth: 10, halign: 'center' }, // # (10mm)
            1: { cellWidth: 65 },                   // NombreCliente (70mm)
            2: { cellWidth: 25, halign: 'center' }, // NroCi (25mm)
            3: { cellWidth: 35 },                   // CiudadDestino (55mm)
            4: { cellWidth: 45 }                    // NroAsiento + EstadoTexto (40mm)
        },
        margin: { left: 15, right: 15 } // Márgenes laterales (30mm en total)
    });

    // ==========================================
    // 4. TOTALES Y FIRMA (Dinámico)
    // ==========================================

    let finalY = doc.lastAutoTable.finalY;

    // Verificar si queda espacio para la firma, si no, crear nueva página
    // Como es vertical, hay más espacio abajo, pero validamos igual
    if (finalY + 50 > pageHeight) {
        doc.addPage();
        finalY = 20;
    }

    // Total General
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text(cantPasa, pageWidth - 15, finalY + 10, { align: "right" });

    // --- LÓGICA DE FIRMA CENTRADA ---
    const firmaY = finalY + 40;
    const lineLength = 70;

    const xLineStart = (pageWidth - lineLength) / 2;
    const xLineEnd = xLineStart + lineLength;

    doc.setLineWidth(0.5);
    doc.line(xLineStart, firmaY, xLineEnd, firmaY);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Firma del Encargado", pageWidth / 2, firmaY + 5, { align: "center" });

    // ==========================================
    // 5. PIE DE PÁGINA (Fijo al fondo)
    // ==========================================

    const totalPages = doc.internal.getNumberOfPages();

    for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);

        doc.setFontSize(8);
        doc.setTextColor(150);

        doc.text(`Generado por Sistema de Control - ${fechaActual}`, 15, pageHeight - 10);
        doc.text(`Página ${i} de ${totalPages}`, pageWidth - 15, pageHeight - 10, { align: "right" });
    }

    // ==========================================
    // 6. GUARDAR
    // ==========================================
    doc.save(`Planillaze_${datos.NombreRuta}_${fechaActual.replace(/\//g, "-")}.pdf`);
}

// fin codigo