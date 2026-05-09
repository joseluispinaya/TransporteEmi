
let tablaData;
let idEditar = 0;

$(document).ready(function () {
    listaUsuarios();
    cargarTerminales();
    cargarRoles();
});

function cargarTerminales() {

    // Mostramos un texto de "Cargando..." mientras esperamos la respuesta
    $("#cboOficinaModal").html('<option value="">Cargando...</option>');

    $.ajax({
        url: "TerminalParada.aspx/ListaCiudadesParada",
        type: "POST",
        data: "{}", // <-- Mejor compatibilidad con WebMethods sin parámetros
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            if (response.d.Estado) {

                // 1. Empezamos con la opción por defecto
                let opcionesHTML = '<option value="">-- Seleccione --</option>';

                // 2. Concatenamos todas las opciones en la variable (en memoria)
                $.each(response.d.Data, function (i, row) {
                    opcionesHTML += `<option value="${row.IdCiudad}">${row.Nombre}</option>`;
                });

                $("#cboOficinaModal").html(opcionesHTML);

            } else {
                $("#cboOficinaModal").html('<option value="">Error al cargar</option>');
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
            $("#cboOficinaModal").html('<option value="">Error de conexión</option>');
        }
    });
}

function cargarRoles() {

    // Mostramos un texto de "Cargando..." mientras esperamos la respuesta
    $("#cboRoles").html('<option value="">Cargando...</option>');

    $.ajax({
        url: "Usuarios.aspx/ListaRoles",
        type: "POST",
        data: "{}", // <-- Mejor compatibilidad con WebMethods sin parámetros
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            if (response.d.Estado) {

                // 1. Empezamos con la opción por defecto
                let opcionesHTML = '<option value="">-- Seleccione --</option>';

                // 2. Concatenamos todas las opciones en la variable (en memoria)
                $.each(response.d.Data, function (i, row) {
                    opcionesHTML += `<option value="${row.IdRol}">${row.NombreRol}</option>`;
                });
                // 3. Inyectamos todo al DOM en un solo movimiento
                $("#cboRoles").html(opcionesHTML);

            } else {
                $("#cboRoles").html('<option value="">Error al cargar</option>');
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
            $("#cboRoles").html('<option value="">Error de conexión</option>');
        }
    });
}

