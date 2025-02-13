import {Injectable} from '@angular/core';
import {createClient, SupabaseClient} from '@supabase/supabase-js';
import {environment} from '../../environments/environment';


@Injectable({providedIn: 'root'})
export class Autentificacion {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.SupabaseUrl, environment.SupabaseKey);
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


}
