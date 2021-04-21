import React from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';

export default function Chart({type, neobis, neolabs, details, detailsLenght}) {

    let detailsNames = details && details.map((item) => item.name);
    let detailsAmount = details && details.map((item) => item.amount);
    let detailsColor = () => {
        if(details) {
            let colorArray = new Array(details.length);
            for(let i=0; i<details.length; i++) {
                if(i < detailsLenght) {
                    colorArray[i] = 'rgba(24, 119, 239, 1)'
                } else {
                    colorArray[i] = 'rgba(8, 67, 135, 0.8)'
                }
            }
            return colorArray;
        }
    };

    const dataBar = {
        chartData: {
            labels: detailsNames,
            datasets: [{
                data: detailsAmount,
                backgroundColor: detailsColor(),
                borderWidth: 0
            }]
        }
    }
    const dataDougnut = {
        chartData: {
            labels: ['Neobis', 'Neolabs'],
            datasets: [{
                data: [neobis, neolabs],
                backgroundColor: [
                  'rgba(24, 119, 239, 1)',
                  'rgba(8, 67, 135, 0.8)'
                ],
                borderWidth: 0
            }]
        }
    }
    return (
        <div className="chart">
            { type == "Bar" ? <Bar
                data={dataBar.chartData}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    legend: {
                        display: false
                    },
                    tooltips: {
                        callbacks: {
                           label: function(tooltipItem) {
                                  return tooltipItem.yLabel;
                           }
                        }
                    }
                }}
            /> :
            <Doughnut
                data={dataDougnut.chartData}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    tooltips: {
                        callbacks: {
                            label: function(tooltipItem, data) {
                                var dataset = data.datasets[tooltipItem.datasetIndex];
                                var label = data.labels[tooltipItem.index];
                                var total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
                                    return previousValue + currentValue;
                                });
                                var currentValue = dataset.data[tooltipItem.index];
                                var percentage = Math.floor(((currentValue/total) * 100)+0.5);         
                                return label + " : " + percentage + "%";
                          }
                        }
                      }
                }}
            />}
        </div>
    )
}