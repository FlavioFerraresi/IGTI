import React from 'react';
import css from './Parcelas.module.css';

export default function Parcelas(props) {
  const { vetorParcelas, fontColor, sinalValorJuros } = props;
  const classes = `card ${css.cardExtra}`;

  return (
    <div className={css.flexRow}>
      {vetorParcelas.map((parcela) => {
        const {
          id,
          valorRendimento,
          valorJuros,
          percentualRendimento,
        } = parcela;
        return (
          <div className={classes} key={id}>
            {id}
            <div
              style={{
                color: fontColor,
              }}
            >
              <p>{valorRendimento}</p>
              <p>
                {sinalValorJuros}
                {valorJuros}
              </p>
              <p>{percentualRendimento} %</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
