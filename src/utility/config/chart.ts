import { ChartOptions } from 'chart.js';

interface ColorConfig {
  backgroundColor: Array<string>;
  borderColor: Array<string>;
  borderWidth: number;
}

export class ChartConfig {
  public static OPTIONS: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            family: 'Roboto Flex',
          },
        },
      },
      title: {
        display: true,
        text: '',
        font: {
          family: 'Roboto Flex',
        },
      },
      tooltip: {
        titleFont: {
          family: 'Roboto Flex',
        },
        bodyFont: {
          family: 'Roboto Flex',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            family: 'Roboto Flex',
          },
        },
      },
      y: {
        type: 'linear',
        min: 0,
        max: 400,
        ticks: {
          font: {
            family: 'Roboto Flex',
          },
          stepSize: 50,
        },
      },
    },
  };

  public static COLOR_CONFIG: ColorConfig = {
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 205, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
    ],
    borderColor: ['rgb(255, 99, 132)', 'rgb(255, 159, 64)', 'rgb(255, 205, 86)', 'rgb(75, 192, 192)'],
    borderWidth: 1,
  };
}
