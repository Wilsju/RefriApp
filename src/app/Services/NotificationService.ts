import {Injectable, signal, WritableSignal} from '@angular/core';


@Injectable({providedIn: 'root'})
export class NotificationService {

  private _notificaction: WritableSignal<{ message: string, typo: "success" | "error" | "warning" } | null> = signal(null);
  notificacion = this._notificaction.asReadonly();

  NotificarFaltaLoguearse(mensaje : string){
    this._notificaction.set(null);
    setTimeout(() => { this._notificaction.set(null); }, 2000);
    this._notificaction.set({message : mensaje, typo: "warning"});

  }

  NotificarSucces(mensaje: string) {
    this.ClearNotification();
    this._notificaction.set({message: mensaje, typo: "success"});
  }

  NotificarError(mensaje: string) {
    this.ClearNotification();
    this._notificaction.set({message: mensaje, typo: "error"});
  }

  ClearNotification() {
    this._notificaction.set(null);
    setTimeout(() => { this._notificaction.set(null); }, 4000);
  }

}
