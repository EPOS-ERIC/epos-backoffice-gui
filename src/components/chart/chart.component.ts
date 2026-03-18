import { Component, Input } from '@angular/core';
import { ChartData, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent {
  @Input() type: ChartType = 'bar';
  @Input() data: ChartData = {
    labels: [],
    datasets: [],
  };
  @Input() options!: ChartOptions;
}
