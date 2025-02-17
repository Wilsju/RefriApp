import {Routes} from '@angular/router';
import {SignUpComponent} from './Components/Autenticacion/sign-up/sign-up.component';
import {LoginComponent} from './Components/Autenticacion/login/login.component';
import {ServicesComponent} from './Components/services/services.component';
import {HomeComponent} from './Components/home/home.component';
import {HistorialComponent} from './Components/historial/historial.component';
import {SolicitarComponent} from './Components/Cliente/solicitar/solicitar.component';


export const routes: Routes = [

  {
    path: 'registrar',
    component: SignUpComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'services',
    component: ServicesComponent
  },{
    path: 'services/:id',
    component: SolicitarComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'historial',
    component: HistorialComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];
