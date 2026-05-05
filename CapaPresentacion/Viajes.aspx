<%@ Page Title="" Language="C#" MasterPageFile="~/PageMaster.Master" AutoEventWireup="true" CodeBehind="Viajes.aspx.cs" Inherits="CapaPresentacion.Viajes" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="assets/vendor/timepicker/bootstrap-timepicker.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/vendor/datepiker-jquery-ui/jquery-ui.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@mdi/font@7.4.47/css/materialdesignicons.min.css">
    <link href="assets/vendor/datatables/dataTables.bootstrap4.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/vendor/datatables/extensiones/css/responsive.dataTables.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/vendor/datatables/extensiones/css/buttons.dataTables.min.css" rel="stylesheet" type="text/css" />
    <style>
    .select2-container .select2-selection--single {
        height: 31px !important;
        padding: 0.25rem 0.5rem;
        border: 1px solid #343a40;
        border-radius: var(--bs-border-radius-sm);
    }

    .select2-container--default .select2-selection--single .select2-selection__rendered {
        line-height: 1.5 !important;
        padding-left: 0px !important;
        color: #495057;
    }

    .select2-container--default .select2-selection--single .select2-selection__arrow {
        height: 29px !important;
    }
</style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="d-flex card-header justify-content-between align-items-center border-bottom border-dashed">
                    <h4 class="header-title">Programacion de Viajes</h4>
                </div>

                <div class="card-body">

                    <div class="d-flex flex-wrap justify-content-between align-items-center mb-3 pb-3 border-bottom">
                        <div>
                            <h5 class="mb-0 text-dark">Directorio de Programacion de Viajes</h5>
                            <p class="text-muted fs-13 mb-0">Administra los Viajes interdepartamentales.</p>
                        </div>
                        <div>
                            <button type="button" id="btnNuevore" class="btn btn-primary rounded-pill fw-medium px-3">
                                <i class="ti ti-plus fs-18 align-middle me-1"></i>Nuevo Registro
                            </button>
                        </div>
                    </div>

                    <div class="table-responsive">
                        <table class="table table-sm table-hover align-middle border-bottom" id="tbData" style="width: 100%">
                            <thead class="table-light">
                                <tr>
                                    <th>Id</th>
                                    <th>Ruta de Viaje</th>
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

    <div id="modalAdd" class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="modalLabeldetalle"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="modalLabeldetalle">Viajes</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">

                    <div class="row">
                        <div class="mb-2 col-md-7">
                            <label for="cboRuta" class="form-label mb-1 text-muted fw-semibold">Selecione Ruta</label>
                            <select class="form-select form-select-sm" id="cboRuta">
                            </select>
                        </div>

                        <div class="mb-2 col-md-5">
                            <label for="txtFechaSalida" class="form-label mb-1 text-muted fw-semibold">Fecha Salida</label>
                            <!-- Agregamos readonly y estilo de cursor -->
                            <input type="text" id="txtFechaSalida" class="form-control form-control-sm bg-white" readonly style="cursor: pointer;">
                        </div>
                    </div>

                    <div class="row">
                        <div class="mb-2 col-md-8">
                            <label for="cboBus" class="form-label mb-1 text-muted fw-semibold">Selecione el Bus</label>
                            <select class="form-select form-select-sm" id="cboBus">
                            </select>
                        </div>

                        <div class="mb-2 col-md-4">
                            <label for="timepicker2" class="form-label mb-1 text-muted fw-semibold">Hora</label>
                            <input type="text" id="timepicker2" class="form-control form-control-sm bg-white" readonly style="cursor: pointer;">
                            <%--<input type="text" id="timepicker2" class="form-control form-control-sm">--%>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-sm btn-secondary" data-bs-dismiss="modal"><i class="ti ti-square-rounded-x fs-16 align-middle me-1"></i>Salir</button>
                    <button type="button" id="btnGuardarCambios" class="btn btn-sm btn-success"><i class="ti ti-device-floppy fs-16 align-middle me-1"></i>Guardar</button>
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

    <script src="js/Viajes.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
</asp:Content>
