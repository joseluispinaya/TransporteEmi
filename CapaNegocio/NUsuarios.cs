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
    public class NUsuarios
    {
        #region "PATRON SINGLETON"
        private static NUsuarios instancia = null;
        private NUsuarios() { }
        public static NUsuarios GetInstance()
        {
            if (instancia == null)
            {
                instancia = new NUsuarios();
            }
            return instancia;
        }
        #endregion

        public Respuesta<List<UsuarioDTO>> ListaUsuariosPaginado(int Omitir, int TamanoPagina, string Buscar)
        {
            return DUsuario.GetInstance().ListaUsuariosPaginado(Omitir, TamanoPagina, Buscar);
        }

        public Respuesta<int> GuardarOrEditUsuarios(EUsuarios objeto)
        {
            return DUsuario.GetInstance().GuardarOrEditUsuarios(objeto);
        }

        public Respuesta<List<ERol>> ListaRoles()
        {
            return DUsuario.GetInstance().ListaRoles();
        }

        public Respuesta<EUsuarios> LoginUsuario(string Correo)
        {
            return DUsuario.GetInstance().LoginUsuario(Correo);
        }

    }
}
