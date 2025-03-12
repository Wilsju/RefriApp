import {Injectable, signal, WritableSignal} from '@angular/core';
import {createClient, SupabaseClient} from '@supabase/supabase-js';
import {environment} from '../../environments/environment';
import {Cliente} from 'modelos/Cliente';


@Injectable({providedIn: 'root'})
export class Autentificacion {
  private supabase: SupabaseClient;
  private _rolUsuario: WritableSignal<string | null> = signal(null);
  rolUsuario = this._rolUsuario.asReadonly();

  constructor() {
    this.supabase = createClient(environment.SupabaseUrl, environment.SupabaseKey);

    this.supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const role = session.user.user_metadata['rol'] as string;
        this._rolUsuario.set(role);
      } else {
        this._rolUsuario.set(null);
      }
    });
  }

  async registrar(Email: string, password: string, Nombre: string, Direccion: string, Telefono: string, TelefonoAux: string | null) {
    let resultado: { error: string | null } = {error: null}
    const {data, error} = await this.supabase.auth.signUp({
      email: Email,
      password: password,
      options: {
        data: {
          rol: "cliente"
        }
      }
    });
    if (data) {
      const result = await this.supabase
        .from('Usuarios')
        .insert({
          'Nombre': Nombre,
          'Direccion': Direccion,
          'Telefono': Telefono,
          'AuxTelefono': Telefono,
          "AuthId": data.user?.id ?? 0,
        });
      if (result.error) {
        resultado.error = result.error.message;
      }
    } else {
      resultado.error = error?.message ?? '';
    }
    return resultado;
  }

  async login(Email: string, password: string) {
    const result = await this.supabase.auth.signInWithPassword({email: Email, password: password});
    return result;
  }

  async logout() {
    await this.supabase.auth.signOut();
  }

  async obtenerUsuarioIdActual() {

    if (this.rolUsuario() === null) {
      return {id: null, error: "No eres cliente. Inicia seccion."};
    }
    const userId = await this.supabase.auth.getUser();

    const {data: Usuario, error} = await this.supabase
      .from('Usuarios')
      .select('id')
      .eq("AuthId", userId.data.user?.id)
      .limit(1);
    if (Usuario !== null) {
      return {id: Usuario[0].id, error: null};
    } else {
      return {id: null, error: "Cliente no encontrado"};

    }
  }

  async obtenerUsuario() {

    const user = await this.supabase.auth.getUser();

    const {data, error} = await this.supabase
      .from('Usuarios')
      .select('*')
      .eq("AuthId", user.data.user?.id)
      .limit(1);
    let cliente  = data?.[0] as Cliente;
    cliente.email = user.data.user?.email ?? "";

    return {cliente : cliente, error: error};

  }

}
