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

        [WebMethod(EnableSession = true)]
        public static Respuesta<TarifarioDTO> ConsultarTarifario(int IdDestino, int IdTipoBus)
        {
            // 1. Validar Sesión
            if (HttpContext.Current.Session["UsuarioLogueado"] == null)
            {
                return new Respuesta<TarifarioDTO> { Estado = false, Valor = "SIN_SESION", Mensaje = "Su sesión ha expirado. Recargue la página." };
            }

            try
            {
                // Obtener el IdCiudad de la sesión (Seguro)
                EUsuarios usuari = (EUsuarios)HttpContext.Current.Session["UsuarioLogueado"];

                // VALIDACIÓN CLAVE: Origen y Destino no pueden ser el mismo
                if (usuari.IdCiudad == IdDestino)
                {
                    return new Respuesta<TarifarioDTO>
                    {
                        Estado = false,
                        Valor = "MISMO_DESTINO", // Usamos tu propiedad Valor como "Código de Error"
                        Mensaje = "El pasajero no puede viajar a la misma ciudad donde se encuentra."
                    };
                }

                return NViajes.GetInstance().ConsultarTarifario(usuari.IdCiudad, IdDestino, IdTipoBus);
            }
            catch (Exception ex)
            {
                // Captura cualquier error no previsto en la capa de presentación
                return new Respuesta<TarifarioDTO> { Estado = false, Mensaje = "Ocurrió un error inesperado: " + ex.Message };
            }
        }

        [WebMethod(EnableSession = true)]
        public static Respuesta<int> RegistrarPasaje(BoletoDTO objeto)
        {
            // 1. Validar Sesión
            if (HttpContext.Current.Session["UsuarioLogueado"] == null)
            {
                return new Respuesta<int> { Estado = false, Valor = "SIN_SESION", Mensaje = "Su sesión ha expirado. Recargue la página.", Data = 0 };
            }

            try
            {
                EUsuarios usuarioLogueado = (EUsuarios)HttpContext.Current.Session["UsuarioLogueado"];

                // Sacamos la ciudad de forma segura de la sesión
                int idOrigen = usuarioLogueado.IdCiudad;

                // Mandamos a la capa de datos
                return NVentaPasajes.GetInstance().RegistrarBoleto(objeto, idOrigen);
            }
            catch (Exception ex)
            {
                return new Respuesta<int> { Estado = false, Mensaje = ex.Message, Data = 0 };
            }
        }

        [WebMethod]
        public static Respuesta<int> RegistrarPasajePrueba(BoletoDTO objeto)
        {
            // Simulación: El IdOrigen lo obtendré del usuario logueado
            int IdOrigen = 1;

            // Mandamos a la capa de datos
            return NVentaPasajes.GetInstance().RegistrarBoleto(objeto, IdOrigen);
        }

        [WebMethod]
        public static Respuesta<BoletoImpresionDTO> ObtenerDetalleBoletoImpresion(int IdBoleto)
        {
            return NVentaPasajes.GetInstance().ObtenerDetalleBoletoImpresion(IdBoleto);
        }

    }
}