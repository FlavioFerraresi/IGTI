const moment = require('moment');

function ValidaData(anomes) {
  const anoMesAux = moment(anomes, 'YYYY-MM', true);
  if (anoMesAux.isValid()) {
    return anoMesAux;
  } else {
    return false;
  }
}

module.exports = { ValidaData };
