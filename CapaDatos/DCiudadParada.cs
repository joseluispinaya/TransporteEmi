using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using CapaEntidad.Entidades;
using CapaEntidad.Responses;

namespace CapaDatos
{
    public class DCiudadParada
    {
        #region "PATRON SINGLETON"
        private static DCiudadParada instancia = null;
        private DCiudadParada() { }
        public static DCiudadParada GetInstance()
        {
            if (instancia == null)
            {
                instancia = new DCiudadParada();
            }
            return instancia;
        }
        #endregion

        public Respuesta<int> GuardarOrEditCiudadParada(ECiudadParada objeto)
        {
            Respuesta<int> response = new Respuesta<int>();
            int resultadoCodigo = 0;

            try
            {
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_GuardarOrEditCiudadesParada", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        // 2. Parámetros del Docente
                        cmd.Parameters.AddWithValue("@IdCiudad", objeto.IdCiudad);
                        cmd.Parameters.AddWithValue("@Nombre", objeto.Nombre);
                        cmd.Parameters.AddWithValue("@Estado", objeto.Estado);

                        // 4. Parámetro de Salida
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

                // 5. Interpretación de la respuesta (Igual que con Carreras y Grados)
                switch (resultadoCodigo)
                {
                    case 1:
                        response.Estado = false;
                        response.Valor = "warning";
                        response.Mensaje = "Ya existe un registro con el mismo Nombre.";
                        break;

                    case 2:
                        response.Estado = true;
                        response.Valor = "success";
                        response.Mensaje = "Registrado correctamente.";
                        break;

                    case 3:
                        response.Estado = true;
                        response.Valor = "success";
                        response.Mensaje = "Actualizado correctamente.";
                        break;

                    case 0:
                    default:
                        response.Estado = false;
                        response.Valor = "error";
                        response.Mensaje = "No se pudo completar la operación en la base de datos.";
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

        public Respuesta<List<ECiudadParada>> ListaCiudadesParada()
        {
            try
            {
                List<ECiudadParada> rptLista = new List<ECiudadParada>();
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ListaCiudadesParada", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();
                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new ECiudadParada
                                {
                                    IdCiudad = Convert.ToInt32(dr["IdCiudad"]),
                                    Nombre = dr["Nombre"].ToString(),
                                    Estado = Convert.ToBoolean(dr["Estado"])
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<ECiudadParada>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "Lista obtenida correctamente"
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<List<ECiudadParada>>()
                {
                    Estado = false,
                    Data = null,
                    Mensaje = $"Error al obtener la lista: {ex.Message}"
                };
            }
        }

        // rutas

        public Respuesta<int> GuardarOrEditRutas(ERuta objeto)
        {
            Respuesta<int> response = new Respuesta<int>();
            int resultadoCodigo = 0;

            try
            {
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_GuardarOrEditRutas", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        // 2. Parámetros del Docente
                        cmd.Parameters.AddWithValue("@IdRuta", objeto.IdRuta);
                        cmd.Parameters.AddWithValue("@NombreRuta", objeto.NombreRuta);

                        // 4. Parámetro de Salida
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

                // 5. Interpretación de la respuesta (Igual que con Carreras y Grados)
                switch (resultadoCodigo)
                {
                    case 1:
                        response.Estado = false;
                        response.Valor = "warning";
                        response.Mensaje = "Ya existe un registro con la misma Ruta.";
                        break;

                    case 2:
                        response.Estado = true;
                        response.Valor = "success";
                        response.Mensaje = "Registrado correctamente.";
                        break;

                    case 3:
                        response.Estado = true;
                        response.Valor = "success";
                        response.Mensaje = "Actualizado correctamente.";
                        break;

                    case 0:
                    default:
                        response.Estado = false;
                        response.Valor = "error";
                        response.Mensaje = "No se pudo completar la operación en la base de datos.";
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

        public Respuesta<List<ERuta>> ListaRutas()
        {
            try
            {
                List<ERuta> rptLista = new List<ERuta>();
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ListaRutas", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();
                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new ERuta
                                {
                                    IdRuta = Convert.ToInt32(dr["IdRuta"]),
                                    NombreRuta = dr["NombreRuta"].ToString()
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<ERuta>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "Lista obtenida correctamente"
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<List<ERuta>>()
                {
                    Estado = false,
                    Data = null,
                    Mensaje = $"Error al obtener la lista: {ex.Message}"
                };
            }
        }

    }
}
