export default function getId(mongoId) {
  var result =
    pad0(mongoId.timestamp.toString(16), 8) +
    pad0(mongoId.machineIdentifier.toString(16), 6) +
    pad0(mongoId.processIdentifier.toString(16), 4) +
    pad0(mongoId.counter.toString(16), 6);

  return result;
}

function pad0(str, len) {
  var zeros = "00000000000000000000000000";
  if (str.length < len) {
    return zeros.substr(0, len - str.length) + str;
  }

  return str;
}
