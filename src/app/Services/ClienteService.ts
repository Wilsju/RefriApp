import {inject, Injectable} from '@angular/core';
import {createClient, SupabaseClient} from '@supabase/supabase-js';
import {environment} from '../../environments/environment';
import {Servicio} from 'modelos/Servicio';
import {EstadoSolicitud} from 'constantes/EstadoSolicitud';
import {Autentificacion} from 'service/Autentication';
import {Cita} from 'modelos/Cita';


@Injectable({providedIn: 'root'})
export class ClienteService {
  private supabase: SupabaseClient;
  private Auth = inject(Autentificacion);

  constructor() {
    this.supabase = createClient(environment.SupabaseUrl, environment.SupabaseKey)
  }

  async ObtenerServicios() {
    let {data: Servicios, error} = await this.supabase
      .from('Servicios')
      .select('*') as { data: Servicio[], error: any };
    return {Servicios: Servicios, error: error};
  }

  async ObtenerServicioById(id: string) {
    let {data: Servicios, error} = await this.supabase
      .from('Servicios')
      .select('*')
      .eq("id", id) as { data: Servicio[], error: any };
    return {Servicio: Servicios?.[0], error: error};
  }

  async HacerSolicitud(servicioid: string, fecha: string, hora: string) {

    const idUsuario = await this.Auth.obtenerUsuarioIdActual();
    if (idUsuario.error) {
      return {error: idUsuario.error};
    }
    const {data, error} = await this.supabase
      .from('Solicitudes')
      .insert([
        {
          UsuarioId: idUsuario.id,
          ServicioId: servicioid,
          Fecha: fecha,
          Hora: hora,
          Estado: EstadoSolicitud.Pendiente,
        },
      ])
      .select()
    return {error: data ? null : error?.message};

  }

  async ObtenerCitasCliente() {
    const idUsuario = await this.Auth.obtenerUsuarioIdActual();
    const {data, error} = await this.supabase
      .from('Citas')
      .select('*,Solicitudes(*,Usuarios(Nombre,Direccion,Telefono,AuxTelefono),Servicios(Nombre))') as {
      data: Cita[],
      error: any
    };

    return {citas: data.filter(x => x.Solicitudes.UsuarioId == idUsuario.id), error: error};
  }
}


