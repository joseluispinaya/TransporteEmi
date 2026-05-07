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
                                    <th style="width: 60px;">Asiento</th>
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
