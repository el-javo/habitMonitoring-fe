import { ChartOptions } from '@shared/apex-charts/apex.interfaces';

export const chartConfig: ChartOptions = {
  series: [
    {
      name: 'Habits success',
      color: '#FF000055',
      data: [],
    },
    {
      name: 'full',
      color: '#00ff0022',
      data: [],
      type: 'line',
    },
  ],
  chart: {
    type: 'area',
    height: 350,
    zoom: {
      enabled: true,
      type: 'x',
      autoScaleYaxis: false,
      zoomedArea: {
        fill: {
          color: '#90CAF9',
          opacity: 0.4,
        },
        stroke: {
          color: '#0D47A1',
          opacity: 0.4,
          width: 1,
        },
      },
    },
    animations: {
      enabled: false,
    },

    background: '#000',
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'smooth',
  },
  fill: {
    colors: ['#00f', '#0f0'],
    opacity: 0.6,
    type: 'solid',

    // gradient: {
    //   shade: 'dark',
    //   shadeIntensity: 0.3,
    // },
  },
  markers: {
    size: 0,
    hover: {
      size: 9,
    },
  },
  title: {
    text: 'Habits',
  },
  tooltip: {
    intersect: true,
    shared: false,
  },
  theme: {
    mode: 'dark',
    palette: 'palette5',
    // monochrome: {
    //   enabled: true,
    //   color: '#8c0b01',
    //   shadeTo: 'dark',
    // },
  },
  xaxis: {
    type: 'datetime',
  },
  yaxis: {
    show: false,
    title: {
      text: 'success rate',
    },
  },
};

export const primeChartConfig = {
  type: 'line',
  tension: 0.5,
  pointRadius: 0,
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};
export const primeBoilerData = {
  labels: ['Q1', 'Q2', 'Q3', 'Q4'],
  datasets: [
    {
      label: 'Valor',
      data: [undefined, 0.2, 0.3, 0.5],
      fill: true,
      backgroundColor: '#0000ff11',
      borderWidth: 1,
      borderColor: '#0000ff',
      tension: 0.5,
      pointRadius: 0,
    },
    {
      label: 'Max',
      data: [undefined, 1, 1, 1].reverse(),
      fill: false,
      backgroundColor: '#00ff0011',
      borderWidth: 1,
      borderColor: '#00ff00',
      tension: 0.5,
      pointRadius: 0,
    },
    {
      label: 'Mood',
      data: [undefined, 0.5, 0.5, 0.5].reverse(),
      fill: false,
      backgroundColor: '#f786a011',
      borderWidth: 1,
      borderColor: '#f786a0',
      tension: 0.5,
      pointRadius: 0,
    },
  ],
};
