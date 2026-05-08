using CapaEntidad.DTOs;
using CapaEntidad.Entidades;
using CapaEntidad.Responses;
using CapaNegocio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace CapaPresentacion
{
    public partial class ConsultasPasajes : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static Respuesta<List<ViajesDTO>> ListaViajesDetalles(int IdRuta, int Estado)
        {
            return NVentaPasajes.GetInstance().ListaViajesDetalles(IdRuta, Estado);
        }

        [WebMethod]
        public static Respuesta<List<PasajeroViajeDTO>> ListaPasajerosViaje(int IdViaje)
        {
            return NVentaPasajes.GetInstance().ListaPasajerosViaje(IdViaje);
        }

        [WebMethod]
        public static Respuesta<int> PagarReserva(int IdBoleto)
        {
            return NVentaPasajes.GetInstance().PagarReserva(IdBoleto);
        }

        [WebMethod]
        public static Respuesta<int> EliminarReserva(int IdBoleto)
        {
            return NVentaPasajes.GetInstance().EliminarReserva(IdBoleto);
        }

        [WebMethod]
        public static Respuesta<int> PagarReservaPrueba(int IdBoleto)
        {
            System.Threading.Thread.Sleep(2000);

            // 2. Creamos la respuesta
            Respuesta<int> response = new Respuesta<int>
            {
                Estado = true,
                Valor = "success",
                Mensaje = "Reserva Pagada correctamente. (Prueba Simulada)",
                Data = 2
            };

            return response;
        }
    }
}