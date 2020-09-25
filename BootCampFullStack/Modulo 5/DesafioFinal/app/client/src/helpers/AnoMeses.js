import moment from 'moment';

function retornaAnoMeses() {
  const AnoMeses = [
    { id: 1, yearMonth: '2019-01' },
    { id: 2, yearMonth: '2019-02' },
    { id: 3, yearMonth: '2019-03' },
    { id: 4, yearMonth: '2019-04' },
    { id: 5, yearMonth: '2019-05' },
    { id: 6, yearMonth: '2019-06' },
    { id: 7, yearMonth: '2019-07' },
    { id: 8, yearMonth: '2019-08' },
    { id: 9, yearMonth: '2019-09' },
    { id: 10, yearMonth: '2019-10' },
    { id: 11, yearMonth: '2019-11' },
    { id: 12, yearMonth: '2019-12' },
    { id: 13, yearMonth: '2020-01' },
    { id: 14, yearMonth: '2020-02' },
    { id: 15, yearMonth: '2020-03' },
    { id: 16, yearMonth: '2020-04' },
    { id: 17, yearMonth: '2020-05' },
    { id: 18, yearMonth: '2020-06' },
    { id: 19, yearMonth: '2020-07' },
    { id: 20, yearMonth: '2020-08' },
    { id: 21, yearMonth: '2020-09' },
    { id: 22, yearMonth: '2020-10' },
    { id: 23, yearMonth: '2020-11' },
    { id: 24, yearMonth: '2020-12' },
    { id: 25, yearMonth: '2021-01' },
    { id: 26, yearMonth: '2021-02' },
    { id: 27, yearMonth: '2021-03' },
    { id: 28, yearMonth: '2021-04' },
    { id: 29, yearMonth: '2021-05' },
    { id: 30, yearMonth: '2021-06' },
    { id: 31, yearMonth: '2021-07' },
    { id: 32, yearMonth: '2021-08' },
    { id: 33, yearMonth: '2021-09' },
    { id: 34, yearMonth: '2021-10' },
    { id: 35, yearMonth: '2021-11' },
    { id: 36, yearMonth: '2021-12' },
  ];

  return AnoMeses;
}

function retornaIdAnoMes(anoMeses) {
  const agora = moment();
  const anoMesFiltrado = anoMeses.find(
    (anoMes) =>
      anoMes.yearMonth === `${agora.year()}-${('00' + agora.month()).slice(-2)}`
  );

  return anoMesFiltrado.id;
}

export { retornaAnoMeses, retornaIdAnoMes };
