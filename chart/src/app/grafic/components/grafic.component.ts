import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { ServiceService } from '../service.service';


@Component({
  selector: 'app-grafic',
  templateUrl: './grafic.component.html',
  styleUrls: ['./grafic.component.scss']
})
export class GraficComponent implements OnInit {
  public canvas: any;
  public ctx;
  public datasets: any;
  public data: any;
  public grafic: any[] = [[],[]];
  public myChartData;

  constructor(private serviceService: ServiceService) { }

  ngOnInit() {
    this.onRefresh(0);
  }

  onRefresh(pagina) {
    return this.serviceService.getData().subscribe((data: {}) => {
        for (let i = 0, len = Object.keys(data).length; i < len; ++i) {
          this.grafic[0].push(data[i].month);
          this.grafic[1].push(data[i].value);
       }
        this.chart();
      });

    }
  chart() {

      const Red: any = {
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        tooltips: {
          backgroundColor: '#f5f5f5',
          titleFontColor: '#333',
          bodyFontColor: '#666',
          bodySpacing: 4,
          xPadding: 12,
          mode: 'nearest',
          intersect: 0,
          position: 'nearest'
        },
        responsive: true,
        scales: {
          yAxes: [{
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: 'rgba(29,140,248,0.0)',
              zeroLineColor: 'transparent',
            },
            ticks: {
              suggestedMin: 60,
              suggestedMax: 125,
              padding: 20,
              fontColor: '#9a9a9a'
            }
          }],

          xAxes: [{
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: 'rgba(233,32,16,0.1)',
              zeroLineColor: 'transparent',
            },
            ticks: {
              padding: 20,
              fontColor: '#9a9a9a'
            }
          }]
        }
      };

      const ChartLabels = this.grafic[0];// ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
      this.datasets = this.grafic[1];    // [60, 80, 65, 130, 80, 105, 90, 130, 70, 115, 60, 130];
      this.data = this.datasets;



      this.canvas = document.getElementById('chartBig1');
      this.ctx = this.canvas.getContext('2d');

      const gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);

      gradientStroke.addColorStop(1, 'rgba(233,32,16,0.2)');
      gradientStroke.addColorStop(0.4, 'rgba(233,32,16,0.0)');
      gradientStroke.addColorStop(0, 'rgba(233,32,16,0)'); // red colors

      const config = {
        type: 'line',
        data: {
          labels: ChartLabels,
          datasets: [{
            label: 'My First dataset',
            fill: true,
            backgroundColor: gradientStroke,
            borderColor: '#ec250d',
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: '#ec250d',
            pointBorderColor: 'rgba(255,255,255,0)',
            pointHoverBackgroundColor: '#ec250d',
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: this.data,
          }]
        },
        options: Red
      };
      this.myChartData = new Chart(this.ctx, config);
  }


}
