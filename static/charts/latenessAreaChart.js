// TODO: Lateness Reasons Area Graph
// ✅ count the number of sleep, transit, and other
// ✅ do this for each day
// ✅ convert the data to a percentage
// ✅ map the data to the same scale

// ✅ use function to stack datasets on top of each other
// ✅ label y axis with % sign
// ✅ label x axis with dates
// ✅ parse dates on x axis to improve readability
// ⬛ style chart type switch buttons

function setChartType(type) {
  latenessAreaChartConfig.type = type;
  latenessAreaChart.update();

  if (checkChartType("line")) {
    document.getElementById("typeSwitchButton line").style.borderColor='#000000';
  } else {
    document.getElementById("typeSwitchButton line").style.borderColor='#ffffff';
  }
  if (checkChartType("bar")) {
    document.getElementById("typeSwitchButton bar").style.borderColor='#000000';
  } else {
    document.getElementById("typeSwitchButton bar").style.borderColor='#ffffff';
  }
}

function checkChartType(value) {
  if (value == latenessAreaChartConfig.type) {return true}
  else {return false}
}

function makeLatenessAreaChart(){
  latenessAreaChartData = {
    labels: dateLabels,
    datasets: [
      {
        label: "Sleep",
        data: packagedLatenessData[0],
        backgroundColor: color.Green,
        borderColor: color.Green,
        fill: 'start',
      },
      {
        label: "Transit",
        data: packagedLatenessData[1],
        backgroundColor: color.Red,
        borderColor: color.Red,
        fill: '-1',
      },
      {
        label: "Other",
        data: packagedLatenessData[2],
        backgroundColor: color.Blue,
        borderColor: color.Blue,
        fill: '-1',
      },
    ],
  };
  
  latenessAreaChartConfig = {
    type: "bar",
    data: latenessAreaChartData,
    options: {
      scales: {
        y: {
          min: 0,
          max: 100,
          stacked: true,
          beginAtZero: true,
          ticks: {
            callback: function(value, index, ticks) {
              return value + '%';
            }
          }
        },
        x: {
          stacked: true,
        }
      }
    }
  };

  latenessAreaChart = new Chart(document.getElementById("latenessAreaChart"), latenessAreaChartConfig);
}