<%@ Page Title="" Language="C#" MasterPageFile="~/PageMaster.Master" AutoEventWireup="true" CodeBehind="Viajes.aspx.cs" Inherits="CapaPresentacion.Viajes" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="assets/vendor/timepicker/bootstrap-timepicker.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/vendor/datepiker-jquery-ui/jquery-ui.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@mdi/font@7.4.47/css/materialdesignicons.min.css">
    <%--<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css">--%>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="d-flex card-header justify-content-between align-items-center border-bottom border-dashed">
                    <h4 class="header-title">Programacion de Viajes</h4>
                    <button type="button" id="btnNuevore" class="btn btn-info btn-sm">
                        <i class="ti ti-plus fs-16 align-middle me-1"></i>Nuevo Registro
                    </button>
                </div>

                <div class="card-body">
                    <table class="table table-striped table-sm" id="tbData" cellspacing="0" style="width: 100%">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Ruta</th>
                                <th>Bus</th>
                                <th>Salida</th>
                                <th>Hora</th>
                                <th>Estado</th>
                                <th>Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
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
                        <div class="col-md-6">
                            <div class="mb-2">
                                <label for="cboRuta" class="form-label mb-1 text-muted fw-semibold">Selecione Ruta</label>
                                <select class="form-select form-select-sm" id="cboRuta">
                                </select>
                            </div>
                            <div class="mb-2">
                                <label for="cboBus" class="form-label mb-1 text-muted fw-semibold">Selecione el Bus</label>
                                <select class="form-select form-select-sm" id="cboBus">
                                </select>
                            </div>
                            
                        </div>
                        <div class="col-md-6">
                            <div class="mb-2">
                                <label for="txtFechaSalida" class="form-label mb-1 text-muted fw-semibold">Fecha Salida</label>
                                <input type="text" id="txtFechaSalida" class="form-control form-control-sm">
                            </div>
                            <div class="mb-2">
                                <label for="timepicker2" class="form-label mb-1 text-muted fw-semibold">Hora Salida</label>
                                <input type="text" id="timepicker2" class="form-control form-control-sm">
                            </div>
                            
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
    <script src="js/Viajes.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
</asp:Content>
