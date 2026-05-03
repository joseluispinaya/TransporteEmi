using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using CapaEntidad.Entidades;
using CapaEntidad.Responses;
using CapaNegocio;
using System.Web.Services;

namespace CapaPresentacion
{
    public partial class TerminalParada : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static Respuesta<List<ECiudadParada>> ListaCiudadesParada()
        {
            return NCiudadParada.GetInstance().ListaCiudadesParada();
        }

        [WebMethod]
        public static Respuesta<int> GuardarOrEditCiudadParada(ECiudadParada objeto)
        {
            return NCiudadParada.GetInstance().GuardarOrEditCiudadParada(objeto);
        }

        // rutas

        [WebMethod]
        public static Respuesta<List<ERuta>> ListaRutas()
        {
            return NCiudadParada.GetInstance().ListaRutas();
        }

        [WebMethod]
        public static Respuesta<int> GuardarOrEditRutas(ERuta objeto)
        {
            return NCiudadParada.GetInstance().GuardarOrEditRutas(objeto);
        }

        // RUTAS PARADAS
        [WebMethod]
        public static Respuesta<List<ERutasParadas>> ListaRutasParadasRP(int IdRuta)
        {
            return NCiudadParada.GetInstance().ListaRutasParadasRP(IdRuta);
        }

        [WebMethod]
        public static Respuesta<int> GuardarOrEditRutasParadasRP(ERutasParadas objeto)
        {
            return NCiudadParada.GetInstance().GuardarOrEditRutasParadasRP(objeto);
        }

        [WebMethod]
        public static Respuesta<int> EliminarRutaParadaRP(int IdRutaParada)
        {
            return NCiudadParada.GetInstance().EliminarRutaParadaRP(IdRutaParada);
        }

        [WebMethod]
        public static Respuesta<int> EliminarRutaParadaRPrueba(int IdRutaParada)
        {
            System.Threading.Thread.Sleep(2000);

            // 2. Creamos la respuesta
            Respuesta<int> response = new Respuesta<int>
            {
                Estado = true,
                Valor = "success",
                Mensaje = "Eliminado correctamente. (Prueba Simulada)",
                Data = 2
            };

            return response;
        }
    }
}