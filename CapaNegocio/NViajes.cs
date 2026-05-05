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
    public class NViajes
    {
        #region "PATRON SINGLETON"
        private static NViajes instancia = null;
        private NViajes() { }
        public static NViajes GetInstance()
        {
            if (instancia == null)
            {
                instancia = new NViajes();
            }
            return instancia;
        }
        #endregion
        public Respuesta<int> GuardarOrEditViajesProgramados(EViaje objeto, DateTime FechaSalida, TimeSpan HoraSalida)
        {
            return DViajes.GetInstance().GuardarOrEditViajesProgramados(objeto, FechaSalida, HoraSalida);
        }
        public Respuesta<List<ViajesDTO>> ListaViajesProgramadas()
        {
            return DViajes.GetInstance().ListaViajesProgramadas();
        }
    }
}
