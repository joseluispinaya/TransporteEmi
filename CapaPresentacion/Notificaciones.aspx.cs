using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;
using CapaEntidad.Responses;

namespace CapaPresentacion
{
    public partial class Notificaciones : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static Respuesta<bool> EnvioNotificacionPrueba(int IdViaje, string Titulo, string Mensaje)
        {
            if (string.IsNullOrEmpty(Titulo) || string.IsNullOrEmpty(Mensaje))
            {
                return new Respuesta<bool>
                {
                    Estado = false,
                    Valor = "warning",
                    Mensaje = "Ingrese los parámetros requeridos (Token, Título y Mensaje)."
                };
            }

            if (IdViaje <= 0)
            {
                return new Respuesta<bool>
                {
                    Estado = false,
                    Valor = "warning",
                    Mensaje = "No se encontro el identificador del viaje."
                };
            }

            System.Threading.Thread.Sleep(2000);

            // 2. Creamos la respuesta
            Respuesta<bool> response = new Respuesta<bool>
            {
                Estado = true,
                Valor = "success",
                Mensaje = "El Mensaje se envio correctamente. (Prueba Simulada)",
                Data = true
            };

            return response;
        }
    }
}