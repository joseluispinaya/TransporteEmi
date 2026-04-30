<%@ Page Title="" Language="C#" MasterPageFile="~/PageMaster.Master" AutoEventWireup="true" CodeBehind="RecepcionesEnco.aspx.cs" Inherits="CapaPresentacion.RecepcionesEnco" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
        /* Estilos sutiles para la lista de viajes compatibles con Dark Mode */
        .viaje-item {
            cursor: pointer;
            transition: all 0.2s;
            border-left: 4px solid transparent;
        }
            /* En hover, usamos una variable de opacidad genérica o un color suave */
            .viaje-item:hover {
                background-color: var(--bs-secondary-bg-subtle);
                border-left-color: var(--bs-info);
            }

            .viaje-item.active {
                background-color: var(--bs-info-bg-subtle);
                border-left-color: var(--bs-info);
            }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div class="row">
        <!-- COLUMNA IZQUIERDA: LISTA DE VIAJES h-100 -->
        <div class="col-xl-3">
            <div class="card shadow-sm border-0">
                <div class="card-header border-bottom border-dashed d-flex align-items-center justify-content-between">
                    <h5 class="card-title mb-0">Terminal <span class="badge bg-danger ms-1">Riberalta</span></h5>
                    <i class="ti ti-bus fs-20 text-muted"></i>
                </div>

                <div class="card-body p-0">
                    <div class="p-2 text-bg-primary text-center fw-semibold fs-13 text-uppercase">
                        Salidas Programadas Hoy
                    </div>

                    <div class="list-group list-group-flush" id="listaViajesDisponibles">
                        <!-- Ejemplo de Viaje 1 -->
                        <div class="list-group-item viaje-item p-3 active" onclick="seleccionarViajeEncomienda(this, 1)">
                            <div class="d-flex justify-content-between align-items-start mb-1">
                                <h6 class="mb-0 fw-bold text-dark">Riberalta <i class="ti ti-arrow-right mx-1"></i>La Paz</h6>
                                <span class="badge bg-success-subtle text-success">14:30</span>
                            </div>
                            <div class="d-flex justify-content-end mt-2">
                                <button class="btn btn-xs btn-outline-info rounded-pill px-2">
                                    <i class="ti ti-steering-wheel me-1"></i>Bus Leito
                                </button>
                            </div>
                        </div>

                        <!-- Ejemplo de Viaje 2 -->
                        <div class="list-group-item viaje-item p-3" onclick="seleccionarViajeEncomienda(this, 2)">
                            <div class="d-flex justify-content-between align-items-start mb-1">
                                <h6 class="mb-0 fw-bold text-dark">Riberalta <i class="ti ti-arrow-right mx-1"></i>Santa Rosa</h6>
                                <span class="badge bg-warning-subtle text-warning">18:00</span>
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

        <!-- COLUMNA DERECHA: FORMULARIO DE ENCOMIENDA -->
        <div class="col-xl-9">
            <!-- Inicia oculto, se muestra al elegir viaje h-100 -->
            <div class="card shadow-sm border-0" id="panelFormulario" style="display: none;"> 
                <div class="card-header border-bottom border-dashed d-flex align-items-center">
                    <h4 class="header-title mb-0"><i class="ti ti-package me-2 text-primary"></i>Registro de Encomienda</h4>
                </div>

                <div class="card-body">
                    <!-- SECCIÓN 1: CLIENTES (Remitente y Destinatario) -->
                    <div class="row mb-3">
                        <div class="col-md-6 border-end border-dashed">
                            <h6 class="fs-14 text-uppercase text-muted mb-3"><i class="ti ti-user-up me-1"></i>Datos del Remitente</h6>
                            <label class="form-label fs-13 mb-1">Buscar Remitente (CI o Nombre)</label>
                            <div class="d-flex gap-2 mb-2">
                                <div class="flex-grow-1">
                                    <select id="cboRemitente" class="form-control select2">
                                        <option value="">Buscar quien envía...</option>
                                    </select>
                                </div>
                                <button type="button" class="btn btn-primary" title="Registrar nuevo cliente" data-bs-toggle="modal" data-bs-target="#modalNuevoCliente">
                                    <i class="ti ti-user-plus"></i>
                                </button>
                            </div>
                            <input type="text" id="txtNomRemitente" class="form-control" readonly placeholder="Nombres del remitente...">
                        </div>

                        <div class="col-md-6">
                            <h6 class="fs-14 text-uppercase text-muted mb-3"><i class="ti ti-user-down me-1"></i>Datos del Destinatario</h6>
                            <label class="form-label fs-13 mb-1">Buscar Destinatario (CI o Nombre)</label>
                            <div class="d-flex gap-2 mb-2">
                                <div class="flex-grow-1">
                                    <select id="cboDestinatario" class="form-control select2">
                                        <option value="">Buscar quien recibe...</option>
                                    </select>
                                </div>
                                <button type="button" class="btn btn-primary" title="Registrar nuevo cliente" data-bs-toggle="modal" data-bs-target="#modalNuevoCliente">
                                    <i class="ti ti-user-plus"></i>
                                </button>
                            </div>
                            <input type="text" id="txtNomDestinatario" class="form-control" readonly placeholder="Nombres del destinatario...">
                        </div>
                    </div>

                    <hr class="border-dashed my-3">

                    <!-- SECCIÓN 2: DETALLES DEL PAQUETE -->
                    <h6 class="fs-14 text-uppercase text-muted mb-3"><i class="ti ti-box-seam me-1"></i>Detalles del Paquete</h6>
                    <div class="row align-items-start mb-3">
                        <div class="col-md-6 mb-3 mb-md-0">
                            <label class="form-label fs-13 mb-1">Descripción de la Encomienda</label>
                            <textarea class="form-control" id="txtDetalle" rows="2" placeholder="Ej: Caja de cartón con repuestos, sobre manila cerrado..."></textarea>
                        </div>

                        <div class="col-md-3">
                            <label class="form-label fs-13 mb-1">Destino de entrega</label>
                            <select class="form-select" id="cboDestinoEncomienda">
                                <option>Seleccione destino...</option>
                                <option value="1">Santa Rosa</option>
                                <option value="2">La Paz</option>
                            </select>
                        </div>

                        <div class="col-md-3">
                            <label class="form-label fs-13 mb-1">Peso Neto</label>
                            <div class="input-group">
                                <input type="number" class="form-control" id="txtPeso" step="0.10" placeholder="0.00">
                                <span class="input-group-text fw-bold">Kg.</span>
                            </div>
                        </div>
                    </div>

                    <hr class="border-dashed my-3">

                    <!-- SECCIÓN 3: FACTURACIÓN Y BOTÓN -->
                    <div class="row align-items-center bg-secondary-subtle p-3 rounded">
                        <!-- Estado de Pago (Usando los estilos de tu template) -->
                        <div class="col-md-5">
                            <label class="form-label fs-13 fw-semibold text-muted d-block mb-2">Estado del Pago</label>
                            <div class="d-flex gap-4">
                                <div class="form-check form-radio-success">
                                    <input type="radio" id="radioPagado" name="estadoPago" class="form-check-input" value="1" checked>
                                    <label class="form-check-label fw-medium" for="radioPagado">Cancelado</label>
                                </div>
                                <div class="form-check form-radio-warning">
                                    <input type="radio" id="radioPorCobrar" name="estadoPago" class="form-check-input" value="2">
                                    <label class="form-check-label fw-medium" for="radioPorCobrar">Por Cobrar</label>
                                </div>
                            </div>
                        </div>

                        <!-- Monto a cobrar -->
                        <div class="col-md-3 border-start border-dashed">
                            <label class="form-label text-muted fs-13 mb-1">Monto (Bs.)</label>
                            <div class="input-group flex-nowrap">
                                <span class="input-group-text text-success fw-bold"><i class="ti ti-cash text-success"></i></span>
                                <input type="text" class="form-control bg-white fw-bold fs-16 text-success" id="txtMontoCobrado" readonly value="0.00">
                            </div>
                        </div>

                        <!-- Botón de Registro -->
                        <div class="col-md-4 text-end">
                            <button type="button" id="btnRegistrarEncomienda" class="btn btn-primary btn-lg w-100 d-flex align-items-center justify-content-center gap-2">
                                <i class="ti ti-send"></i>REGISTRAR ENVÍO
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="js/RecepcionEnco.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>

</asp:Content>
