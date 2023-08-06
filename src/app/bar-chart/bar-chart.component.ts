import { Component } from '@angular/core';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent {

  barChartData = [
    {
      name: 'Category 1',
      value: 120,
    },
    {
      name: 'Category 2',
      value: 250,
    },
    {
      name: 'Category 3',
      value: 180,
    },
    {
      name: 'Category 4',
      value: 80,
    },
    {
      name: 'Category 5',
      value: 150,
    },
  ];

  view: any[] = [700, 400];

  // Customize the chart appearance (optional)
  showXAxis = true;
  showYAxis = true;
  showLegend = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  xAxisLabel = 'Categories';
  yAxisLabel = 'Values';

  // Customize the chart colors (optional)
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA', '#337AB7'],
  };

}
