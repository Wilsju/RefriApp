import {inject, Injectable} from '@angular/core';
import {createClient, SupabaseClient} from '@supabase/supabase-js';
import {environment} from '../../environments/environment';
import {EstadoSolicitud} from 'constantes/EstadoSolicitud';
import {Solicitud} from 'modelos/Solicitud';
import {EstadoCita} from 'constantes/EstadoCita';
import {Tecnico} from 'modelos/Tecnico';
import {Cita} from 'modelos/Cita';


@Injectable({providedIn: 'root'})
export class AdminService {
  private supabase: SupabaseClient;


  constructor() {
    this.supabase = createClient(environment.SupabaseUrl, environment.SupabaseKey)
  }

  async ObtenerSolicitudes() {
    let {data: Solicitudes, error} = await this.supabase
      .from('Solicitudes')
      .select('*,Usuarios(Nombre),Servicios(Nombre)')
      .order('Fecha', {ascending: false}) as { data: Solicitud[], error: any };
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

  async ObtenerCitaPorSolicitudId(solicitudId: number) {
    const {data, error} = await this.supabase
      .from('Citas')
      .select('*,Solicitudes(*,Usuarios(Nombre),Servicios(Nombre))')
      .eq("SolicitudId", solicitudId) as { data: Cita[], error: any };
    return {cita: data[0], error: error};
  }


  async ObtenerTecnicos() {

    let {data: Tecnicos, error} = await this.supabase
      .from('Tecnicos')
      .select('*') as { data: Tecnico[], error: any };
    return {tecnicos: Tecnicos, error: error};
  }

  async AsignarTecnicos(citaId: number, tecnicos: string[]) {
    const {data, error} = await this.supabase
      .from("Citas")
      .update(
        {'TecnicosAsig': tecnicos})
      .eq("id", citaId);
    return error === null;
  }
}
