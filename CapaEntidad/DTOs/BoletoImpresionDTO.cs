namespace CapaEntidad.DTOs
{
    public class BoletoImpresionDTO
    {
        public int IdBoleto { get; set; }
        public string NroComprobante { get; set; }
        public int Estado { get; set; }
        public string TipoTransaccion { get; set; }

        public string CIPasajero { get; set; }
        public string NombrePasajero { get; set; }

        public string CiudadOrigen { get; set; }
        public string CiudadDestino { get; set; }

        public string FechaSalidaStr { get; set; } // Lo convertiremos a string en la capa de datos
        public string HoraSalidaStr { get; set; }  // Lo convertiremos a string en la capa de datos

        public string TipoBus { get; set; }
        public string PlacaBus { get; set; }
        public int NroAsiento { get; set; }

        public bool LlevaMenorEdad { get; set; }
        public decimal CostoPasaje { get; set; }
    }
}
