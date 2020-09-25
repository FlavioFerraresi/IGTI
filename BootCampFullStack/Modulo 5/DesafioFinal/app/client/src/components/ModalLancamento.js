import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function ModalLancamento({
  onSave,
  onClose,
  SelectedLancamento,
}) {
  const [description, setDescription] = React.useState(
    SelectedLancamento.description
  );
  const [value, setValue] = React.useState(SelectedLancamento.value);
  const [category, setCategory] = React.useState(SelectedLancamento.category);
  const [yearMonthDay, setYearMonthDay] = React.useState(
    SelectedLancamento.yearMonthDay
  );
  const [type, setType] = React.useState(SelectedLancamento.type);

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      onClose(null);
    }
  };

  /*"description": "Compras em padaria",
    "value": 16,
    "category": "Mercado",
    "year": 2019,
    "month": 1,
    "day": 1,
    "yearMonth": "2019-01",
    "yearMonthDay": "2019-01-01",
    "type": "-"*/

  const handeFormSubmit = () => {};
  const handleChangeDescription = () => {};
  const handleChangeCategory = () => {};
  const handleChangeValue = () => {};
  const handleChangeData = () => {};

  return (
    <div>
      <Modal isOpen={true}>
        <form onSubmit={handeFormSubmit}></form>
        <div className="input-field">
          <input
            id="inputDescricao"
            type="text"
            value={description}
            onChange={handleChangeDescription}
          />
          <label className="active" htmlfor="inputDescricao">
            Descrição
          </label>

          <input
            id="inputCategoria"
            type="text"
            value={category}
            onChange={handleChangeCategory}
          />
          <label className="active" htmlfor="inputCategoria">
            Categoria
          </label>

          <input
            id="inputValor"
            type="text"
            value={value}
            onChange={handleChangeValue}
          />
          <label className="active" htmlfor="inputValor">
            Valor
          </label>

          <input
            className="datepicker"
            id="inputData"
            type="text"
            value={yearMonthDay}
            onChange={handleChangeData}
          />
          <label className="active" htmlfor="inputData">
            Data
          </label>

          <p>
            <label>
              <input name="radio" type="radio" checked />
              <span>Receita</span>
            </label>
          </p>
          <p>
            <label>
              <input name="radio" type="radio" />
              <span>Despesa</span>
            </label>
          </p>
        </div>
      </Modal>
    </div>
  );
}
