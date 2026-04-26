
let tablaData;
let idEditar = 0;

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

    //$("#cboRoles").val("");
    //$("#cboOficinaModal").val("");
    $("#cboEstado").val(1).prop("disabled", true);

    $('#imgUsureg').attr('src', "Imagenes/sinImagen.png");
    $("#txtFoto").val("");

    $("#modalLabeldetalle").text("Nuevo Registro");

    $("#modalAdd").modal("show");

})

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
    mostrarAlertaTimer("¡Guardado!", "La encomienda se registró correctamente.", "success", 4000);
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