using CapaDatos;
using CapaEntidad.DTOs;
using CapaEntidad.Entidades;
using CapaEntidad.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaNegocio
{
    public class NBuses
    {
        #region "PATRON SINGLETON"
        private static NBuses instancia = null;
        private NBuses() { }
        public static NBuses GetInstance()
        {
            if (instancia == null)
            {
                instancia = new NBuses();
            }
            return instancia;
        }
        #endregion
        public Respuesta<int> GuardarOrEditTipoBuses(ETipoBus objeto)
        {
            return DBuses.GetInstance().GuardarOrEditTipoBuses(objeto);
        }

        public Respuesta<List<ETipoBus>> ListaTipoBuses()
        {
            return DBuses.GetInstance().ListaTipoBuses();
        }

        // choferes

        public Respuesta<List<EChofer>> ListaChoferes()
        {
            return DBuses.GetInstance().ListaChoferes();
        }

        public Respuesta<int> GuardarOrEditChoferes(EChofer objeto)
        {
            return DBuses.GetInstance().GuardarOrEditChoferes(objeto);
        }
        public Respuesta<List<EChofer>> FiltroChoferes(string Busqueda)
        {
            return DBuses.GetInstance().FiltroChoferes(Busqueda);
        }

        // buses
        public Respuesta<List<BusesDTO>> ListaBuses()
        {
            return DBuses.GetInstance().ListaBuses();
        }

        public Respuesta<int> GuardarOrEditBuses(EBuses objeto)
        {
            return DBuses.GetInstance().GuardarOrEditBuses(objeto);
        }

    }
}
