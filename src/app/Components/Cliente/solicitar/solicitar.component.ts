import {Component, inject, OnInit} from '@angular/core';
import {ClienteService} from 'service/ClienteService';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {Servicio} from 'modelos/Servicio';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';


@Component({
  selector: 'app-solicitar',
  imports: [
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './solicitar.component.html',
  styleUrl: './solicitar.component.css'
})
export class SolicitarComponent implements OnInit {
  private clienteService = inject(ClienteService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  service: Servicio | null = null;
  form = new FormGroup({
    fecha: new FormControl("", [Validators.required]),
    hora: new FormControl("", [Validators.required]),
  });


  async ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id == null) {
      alert("No se encontrado dicho servicio");
      this.router.navigate(['/services']);
    } else {
      const result = await this.clienteService.ObtenerServicioById(id);
      this.service = result.Servicio;
      if (result.error !== null) {
        alert("error al cargar el servicio");
      }
    }
  }

  protected readonly Date = Date;

  async Solicitar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const result = await
      this.clienteService.HacerSolicitud(this.route.snapshot.params['id'], this.form.value.fecha ?? "", this.form.value.hora?.toString() ?? "");

    if (result.error !== null) {
      alert("error al solicitar el servicio");
    } else {
      alert("Solicitud enviada");
      this.router.navigate(['/services']);
    }
  }
}
