<%@ Page Title="" Language="C#" MasterPageFile="~/PageMaster.Master" AutoEventWireup="true" CodeBehind="VentaPasajes.aspx.cs" Inherits="CapaPresentacion.VentaPasajes" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="assets/css/miestilo.css" rel="stylesheet" type="text/css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div class="row">
        <div class="col-xl-3">
            <div class="card">
                <div class="card-body">
                    <h5>Terminal: <span class="badge bg-danger">Riberalta</span></h5>

                    <div class="p-1 mb-2 bg-warning bg-gradient text-dark">Lista de Salidas</div>
                    <div class="mb-2">
                        <label for="cboNroAsientos" class="form-label">Nro Asientos</label>
                        <select class="form-select form-select-sm" id="cboNroAsientos">
                            <option value="40">40 Asientos</option>
                            <option value="60">60 Asientos</option>
                            <option value="65">65 Asientos</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <div class="d-flex justify-content-center">
                            <button type="button" id="btnVerForma" class="btn btn-sm btn-info"><i class="ti ti-home-search fs-16 align-middle me-1"></i>Ver</button>
                        </div>
                    </div>
                    <h5 class="text-center mt-2">Lista de: <span class="badge bg-warning">Salidas</span></h5>
                </div>
            </div>

            <div class="card">
                <div class="card-body">
                    <h5>Lista de: <span class="badge bg-danger">Salidas</span></h5>
                </div>
            </div>
        </div>

        <div class="col-xl-9">
            <div class="card">
                <div class="card-body">
                    <!-- ver asientos -->
                    <div id="contenedorBus" class="d-flex justify-content-center" style="display: none;">
                    </div>
                </div>
            </div>

            <div class="card">
                <div class="card-body">
                    <%--<h5 class="text-center">Lista de: <span class="badge bg-warning">Salidas</span></h5>--%>
                    <%--<h6 class="fs-13 mt-3">Buscar Pasajero</h6>--%>

                    <div class="row mb-2">
                        <div class="mb-2 col-md-4">
                            <label class="col-form-label col-form-label-sm">Buscar Propiedad:</label>
                            <select id="cboBuscarPasajero" class="form-control form-control-sm select2" style="width: 100%;">
                                <option value="">Nro. Folio...</option>
                            </select>
                        </div>
                        <div class="mb-2 col-md-5">
                            <label for="txtNomPasa" class="col-form-label col-form-label-sm">Cliente</label>
                            <input type="text" id="txtNomPasa" class="form-control form-control-sm" readonly>
                        </div>
                        <div class="mb-2 col-md-3">
                            <label for="txtNroCi" class="col-form-label col-form-label-sm">Nro CI</label>
                            <input type="text" id="txtNroCi" class="form-control form-control-sm" readonly>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-2">
                            <div class="input-group input-group-sm flex-nowrap">
                                <span class="input-group-text" id="groupnrosilla"><i class="ti ti-armchair"></i></span>
                                <input type="text" class="form-control" id="txtNroAsiento" aria-label="NroAsiento"
                                    aria-describedby="groupnrosilla" readonly>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="input-group input-group-sm flex-nowrap">
                                <span class="input-group-text" id="groupprecio"><i class="ti ti-report-money"></i></span>
                                <input type="text" class="form-control" id="txtPrecio" aria-label="Precio"
                                    aria-describedby="groupprecio" readonly>
                            </div>
                        </div>
                        <div class="col-md-5">
                            <div class="input-group input-group-sm flex-nowrap">
                                <span class="input-group-text" id="addon-regional">
                                    <i class="ti ti-map-2 me-1"></i>Destino
                                </span>
                                <select class="form-select" id="cboRegional" aria-describedby="addon-regional">
                                </select>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <button type="button" id="btnAddClient" class="btn btn-sm btn-success">
                                <i class="ti ti-plus fs-16 align-middle me-1"></i>Agregar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="js/VentaPasajes.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
</asp:Content>
