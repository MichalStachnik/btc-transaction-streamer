import React, { Component } from 'react';
import Chart from 'chart.js';

import './Graph.css';

interface State {
  chartData: ChartData;
  times: any[];
  hashrates: any[];
}

interface ChartData {
  description: string;
  name: string;
  period: string;
  status: string;
  unit: string;
  values: any[];
}

class Graph extends Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      chartData: {
        description: '',
        name: '',
        period: '',
        status: '',
        unit: '',
        values: []
      },
      times: [],
      hashrates: []
    };
  }

  componentDidMount = async () => {
    // TODO: refactor
    const data = await fetch('/btc/transaction-hash');
    const parsedData = await data.json();
    const parsedJSON = JSON.parse(parsedData.data);
    console.log('parsedJSON', parsedJSON);
    let times = parsedJSON.values.map((value: any) => value.x);
    let hashrates = parsedJSON.values.map((value: any) => value.y);

    this.setState({ chartData: parsedJSON, times, hashrates }, () => {
      console.log(this.state);
      const canvas = document.getElementById('chart') as HTMLCanvasElement;
      const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
      const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: this.state.times,
          datasets: [
            {
              label: 'Bitcoin Network Tera Hashes per Second',
              data: this.state.hashrates,
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderWidth: 1
            }
          ]
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          }
        }
      });
    });
  };

  render() {
    return <canvas id="chart" width="500px" height="500px"></canvas>;
  }
}

export default Graph;
