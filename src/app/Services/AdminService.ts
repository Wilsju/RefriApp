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
      .select('*,Usuarios(Nombre,Direccion,Telefono,AuxTelefono),Servicios(Nombre)')
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
      .select('*,Solicitudes(*,Usuarios(Nombre,Direccion,Telefono,AuxTelefono),Servicios(Nombre))')
      .eq("SolicitudId", solicitudId) as { data: Cita[], error: any };
    return {cita: data[0], error: error};
  }

  async ObtenerCitas() {
    const {data, error} = await this.supabase
      .from('Citas')
      .select('*,Solicitudes(*,Usuarios(Nombre,Direccion,Telefono,AuxTelefono),Servicios(Nombre))')
      .order("Estado", {ascending: false}) as {
      data: Cita[],
      error: any
    };
    return {citas: data, error: error};
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

  async ActualizarEstado(citaId: number, estado: string) {
    const {data, error} = await this.supabase
      .from("Citas")
      .update(
        {'Estado': estado})
      .eq("id", citaId);
    return error === null;
  }


  async ObtenerDatosReportes() {
    const resultCitas = await this.ObtenerCitas();
    const resultSolicitudes = await this.ObtenerSolicitudes();


    const citas = resultCitas.citas;
    const solicitudes = resultSolicitudes.solicitudes;
    const agrupadoPorMes: { [mes: string]: number } = {};
    const agrupadoPorEstadoCita: { [estado: string]: number } = {};
    const agrupadoPorServicio: { [servicio: string]: number } = {};
    const agrupadoPorEstadoSolicitud: { [estadoSolicitud: string]: number } = {};
    solicitudes.forEach((solicitud) => {
      agrupadoPorEstadoSolicitud[solicitud.Estado] = (agrupadoPorEstadoSolicitud[solicitud.Estado] || 0) + 1;
    })
    citas.forEach((cita) => {
      const mes = cita.Solicitudes.Fecha.substring(0, 7);
      agrupadoPorMes[mes] = (agrupadoPorMes[mes] || 0) + 1;

      agrupadoPorEstadoCita[cita.Estado] = (agrupadoPorEstadoCita[cita.Estado] || 0) + 1;

      const servicio = cita.Solicitudes.Servicios.Nombre;
      agrupadoPorServicio[servicio] = (agrupadoPorServicio[servicio] || 0) + 1;
    });

    return {
      agrupadoPorMes: Object.entries(agrupadoPorMes).map(([mes, cantidad]) => ({mes, cantidad})),
      agrupadoPorEstadoCita: Object.entries(agrupadoPorEstadoCita).map(([estado, cantidad]) => ({estado, cantidad})),
      agrupadoPorServicio: Object.entries(agrupadoPorServicio).map(([servicio, cantidad]) => ({servicio, cantidad})),
      agrupadoPorEstadoSolicitud: Object.entries(agrupadoPorEstadoSolicitud).map(([estadoSolicitud, cantidad]) => ({
        estadoSolicitud,
        cantidad
      }))
    };
  }


  async AddService(Nombre: string, Descripcion: string, Precio: number, Duracion: number) {

    const result = await this.supabase
      .from("Servicios")
      .insert(
        {
          "Nombre": Nombre,
          "Descripcion": Descripcion,
          "Precio": Precio,
          "Duracion": Duracion,
        }
      ).select();

    return result.error === null;
  }

}
