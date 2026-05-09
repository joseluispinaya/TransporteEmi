namespace CapaEntidad.DTOs
{
    public class UsuarioDTO
    {
        public int IdUsuario { get; set; }
        public int IdRol { get; set; }
        public string NombreRol { get; set; }
        public int IdCiudad { get; set; }
        public string NombreCiudad { get; set; }
        public string NroCi { get; set; }
        public string Nombres { get; set; }
        public string Apellidos { get; set; }
        public string Celular { get; set; }
        public string Correo { get; set; }
        public string FotoUrl { get; set; }
        public bool Estado { get; set; }
        // --- Propiedades extra para DataTables Server-Side ---
        public int TotalRegistros { get; set; }
        public int TotalFiltrados { get; set; }
        public string NombreCompleto => $"{Nombres} {Apellidos}";
    }
}
