import {Component, inject, OnInit} from '@angular/core';
import {AdminService} from 'service/AdminService';
import {NotificationService} from 'service/NotificationService';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgClass} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-service',
  imports: [
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './add-service.component.html',
  styleUrl: './add-service.component.css'
})
export class AddServiceComponent implements OnInit {
  private adminService = inject(AdminService);
  private notificar = inject(NotificationService);
  private router = inject(Router);
  serviceForm!: FormGroup;


  ngOnInit(): void {
    this.serviceForm = new FormGroup(
      {
        nombre: new FormControl('', [Validators.required]),
        descripcion: new FormControl('', [Validators.required]),
        precio: new FormControl(['', [Validators.required, Validators.min(0)]]),
        duracion: new FormControl(['', [Validators.required, Validators.min(1)]])
      }
    );
  }

  esValido(field: string): boolean {
    return (this.serviceForm.get(field)?.invalid && this.serviceForm.get(field)?.touched) === true;
  }


  async agregar() {
    if (this.serviceForm.invalid) {
      this.serviceForm.markAllAsTouched();
    } else {
      const datos = this.serviceForm.value;
      const resultado = await this.adminService.AddService(datos.nombre, datos.descripcion, datos.precio, datos.duracion);
      if (resultado) {
        this.notificar.NotificarSucces("Servicio Agregado");
        await this.router.navigate(['services']);
      } else {
        this.notificar.NotificarError("Erorr al agregar el servicios")
      }
    }
  }
}
