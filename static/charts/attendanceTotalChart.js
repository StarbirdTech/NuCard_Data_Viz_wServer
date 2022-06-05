placeholderData = [
  {
    label: "Your Arrival",
    data: packagedAttendanceData[0],
    backgroundColor: color.Green,
    borderColor: color.Green,
  },
  {
    label: "Your Arrival",
    data: packagedAttendanceData[1],
    backgroundColor: color.Red,
    borderColor: color.Red,
  },
  {
    label: "Your Arrival",
    data: [550, 525, 525, 525],
    backgroundColor: color.Blue,
    borderColor: color.Blue,
  },
];

function makeDataset(inputlabel, inputdata) {
  return {
    label: inputlabel,
    data: inputdata,
    backgroundColor: color.Green,
    borderColor: color.Green,
  };
}

function makeAttendanceTotalChart(inputDataSet) {
  attendanceTotalChartData = {
    labels: dateLabels,
    datasets: inputDataSet, // !
  };

  attendanceTotalChartConfig = {
    type: "line",
    data: attendanceTotalChartData,
    options: {
      plugins: {
        legend: {
          display: false,
        },
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

  attendanceTotalChart = new Chart(
    document.getElementById("attendanceTotalChart"),
    attendanceTotalChartConfig
  );
}
