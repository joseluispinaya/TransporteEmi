<%@ Page Title="" Language="C#" MasterPageFile="~/PageMaster.Master" AutoEventWireup="true" CodeBehind="TerminalParada.aspx.cs" Inherits="CapaPresentacion.TerminalParada" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div class="row">
        <div class="col-lg-3">
            <div class="card">
                <img class="card-img-top" src="assets/images/small/small-3.jpg" alt="Card image cap">
                <div class="card-body">
                    <p class="card-text">
                        Some quick example text to build on example text to build on the card title and make up.
                    </p>
                </div>
            </div>
        </div>
        <div class="col-lg-9">
            <div class="card">
                <div class="card-header border-bottom border-dashed d-flex align-items-center">
                    <h4 class="header-title">Panel de Terminales y Rutas</h4>
                </div>

                <div class="card-body">
                    <div class="row">
                        <div class="col-sm-9">
                            <div class="tab-content" id="v-pills-tabContent-right">
                                <div class="tab-pane fade active show" id="v-pills-home2" role="tabpanel" aria-labelledby="v-pills-home-tab">
                                    <div class="d-flex flex-wrap justify-content-between align-items-center mb-3 pb-3 border-bottom">
                                        <div>
                                            <h5 class="mb-0 text-dark">Directorio de Terminales</h5>
                                            <p class="text-muted fs-13 mb-0">Administra las distintas terminales.</p>
                                        </div>
                                        <div>
                                            <button type="button" id="btnNuevaTerminal" class="btn btn-primary rounded-pill fw-medium px-3">
                                                <i class="ti ti-user-plus fs-18 align-middle me-1"></i>Registrar Terminal
                                            </button>
                                        </div>
                                    </div>

                                    <div class="table-responsive">
                                        <table class="table table-hover table-borderless align-middle table-nowrap" id="tbTerminales" style="width: 100%">
                                            <thead class="table-light">
                                                <tr>
                                                    <th class="rounded-start">Id</th>
                                                    <th>Terminales</th>
                                                    <th>Estado</th>
                                                    <th class="text-center rounded-end">Opciones</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div class="tab-pane fade" id="v-pills-profile2" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                                    <div class="d-flex flex-wrap justify-content-between align-items-center mb-3 pb-3 border-bottom">
                                        <div>
                                            <h5 class="mb-0 text-dark">Directorio de Rutas</h5>
                                            <p class="text-muted fs-13 mb-0">Administra las rutas interdepartamentales.</p>
                                        </div>
                                        <div>
                                            <button type="button" id="btnNuevaRuta" class="btn btn-primary rounded-pill fw-medium px-3">
                                                <i class="ti ti-user-plus fs-18 align-middle me-1"></i>Registrar Ruta
                                            </button>
                                        </div>
                                    </div>

                                    <div class="table-responsive">
                                        <table class="table table-hover table-borderless align-middle table-nowrap" id="tbRutas" style="width: 100%">
                                            <thead class="table-light">
                                                <tr>
                                                    <th class="rounded-start">Id</th>
                                                    <th>Rutas</th>
                                                    <th class="text-center rounded-end">Opciones</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td class="fw-bold">#1</td>
                                                    <td><i class="ti ti-map-pin text-success me-1"></i>Riberalta - La Paz</td>
                                                    <td class="text-center">
                                                        <button class="btn btn-sm btn-soft-info btn-icon"><i class="ti ti-pencil"></i></button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div class="tab-pane fade" id="v-pills-settings2" role="tabpanel" aria-labelledby="v-pills-settings-tab">
                                    <div class="d-flex flex-wrap justify-content-between align-items-center mb-3 pb-3 border-bottom">
                                        <div>
                                            <h5 class="mb-0 text-dark">Asigna Orden de Rutas</h5>
                                            <p class="text-muted fs-13 mb-0">Administra las ordenes de las rutas y paradas.</p>
                                        </div>
                                        <div>
                                            <button type="button" id="btnNuevaOrdenRt" class="btn btn-primary rounded-pill fw-medium px-3">
                                                <i class="ti ti-user-plus fs-18 align-middle me-1"></i>Registrar Orden
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-sm-3 mt-2 mt-sm-0">
                            <div class="nav flex-column nav-pills nav-pills-secondary" id="v-pills-tab2" role="tablist" aria-orientation="vertical">
                                <a class="nav-link p-2 active show" id="v-pills-home-tab2" data-bs-toggle="pill"
                                    href="#v-pills-home2" role="tab" aria-controls="v-pills-home2" aria-selected="true">
                                    <i class="ti ti-map-pin fs-18 me-1"></i>
                                    <span class="d-none d-md-inline-block">Terminales</span>
                                </a>
                                <a class="nav-link p-2" id="v-pills-profile-tab2" data-bs-toggle="pill" href="#v-pills-profile2"
                                    role="tab" aria-controls="v-pills-profile2" aria-selected="false">
                                    <i class="ti ti-device-ipad-pin fs-18 me-1"></i>
                                    <span class="d-none d-md-inline-block">Rutas</span>
                                </a>
                                <a class="nav-link p-2" id="v-pills-settings-tab2" data-bs-toggle="pill"
                                    href="#v-pills-settings2" role="tab" aria-controls="v-pills-settings2"
                                    aria-selected="false">
                                    <i class="ti ti-droplet-pin fs-18 me-1"></i>
                                    <span class="d-none d-md-inline-block">Rt. Paradas</span>
                                </a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
</asp:Content>