function listaUsuarios() {
    //if ($.fn.DataTable.isDataTable("#tbData")) {
    //    $("#tbData").DataTable().destroy();
    //    $('#tbData tbody').empty();
    //}

    tablaData = $("#tbData").DataTable({
        // Muestra el mensaje "Procesando..." nativo de DataTables
        "processing": true,
        "serverSide": true,  // ACTIVA EL MODO PAGINACIÓN EN EL SERVIDOR
        "responsive": true,
        "ajax": {
            "url": 'Usuarios.aspx/ListaUsuariosPaginado',
            "type": "POST",
            "contentType": "application/json; charset=utf-8",
            "dataType": "json",
            "data": function (d) {

                // GUARDAMOS EL DRAW EN UNA VARIABLE GLOBAL TEMPORAL (o en el mismo 'd')
                // para poder leerlo después en el dataFilter
                window.currentDraw = d.draw;

                // 'd' es el objeto gigante que DataTables intenta enviar por defecto.
                // Aquí lo transformamos para que encaje EXACTAMENTE con los parámetros de tu WebMethod en C#
                var parametros = {
                    Omitir: d.start,               // Cuántos registros saltar (Página actual)
                    TamanoPagina: d.length,        // Cuántos registros mostrar (Ej: 10, 25, 50)
                    Buscar: d.search.value || ""   // Lo que el usuario escribió en la caja de búsqueda
                };
                return JSON.stringify(parametros);
            },
            "dataFilter": function (data) {
                // Aquí interceptamos la respuesta cruda de tu WebMethod antes de que DataTables la lea
                var json = JSON.parse(data);

                // Extraemos los totales de la primera fila (si hay datos)
                var totalRecords = 0;
                var totalFiltered = 0;

                if (json.d.Estado && json.d.Data.length > 0) {
                    totalRecords = json.d.Data[0].TotalRegistros;
                    totalFiltered = json.d.Data[0].TotalFiltrados;
                }

                // Transformamos tu objeto "Respuesta" al formato que DataTables exige
                var respuestaDataTables = {
                    // No es estrictamente necesario en WebForms, pero es buena práctica
                    //draw: 0,
                    draw: window.currentDraw, // <-- ¡AHORA SÍ LE DEVOLVEMOS SU DRAW ORIGINAL!
                    recordsTotal: totalRecords,       // Total real en BD
                    recordsFiltered: totalFiltered,   // Total después de aplicar el buscador
                    data: json.d.Estado ? json.d.Data : [] // La lista de usuarios real
                };

                return JSON.stringify(respuestaDataTables);
            }
        },
        "columns": [
            // 1. Columna Usuario (Foto + Nombre Completo + Correo)
            {
                "data": "NombreCompleto",
                "render": function (data, type, row) {
                    // Si no tiene foto, le asignamos la imagen por defecto
                    let imgUrl = row.FotoUrl ? row.FotoUrl : "Imagenes/sinImagen.png";

                    return `<div class="d-flex align-items-center">
                                <img src="${imgUrl}" alt="Avatar" class="rounded-circle me-3 border" style="width: 45px; height: 45px; object-fit: cover;">
                                <div>
                                    <h6 class="mb-0 fw-bold text-dark">${data}</h6>
                                    <span class="fs-12 text-muted"><i class="ti ti-mail me-1"></i>${row.Correo}</span>
                                </div>
                            </div>`;
                }
            },
            // 2. Columna Documento & Contacto (CI + Celular)
            {
                "data": "NroCi",
                "render": function (data, type, row) {
                    return `<div class="fs-13">
                                <div class="fw-medium text-dark"><i class="ti ti-id-badge me-1 text-muted"></i>CI: ${data}</div>
                                <div class="text-muted mt-1"><i class="ti ti-phone me-1"></i>Cel: ${row.Celular}</div>
                            </div>`;
                }
            },
            // 3. Columna Rol & Sucursal (Rol + Ciudad)
            {
                "data": "NombreRol",
                "render": function (data, type, row) {
                    return `<div class="d-flex flex-column align-items-start gap-1">
                                <span class="badge bg-primary-subtle text-dark border border-primary-subtle px-2 py-1">${data}</span>
                                <span class="fs-12 text-muted"><i class="ti ti-map-pin me-1"></i>${row.NombreCiudad}</span>
                            </div>`;
                }
            },
            // 4. Columna Estado
            {
                "data": "Estado",
                "render": function (data, type, row) {
                    if (data) {
                        return `<span class="badge p-1 bg-success"><i class="ti ti-check me-1"></i>Activo</span>`;
                    } else {
                        return `<span class="badge p-1 bg-danger"><i class="ti ti-x me-1"></i>Inactivo</span>`;
                    }
                }
            },
            // 5. Columna Opciones
            {
                "data": null, // null porque no depende de un solo campo, usamos toda la fila
                "render": function (data, type, row) {
                    return `<div class="text-center">
                                <button class="btn btn-soft-primary btn-icon btn-sm rounded-circle btn-editar me-1" title="Editar">
                                    <i class="ti ti-pencil fs-16"></i>
                                </button>
                                <button class="btn btn-soft-info btn-icon btn-sm rounded-circle btn-detalle" title="Ver Detalles">
                                    <i class="ti ti-eye fs-16"></i>
                                </button>
                            </div>`;
                },
                "orderable": false,
                "searchable": false,
                "className": "text-center"
            }
        ],
        // IMPORTANTE: En modo Server-Side con tu SP actual, no estamos manejando ordenamiento dinámico por columnas,
        // así que desactivamos el ordenamiento inicial para que no choque con el ORDER BY DESC de tu SP.
        "order": [],
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
        }
    });
}


