import axios from 'axios';

const API_URL = 'http://localhost:3001/api/transaction/';

async function getPorAnoMes(anoMes) {
  const res = await axios.get(`${API_URL}?period=${anoMes}`);

  return res.data;
}

async function insereLancamento(lancamento) {
  const res = await axios.post(`${API_URL}insereLancamento`, lancamento);
  return res.data.id;
}

async function atualizaLancamento(lancamento) {
  const res = await axios.put(
    `${API_URL}atualizaLancamento/${lancamento.id}`,
    lancamento
  );
  return res.data;
}

async function deletaLancamento(id) {
  const res = await axios.delete(`${API_URL}deletaLancamento/${id}`);
  return res.data;
}

export { getPorAnoMes, insereLancamento, atualizaLancamento, deletaLancamento };
