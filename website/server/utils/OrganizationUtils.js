function date() {
  var today = new Date();
  today.setDate(today.getDate() + ((0 - 1 - today.getDay() + 7) % 7) + 1);
  return today;
}

module.exports = { date };
