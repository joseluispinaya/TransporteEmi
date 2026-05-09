<%@ Page Title="" Language="C#" MasterPageFile="~/PageMaster.Master" AutoEventWireup="true" CodeBehind="Usuarios.aspx.cs" Inherits="CapaPresentacion.Usuarios" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="assets/vendor/datatables/dataTables.bootstrap4.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/vendor/datatables/extensiones/css/responsive.dataTables.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/vendor/datatables/extensiones/css/buttons.dataTables.min.css" rel="stylesheet" type="text/css" />
    <style>
        .usuario-perfil {
            width: 135px;
            height: 135px;
            object-fit: cover; /* Evita que la imagen se estire o aplaste */
            object-position: center; /* Asegura que se vea el centro de la foto */
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <%--<div class="d-flex card-header justify-content-between align-items-center border-bottom border-dashed">
                    <h4 class="header-title">Registro de Usuarios</h4>
                </div>--%>

                <div class="card-body">

                    <!-- <div class="row">
                    <div class="col-md-12 mb-3">
                        <div class="d-flex flex-wrap gap-2">
                            <button type="button" id="btnToast" class="btn btn-success">ToastMaster</button>
                            <button type="button" id="btnZero" class="btn btn-outline-info">AlertaZero</button>
                            <button type="button" id="btnTimer" class="btn btn-warning rounded-pill">AlertaTimer</button>
                            <button type="button" id="btnTimerNew" class="btn btn-outline-danger rounded-pill">AlertaTimerNew</button>
                            <button type="button" id="btnContador" class="btn btn-success bg-gradient">TimerConContador</button>
                            <button type="button" id="btnConfirma" class="btn btn-info btn-sm">Confirmacion</button>
                        </div>
                    </div>
                </div> -->

                    <div class="d-flex flex-wrap justify-content-between align-items-center mb-3 pb-3 border-bottom">
                        <div>
                            <h5 class="mb-0 text-dark">Lista de usuarios registrados</h5>
                            <p class="text-muted fs-13 mb-0">Administra los usuarios del sistema.</p>
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
                                    <th>Usuario</th>
                                    <th>Documento & Contacto</th>
                                    <th>Rol & Sucursal</th>
                                    <th>Estado</th>
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
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="modalLabeldetalle">Usuarios</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-7">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="mb-2">
                                        <label for="txtNombrees" class="form-label">Nombres</label>
                                        <input type="text" id="txtNombrees" name="Nombre" class="form-control form-control-sm model">
                                    </div>
                                    <div class="mb-2">
                                        <label for="txtCorreo" class="form-label">Correo</label>
                                        <input type="text" id="txtCorreo" name="Correo" class="form-control form-control-sm model">
                                    </div>
                                    <div class="mb-2">
                                        <label for="txtNroci" class="form-label">Nro C.I.</label>
                                        <input type="text" id="txtNroci" name="Nro CI" class="form-control form-control-sm model">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="mb-2">
                                        <label for="txtApellidos" class="form-label">Apellidos</label>
                                        <input type="text" id="txtApellidos" name="Apellidos" class="form-control form-control-sm model">
                                    </div>
                                    <div class="mb-2">
                                        <label for="txtCelular" class="form-label">Celular</label>
                                        <input type="number" id="txtCelular" name="Celular" class="form-control form-control-sm model">
                                    </div>
                                    <div class="mb-2">
                                        <label for="cboOficinaModal" class="form-label">Oficina</label>
                                        <select class="form-select form-select-sm" id="cboOficinaModal">
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="mb-1">
                                <label for="txtFoto" class="form-label">Seleccione imagen</label>
                                <input type="file" id="txtFoto" class="form-control form-control-sm" accept="image/*">
                            </div>
                        </div>
                        <div class="col-md-5">
                            <div class="row">
                                <div class="mb-2 col-md-6">
                                    <label for="cboRoles" class="form-label">Rol</label>
                                    <select class="form-select form-select-sm" id="cboRoles">
                                    </select>
                                </div>
                                <div class="mb-2 col-md-6">
                                    <label for="cboEstado" class="form-label">Estado</label>
                                    <select class="form-select form-select-sm" id="cboEstado">
                                        <option value="1">Activo</option>
                                        <option value="0">Inactivo</option>
                                    </select>
                                </div>
                            </div>
                            <h5 class="text-dark fw-medium text-center mt-2">Foto seleccionada</h5>
                            <div class="text-center mt-3 mb-1">
                                <img src="Imagenes/sinImagen.png" id="imgUsureg" alt="image" class="img-fluid rounded-circle usuario-perfil" />
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
    <script src="assets/vendor/datatables/jquery.dataTables.min.js"></script>
    <script src="assets/vendor/datatables/dataTables.bootstrap4.min.js"></script>

    <script src="assets/vendor/datatables/extensiones/js/dataTables.responsive.min.js"></script>

    <script src="assets/vendor/datatables/extensiones/js/dataTables.buttons.min.js"></script>
    <script src="assets/vendor/datatables/extensiones/js/jszip.min.js"></script>
    <script src="assets/vendor/datatables/extensiones/js/buttons.html5.min.js"></script>
    <script src="assets/vendor/datatables/extensiones/js/buttons.print.min.js"></script>

    <script src="js/UsuariosPage.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
</asp:Content>
