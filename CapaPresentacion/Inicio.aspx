<%@ Page Title="" Language="C#" MasterPageFile="~/PageMaster.Master" AutoEventWireup="true" CodeBehind="Inicio.aspx.cs" Inherits="CapaPresentacion.Inicio" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">

    <div class="row">
        <div class="col-lg-4 text-center">
            <div class="card">
                <div class="card-body">
                    <h5 class="text-muted fs-13 text-uppercase" title="Number of Orders">Total Orders</h5>
                    <div class="d-flex align-items-center justify-content-center gap-2 py-1">
                        <div class="user-img fs-42 flex-shrink-0">
                            <span class="avatar-title text-bg-primary rounded-circle fs-22">
                                <iconify-icon icon="solar:case-round-minimalistic-bold-duotone"></iconify-icon>
                            </span>
                        </div>
                        <h3 class="mb-0 fw-bold">687.3k</h3>
                    </div>
                    <%--<p class="mb-0 text-muted">
                        <span class="text-danger me-2"><i class="ti ti-caret-down-filled"></i>9.19%</span>
                        <span class="text-nowrap">Since last month</span>
                    </p>--%>
                </div>
            </div>

            <div class="card">
                <div class="card-body">
                    <h5 class="text-muted fs-13 text-uppercase" title="Number of Orders">Total Returns</h5>
                    <div class="d-flex align-items-center justify-content-center gap-2 py-1">
                        <div class="user-img fs-42 flex-shrink-0">
                            <span class="avatar-title text-bg-primary rounded-circle fs-22">
                                <iconify-icon icon="solar:bill-list-bold-duotone"></iconify-icon>
                            </span>
                        </div>
                        <h3 class="mb-0 fw-bold">9.62k</h3>
                    </div>
                    <%--<p class="mb-0 text-muted">
                        <span class="text-success me-2"><i class="ti ti-caret-up-filled"></i>26.87%</span>
                        <span class="text-nowrap">Since last month</span>
                    </p>--%>
                </div>
            </div>

            <div class="card">
                <div class="card-body">
                    <h5 class="text-muted fs-13 text-uppercase" title="Number of Orders">Avg. Sales Earnings</h5>
                    <div class="d-flex align-items-center justify-content-center gap-2 py-1">
                        <div class="user-img fs-42 flex-shrink-0">
                            <span class="avatar-title text-bg-primary rounded-circle fs-22">
                                <iconify-icon icon="solar:wallet-money-bold-duotone"></iconify-icon>
                            </span>
                        </div>
                        <h3 class="mb-0 fw-bold">$98.24 <small class="text-muted">USD</small></h3>
                    </div>
                </div>
            </div>

        </div>
        <div class="col-lg-8">
            <div class="card">

                <div class="card-body">

                    <div id="carouselExampleFade" class="carousel slide carousel-fade" data-bs-ride="carousel">
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <img class="d-block img-fluid" src="assets/images/small/small-02.jpg" alt="First slide">
                            </div>
                            <div class="carousel-item">
                                <img class="d-block img-fluid" src="assets/images/small/small-03.jpg" alt="Second slide">
                            </div>
                            <div class="carousel-item">
                                <img class="d-block img-fluid" src="assets/images/small/small-04.jpg" alt="Third slide">
                            </div>
                        </div>
                        <a class="carousel-control-prev" href="#carouselExampleFade" role="button" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </a>
                        <a class="carousel-control-next" href="#carouselExampleFade" role="button" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <%--<div class="row text-center">
        <div class="col-md-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="text-muted fs-13 text-uppercase" title="Number of Orders">Total Orders</h5>
                    <div class="d-flex align-items-center justify-content-center gap-2 my-2 py-1">
                        <div class="user-img fs-42 flex-shrink-0">
                            <span class="avatar-title text-bg-primary rounded-circle fs-22">
                                <iconify-icon icon="solar:case-round-minimalistic-bold-duotone"></iconify-icon>
                            </span>
                        </div>
                        <h3 class="mb-0 fw-bold">687.3k</h3>
                    </div>
                    <p class="mb-0 text-muted">
                        <span class="text-danger me-2"><i class="ti ti-caret-down-filled"></i>9.19%</span>
                        <span class="text-nowrap">Since last month</span>
                    </p>
                </div>
            </div>
        </div>

        <div class="col-md-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="text-muted fs-13 text-uppercase" title="Number of Orders">Total Returns</h5>
                    <div class="d-flex align-items-center justify-content-center gap-2 my-2 py-1">
                        <div class="user-img fs-42 flex-shrink-0">
                            <span class="avatar-title text-bg-primary rounded-circle fs-22">
                                <iconify-icon icon="solar:bill-list-bold-duotone"></iconify-icon>
                            </span>
                        </div>
                        <h3 class="mb-0 fw-bold">9.62k</h3>
                    </div>
                    <p class="mb-0 text-muted">
                        <span class="text-success me-2"><i class="ti ti-caret-up-filled"></i>26.87%</span>
                        <span class="text-nowrap">Since last month</span>
                    </p>
                </div>
            </div>
        </div>

        <div class="col-md-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="text-muted fs-13 text-uppercase" title="Number of Orders">Avg. Sales Earnings</h5>
                    <div class="d-flex align-items-center justify-content-center gap-2 my-2 py-1">
                        <div class="user-img fs-42 flex-shrink-0">
                            <span class="avatar-title text-bg-primary rounded-circle fs-22">
                                <iconify-icon icon="solar:wallet-money-bold-duotone"></iconify-icon>
                            </span>
                        </div>
                        <h3 class="mb-0 fw-bold">$98.24 <small class="text-muted">USD</small></h3>
                    </div>
                    <p class="mb-0 text-muted">
                        <span class="text-success me-2"><i class="ti ti-caret-up-filled"></i>3.51%</span>
                        <span class="text-nowrap">Since last month</span>
                    </p>
                </div>
            </div>
        </div>
    </div>--%>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
</asp:Content>
