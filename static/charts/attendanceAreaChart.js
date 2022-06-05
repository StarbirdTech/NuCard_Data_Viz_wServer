function changeFocusTime(time) {
  if (time == "all") {
    attendanceAreaChartConfig.options.scales.y.min = 480;
    attendanceAreaChartConfig.options.scales.y.max = 960;
  }
  else if (time == "am") {
    attendanceAreaChartConfig.options.scales.y.min = 480;
    attendanceAreaChartConfig.options.scales.y.max = 600;
  }
  else if (time == "pm") {
    attendanceAreaChartConfig.options.scales.y.min = 840;
    attendanceAreaChartConfig.options.scales.y.max = 960;
  }
  attendanceAreaChart.update();
}

function changeChartStyle(style) {
  if (style == "line") {
    attendanceAreaChartData.datasets[0].backgroundColor = color.Green;
    attendanceAreaChartData.datasets[0].borderColor = color.Black;
    attendanceAreaChartData.datasets[0].fill = false;
    attendanceAreaChartData.datasets[1].backgroundColor = color.Green;
    attendanceAreaChartData.datasets[1].borderColor = color.Black;
    attendanceAreaChartData.datasets[1].fill = false;
    attendanceAreaChartData.datasets[2].backgroundColor = color.Grey;
    attendanceAreaChartData.datasets[2].borderColor = color.Grey;
    attendanceAreaChartData.datasets[2].fill = false;
    attendanceAreaChartData.datasets[3].backgroundColor = color.Grey;
    attendanceAreaChartData.datasets[3].borderColor = color.Grey;
  }
  else if (style == "area") {
    attendanceAreaChartData.datasets[0].backgroundColor = color.Clear;
    attendanceAreaChartData.datasets[0].borderColor = color.Clear;
    attendanceAreaChartData.datasets[0].fill = {target: {value: 540}, above: color.Red, below: color.Green};
    attendanceAreaChartData.datasets[1].backgroundColor = color.Clear;
    attendanceAreaChartData.datasets[1].borderColor = color.Clear;
    attendanceAreaChartData.datasets[1].fill = {target: {value: 890}, above: color.Green, below: color.Red};
    attendanceAreaChartData.datasets[2].backgroundColor = color.Clear;
    attendanceAreaChartData.datasets[2].borderColor = color.Clear;
    attendanceAreaChartData.datasets[2].fill = {target: {value: 890}, below: color.Green};
    attendanceAreaChartData.datasets[3].backgroundColor = color.Clear;
    attendanceAreaChartData.datasets[3].borderColor = color.Clear;
  }
  attendanceAreaChart.update();
}

function makeAttendanceAreaChart() {
  attendanceAreaChartData = {
      labels: dateLabels,
      datasets: [
        {
          label: "Your Arrival",
          //data: [ 480, 525, 525, 525 ],
          data: testAtdData[0],
          backgroundColor: color.Clear,
          borderColor: color.Clear,
          fill: {target: {value: 540}, above: color.Red, below: color.Green}
        },
        {
          label: "Your Departure",
          data: testAtdData[1],
          backgroundColor: color.Clear,
          borderColor: color.Clear,
          fill: {target: {value: 890}, above: color.Green, below: color.Red},
        },
        {
          data: [540, 540, 540, 540, 540, 540, 540, 540, 540, 540, 540, 540, 540, 540],
          backgroundColor: color.Clear,
          borderColor: color.Clear,
          fill: {target: {value: 890}, below: color.Green},
        },
        {
          data: [890, 890, 890, 890, 890, 890, 890, 890, 890, 890, 890, 890, 890, 890],
          backgroundColor: color.Clear,
          borderColor: color.Clear,
        },
      ],
    };

  attendanceAreaChartConfig = {
    type: "line",
    data: attendanceAreaChartData,
    options: {
      plugins: {
        legend: {
          display: false,
        }
      },
      scales: {
        y: {
          //min: 480,
          max: 960,
          ticks: {
            callback: (v, i) => this.displayDataAsString(v, i),
            stepSize: 60, 
          },
        },
      },
    },
  };

  attendanceAreaChart = new Chart(document.getElementById("attendanceAreaChart"), attendanceAreaChartConfig);
  //makeAttendanceTotalChart();
}
