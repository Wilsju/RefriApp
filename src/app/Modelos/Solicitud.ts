export interface Solicitud {
  id: number
  UsuarioId: number
  ServicioId: number
  Fecha: string
  Hora: string
  Estado: string
  Usuarios: {Nombre : string}
  Servicios: {Nombre : string}
}
