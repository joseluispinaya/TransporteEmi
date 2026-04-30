

//$("#btnVerForma").on("click", function () {
//    let cantidadAsi = $('#cboNroAsientos').val();
//    mostrarDiseno(cantidadAsi);
//});

//$(document).on("click", ".seat", function () {
//    $(this).toggleClass("selected");

//    let numeroAsiento = $(this).data("nro");

//    if ($(this).hasClass("selected")) {
//        mostrarAlertaZero("¡Atención!", "Seleccionaste el Asiento Nro: " + numeroAsiento, "success");
//    } else {
//        mostrarAlertaZero("¡Atención!", "Deseleccionaste el Asiento Nro: " + numeroAsiento, "warning");
//    }

//});

// Función global para seleccionar el viaje (se llama desde el HTML)
function seleccionarViaje(elemento, asientos) {
    // 1. Quitamos la clase 'active' a todos los viajes de la lista
    $('.viaje-item').removeClass('active');

    // 2. Le ponemos la clase 'active' solo al que hicimos clic
    $(elemento).addClass('active');

    // 3. ¡LLAMAMOS A TU FUNCIÓN! Le pasamos la cantidad de asientos
    mostrarDiseno(asientos);

    // 4. Ocultamos el panel de venta por si estaba abierto de una consulta anterior
    $("#panelVenta").hide();
}

// Delegación de clics para los asientos
$(document).on("click", ".seat", function () {

    // (Opcional a futuro) Si el asiento ya tiene clase de 'vendido', no hacemos nada
    // if ($(this).hasClass("asiento-vendido")) return;

    // 1. Limpiamos selecciones previas (para que solo se elija 1 asiento a la vez)
    $(".seat").removeClass("selected");

    // 2. Marcamos el asiento actual como seleccionado
    $(this).addClass("selected");

    // 3. Extraemos el número del asiento
    let numeroAsiento = $(this).data("nro");

    // 4. PASAMOS EL DATO AL FORMULARIO DE ABAJO
    $("#txtNroAsiento").val(numeroAsiento);

    // 5. MOSTRAMOS EL PANEL DE VENTA CON ANIMACIÓN
    $("#panelVenta").fadeIn(300);

    // 6. Hacemos un scroll suave automático para que el usuario vea el formulario
    setTimeout(() => {
        $("#panelVenta")[0].scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, 100);
});

function mostrarDiseno(cantidadAsi) {
    const contenedor = $("#contenedorBus");
    contenedor.empty();

    const numAsientos = parseInt(cantidadAsi);

    // 1. Iniciamos el HTML con el contorno del bus y el volante a la IZQUIERDA
    let htmlBus = `
        <div class="bus-wrapper">
            <div class="bus-container">
                <div class="driver-area">
                    <i class="ti ti-steering-wheel steering-wheel" title="Volante del Chofer"></i>
                    
                    <span class="text-muted fw-semibold d-flex align-items-center" style="font-size: 0.7rem; writing-mode: vertical-rl; transform: rotate(180deg);">
                        <i class="ti ti-door-enter fs-5 mb-1"></i> Puerta
                    </span>
                </div>
                <div class="seats-area">
    `;

    let asientoActual = 1;
    const totalFilas = Math.ceil(numAsientos / 4);

    // 2. Iteramos para crear las columnas (que representan las filas de la flota)
    for (let fila = 1; fila <= totalFilas; fila++) {
        htmlBus += `<div class="seat-column">`;

        // Bloque Superior (Lado de la ventana y pasillo izquierdo)
        htmlBus += `<div class="d-flex flex-column gap-1">`;
        if (asientoActual <= numAsientos) htmlBus += generarAsientoHTML(asientoActual++);
        if (asientoActual <= numAsientos) htmlBus += generarAsientoHTML(asientoActual++);
        htmlBus += `</div>`;

        // Pasillo Central (Espacio vacío)
        htmlBus += `<div class="seat-aisle"></div>`;

        // Bloque Inferior (Pasillo derecho y ventana)
        htmlBus += `<div class="d-flex flex-column gap-1">`;
        if (asientoActual <= numAsientos) htmlBus += generarAsientoHTML(asientoActual++);
        if (asientoActual <= numAsientos) htmlBus += generarAsientoHTML(asientoActual++);
        htmlBus += `</div>`;

        htmlBus += `</div>`; // Cierra la seat-column
    }

    // 3. Cerramos el bus
    htmlBus += `
                </div>
            </div>
        </div>
    `;

    // 4. Inyectamos y mostramos
    contenedor.html(htmlBus).hide().fadeIn(300);
}

function generarAsientoHTML(nro) {
    let nroFormateado = nro < 10 ? '0' + nro : nro;
    return `
        <div class="seat shadow-sm" data-nro="${nro}" title="Asiento Nro ${nro}">
            ${nroFormateado}
        </div>
    `;
}

// fin