import {Component, inject} from '@angular/core';
import {NotificationService} from 'service/NotificationService';

@Component({
  selector: 'app-notificacion',
  imports: [],
  templateUrl: './notificacion.component.html',
  styleUrl: './notificacion.component.css'
})
export class NotificacionComponent {
   notificacion = inject(NotificationService).notificacion;

}
