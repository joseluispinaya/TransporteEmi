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
    public partial class Conductores : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static Respuesta<List<ETipoBus>> ListaTipoBuses()
        {
            return NBuses.GetInstance().ListaTipoBuses();
        }

        [WebMethod]
        public static Respuesta<List<EChofer>> ListaChoferes()
        {
            return NBuses.GetInstance().ListaChoferes();
        }

        [WebMethod]
        public static Respuesta<int> GuardarOrEditChoferes(EChofer objeto)
        {
            return NBuses.GetInstance().GuardarOrEditChoferes(objeto);
        }

        [WebMethod]
        public static Respuesta<List<EChofer>> FiltroChoferes(string busqueda)
        {
            return NBuses.GetInstance().FiltroChoferes(busqueda);
        }

        [WebMethod]
        public static Respuesta<List<BusesDTO>> ListaBuses()
        {
            return NBuses.GetInstance().ListaBuses();
        }

        [WebMethod]
        public static Respuesta<int> GuardarOrEditBuses(EBuses objeto)
        {
            return NBuses.GetInstance().GuardarOrEditBuses(objeto);
        }

    }
}