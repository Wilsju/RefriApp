import {Routes} from '@angular/router';
import {SignUpComponent} from './Components/Autenticacion/sign-up/sign-up.component';
import {LoginComponent} from './Components/Autenticacion/login/login.component';
import {ServicesComponent} from './Components/services/services.component';
import {HomeComponent} from './Components/home/home.component';
import {SolicitarComponent} from './Components/Cliente/solicitar/solicitar.component';
import {SolicitudesAdminComponent} from './Components/Admin/solicitudes/solicitudes.component';
import {CitasComponent} from './Components/citas/citas.component';
import {ReportesComponent} from './Components/Admin/reportes/reportes.component';
import {rutaSeguraGuard} from './Guards/ruta-segura.guard';
import {AddServiceComponent} from './Components/Admin/add-service/add-service.component';
import {PerfilComponent} from './Components/Cliente/perfil/perfil.component';


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
  }, {
    path: 'services/:id',
    canActivate: [rutaSeguraGuard(["cliente"])],
    component: SolicitarComponent
  }, {
    path: 'add',
    canActivate: [rutaSeguraGuard(["admin"])],
    component: AddServiceComponent
  },
  {
    path: "citas",
    canActivate: [rutaSeguraGuard(["cliente", "admin"])],
    component: CitasComponent
  },
  {
    path: "adminSolicitudes",
    canActivate: [rutaSeguraGuard(["admin"])],
    component: SolicitudesAdminComponent
  }, {
    path: "reportes",
    canActivate: [rutaSeguraGuard(["admin"])],
    component: ReportesComponent
  },
  {
    path: 'perfil',
    component: PerfilComponent
  },

  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }, {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full'
  },

];
