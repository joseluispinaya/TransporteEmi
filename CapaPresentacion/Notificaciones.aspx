<%@ Page Title="" Language="C#" MasterPageFile="~/PageMaster.Master" AutoEventWireup="true" CodeBehind="Notificaciones.aspx.cs" Inherits="CapaPresentacion.Notificaciones" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="assets/vendor/datatables/dataTables.bootstrap4.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/vendor/datatables/extensiones/css/responsive.dataTables.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/vendor/datatables/extensiones/css/buttons.dataTables.min.css" rel="stylesheet" type="text/css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div class="row">
        <div class="col-lg-3">
            <div class="card bg-warning bg-opacity-25">
                <div class="card-body">
                    <h1><i class="ti ti-receipt-tax text-warning"></i></h1>
                    <h4 class="text-warning">Estimated tax for this year</h4>
                    <p class="text-warning text-opacity-75">We kindly encourage you to review your recent transactions</p>
                    <a href="#!" class="btn btn-sm rounded-pill btn-info">Activate Now</a>
                </div>
                <!-- end card-body-->
            </div>
            <!-- end card-->
        </div>
        <div class="col-lg-9">
            <div class="card">

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
                                    <th class="rounded-start">Unidad (Bus)</th>
                                    <th>Salida (Fecha y Hora)</th>
                                    <th class="text-center rounded-end">Accion</th>
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

    <div id="modalNotificacion" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="modalLabelnoti" aria-hidden="true">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalLabelnoti">Notificacion</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <input id="txtIdViajePro" value="0" type="hidden" />
                    <div class="mb-1">
                        <label for="txtTituloSms" class="form-label">Titulo SMS</label>
                        <input type="text" id="txtTituloSms" class="form-control form-control-sm" readonly>
                    </div>
                    <div class="mb-1">
                        <label for="txtMensaje" class="form-label">Mensaje</label>
                        <textarea class="form-control" id="txtMensaje" rows="4" readonly></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-sm btn-secondary" data-bs-dismiss="modal"><i class="ti ti-square-rounded-x fs-16 align-middle me-1"></i>Salir</button>
                    <button type="button" id="btnEnviarYa" class="btn btn-sm btn-success"><i class="ti ti-send fs-16 align-middle me-1"></i>Enviar</button>
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

    <script src="js/Notificaciones.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
</asp:Content>
