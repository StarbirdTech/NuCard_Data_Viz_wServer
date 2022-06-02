/*
///////////////////////////////////////////

const latenessDoughnutChartLabels = [];

function getDates() {
  for (let i = 0; i < reasonDict.length-1; i++) {
    latenessDoughnutChartLabels.push(capitalizeFirstLetter(reasonDict[i]));
  }
}

getDates();

///////////////////////////////////////////

const latenessDoughnutChartData = {
    labels: latenessDoughnutChartLabels,
    datasets: [
      {
        data: [data[0].reason[0].percent, data[0].reason[1].percent, data[0].reason[2].percent],
        backgroundColor: [
          color.Blue, // Late
          color.Black, // Sleep
          color.Red, // Transportation
        ],
      },
    ],
  };
  
  const latenessDoughnutChartConfig = {
    type: "doughnut",
    data: latenessDoughnutChartData,
  };
  
  const latenessDoughnutChart = new Chart(
    document.getElementById("latenessDoughnutChart"),
    latenessDoughnutChartConfig
  );
  */