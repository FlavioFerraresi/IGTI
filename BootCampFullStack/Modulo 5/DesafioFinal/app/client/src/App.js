import React from 'react';
import { retornaAnoMeses, retornaIdAnoMes } from './helpers/AnoMeses.js';
import * as api from './api/apiService.js';
import Lancamentos from './components/Lancamentos.js';
import css from './App.module.css';
import Acoes from './components/Acoes.js';
import SelectPeriod from './components/SelectPeriod.js';
import ModalLancamento from './components/ModalLancamento.js';

const filtroAnoMes = retornaAnoMeses();
const indiceAnoMesAtual = retornaIdAnoMes(filtroAnoMes);

export default function App() {
  const [allLancamentos, setAllLancamentos] = React.useState([]);
  const [anoMesId, setAnoMesId] = React.useState(
    filtroAnoMes[indiceAnoMesAtual].id
  );
  const [anoMes, setAnoMes] = React.useState(
    filtroAnoMes[indiceAnoMesAtual].yearMonth
  );
  const [qtdeLancamentos, setQtdeLancamentos] = React.useState(0);
  const [receitas, setReceitas] = React.useState(0);
  const [despesas, setDespesas] = React.useState(0);
  const [saldo, setSaldo] = React.useState(0);
  const [selectedLancamento, setSelectedLancamento] = React.useState({});
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const getLancamentos = async (anoMes) => {
    const data = await api.getPorAnoMes(anoMes);

    getResumoLancamentos(data.lancamentos);
    setAllLancamentos(data.lancamentos);
  };

  const getResumoLancamentos = async (lancamentos) => {
    const qtdeLancamentos = lancamentos.length;
    const receitas = lancamentos.reduce((acc, cur) => {
      if (cur.type === '+') {
        return acc + cur.value;
      } else {
        return acc;
      }
    }, 0);
    const despesas = lancamentos.reduce((acc, cur) => {
      if (cur.type === '-') {
        return acc + cur.value;
      } else {
        return acc;
      }
    }, 0);
    const saldo = receitas - despesas;

    setQtdeLancamentos(qtdeLancamentos);
    setReceitas(receitas);
    setDespesas(despesas);
    setSaldo(saldo);
  };

  React.useEffect(() => {
    const anoMesFiltrado = filtroAnoMes.find(
      (anoMes) => anoMes.id === anoMesId
    );
    setAnoMes(anoMesFiltrado.yearMonth);

    getLancamentos(anoMesFiltrado.yearMonth);
  }, [anoMesId]);

  const handleAnoMesChange = (AnoMesSelect) => {
    setAnoMesId(AnoMesSelect);
  };

  const handleDelete = async (id) => {
    await api.deletaLancamento(id);

    getLancamentos(anoMes);
  };

  const handleUpdate = async (lancamento) => {
    setSelectedLancamento(lancamento);
    setIsModalOpen(true);

    const data = await api.atualizaLancamento(lancamento);

    console.log(lancamento);
  };

  const handleUpdateData = () => {};
  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleInsert = () => {
    console.log('handleInsert');
  };

  return (
    <div className="container">
      <h2>Desafio Final do Bootcamp Full Stack</h2>
      <SelectPeriod
        anoMesId={anoMesId}
        filtroAnoMes={filtroAnoMes}
        onChangeAnoMes={handleAnoMesChange}
      />
      <br />
      <div className={css.flexRow}>
        <span>Lançamentos: {qtdeLancamentos}</span>
        <span>Receitas: {receitas}</span>
        <span>Despesas: {despesas}</span>
        <span>Saldo: {saldo}</span>
      </div>

      <Acoes
        label="Novo Lançamento"
        id={0}
        type="add"
        onActionClick={handleInsert}
      />

      <br />
      <Lancamentos
        lancamentos={allLancamentos}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
      />

      {isModalOpen && (
        <ModalLancamento
          onSave={handleUpdateData}
          onClose={handleClose}
          SelectedLancamento={selectedLancamento}
        />
      )}
    </div>
  );
}
