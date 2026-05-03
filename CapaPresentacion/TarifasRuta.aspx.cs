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
    public partial class TarifasRuta : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static Respuesta<List<TarifasDTO>> ListaTarifas()
        {
            return NTarifas.GetInstance().ListaTarifas();
        }

        [WebMethod]
        public static Respuesta<int> GuardarOrEditTarifarios(TarifasDTO objeto)
        {
            return NTarifas.GetInstance().GuardarOrEditTarifarios(objeto);
        }


    }
}