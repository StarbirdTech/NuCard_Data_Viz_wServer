placeholderData = [
    {
        label: "Your Arrival",
        data: [ 480, 525, 525, 525 ],
        backgroundColor: color.Green,
        borderColor: color.Green,
      },
      {
        label: "Your Arrival",
        data: [ 500, 525, 525, 525 ],
        backgroundColor: color.Red,
        borderColor: color.Red,
      },
      {
        label: "Your Arrival",
        data: [ 550, 525, 525, 525 ],
        backgroundColor: color.Blue,
        borderColor: color.Blue,
      },
];

function makeAttendanceTotalChart() {
    attendanceTotalChartData = {
        labels: dateLabels,
        datasets: placeholderData, // !
    };
  
    attendanceTotalChartConfig = {
      type: "line",
      data: attendanceTotalChartData,
      options: {
        plugins: {
          legend: {
            display: false,
          }
        },
        scales: {
          y: {
            min: 480,
            max: 960,
            ticks: {
              callback: (v, i) => this.displayDataAsString(v, i),
              stepSize: 60, 
            },
          },
        },
      },
    };
  
    attendanceTotalChart = new Chart(document.getElementById("attendanceTotalChart"), attendanceTotalChartConfig);
  }
  