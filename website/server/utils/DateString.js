// Variables
var date = new Date();
var day = date.getDay();
const diffMon = date.getDate() - day + (day === 0 ? 1 : 1);
const diffThis = date.getDate() - day + (day === 0 ? -6 : 1);

////////////////////////////////////////////////////////////////////////////
// This Monday
////////////////////////////////////////////////////////////////////////////
function ThisMonday() {
  var Monday = new Date();
  if (date.getDay() === 1) {
    Monday.setDate(date.getDate());
  } else {
    Monday.setDate(diffThis);
  }

  return ThisSunday(Monday);
}

////////////////////////////////////////////////////////////////////////////
// Next Monday
////////////////////////////////////////////////////////////////////////////
function NextMonday() {
  var Monday = new Date();
  if (date.getDay() === 1) {
    Monday.setDate(date.getDate());
  } else {
    Monday.setDate(diffMon);
  }

  return ThisSunday(Monday);
}

////////////////////////////////////////////////////////////////////////////
// This Sunday
////////////////////////////////////////////////////////////////////////////
function ThisSunday(Monday) {
  const Sunday = new Date(Monday);
  Sunday.setDate(Monday.getDate() + 6);

  const dateString = `${Monday.toLocaleDateString()} - ${Sunday.toLocaleDateString()}`;
  return dateString;
}

// Variable Strings
const DateString = ThisMonday();
const NextDateString = NextMonday();
module.exports = { DateString, NextDateString };
