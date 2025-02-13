import {Routes} from '@angular/router';
import {SignUpComponent} from './Components/Autenticacion/sign-up/sign-up.component';
import {LoginComponent} from './Components/Autenticacion/login/login.component';
import {ServicesComponent} from './Components/services/services.component';
import {NavMenuComponent} from './Components/nav-menu/nav-menu.component';
import {HomeComponent} from './Components/home/home.component';
import {HistorialComponent} from './Components/historial/historial.component';


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
    redirectTo: '/Inicio',
    pathMatch: 'full'
  }
];
