import {Injectable} from '@angular/core';
import {createClient, SupabaseClient} from '@supabase/supabase-js';
import {environment} from '../../environments/environment';


@Injectable({providedIn: 'root'})
export class Autentificacion {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.SupabaseUrl, environment.SupabaseKey);
  }

  async registrar(Email: string, password: string) {
    const {data, error} = await this.supabase.auth.signUp({
      email: Email,
      password: password,
    });
    console.log(data);
    console.log(error);
  }
}
