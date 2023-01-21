const createEmployeeRecord = (recArray) => {
  return {
    firstName : recArray[0],
    familyName : recArray[1],
    title : recArray[2],
    payPerHour : recArray[3],
    timeInEvents :[],
    timeOutEvents : []
  }
}

const createEmployeeRecords = (recordsArray) => {
  return recordsArray.map(rec => createEmployeeRecord(rec))
}


const createTimeOutEvent = function (dateStamp){
  const [date, hour] = dateStamp.split(" ")

  const outEvent = {
  type : "TimeOut",
  hour : parseInt(hour),
  date : date
  }
  this.timeOutEvents.push(outEvent)

  return this
}

const createTimeInEvent = function (dateStamp){
  const [date, hour] = dateStamp.split(" ")

  const inEvent = {
    type : "TimeIn",
    hour : parseInt(hour),
    date : date
  }
  this.timeInEvents.push(inEvent)
  return this
}

const hoursWorkedOnDate = function(targetDate) {
  const inEvent = this.timeInEvents.find(inEvent => inEvent.date === targetDate)
  const outEvent = this.timeOutEvents.find(oEvent => oEvent.date === targetDate)
    return (outEvent.hour - inEvent.hour) / 100
}

const wagesEarnedOnDate = function(targetDate){
  return hoursWorkedOnDate.call(this, targetDate) * this.payPerHour
}

const allWagesFor = function () {
  const eligibleDates = this.timeInEvents.map(function (e) {
    return e.date
  })

  const payable = eligibleDates.reduce((memo, d) => {
    return memo + wagesEarnedOnDate.call(this, d)
  }, 0)
  return payable
}

const findEmployeeByFirstName = function (srcArray, firstName){
  return srcArray.find(rec => rec.firstName === firstName)
}

const calculatePayroll = function(recsArray){
  return recsArray.reduce((total, rec) => {
      return total + allWagesFor.call(rec)
  }, 0)
}
