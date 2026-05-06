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
    public partial class VentaPasajes : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static Respuesta<List<AsientosViajeDTO>> ObtenerAsientosVendidos(int IdViaje)
        {
            return NViajes.GetInstance().ObtenerAsientosVendidos(IdViaje);
        }

        [WebMethod]
        public static Respuesta<List<ViajesDTO>> ListaViajesVentas()
        {
            return NViajes.GetInstance().ListaViajesVentas();
        }

        [WebMethod]
        public static Respuesta<TarifarioDTO> ConsultarTarifario(int IdDestino, int IdTipoBus)
        {
            // Simulación: El IdOrigen lo obtendré del usuario logueado
            int IdOrigen = 1;

            // VALIDACIÓN CLAVE: Origen y Destino no pueden ser el mismo
            if (IdOrigen == IdDestino)
            {
                return new Respuesta<TarifarioDTO>
                {
                    Estado = false,
                    Valor = "MISMO_DESTINO", // Usamos tu propiedad Valor como "Código de Error"
                    Mensaje = "El pasajero no puede viajar a la misma ciudad donde se encuentra."
                };
            }

            // Si pasa la validación, consultamos a la base de datos
            return NViajes.GetInstance().ConsultarTarifario(IdOrigen, IdDestino, IdTipoBus);
        }
    }
}