<%@ Page Title="" Language="C#" MasterPageFile="~/PageMaster.Master" AutoEventWireup="true" CodeBehind="Conductores.aspx.cs" Inherits="CapaPresentacion.Conductores" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">

    <style>
        /* Pequeño truco CSS para el ícono gigante de fondo en las tarjetas */
        .bg-icon-transport {
            position: absolute;
            right: -15px;
            bottom: -15px;
            font-size: 6rem;
            opacity: 0.15;
            transform: rotate(-10deg);
            transition: all 0.3s ease;
        }
        /* Efecto hover para que la tarjeta se sienta viva */
        .card-transport:hover .bg-icon-transport {
            transform: rotate(0deg) scale(1.1);
            opacity: 0.25;
        }

        .card-transport {
            transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

            .card-transport:hover {
                transform: translateY(-3px);
                box-shadow: 0 .5rem 1rem rgba(0,0,0,.15) !important;
            }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div class="row">
        <div class="col-lg-3">
            <!-- Widget Choferes (Azul Ruta) -->
            <div class="card card-transport text-bg-primary border-0 shadow-sm mb-3 position-relative overflow-hidden cursor-pointer">
                <i class="ti ti-steering-wheel bg-icon-transport text-white"></i>
                <div class="card-body">
                    <div class="d-flex align-items-center">
                        <div class="flex-shrink-0">
                            <span class="avatar avatar-md bg-white text-primary rounded-circle shadow-sm d-flex align-items-center justify-content-center">
                                <i class="ti ti-user-scan fs-22"></i>
                            </span>
                        </div>
                        <div class="flex-grow-1 ms-3 text-white">
                            <p class="text-uppercase fs-12 fw-semibold mb-1 text-white-50">Personal Activo</p>
                            <h4 class="mb-0 text-white">12 <span class="fs-14 fw-normal">Choferes</span></h4>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Widget Buses (Gris Asfalto / Dark) -->
            <div class="card card-transport text-bg-primary border-0 shadow-sm mb-3 position-relative overflow-hidden cursor-pointer">
                <i class="ti ti-bus bg-icon-transport text-white"></i>
                <div class="card-body">
                    <div class="d-flex align-items-center">
                        <div class="flex-shrink-0">
                            <span class="avatar avatar-md bg-white text-primary rounded-circle shadow-sm d-flex align-items-center justify-content-center">
                                <i class="ti ti-road fs-22"></i>
                            </span>
                        </div>
                        <div class="flex-grow-1 ms-3 text-white">
                            <p class="text-uppercase fs-12 fw-semibold mb-1 text-white-50">Flota Vehicular</p>
                            <h4 class="mb-0 text-white">10 <span class="fs-14 fw-normal">Buses</span></h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-9">
            <div class="card shadow-sm border-0">
                <div class="card-header bg-light d-flex align-items-center justify-content-between pt-3 pb-0 border-bottom-0">
                    <h4 class="header-title mb-0 text-uppercase fw-bold text-muted"><i class="ti ti-layout-dashboard me-1"></i>Gestión de Flota</h4>

                    <ul class="nav nav-tabs card-header-tabs border-bottom-0" style="margin-bottom: -1px;">
                        <li class="nav-item">
                            <a href="#home-ct" data-bs-toggle="tab" aria-expanded="true" class="nav-link active fw-medium">
                                <i class="ti ti-id d-md-none d-block"></i>
                                <span class="d-none d-md-block"><i class="ti ti-users me-1"></i>Choferes</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="#profile-ct" data-bs-toggle="tab" aria-expanded="false" class="nav-link fw-medium">
                                <i class="ti ti-bus-stop d-md-none d-block"></i>
                                <span class="d-none d-md-block"><i class="ti ti-bus me-1"></i>Buses</span>
                            </a>
                        </li>
                    </ul>
                </div>

                <div class="card-body pt-4">
                    <div class="tab-content">

                        <!-- TAB CHOFERES -->
                        <div class="tab-pane show active" id="home-ct">
                            <!-- EL NUEVO ACTION TOOLBAR (Adiós al botón centrado) -->
                            <div class="d-flex flex-wrap justify-content-between align-items-center mb-3 pb-3 border-bottom">
                                <div>
                                    <h5 class="mb-0 text-dark">Directorio de Choferes</h5>
                                    <p class="text-muted fs-13 mb-0">Administra las licencias y datos del personal.</p>
                                </div>
                                <div>
                                    <button type="button" id="btnNuevoChofer" class="btn btn-primary rounded-pill shadow-sm fw-medium px-3">
                                        <i class="ti ti-user-plus fs-18 align-middle me-1"></i>Registrar Chofer
                                    </button>
                                </div>
                            </div>

                            <div class="table-responsive">
                                <table class="table table-hover table-borderless align-middle table-nowrap" id="tbChofer" style="width: 100%">
                                    <thead class="table-light">
                                        <tr>
                                            <th class="rounded-start">Id</th>
                                            <th>Nombres</th>
                                            <th>Nro CI</th>
                                            <th>Nro Cel</th>
                                            <th class="text-center rounded-end">Opciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <!-- Datos de prueba para que veas cómo queda -->
                                        <tr>
                                            <td class="fw-bold">#1</td>
                                            <td>
                                                <div class="d-flex align-items-center">
                                                    <div class="avatar-xs me-2">
                                                        <span class="avatar-title bg-primary-subtle text-primary rounded-circle fs-13">JC</span>
                                                    </div>
                                                    <span class="fw-medium">Juan Carlos Pinto</span>
                                                </div>
                                            </td>
                                            <td>8475923 SC</td>
                                            <td><i class="ti ti-phone text-success me-1"></i>77412589</td>
                                            <td class="text-center">
                                                <!-- Botones de acción más limpios -->
                                                <button class="btn btn-sm btn-soft-info btn-icon"><i class="ti ti-pencil"></i></button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <!-- TAB BUSES -->
                        <div class="tab-pane" id="profile-ct">
                            <!-- EL NUEVO ACTION TOOLBAR PARA BUSES -->
                            <div class="d-flex flex-wrap justify-content-between align-items-center mb-3 pb-3 border-bottom">
                                <div>
                                    <h5 class="mb-0 text-dark">Inventario de Buses</h5>
                                    <p class="text-muted fs-13 mb-0">Control de unidades y capacidad de asientos.</p>
                                </div>
                                <div>
                                    <button type="button" id="btnNuevoBus" class="btn btn-dark rounded-pill shadow-sm fw-medium px-3">
                                        <i class="ti ti-bus fs-18 align-middle me-1"></i>Registrar Bus
                                    </button>
                                </div>
                            </div>

                            <div class="table-responsive">
                                <table class="table table-hover table-borderless align-middle table-nowrap" id="tbBuses" style="width: 100%">
                                    <thead class="table-light">
                                        <tr>
                                            <th class="rounded-start">Id</th>
                                            <th>Nro Placa</th>
                                            <th>Tipo Bus</th>
                                            <th>Nro Asi</th>
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
        </div>
    </div>

    <div id="modalChofer" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="modalLabelchofer" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalLabelchofer">Chofer</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="input-group input-group-sm mb-2">
                        <div class="input-group-text">Nombre Completo</div>
                        <input type="text" class="form-control" id="txtNombreChofer" placeholder="Nombre Completo">
                    </div>

                    <div class="row">
                        <div class="mb-1 col-md-6">
                            <label for="txtNroLicencia" class="col-form-label col-form-label-sm">Nro Licencia</label>
                            <input type="text" id="txtNroLicencia" name="Nro Licencia" class="form-control form-control-sm">
                        </div>
                        <div class="mb-1 col-md-6">
                            <label for="txtTipoSangre" class="col-form-label col-form-label-sm">Tipo Sangre</label>
                            <input type="text" id="txtTipoSangre" name="Tipo de sangre" class="form-control form-control-sm">
                        </div>
                    </div>

                    <div class="row">
                        <div class="mb-1 col-md-6">
                            <label for="txtNroCi" class="col-form-label col-form-label-sm">Nro CI</label>
                            <input type="text" id="txtNroCi" class="form-control form-control-sm">
                        </div>
                        <div class="mb-1 col-md-6">
                            <label for="txtNroCel" class="col-form-label col-form-label-sm">Nro Cel</label>
                            <input type="number" id="txtNroCel" class="form-control form-control-sm">
                        </div>
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-sm btn-secondary" data-bs-dismiss="modal"><i class="ti ti-square-rounded-x fs-16 align-middle me-1"></i>Salir</button>
                    <button type="button" id="btnGuardarChofer" class="btn btn-sm btn-success"><i class="ti ti-device-floppy fs-16 align-middle me-1"></i>Guardar</button>
                </div>
            </div>
        </div>
    </div>

    <div id="modalBus" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="modalLabelbus" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalLabelbus">Bus</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">

                    <div class="row">
                        <div class="mb-3 col-md-5">
                            <div class="input-group input-group-sm">
                                <div class="input-group-text">Placa</div>
                                <input type="text" class="form-control" id="txtNroPlaca" placeholder="Nro placa">
                            </div>
                        </div>
                        <div class="mb-3 col-md-7">
                            <div class="input-group input-group-sm">
                                <span class="input-group-text" id="addon-tipobus">
                                    <i class="ti ti-car-4wd"></i>Tipo
                                </span>
                                <select class="form-select" id="cboTipobus" aria-describedby="addon-tipobus">
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="mb-3 col-md-5">
                            <div class="input-group input-group-sm">
                                <span class="input-group-text" id="groupnrosilla"><i class="ti ti-armchair"></i> Asientos</span>
                                <input type="text" class="form-control" id="txtNroAsiento" aria-label="NroAsiento"
                                    aria-describedby="groupnrosilla">
                            </div>
                        </div>
                        <div class="mb-3 col-md-7">
                            <select id="cboBuscarChofer" class="form-control form-control-sm select2" style="width: 100%;">
                                <option value="">Buscar Chofer...</option>
                            </select>
                        </div>
                    </div>

                    <div class="row">
                        <div class="mb-2 col-md-8">
                            <div class="input-group input-group-sm">
                                <div class="input-group-text">Chofer</div>
                                <input type="text" class="form-control" id="txtChoferSelec" readonly>
                            </div>
                        </div>
                        <div class="mb-2 col-md-4">
                            <div class="input-group input-group-sm">
                                <div class="input-group-text">CI</div>
                                <input type="text" class="form-control" id="txtCiChoferSelec" readonly>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-sm btn-secondary" data-bs-dismiss="modal"><i class="ti ti-square-rounded-x fs-16 align-middle me-1"></i>Salir</button>
                    <button type="button" id="btnGuardarBus" class="btn btn-sm btn-success"><i class="ti ti-device-floppy fs-16 align-middle me-1"></i>Guardar</button>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="js/Conductores.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
</asp:Content>
