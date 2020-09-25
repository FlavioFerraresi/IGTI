/*const formatter = Intl.NumberFormat('pt-BR');*/
const formatterMoney = Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

function CalculaParcelas(montanteInicial, taxaJuros, qtdParcelas) {
  let valorBase = montanteInicial;
  let valorRendimento = 0;
  let valorJuros = 0;
  let percentualRendimento = 0;
  const parcelas = [];

  for (let index = 1; index <= qtdParcelas; index++) {
    valorRendimento = valorBase + valorBase * (taxaJuros / 100);
    valorJuros = valorRendimento - montanteInicial;
    percentualRendimento = (valorJuros * 100) / montanteInicial;

    parcelas.push({
      id: index,
      valorRendimento: formatNumberMoney(valorRendimento),
      valorJuros: formatNumberMoney(valorJuros),
      percentualRendimento: round(percentualRendimento),
    });

    valorBase = valorRendimento;
  }
  return parcelas;
}

function round(value) {
  return +value.toFixed(2);
}

/*function formatNumber(value) {
  return formatter.format(value);
}*/

function formatNumberMoney(value) {
  return formatterMoney.format(value);
}

export { CalculaParcelas };
