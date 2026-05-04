<%@ Page Title="" Language="C#" MasterPageFile="~/PageMaster.Master" AutoEventWireup="true" CodeBehind="VentaPasajes.aspx.cs" Inherits="CapaPresentacion.VentaPasajes" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
        /* Estilos personalizados para el flujo de ventas */
        .viaje-item {
            cursor: pointer;
            transition: all 0.2s;
            border-left: 4px solid transparent;
        }

            .viaje-item:hover {
                background-color: var(--bs-secondary-bg-subtle);
                border-left-color: var(--bs-info);
            }

            .viaje-item.active {
                background-color: var(--bs-info-bg-subtle);
                border-left-color: var(--bs-info);
                /*box-shadow: inset 0 0 0 1px #0dcaf0;*/
            }

        /* Segmented Control para Venta/Reserva */
        .btn-group-toggle .btn {
            flex: 1;
        }

            .btn-group-toggle .btn.active {
                background-color: #3b82f6;
                color: white;
                border-color: #3b82f6;
            }
    </style>
    <link href="assets/css/miestilo.css" rel="stylesheet" type="text/css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div class="row">
        <!-- COLUMNA IZQUIERDA: LISTA DE VIAJES h-100 -->
        <div class="col-xl-3">
            <div class="card shadow-sm border-0">
                <div class="card-header bg-light border-bottom border-light">
                    <h5 class="card-title mb-0 d-flex justify-content-between align-items-center">
                        <span>Terminal <span class="badge bg-danger ms-1">Riberalta</span></span>
                        <i class="ti ti-bus fs-20 text-muted"></i>
                    </h5>
                </div>
                <div class="card-body p-0">
                    <div class="p-2 bg-primary text-white text-center fw-semibold fs-13 text-uppercase">
                        Salidas Programadas Hoy
                    </div>

                    <!-- LISTA DINÁMICA DE VIAJES (Reemplaza al cboNroAsientos) -->
                    <!-- Tu C# o JS generará estos DIVs iterando los viajes -->
                    <div class="list-group list-group-flush" id="listaViajesDisponibles">

                        <!-- Ejemplo de Viaje 1 -->
                        <div class="list-group-item viaje-item p-3 active" onclick="seleccionarViaje(this, 40)">
                            <div class="d-flex justify-content-between align-items-start mb-1">
                                <h6 class="mb-0 fw-bold text-dark">Riberalta <i class="ti ti-arrow-right mx-1"></i>La Paz</h6>
                                <span class="badge bg-success-subtle text-success border border-success-subtle">14:30</span>
                            </div>
                            <div class="d-flex justify-content-end mt-2">
                                <button class="btn btn-xs btn-outline-info rounded-pill px-2">
                                    <i class="ti ti-steering-wheel me-1"></i>Bus Leito
                                </button>
                            </div>
                        </div>

                        <!-- Ejemplo de Viaje 2 -->
                        <div class="list-group-item viaje-item p-3" onclick="seleccionarViaje(this, 60)">
                            <div class="d-flex justify-content-between align-items-start mb-1">
                                <h6 class="mb-0 fw-bold text-dark">Riberalta <i class="ti ti-arrow-right mx-1"></i>Santa Rosa</h6>
                                <span class="badge bg-warning-subtle text-warning border border-warning-subtle">18:00</span>
                            </div>
                            <div class="d-flex justify-content-end mt-2">
                                <button class="btn btn-xs btn-outline-info rounded-pill px-2">
                                    <i class="ti ti-steering-wheel me-1"></i>Bus Normal
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

        <!-- COLUMNA DERECHA: MAPA DEL BUS h-100 -->
        <div class="col-xl-9">
            <div class="card shadow-sm border-0">
                <div class="card-header bg-light border-bottom border-light d-flex justify-content-between align-items-center">
                    <h5 class="card-title mb-0 text-muted"><i class="ti ti-layout-grid-add me-2"></i>Distribución de Asientos</h5>

                    <!-- Leyenda de colores -->
                    <div class="d-flex gap-3 fs-12">
                        <span class="d-flex align-items-center"><i class="ti ti-circle-filled text-success me-1 fs-14"></i>Libre</span>
                        <span class="d-flex align-items-center"><i class="ti ti-circle-filled text-warning me-1 fs-14"></i>Reservado</span>
                        <span class="d-flex align-items-center"><i class="ti ti-circle-filled text-danger me-1 fs-14"></i>Vendido</span>
                    </div>
                </div>
                <div class="card-body bg-light-subtle d-flex align-items-center justify-content-center" style="min-height: 300px;">

                    <!-- Contenedor donde dibujarás los asientos -->
                    <div id="contenedorBus" class="w-100 d-flex justify-content-center" style="display: none;">
                        <!-- Borra este texto cuando pintes tu bus con JS -->
                        <div class="text-center text-muted">
                            <i class="ti ti-bus fs-48 mb-2 opacity-50"></i>
                            <p>Selecciona una salida para ver los asientos</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>


    <!-- ==========================================
     SEGUNDO ROW: PANEL DE FACTURACIÓN Y DATOS
     (Oculto por defecto hasta seleccionar asiento)
     ========================================== -->
    <div class="row mt-2" id="panelVenta" style="display: none;">

        <!-- COLUMNA IZQUIERDA: CONFIGURACIÓN DE VENTA h-100 -->
        <div class="col-xl-3">
            <div class="card shadow-sm border-0 border-top border-primary border-3">
                <div class="card-body">
                    <h6 class="text-uppercase fw-semibold text-muted mb-3 fs-12">Opciones del Boleto</h6>

                    <!-- Switch Menor -->
                    <div class="d-flex justify-content-between align-items-center border p-2 rounded mb-3 bg-light">
                        <div>
                            <span class="d-block fw-medium text-dark"><i class="ti ti-baby-carriage me-1 text-primary"></i>¿Lleva bebé/menor?</span>
                            <span class="fs-11 text-muted">Comparten el mismo asiento</span>
                        </div>
                        <div class="form-check form-switch form-switch-md mb-0">
                            <input type="checkbox" class="form-check-input" id="switchMenor">
                        </div>
                    </div>

                    <!-- Toggle Venta/Reserva -->
                    <p class="text-muted mb-2 fs-13">Tipo de Transacción</p>
                    <div class="btn-group w-100 btn-group-toggle" role="group">
                        <input type="radio" class="btn-check" name="tipoTransaccion" id="radioVenta" autocomplete="off" checked>
                        <label class="btn btn-outline-primary fw-medium" for="radioVenta">Venta</label>
                        <%--<label class="btn btn-outline-primary fw-medium" for="radioVenta"><i class="ti ti-receipt-2 me-1"></i>Venta</label>--%>

                        <input type="radio" class="btn-check" name="tipoTransaccion" id="radioReserva" autocomplete="off">
                        <label class="btn btn-outline-warning fw-medium" for="radioReserva">Reserva</label>
                        <%--<label class="btn btn-outline-warning fw-medium" for="radioReserva"><i class="ti ti-clock-pause me-1"></i>Reserva</label>--%>
                    </div>
                </div>
            </div>
        </div>

        <!-- COLUMNA DERECHA: DATOS DEL CLIENTE Y REGISTRO h-100 -->
        <div class="col-xl-9">
            <div class="card shadow-sm border-0">
                <div class="card-body">

                    <!-- Fila 1: Cliente -->
                    <div class="row align-items-end mb-3">
                        <div class="col-md-5">
                            <label class="form-label text-muted fs-13 mb-1">Buscar Pasajero (CI o Nombre)</label>
                            <div class="d-flex gap-2">
                                <div class="flex-grow-1">
                                    <select id="cboBuscarPasajero" class="form-control select2">
                                        <option value="">Buscar...</option>
                                    </select>
                                </div>
                                <!-- Botón Nuevo Cliente Integrado -->
                                <button id="btnAddClient" type="button" class="btn btn-primary" title="Registrar nuevo cliente">
                                    <i class="ti ti-user-plus"></i>
                                </button>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <label class="form-label text-muted fs-13 mb-1">Nombres del Pasajero</label>
                            <input type="text" id="txtNomPasa" class="form-control bg-light" readonly placeholder="Autocompletado...">
                        </div>
                        <div class="col-md-3">
                            <label class="form-label text-muted fs-13 mb-1">Documento CI</label>
                            <input type="text" id="txtNroCi" class="form-control bg-light" readonly placeholder="---">
                        </div>
                    </div>
                    <input id="txtIdCliente" value="0" type="hidden" />

                    <hr class="border-light border-2 border-dashed my-3">

                    <!-- Fila 2: Datos del Asiento -->
                    <div class="row align-items-end">
                        <div class="col-md-2">
                            <label class="form-label text-muted fs-13 mb-1">Asiento</label>
                            <div class="input-group flex-nowrap">
                                <span class="input-group-text bg-primary text-white border-primary"><i class="ti ti-armchair"></i></span>
                                <input type="text" class="form-control bg-white fw-bold text-center fs-16" id="txtNroAsiento" readonly value="12">
                            </div>
                        </div>

                        <div class="col-md-4">
                            <label class="form-label text-muted fs-13 mb-1">Destino del Pasajero</label>
                            <div class="input-group flex-nowrap">
                                <span class="input-group-text"><i class="ti ti-map-pin"></i></span>
                                <select class="form-select" id="cboDestino">
                                </select>
                            </div>
                        </div>

                        <div class="col-md-3">
                            <label class="form-label text-muted fs-13 mb-1">Precio (Bs.)</label>
                            <div class="input-group flex-nowrap">
                                <span class="input-group-text text-success fw-bold">Bs.</span>
                                <input type="text" class="form-control bg-white fw-bold fs-16 text-success" id="txtPrecio" readonly value="0.00">
                            </div>
                        </div>

                        <div class="col-md-3">
                            <!-- Botón Gigante de Acción Final -->
                            <button type="button" id="btnRegistrarPasaje" class="btn btn-success w-100 h-100 fs-15 fw-bold d-flex align-items-center justify-content-center py-2 shadow-sm">
                                <i class="ti ti-check fs-20 me-2"></i>CONFIRMAR
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>

    <div id="modalAddc" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="modalLabelcliente" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalLabelcliente">Cliente</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">

                    <div class="row">
                        <div class="mb-1 col-md-6">
                            <label for="txtNombresc" class="form-label mb-1 text-muted fw-semibold">Nombres</label>
                            <input type="text" id="txtNombresc" name="Nombres" class="form-control form-control-sm model">
                        </div>

                        <div class="mb-1 col-md-6">
                            <!-- <label class="form-label text-muted fs-13 mb-1">Destino</label> -->
                            <label for="txtApellidosc" class="form-label mb-1 text-muted fw-semibold">Apellidos</label>
                            <input type="text" id="txtApellidosc" name="Apellidos" class="form-control form-control-sm model">
                        </div>
                    </div>

                    <div class="row">
                        <div class="mb-1 col-md-4">
                            <label for="txtNroCic" class="form-label mb-1 text-muted fw-semibold">Nro CI</label>
                            <input type="text" id="txtNroCic" name="Nro CI" class="form-control form-control-sm model">
                        </div>

                        <div class="mb-1 col-md-4">
                            <label for="txtNroCelc" class="form-label mb-1 text-muted fw-semibold">Nro Cel</label>
                            <input type="number" id="txtNroCelc" name="Nro Cel" class="form-control form-control-sm model">
                        </div>

                        <div class="mb-1 col-md-4">
                            <label for="cboGeneroc" class="form-label mb-1 text-muted fw-semibold">Genero</label>
                            <select class="form-select form-select-sm" id="cboGeneroc">
                                <option value="1">Masculino</option>
                                <option value="0">Femenino</option>
                            </select>
                        </div>
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-sm btn-secondary" data-bs-dismiss="modal"><i class="ti ti-square-rounded-x fs-16 align-middle me-1"></i>Salir</button>
                    <button type="button" id="btnGuardarRegisc" class="btn btn-sm btn-success"><i class="ti ti-device-floppy fs-16 align-middle me-1"></i>Guardar</button>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="js/VentaPasajes.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
</asp:Content>
