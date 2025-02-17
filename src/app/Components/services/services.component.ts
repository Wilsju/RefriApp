import {Component, inject, OnInit} from '@angular/core';
import {ClienteService} from 'service/ClienteService';
import {Servicio} from 'modelos/Servicio';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-services',
  imports: [
    RouterLink
  ],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent implements OnInit {
  private clienteService = inject(ClienteService);
  Servicios: Servicio[] = [];

  async ngOnInit() {
    const result = await this.clienteService.ObtenerServicios();
    this.Servicios = result.Servicios;
  }
}
