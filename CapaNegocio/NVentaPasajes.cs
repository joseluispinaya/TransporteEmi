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
    public class NVentaPasajes
    {
        #region "PATRON SINGLETON"
        private static NVentaPasajes instancia = null;
        private NVentaPasajes() { }
        public static NVentaPasajes GetInstance()
        {
            if (instancia == null)
            {
                instancia = new NVentaPasajes();
            }
            return instancia;
        }
        #endregion

        public Respuesta<int> RegistrarBoleto(BoletoDTO obj, int idOrigen)
        {
            return DVentaPasajes.GetInstance().RegistrarBoleto(obj, idOrigen);
        }

        public Respuesta<BoletoImpresionDTO> ObtenerDetalleBoletoImpresion(int idBoleto)
        {
            return DVentaPasajes.GetInstance().ObtenerDetalleBoletoImpresion(idBoleto);
        }

        public Respuesta<List<ViajesDTO>> ListaViajesDetalles(int IdRuta, int Estado)
        {
            return DVentaPasajes.GetInstance().ListaViajesDetalles(IdRuta, Estado);
        }

        public Respuesta<List<PasajeroViajeDTO>> ListaPasajerosViaje(int IdViaje)
        {
            return DVentaPasajes.GetInstance().ListaPasajerosViaje(IdViaje);
        }

        public Respuesta<int> PagarReserva(int IdBoleto)
        {
            return DVentaPasajes.GetInstance().PagarReserva(IdBoleto);
        }

        public Respuesta<int> EliminarReserva(int IdBoleto)
        {
            return DVentaPasajes.GetInstance().EliminarReserva(IdBoleto);
        }

    }
}
