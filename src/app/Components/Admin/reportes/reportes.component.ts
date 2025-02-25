import {Component, inject, OnInit} from '@angular/core';
import {AdminService} from 'service/AdminService';
import {Chart, ChartConfiguration, Colors, registerables} from 'chart.js';

Chart.register(...registerables);
Chart.register(Colors);
@Component({
  selector: 'app-reportes',
  imports: [],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent implements OnInit {
  private adminServ = inject(AdminService);

  chartMeses: any;
  chartEstadoCita: any;
  chartEstadoSolicitud: any;
  chartServicios: any;


  private datos: {
    agrupadoPorMes: { mes: string; cantidad: number }[];
    agrupadoPorEstadoCita: { estado: string; cantidad: number }[];
    agrupadoPorServicio: { servicio: string; cantidad: number }[];
    agrupadoPorEstadoSolicitud: { estadoSolicitud: string; cantidad: number }[]
  } = {
    agrupadoPorMes: [],
    agrupadoPorEstadoCita: [],
    agrupadoPorServicio: [],
    agrupadoPorEstadoSolicitud: []
  };


  async ngOnInit() {
    this.datos = await this.adminServ.ObtenerDatosReportes();
    this.cargarGraficos();
  }

  cargarGraficos() {
    this.generarGraficoPorMes();
    this.generarGraficoServicios();
    this.generarGraficoEstadoCita();
    this.generarGraficoEstadoSolicitud();
  }

  generarGraficoPorMes() {
    const config: ChartConfiguration = {
      type: 'bar',
      data: {
        labels: this.datos.agrupadoPorMes.map(x => x.mes),
        datasets: [{
          label: 'Servicios  Mensuales',
          data: this.datos.agrupadoPorMes.map(x => x.cantidad),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
          ],
          borderWidth: 1
        }],

      },



    };
    this.chartMeses = new Chart("chartMeses", config);

  }

  generarGraficoServicios() {
    const config: ChartConfiguration = {
      type: 'bar',
      data: {
        labels: this.datos.agrupadoPorServicio.map(x => x.servicio),
        datasets: [{
          label: 'Servicios solicitados',
          data: this.datos.agrupadoPorServicio.map(x => x.cantidad),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
          ],
          borderWidth: 1
        }]
      },
    };
    this.chartMeses = new Chart("chartServicios", config);

  }

  generarGraficoEstadoCita() {
    const config: ChartConfiguration = {
      type: 'pie',
      data: {
        labels: this.datos.agrupadoPorEstadoCita.map(x => x.estado),
        datasets: [{
          label: 'Estado Citas',
          data: this.datos.agrupadoPorEstadoCita.map(x => x.cantidad),
          fill: false,

          tension: 0.1
        }]
      },
    };
    this.chartEstadoCita = new Chart("chartEstadosCita", config);

  }

  generarGraficoEstadoSolicitud() {
    const config: ChartConfiguration = {
      type: 'pie',
      data: {
        labels: this.datos.agrupadoPorEstadoSolicitud.map(x => x.estadoSolicitud),
        datasets: [{
          label: 'Estado Solicitudes',
          data: this.datos.agrupadoPorEstadoSolicitud.map(x => x.cantidad),
          fill: false,

          tension: 0.1
        }]
      },
    };
    this.chartEstadoCita = new Chart("chartEstadosSolicitud", config);

  }


}
