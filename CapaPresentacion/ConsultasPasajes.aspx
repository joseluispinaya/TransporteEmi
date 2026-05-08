<%@ Page Title="" Language="C#" MasterPageFile="~/PageMaster.Master" AutoEventWireup="true" CodeBehind="ConsultasPasajes.aspx.cs" Inherits="CapaPresentacion.ConsultasPasajes" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="assets/vendor/datatables/dataTables.bootstrap4.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/vendor/datatables/extensiones/css/responsive.dataTables.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/vendor/datatables/extensiones/css/buttons.dataTables.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/css/miestilo.css" rel="stylesheet" type="text/css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div class="row">
        <div class="col-xl-3">
            <div class="card shadow-sm border-0">
                <%--<div class="card-header bg-light border-bottom border-light">
                    <h5 class="card-title mb-0 d-flex justify-content-between align-items-center">
                        <span>Terminal <span class="badge bg-danger ms-1">Riberalta</span></span>
                        <i class="ti ti-bus fs-20 text-muted"></i>
                    </h5>
                </div>--%>
                <div class="card-body p-0">
                    <div class="p-2 bg-primary text-white text-center fw-semibold fs-13 text-uppercase">
                        Resultado de Viajes
                    </div>
                    <div class="list-group list-group-flush" id="listaViajesDisponibles">
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xl-9">
            <div class="card">
                <div class="d-flex card-header justify-content-between align-items-center border-bottom border-dashed">
                    <h4 class="header-title">Consultar Viajes</h4>
                </div>

                <div class="card-body">

                    <div class="mb-3 pb-3 border-bottom">

                        <div class="mb-3">
                            <h5 class="mb-0 text-dark">Consulta de Viajes</h5>
                            <p class="text-muted fs-13 mb-0">Seleccione una ruta y estado para ver un detalle de viajes programados.</p>
                        </div>

                        <div class="d-flex flex-wrap flex-md-nowrap align-items-center gap-2">

                            <div class="input-group flex-grow-1">
                                <span class="input-group-text bg-white border-end-0 text-primary" id="addon-rutatable">
                                    <i class="ti ti-road fs-18"></i>
                                </span>
                                <select class="form-select text-dark fw-medium border-start-0" id="cboRutasTable"
                                    aria-describedby="addon-rutatable">
                                </select>
                            </div>

                            <div class="input-group flex-grow-1">
                                <span class="input-group-text bg-white border-end-0 text-info" id="addon-estadotable">
                                    <i class="ti ti-activity fs-18"></i>
                                </span>
                                <select class="form-select text-dark fw-medium border-start-0" id="cboEstadosTable"
                                    aria-describedby="addon-estadotable">
                                    <option value="1">Programado</option>
                                    <option value="2">En Ruta</option>
                                    <option value="3">Finalizado</option>
                                    <option value="0">Cancelado</option>
                                </select>
                            </div>

                            <button type="button" id="btnBuscar"
                                class="btn btn-dark rounded-pill fw-medium px-3 text-nowrap flex-shrink-0">
                                <i class="ti ti-search fs-18 align-middle me-1"></i>Buscar
                            </button>

                        </div>
                    </div>

                    <h5 id="lblRuta" class="text-dark fw-medium text-center mb-3">Esperando...</h5>

                    <div class="table-responsive">
                        <table class="table table-sm table-hover align-middle border-bottom" id="tbAsientosVendidos" style="width: 100%">
                            <thead class="table-light">
                                <tr>
                                    <th>Clientes</th>
                                    <th>Ruta (Origen <i class="ti ti-arrow-right mx-1"></i>Destino)</th>
                                    <th>Detalle & Pasaje</th>
                                    <th class="text-center rounded-end">Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="modalDetalleBoleto" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="modalLabeldetalle" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalLabeldetalle">Detalles</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <input id="txtIdBoleto" value="0" type="hidden" />
                    <div class="input-group input-group-sm mb-3">
                        <span class="input-group-text"><i class="ti ti-user me-1"></i>Pasajero</span>
                        <input type="text" class="form-control bg-light" id="txtPasajeroDetalle" readonly>
                    </div>

                    <div class="row">
                        <div class="mb-1 col-md-6">
                            <div class="input-group input-group-sm">
                                <span class="input-group-text"><i class="ti ti-armchair me-1"></i>Asiento</span>
                                <input type="text" class="form-control bg-light text-center" id="txtNroAsientoModal" readonly>
                            </div>
                        </div>

                        <div class="mb-1 col-md-6">
                            <div class="input-group input-group-sm">
                                <span class="input-group-text"><i class="ti ti-activity"></i></span>
                                <input type="text" class="form-control bg-light text-center" id="txtEstadoActual" readonly>
                            </div>
                        </div>
                    </div>

                    <div id="divAccionesReserva" class="mt-3 pt-3 border-top border-dashed d-none">
                        <h6 class="text-center text-muted fs-12 mb-2">Acciones de Reserva</h6>
                        <div class="d-flex gap-2">
                            <button type="button" id="btnConfirmarPago" class="btn btn-success flex-fill">
                                <i class="ti ti-cash me-1"></i>Pagar
                            </button>
                            <button type="button" id="btnAnularReserva" class="btn btn-danger flex-fill">
                                <i class="ti ti-trash me-1"></i>Anular
                            </button>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-sm btn-secondary" data-bs-dismiss="modal"><i class="ti ti-square-rounded-x fs-16 align-middle me-1"></i>Salir</button>
                    <%--<button type="button" id="btnGuardarCambios" class="btn btn-sm btn-success"><i class="ti ti-device-floppy fs-16 align-middle me-1"></i>Guardar</button>--%>
                </div>
            </div>
        </div>
    </div>

    <div id="ticket-termico" class="d-none d-print-block text-dark">

        <div class="text-center mb-2">
            <h4 class="fw-bolder mb-0 text-dark">TRANS FLOTA YUNGUEÑA</h4>
            <p class="mb-0"><span class="fs-12 fw-bold">Sucursal : </span>Riberalta</p>
            <span class="fs-12">Sistema de Boletos</span>
        </div>

        <div class="border-top border-top-dashed border-dark my-2"></div>

        <div class="text-center mb-2">
            <h5 class="fw-bold mb-0 text-dark" id="tck_Tipo">BOLETO DE VIAJE</h5>
            <span class="fs-14 fw-medium" id="tck_Comprobante">RIB-000000</span>
        </div>

        <div class="border-top border-top-dashed border-dark my-2"></div>

        <div class="fs-13">
            <div class="d-flex justify-content-between">
                <span class="fw-bold">Fecha Salida:</span>
                <span id="tck_Fecha">--/--/----</span>
            </div>
            <div class="d-flex justify-content-between">
                <span class="fw-bold">Hora Salida:</span>
                <span id="tck_Hora">--:--</span>
            </div>
            <div class="d-flex justify-content-between">
                <span class="fw-bold">Tipo Bus:</span>
                <span id="tck_Bus">----</span>
            </div>
        </div>

        <div class="border-top border-top-dashed border-dark my-2"></div>

        <div class="d-flex justify-content-center gap-2 fs-14 fw-bolder">
            <span id="tck_Origen">---</span>
            <i class="ti ti-arrow-narrow-right fs-13"></i>
            <span id="tck_Destino">---</span>
        </div>

        <div class="border-top border-top-dashed border-dark my-2"></div>

        <div class="fs-13">
            <div class="d-flex justify-content-between">
                <span class="fw-bold">Pasajero:</span>
                <span id="tck_Pasajero">----</span>
            </div>
            <div class="d-flex justify-content-between">
                <span class="fw-bold">Nro. CI:</span>
                <span id="tck_CI">---</span>
            </div>
        </div>

        <div class="border-top border-top-dashed border-dark my-2"></div>

        <div class="d-flex justify-content-between align-items-center mb-1">
            <span class="fs-16 fw-bold">ASIENTO:</span>
            <span class="fs-16 fw-bolder" id="tck_Asiento">00</span>
        </div>

        <div class="d-flex justify-content-between align-items-center">
            <span class="fs-16 fw-bold">TOTAL:</span>
            <span class="fs-16 fw-bolder">Bs. <span id="tck_Precio">0.00</span></span>
        </div>

        <div class="border-top border-top-dashed border-dark my-2"></div>

        <div class="text-center fs-11 mt-2">
            <p class="mb-1">Presentarse 30 min. antes.</p>
            <p class="mb-0 fw-bold">¡Buen viaje!</p>
        </div>
    </div>

</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="assets/vendor/datatables/jquery.dataTables.min.js"></script>
    <script src="assets/vendor/datatables/dataTables.bootstrap4.min.js"></script>

    <script src="assets/vendor/datatables/extensiones/js/dataTables.responsive.min.js"></script>

    <script src="assets/vendor/datatables/extensiones/js/dataTables.buttons.min.js"></script>
    <script src="assets/vendor/datatables/extensiones/js/jszip.min.js"></script>
    <script src="assets/vendor/datatables/extensiones/js/buttons.html5.min.js"></script>
    <script src="assets/vendor/datatables/extensiones/js/buttons.print.min.js"></script>

    <script src="js/ConsultasPasajes.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
</asp:Content>