$('#tbData tbody').on('click', '.btn-editar', function () {

    let fila = $(this).closest('tr');
    if (fila.hasClass('child')) {
        fila = fila.prev();
    }

    let data = tablaData.row(fila).data();
    idEditar = data.IdUsuario;

    $("#cboOficinaModal").val(data.IdCiudad);
    $("#txtNombrees").val(data.Nombres);
    $("#txtApellidos").val(data.Apellidos);
    $("#txtCorreo").val(data.Correo);
    $("#txtCelular").val(data.Celular);
    $("#txtNroci").val(data.NroCi);

    $("#cboRoles").val(data.IdRol);
    $("#cboEstado").val(data.Estado ? 1 : 0).prop("disabled", false);

    $("#imgUsureg").attr("src", data.FotoUrl || "Imagenes/sinImagen.png");
    $("#txtFoto").val("");

    $("#modalLabeldetalle").text("Editar Registro");
    $("#modalAdd").modal("show");
});

$('#tbData tbody').on('click', '.btn-detalle', function () {

    let fila = $(this).closest('tr');

    if (fila.hasClass('child')) {
        fila = fila.prev();
    }

    let data = tablaData.row(fila).data();
    const textoSms = `Detalles del Usuario: ${data.NombreCompleto}.`;
    mostrarAlertaZero("¡Mensaje!", textoSms, "info");

});

const TAMANO_MAXIMO = 2 * 1024 * 1024; // 4 MB en bytes

function mostrarImagenSeleccionada(input) {
    let file = input.files[0];
    let reader = new FileReader();

    // Si NO se seleccionó archivo (ej: presionaron "Cancelar")
    if (!file) {
        resetearVistaFoto(input);
        return;
    }

    // Validación: si no es imagen, mostramos error
    if (!esImagen(file)) {
        ToastMaster.fire({
            icon: 'error',
            title: 'El archivo seleccionado no es una imagen válida.'
        });
        resetearVistaFoto(input);
        return;
    }

    // 3. Validación: Tamaño máximo
    if (file.size > TAMANO_MAXIMO) {
        ToastMaster.fire({
            icon: 'error',
            title: 'La imagen supera el tamaño máximo permitido de 2 MB.'
        });
        resetearVistaFoto(input);
        return;
    }

    // Si todo es válido → mostrar vista previa
    reader.onload = (e) => $('#imgUsureg').attr('src', e.target.result);
    reader.readAsDataURL(file);
}

function esImagen(file) {
    return file && file.type.startsWith("image/");
}

// Función auxiliar para limpiar (DRY - Don't Repeat Yourself)
function resetearVistaFoto(input) {
    $('#imgUsureg').attr('src', "Imagenes/sinImagen.png");
    input.value = ""; // Limpia el input file
}

$('#txtFoto').change(function () {
    mostrarImagenSeleccionada(this);
});

$("#btnNuevore").on("click", function () {

    idEditar = 0;

    $("#txtNombrees").val("");
    $("#txtApellidos").val("");
    $("#txtCorreo").val("");
    $("#txtCelular").val("");
    $("#txtNroci").val("");

    $("#cboRoles").val("");
    $("#cboOficinaModal").val("");
    $("#cboEstado").val(1).prop("disabled", true);

    $('#imgUsureg').attr('src', "Imagenes/sinImagen.png");
    $("#txtFoto").val("");

    $("#modalLabeldetalle").text("Nuevo Registro");

    $("#modalAdd").modal("show");

})

function habilitarBoton() {
    $('#btnGuardarCambios').prop('disabled', false);
}

