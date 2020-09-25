import React, { useEffect } from 'react';
import Inputs from './components/Inputs';
import css from './App.module.css';
import { useState } from 'react';
import { CalculaParcelas } from './helpers/CalculaParcelas.js';
import Parcelas from './components/Parcelas';

export default function App() {
  const [montanteInicial, setMontanteInicial] = useState(1000);
  const [taxaJuros, setTaxaJuros] = useState(0.5);
  const [parcelas, setParcelas] = useState(1);

  const [parcelasCalculadas, setParcelasCalculadas] = useState([]);

  useEffect(() => {
    setParcelasCalculadas(
      CalculaParcelas(montanteInicial, taxaJuros, parcelas)
    );
  }, [montanteInicial, taxaJuros, parcelas]);

  return (
    <div className="container">
      <h2 className="center">React - Juros Compostos - Flavio</h2>

      <div className={css.flexRow}>
        <Inputs
          id="inputMontanteInicial"
          min="100"
          max="100000"
          step="100"
          label="Montante Inicial"
          value={montanteInicial}
          onChangeValue={(value) => setMontanteInicial(Number(value))}
        />
        <Inputs
          id="inputTaxaJuros"
          min="-12"
          max="12"
          step="0.01"
          label="Taxa de Juros mensal"
          value={taxaJuros}
          onChangeValue={(value) => setTaxaJuros(Number(value))}
        />
        <Inputs
          id="inputParcelas"
          min="1"
          max="36"
          step="1"
          label="Periodo (meses)"
          value={parcelas}
          onChangeValue={(value) => setParcelas(Number(value))}
        />
      </div>
      <br />
      <br />
      <Parcelas
        vetorParcelas={parcelasCalculadas}
        fontColor={taxaJuros >= 0 ? 'blue' : 'red'}
        sinalValorJuros={taxaJuros >= 0 ? '+' : ''}
      />
    </div>
  );
}
