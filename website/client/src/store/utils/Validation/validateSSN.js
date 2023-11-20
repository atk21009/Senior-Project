export default function validateSSN(ssn) {
  const SSN = ssn.trim();

  var validNums = /\d{3}-\d{2}-\d{4}/;
  if (!validNums.test(SSN)) {
    return "Invalid Social Security Number";
  }
  return;
}
