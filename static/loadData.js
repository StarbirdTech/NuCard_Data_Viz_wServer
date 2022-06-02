const currentUser = urlParams.get('user');

function setCurrentUser(user) {
  location.reload();
  currentUser = user;
}

excuses = {};
attdData = [];
dateLabels = [];

packagedLatenessData = [];
packagedAttendanceData = [];

excuseStrings = ["sleep", "transit", "other"];

function getDates() {
  for (let i = 0; i < attdData.length; i++) {
    let currentDate = attdData[i].date;
    currentDate = currentDate.replace(/_/g,"/")

    let d = new Date(currentDate);
    dateLabels.push(d.toLocaleString("en-US", { month: "long" }) + " " + d.getDate());
  }
  packageLatenessData();
  packageAttendanceData();
}

function packageLatenessData() {
  let arr = [[],[],[]]
  for (let i = 0; i < 3; i++) {
    for(var key in excuses){
      arr[i].push(percentage(excuses[key][excuseStrings[i]],excuses[key]["total"]));
    }
  }
  packagedLatenessData=arr;
  //makeLatenessAreaChart();
}

function packageAttendanceData() {
  let targetStudent = currentUser;
  let arr = [[],[]] //the array holding the time in and time out
  for(let i = 0; i < attdData.length; i++) {
    let timeInStr = attdData[i].date + " " + attdData[i].students[targetStudent].timeIn;
    let timeOutStr = attdData[i].date + " " + attdData[i].students[targetStudent].timeOut;

    timeInStr = timeInStr.replace(/_/g,"/")
    timeOutStr = timeOutStr.replace(/_/g,"/")

    let timeIn = new Date(timeInStr)
    let timeOut = new Date(timeOutStr)

    arr[0].push(dateToCurrentTime(timeIn.getFullYear(), timeIn.getMonth(), timeIn.getDate(), timeIn.getHours(), timeIn.getMinutes()));
    arr[1].push(dateToCurrentTime(timeOut.getFullYear(), timeOut.getMonth(), timeOut.getDate(), timeOut.getHours(), timeOut.getMinutes()));
  }
  packagedAttendanceData=arr;
  makeAttendanceAreaChart();
}
/*
startDate = '2022/05/31'
endDate = '2022_06_02'

startDateClass = new Date(startDate);
currentDateClass = startDateClass;
endDateClass = new Date(endDate);

currentDateClass = currentDateClass.addDays(1);
*/

function generateAttdData(result) {
  let datesListStr = result
  datesListStr = datesListStr.replace(/'/g, '"'); //make the text valid JSON so it can be parsed into an array
  let dates = JSON.parse(datesListStr);
  dates.reverse();
    
  for(let i = 0; i < dates.length; i++) {
    attdData.push([])
  }
  for (let i = 0; i < dates.length; i++) {
    //get the corresponding date file (JSON) from the server

    httpGetAsync("http://192.168.25.6:8080/static/past_attendance/" + dates[i], addDayToData, i); 
  }
}

function addDayToData(data_text, index) {
  attdData[index] = JSON.parse(data_text);

  done = true
  for(let i = 0; i < attdData.length; i++) {
    if(attdData[i].length==0) {
      done = false;
    }
  }

  if(done){
    attdData.push([])
    httpGetAsync("http://192.168.25.6:8080/static/Attendance.json", addCurrentDay); 
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

getPastAttendanceData()