<%@ Page Title="" Language="C#" MasterPageFile="~/PageMaster.Master" AutoEventWireup="true" CodeBehind="OpcionesViaje.aspx.cs" Inherits="CapaPresentacion.OpcionesViaje" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="assets/vendor/datatables/dataTables.bootstrap4.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/vendor/datatables/extensiones/css/responsive.dataTables.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/vendor/datatables/extensiones/css/buttons.dataTables.min.css" rel="stylesheet" type="text/css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <%--<div class="d-flex card-header justify-content-between align-items-center border-bottom border-dashed">
                    <h4 class="header-title">Buscar Viajes Programados</h4>
                </div>--%>

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

                    <div class="table-responsive">
                        <table class="table table-sm table-hover align-middle border-bottom" id="tbData" style="width: 100%">
                            <thead class="table-light">
                                <tr>
                                    <th class="rounded-start">Ruta de Viaje</th>
                                    <th>Unidad (Bus)</th>
                                    <th>Salida (Fecha y Hora)</th>
                                    <th class="text-center">Estado</th>
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

    <div id="modalDetalleOpcion" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="modalLabeldetalle" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalLabeldetalle">Detalles</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <input id="txtIdViajePro" value="0" type="hidden" />

                    <div class="row">
                        <div class="mb-2 col-md-6">
                            <div class="input-group input-group-sm">
                                <span class="input-group-text"><i class="ti ti-bus me-1"></i>Bus</span>
                                <input type="text" class="form-control bg-light" id="txtPlacaDetalle" readonly>
                            </div>
                        </div>

                        <div class="mb-2 col-md-6">
                            <div class="input-group input-group-sm">
                                <span class="input-group-text"><i class="ti ti-armchair me-1"></i>Tipo</span>
                                <input type="text" class="form-control bg-light text-center" id="txtTipoBus" readonly>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="mb-2 col-md-6">
                            <div class="input-group input-group-sm">
                                <span class="input-group-text"><i class="ti ti-calendar-event me-1"></i>Salida</span>
                                <input type="text" class="form-control bg-light text-center" id="txtFechaSa" readonly>
                            </div>
                        </div>

                        <div class="mb-2 col-md-6">
                            <div class="input-group input-group-sm">
                                <span class="input-group-text"><i class="ti ti-activity"></i></span>
                                <input type="text" class="form-control bg-light text-center" id="txtEstadoActual" readonly>
                            </div>
                        </div>
                    </div>

                    <div id="divAccionesProgra" class="mt-3 pt-3 border-top border-dashed d-none">
                        <h5 class="text-center text-muted fs-12 mb-2">Acciones de Viaje</h5>
                        <div class="d-flex justify-content-center">
                            <button type="button" id="btnEnRuta" class="btn btn-success flex-fill"><i class="ti ti-road me-1"></i>En Ruta</button>
                        </div>
                    </div>

                    <div id="divAccionesRuta" class="mt-3 pt-3 border-top border-dashed d-none">
                        <h5 class="text-center text-muted fs-12 mb-2">Acciones de Viaje</h5>
                        <div class="d-flex justify-content-center">
                            <button type="button" id="btnFinalizar" class="btn btn-danger flex-fill"><i class="ti ti-trash me-1"></i>Finalizar</button>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-sm btn-secondary" data-bs-dismiss="modal"><i class="ti ti-square-rounded-x fs-16 align-middle me-1"></i>Salir</button>
                </div>
            </div>
        </div>
    </div>

</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="assets/vendor/timepicker/bootstrap-timepicker.js"></script>
    <script src="assets/vendor/datepiker-jquery-ui/jquery-ui.js"></script>
    <script src="assets/vendor/datepiker-jquery-ui/idioma/datepicker-es.js"></script>

    <script src="assets/vendor/datatables/jquery.dataTables.min.js"></script>
    <script src="assets/vendor/datatables/dataTables.bootstrap4.min.js"></script>

    <script src="assets/vendor/datatables/extensiones/js/dataTables.responsive.min.js"></script>

    <script src="assets/vendor/datatables/extensiones/js/dataTables.buttons.min.js"></script>
    <script src="assets/vendor/datatables/extensiones/js/jszip.min.js"></script>
    <script src="assets/vendor/datatables/extensiones/js/buttons.html5.min.js"></script>
    <script src="assets/vendor/datatables/extensiones/js/buttons.print.min.js"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.31/jspdf.plugin.autotable.min.js"></script>

    <script src="js/OpcionesViaje.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
</asp:Content>
