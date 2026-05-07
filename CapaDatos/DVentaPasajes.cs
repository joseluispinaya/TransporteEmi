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
    public class DVentaPasajes
    {
        #region "PATRON SINGLETON"
        private static DVentaPasajes instancia = null;
        private DVentaPasajes() { }
        public static DVentaPasajes GetInstance()
        {
            if (instancia == null)
            {
                instancia = new DVentaPasajes();
            }
            return instancia;
        }
        #endregion

        public Respuesta<int> RegistrarBoleto(BoletoDTO obj, int idOrigen)
        {
            try
            {
                int idGenerado = 0;

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_RegistrarBoleto", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;

                        comando.Parameters.AddWithValue("@IdViaje", obj.IdViaje);
                        comando.Parameters.AddWithValue("@IdOrigen", idOrigen);
                        comando.Parameters.AddWithValue("@IdDestino", obj.IdDestino);
                        comando.Parameters.AddWithValue("@IdPasajero", obj.IdPasajero);
                        comando.Parameters.AddWithValue("@LlevaMenorEdad", obj.LlevaMenorEdad);
                        comando.Parameters.AddWithValue("@NroAsiento", obj.NroAsiento);
                        comando.Parameters.AddWithValue("@CostoPasaje", obj.CostoPasaje);
                        comando.Parameters.AddWithValue("@Estado", obj.Estado);

                        // Configuración del parámetro de SALIDA (OUTPUT)
                        SqlParameter paramResultado = new SqlParameter("@Resultado", SqlDbType.Int)
                        {
                            Direction = ParameterDirection.Output
                        };
                        comando.Parameters.Add(paramResultado);

                        con.Open();
                        comando.ExecuteNonQuery();

                        // Recuperamos el ID del boleto devuelto por SQL
                        idGenerado = Convert.ToInt32(paramResultado.Value);
                    }
                }

                return new Respuesta<int>
                {
                    Estado = idGenerado > 0,
                    Data = idGenerado,
                    Mensaje = idGenerado > 0 ? "Registro exitoso." : "No se pudo completar el registro."
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<int>
                {
                    Estado = false,
                    Data = 0,
                    Mensaje = ex.Message // Aquí llegará el mensaje de "Asiento ya no está disponible"
                };
            }
        }

        public Respuesta<BoletoImpresionDTO> ObtenerDetalleBoletoImpresion(int idBoleto)
        {
            try
            {
                BoletoImpresionDTO obj = null;

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ObtenerDetalleBoletoImpresion", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        comando.Parameters.AddWithValue("@IdBoleto", idBoleto);
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            if (dr.Read())
                            {
                                obj = new BoletoImpresionDTO
                                {
                                    IdBoleto = Convert.ToInt32(dr["IdBoleto"]),
                                    NroComprobante = dr["NroComprobante"].ToString(),
                                    Estado = Convert.ToInt32(dr["Estado"]),
                                    TipoTransaccion = dr["TipoTransaccion"].ToString(),
                                    CIPasajero = dr["CIPasajero"].ToString(),
                                    NombrePasajero = dr["NombrePasajero"].ToString(),
                                    CiudadOrigen = dr["CiudadOrigen"].ToString(),
                                    CiudadDestino = dr["CiudadDestino"].ToString(),
                                    // Formateamos Fecha y Hora directamente aquí para JS
                                    FechaSalidaStr = Convert.ToDateTime(dr["FechaSalida"]).ToString("dd/MM/yyyy"),
                                    HoraSalidaStr = ((TimeSpan)dr["HoraSalida"]).ToString(@"hh\:mm"),
                                    TipoBus = dr["TipoBus"].ToString(),
                                    PlacaBus = dr["PlacaBus"].ToString(),
                                    NroAsiento = Convert.ToInt32(dr["NroAsiento"]),
                                    LlevaMenorEdad = Convert.ToBoolean(dr["LlevaMenorEdad"]),
                                    CostoPasaje = Convert.ToDecimal(dr["CostoPasaje"])
                                };
                            }
                        }
                    }
                }

                return new Respuesta<BoletoImpresionDTO>
                {
                    Estado = obj != null,
                    Data = obj,
                    Mensaje = obj != null ? "Datos obtenidos." : "No se encontró el boleto."
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<BoletoImpresionDTO>
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message,
                    Data = null
                };
            }
        }

    }
}
