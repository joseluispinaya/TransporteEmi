
// La función del botón se mantiene igual
$("#btnVerForma").on("click", function () {
    let cantidadAsi = $('#cboNroAsientos').val();
    mostrarDiseno(cantidadAsi);
});

// Delegación de clics para los asientos
$(document).on("click", ".seat", function () {
    // 1. Alternamos la clase visual (se pinta / despinta)
    $(this).toggleClass("selected");

    // 2. Extraemos el número exacto del asiento usando el atributo data-nro
    let numeroAsiento = $(this).data("nro");

    // 3. Verificamos si lo estamos seleccionando o deseleccionando para dar un mensaje más preciso
    if ($(this).hasClass("selected")) {
        mostrarAlertaZero("¡Atención!", "Seleccionaste el Asiento Nro: " + numeroAsiento, "success");
    } else {
        mostrarAlertaZero("¡Atención!", "Deseleccionaste el Asiento Nro: " + numeroAsiento, "warning");
    }

    //mostrarAlertaZero("¡Atención!", "Nro Asientos: ", "info");
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