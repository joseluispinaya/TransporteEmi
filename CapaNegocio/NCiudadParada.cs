using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDatos;
using CapaEntidad.Entidades;
using CapaEntidad.Responses;

namespace CapaNegocio
{
    public class NCiudadParada
    {
        #region "PATRON SINGLETON"
        private static NCiudadParada instancia = null;
        private NCiudadParada() { }
        public static NCiudadParada GetInstance()
        {
            if (instancia == null)
            {
                instancia = new NCiudadParada();
            }
            return instancia;
        }
        #endregion
        public Respuesta<int> GuardarOrEditCiudadParada(ECiudadParada objeto)
        {
            return DCiudadParada.GetInstance().GuardarOrEditCiudadParada(objeto);
        }

        public Respuesta<List<ECiudadParada>> ListaCiudadesParada()
        {
            return DCiudadParada.GetInstance().ListaCiudadesParada();
        }

        // rutas

        public Respuesta<int> GuardarOrEditRutas(ERuta objeto)
        {
            return DCiudadParada.GetInstance().GuardarOrEditRutas(objeto);
        }

        public Respuesta<List<ERuta>> ListaRutas()
        {
            return DCiudadParada.GetInstance().ListaRutas();
        }

        // el metodo de lista RUTAS_PARADAS el de la magia

        public Respuesta<List<ERutasParadas>> ListaRutasParadasRP(int IdRuta)
        {
            return DCiudadParada.GetInstance().ListaRutasParadasRP(IdRuta);
        }

        public Respuesta<int> GuardarOrEditRutasParadasRP(ERutasParadas objeto)
        {
            return DCiudadParada.GetInstance().GuardarOrEditRutasParadasRP(objeto);
        }

        public Respuesta<int> EliminarRutaParadaRP(int IdRutaParada)
        {
            return DCiudadParada.GetInstance().EliminarRutaParadaRP(IdRutaParada);
        }

    }
}
