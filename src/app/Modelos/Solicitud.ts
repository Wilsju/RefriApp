export interface Solicitud {
  id: number
  UsuarioId: number
  ServicioId: number
  Fecha: string
  Hora: string
  Estado: string
  Usuarios: {
    Nombre: string
    Direccion: string
    Telefono: string
    AuxTelefono: string | null
  }
  Servicios: { Nombre: string }
}
