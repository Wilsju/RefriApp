export interface Cita {
  id: number
  SolicitudId: number
  Estado: string
  TecnicosAsig: string[]
  Solicitudes: {
    id: number
    Hora: string
    Fecha: string
    Estado: string
    Usuarios: { Nombre: string }
    Servicios: { Nombre: string }
    UsuarioId: number
    ServicioId: number
  }
}

