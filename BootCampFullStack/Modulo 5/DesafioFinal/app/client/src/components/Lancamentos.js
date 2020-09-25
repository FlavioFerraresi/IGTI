import React from 'react';
import Acoes from './Acoes';

export default function Lancamentos(props) {
  const { lancamentos, onDelete, onUpdate } = props;

  const handleActionClick = (id, type) => {
    if (type === 'edit') {
      const lancamento = lancamentos.find((lancamento) => lancamento.id === id);
      onUpdate(lancamento);
    } else {
      onDelete(id);
    }
  };

  return (
    <div className="center">
      <table className="striped center">
        <thead>
          <tr>
            <th>Dia</th>
            <th>Categoria</th>
            <th>Descricao</th>
            <th>Valor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {lancamentos.map((lancamento) => {
            const { id, day, category, description, value } = lancamento;
            return (
              <tr key={id}>
                <td>{day}</td>
                <td>{category}</td>
                <td>{description}</td>
                <td>{value}</td>
                <td>
                  <div>
                    <Acoes
                      label=""
                      id={id}
                      type="edit"
                      onActionClick={handleActionClick}
                    />
                    <Acoes
                      label=""
                      id={id}
                      type="delete"
                      onActionClick={handleActionClick}
                    />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
