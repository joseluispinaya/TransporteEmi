using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace CapaPresentacion
{
    public partial class PageMaster : System.Web.UI.MasterPage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            Response.AppendHeader("Cache-Control", "no-store, no-cache, must-revalidate");
            Response.AppendHeader("Pragma", "no-cache");
            Response.AppendHeader("Expires", "0");
            // 1. AUTENTICACIÓN Validar que exista sesión
            if (Session["UsuarioLogueado"] == null || Session["TipoUsuario"] == null)
            {
                Response.Redirect("~/Login.aspx");
                return;
            }

            // AUTORIZACIÓN: ¿Este usuario tiene permiso para estar en esta Master Page?
            //if (Session["TipoUsuario"].ToString() != "UsuarioRegular")
            //{
            //    Session.Clear();
            //    Session.Abandon();
            //    Response.Redirect("~/Login.aspx");
            //    return;
            //}
        }
    }
}