$("#btnGuardarCambios").on("click", function () {
    // Bloqueo inmediato
    $('#btnGuardarCambios').prop('disabled', true);

    const inputs = $("#modalAdd input.model").serializeArray();
    const inputs_sin_valor = inputs.filter(item => item.value.trim() === "");

    if (inputs_sin_valor.length > 0) {
        const mensaje = `Debe completar el campo: "${inputs_sin_valor[0].name}"`;
        ToastMaster.fire({
            icon: 'warning',
            title: mensaje
        });
        $(`input[name="${inputs_sin_valor[0].name}"]`).focus();
        habilitarBoton();
        return;
    }

    if ($("#cboOficinaModal").val() === "") {
        ToastMaster.fire({
            icon: 'warning',
            title: 'Debe seleccionar una Oficina.'
        });
        $("#cboOficinaModal").focus();
        habilitarBoton();
        return;
    }

    if ($("#cboRoles").val() === "") {
        ToastMaster.fire({
            icon: 'warning',
            title: 'Debe seleccionar un Rol.'
        });
        $("#cboRoles").focus();
        habilitarBoton();
        return;
    }

    // 2. ARMAR EL OBJETO
    const objeto = {
        IdUsuario: idEditar,
        IdCiudad: parseInt($("#cboOficinaModal").val()),
        IdRol: parseInt($("#cboRoles").val()),
        Nombres: $("#txtNombrees").val().trim(),
        Apellidos: $("#txtApellidos").val().trim(),
        NroCi: $("#txtNroci").val().trim(),
        Correo: $("#txtCorreo").val().trim(),
        Celular: $("#txtCelular").val().trim(),
        Estado: ($("#cboEstado").val() === "1" ? true : false),
        FotoUrl: "" // Lo enviamos siempre vacío. Si hay foto nueva, el Base64 la reemplazará en C#.
    };

    //let ver = objeto.IdRegional;

    // 3. PROCESAR EL INPUT FILE
    const fileInput = document.getElementById('txtFoto');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            // Extraemos solo el texto Base64, quitando la cabecera (data:image/jpeg;base64,)
            const base64String = e.target.result.split(',')[1];

            // Disparamos el AJAX enviando la imagen
            enviarAjaxUsuario(objeto, base64String);
        };
        reader.readAsDataURL(file);
    } else {
        // Si no hay foto, disparamos el AJAX mandando el base64 vacío
        enviarAjaxUsuario(objeto, "");
    }
});

function enviarAjaxUsuario(objeto, base64String) {
    $("#modalAdd").find("div.modal-content").LoadingOverlay("show");

    $.ajax({
        type: "POST",
        url: "Usuarios.aspx/GuardarOrEditUsuarios",
        data: JSON.stringify({ objeto: objeto, base64Image: base64String }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $("#modalAdd").find("div.modal-content").LoadingOverlay("hide");

            mostrarAlertaTimer(
                response.d.Estado ? '¡Excelente!' : 'Atención', // Título dinámico
                response.d.Mensaje, // Texto del servidor
                response.d.Valor // Icono (success/error/warning) 
            );

            if (response.d.Estado) {
                $("#modalAdd").modal("hide");
                if (tablaData) {
                    tablaData.ajax.reload(null, false);
                }
                idEditar = 0;
            }
        },
        error: function (xhr) {
            console.log(xhr.responseText);
            $("#modalAdd").find("div.modal-content").LoadingOverlay("hide");
            mostrarAlertaZero("¡Atención!", "Error de comunicación con el servidor.", "error");
        },
        complete: function () {
            habilitarBoton();
        }
    });
}

$("#btnToast").on("click", function () {
    ToastMaster.fire({
        icon: 'warning',
        title: 'Debe completar la Descripcion'
    });
});

$("#btnZero").on("click", function () {
    mostrarAlertaZero("¡Atención!", "Error de comunicación con el servidor.", "error");
});

$("#btnTimer").on("click", function () {
    mostrarAlertaTimer("¡Guardado!", "La encomienda se registró correctamente.", "success");
    //mostrarAlertaTimer("¡Guardado!", "La encomienda se registró correctamente.", "success", 4000);
});

$("#btnTimerNew").on("click", function () {
    mostrarAlertaTimerNew("Cargando...", "Obteniendo asientos disponibles");
});

$("#btnContador").on("click", function () {
    mostrarAlertaTimerConContador("¡Guardado bienn!", 3000);
});


$("#btnConfirma").on("click", function () {
    mostrarAlertaConfirmacion(
        "¿Anular boleto?",
        "Esta acción liberará el asiento y no se puede deshacer.",
        "warning",
        "Sí, anular"
    ).then((result) => {
        if (result.isConfirmed) {
            // Aquí pones tu código AJAX para anular
            console.log("Procediendo a anular...");
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            console.log("El usuario canceló la acción.");
        }
    });
});


// fin