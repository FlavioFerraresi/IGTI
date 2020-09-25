const formatter = Intl.NumberFormat('pt-BR');
const formatterMoney = Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

function formatNumber(value) {
  return formatter.format(value);
}

function formatNumberMoney(value) {
  return formatterMoney.format(value);
}

export { formatNumber, formatNumberMoney };
