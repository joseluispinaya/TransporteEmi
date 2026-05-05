using CapaEntidad.DTOs;
using CapaEntidad.Entidades;
using CapaEntidad.Responses;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaDatos
{
    public class DViajes
    {
        #region "PATRON SINGLETON"
        private static DViajes instancia = null;
        private DViajes() { }
        public static DViajes GetInstance()
        {
            if (instancia == null)
            {
                instancia = new DViajes();
            }
            return instancia;
        }
        #endregion

        public Respuesta<int> GuardarOrEditViajesProgramados(EViaje objeto, DateTime FechaSalida, TimeSpan HoraSalida)
        {
            Respuesta<int> response = new Respuesta<int>();
            int resultadoCodigo = 0;

            try
            {
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_GuardarOrEditViaje", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@IdViaje", objeto.IdViaje);
                        cmd.Parameters.AddWithValue("@IdRuta", objeto.IdRuta);
                        cmd.Parameters.AddWithValue("@IdBus", objeto.IdBus);

                        cmd.Parameters.AddWithValue("@FechaSalida", FechaSalida);
                        cmd.Parameters.AddWithValue("@HoraSalida", HoraSalida);

                        SqlParameter outputParam = new SqlParameter("@Resultado", SqlDbType.Int)
                        {
                            Direction = ParameterDirection.Output
                        };
                        cmd.Parameters.Add(outputParam);

                        con.Open();
                        cmd.ExecuteNonQuery();

                        resultadoCodigo = Convert.ToInt32(outputParam.Value);
                    }
                }

                response.Data = resultadoCodigo;

                switch (resultadoCodigo)
                {
                    case 2: // Registro Nuevo
                        response.Estado = true;
                        response.Valor = "success";
                        response.Mensaje = "Registrado correctamente.";
                        break;

                    case 3: // Actualización
                        response.Estado = true;
                        response.Valor = "success";
                        response.Mensaje = "Actualizado correctamente.";
                        break;

                    case 4: // El mismo Bus ya tiene otro viaje
                        response.Estado = false;
                        response.Valor = "warning";
                        response.Mensaje = "Error El Bus ya tiene un viaje programado para esa fecha.";
                        break;

                    case 5: // Fechas pasadas
                        response.Estado = false;
                        response.Valor = "warning";
                        response.Mensaje = "Error No se pueden programar viajes en fechas pasadas.";
                        break;

                    case 0: // Error
                    default:
                        response.Estado = false;
                        response.Valor = "error";
                        response.Mensaje = "No se pudo completar la operación.";
                        break;
                }
            }
            catch (Exception ex)
            {
                //response.Data = 0;
                response.Estado = false;
                response.Valor = "error";
                response.Mensaje = "Error interno: " + ex.Message;
            }

            return response;
        }

        public Respuesta<List<ViajesDTO>> ListaViajesProgramadas()
        {
            try
            {
                List<ViajesDTO> rptLista = new List<ViajesDTO>();
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ListarViajes", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();
                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new ViajesDTO
                                {
                                    IdViaje = Convert.ToInt32(dr["IdViaje"]),
                                    IdRuta = Convert.ToInt32(dr["IdRuta"]),
                                    NombreRuta = dr["NombreRuta"].ToString(),
                                    IdBus = Convert.ToInt32(dr["IdBus"]),
                                    PlacaBus = dr["PlacaBus"].ToString(),
                                    TipoBus = dr["TipoBus"].ToString(),
                                    CapacidadAsientos = Convert.ToInt32(dr["CapacidadAsientos"]),
                                    FechaSalidaStr = Convert.ToDateTime(dr["FechaSalida"]).ToString("dd/MM/yyyy"),
                                    HoraSalidaStr = ((TimeSpan)dr["HoraSalida"]).ToString(@"hh\:mm"),
                                    // v.HoraSalidaStr = ((TimeSpan)dr["HoraSalida"]).ToString(@"hh\:mm");
                                    Estado = Convert.ToInt32(dr["Estado"]),
                                    EstadoTexto = dr["EstadoTexto"].ToString()
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<ViajesDTO>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "Lista obtenida correctamente"
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<List<ViajesDTO>>()
                {
                    Estado = false,
                    Data = null,
                    Mensaje = $"Error al obtener la lista: {ex.Message}"
                };
            }
        }

    }
}
