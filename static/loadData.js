const currentUser = urlParams.get('user');

excuses = {};
attdData = [];
dateLabels = [];

packagedLatenessData = [];
packagedAttendanceData = [];

dateCounter = 0;
dateCounterTarget = 0;

let testAtdData

excuseStrings = ["sleep", "transit", "other"];

generateAttdData() //!

function generateAttdData(result = 0) { //!
  let dates = ["2022_05_30.json", "2022_05_31.json"] //!
  //let datesListStr = result //!
  //datesListStr = datesListStr.replace(/'/g, '"'); //make the text valid JSON so it can be parsed into an array //!
  //let dates = JSON.parse(datesListStr); //!
  //dates.reverse(); //!
  
  dateCounterTarget = dates.length;

  for(let i = 0; i < dates.length; i++) {
    attdData.push([])
  }
  for (let i = 0; i < dates.length; i++) {
    //get the corresponding date file (JSON) from the server
    let dates = ["2022_05_30.json", "2022_05_31.json"]
    //httpGetAsync("http://192.168.25.6:8080/static/past_attendance/" + dates[i], addDayToData, i); //!
    httpGetAsync("http://127.0.0.1:5000/static/piData/" + dates[i], addDayToData, i); 
  }
}

function getDates() {
  for (let i = 0; i < attdData.length; i++) {
    let currentDate = attdData[i].date;
    currentDate = currentDate.replace(/_/g,"/")

    let d = new Date(currentDate);
    dateLabels.push(d.toLocaleString("en-US", { month: "long" }) + " " + d.getDate());
  }
  //packageLatenessData();

  if (window.location.pathname == "/student/") {
    testAtdData = packAllAtd();
    makeAttendanceAreaChart();
  }
  else if (window.location.pathname == "/coach/") {
    makeAttendanceTotalChart();
  }
  console.log("COMPLETE");
}

function packCompleteAtd() {
  
}

function packAllAtd(targetStudent = currentUser) {
  return packTotalAtd(targetStudent);
}

function packTotalAtd(targetStudent) {
  let packedTotalAtd = [[],[]]
  for (let i = 0; i < attdData.length; i++) {
    let packedDailyAtd = packDailyAtd(i, targetStudent);
    packedTotalAtd[0].push(packedDailyAtd[0][0]);
    packedTotalAtd[1].push(packedDailyAtd[1][0]);
  }
  return packedTotalAtd;
}

function packDailyAtd(targetDay, targetStudent) {
  let packedDailyAtd = [[],[]]
  packedDailyAtd[0].push(getSpecificAttd(targetDay, targetStudent, "timeIn"));
  packedDailyAtd[1].push(getSpecificAttd(targetDay, targetStudent, "timeOut"));

  return packedDailyAtd;
}

function getSpecificAttd(targetDay, targetStudent, targetTime) {
  let time = attdData[targetDay].students[targetStudent][targetTime];
  if (time === "0:00") {time="12:00"}
  let timeClass = new Date(getDateStrFromIndex(targetDay) + " " + time);
  let output = dateToCurrentTime(timeClass.getFullYear(), timeClass.getMonth(), timeClass.getDate(), timeClass.getHours(), timeClass.getMinutes());
  return output;
}

function getDateStrFromIndex(index) {
  return (attdData[index].date).replace(/_/g,"/");
}

function packageStudentAttendanceData(targetStudent, callback) {
  let arr = [[],[]] //the array holding the time in and time out

  for(let i = 0; i < attdData.length; i++) {
    let timeInStr = attdData[i].date + " " + attdData[i].students[targetStudent].timeIn;
    let timeOutStr = attdData[i].date + " " + attdData[i].students[targetStudent].timeOut;

    timeInStr = timeInStr.replace(/_/g,"/")
    timeOutStr = timeOutStr.replace(/_/g,"/")

    let timeIn = new Date(getDateStrFromIndex(i) + " " + attdData[i].students[targetStudent].timeIn)
    let timeOut = new Date(getDateStrFromIndex(i) + " " + attdData[i].students[targetStudent].timeOut)

    arr[0].push(dateToCurrentTime(timeIn.getFullYear(), timeIn.getMonth(), timeIn.getDate(), timeIn.getHours(), timeIn.getMinutes()));
    arr[1].push(dateToCurrentTime(timeOut.getFullYear(), timeOut.getMonth(), timeOut.getDate(), timeOut.getHours(), timeOut.getMinutes()));
  }
  callback(arr);
}

function packageLatenessData() {
  let arr = [[],[],[]]
  for (let i = 0; i < 3; i++) {
    for(var key in excuses){
      arr[i].push(percentage(excuses[key][excuseStrings[i]],excuses[key]["total"]));
    }
  }
  packagedLatenessData=arr;
  makeLatenessAreaChart();
}

/*
startDate = '2022/05/31'
endDate = '2022_06_02'

startDateClass = new Date(startDate);
currentDateClass = startDateClass;
endDateClass = new Date(endDate);

currentDateClass = currentDateClass.addDays(1);
*/

function addDayToData(data_text, index) {
  attdData[index] = JSON.parse(data_text);

  for (let i = 0; i < attdData[index].students.length; i++) {
    if(attdData[index].students[i].timeOut === "0:00") {
      attdData[index].students[i].timeOut = attdData[index].students[i].timeIn;
    }
  }

  dateCounter++;
  if(dateCounter == dateCounterTarget) {
    attdData.push([])
    httpGetAsync("http://127.0.0.1:5000/static/piData/Attendance.json", addCurrentDay); 
  }
}
function addCurrentDay(data_text)
{
  attdData[attdData.length-1] = JSON.parse(data_text);
  calcReasonTotals()
}

function calcReasonTotals() {
  for (let day = 0; day < attdData.length; day++) {
   excuses[day] = {"sleep": 0, "transit": 0, "other": 0, "total": 0};
    for(let student = 0; student < attdData[day].students.length; student++) {
      if(attdData[day]==[]) {
        location.reload(); 
        break;
      }
      var reasonStr = attdData[day].students[student]["reason"]
      excuses[day][reasonStr] += 1;
      excuses[day]["total"] += 1;
    } 
  }
  getDates();
}

function logReasonTotals() {
  for (let i = 0; i < attdData.length; i++) {
    for (let j = 0; j < attdData[i].reason.length; j++) {
      console.log(i + " - " + reasonDict[j] + ": " + data[i].reason[j].count + "  " + data[i].reason[j].percent + "%");
    }
  }
}

function getPastAttendanceData(){
  //get the list of date files from the server
  //each date file holds attendance data from each student for that day
  httpGetAsync("http://192.168.25.6:8080/data-dates", function(result){
    generateAttdData(result)
  });
}

// getPastAttendanceData() //!
