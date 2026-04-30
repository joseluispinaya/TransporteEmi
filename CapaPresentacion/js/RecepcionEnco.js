
// Variable global para guardar el Viaje seleccionado
let viajeSeleccionadoId = 0;

function seleccionarViajeEncomienda(elemento, idViaje) {
    // 1. Quitar activo a los demás
    $('.viaje-item').removeClass('active');

    // 2. Activar el actual
    $(elemento).addClass('active');

    // 3. Guardar el ID del viaje para cuando se presione guardar
    viajeSeleccionadoId = idViaje;

    // 4. Asegurarse que el panel esté visible
    const panel = $('#panelFormulario');
    if (!panel.is(':visible')) {
        panel.hide().fadeIn(400);
    }

    // 5. Pequeño efecto visual en el formulario para indicar que los datos son para este viaje
    panel.removeClass('shadow-sm').addClass('shadow');
    setTimeout(() => { panel.removeClass('shadow').addClass('shadow-sm'); }, 300);
}

// fin