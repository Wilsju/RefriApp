import {inject, Injectable} from '@angular/core';
import {createClient, SupabaseClient} from '@supabase/supabase-js';
import {environment} from '../../environments/environment';
import {EstadoSolicitud} from 'constantes/EstadoSolicitud';
import {Solicitud} from 'modelos/Solicitud';
import {EstadoCita} from 'constantes/EstadoCita';


@Injectable({providedIn: 'root'})
export class AdminService {
  private supabase: SupabaseClient;


  constructor() {
    this.supabase = createClient(environment.SupabaseUrl, environment.SupabaseKey)
  }

  async ObtenerSolicitudes() {
    let {data: Solicitudes, error} = await this.supabase
      .from('Solicitudes')
      .select('*,Usuarios(Nombre),Servicios(Nombre)') as { data: Solicitud[], error: any };
    return {solicitudes: Solicitudes, error: error};

  }

  async CambiarEstatusSolicitud(SolicitudId: string, estado: string) {

    const {data, error} = await this.supabase
      .from('Solicitudes')
      .update({'Estado': estado})
      .eq('id', SolicitudId)
      .select("*");
    if (error) {
      return false;
    }
    if (estado == EstadoSolicitud.Aceptada) {
      // crear registro en citas
      const resultCitas = await this.supabase
        .from('Citas')
        .insert(
          {
            'SolicitudId': SolicitudId,
            'Estado': EstadoCita.Pendiente,
            "TecnicosAsig": ["Ninguno"]
          },
        )
        .select("*");

      return resultCitas.error === null;
    } else {
      return true;
    }

  }

}
