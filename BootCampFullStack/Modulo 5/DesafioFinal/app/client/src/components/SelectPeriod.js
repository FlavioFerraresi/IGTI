import React from 'react';

export default function SelectPeriod({
  anoMesId,
  filtroAnoMes,
  onChangeAnoMes,
}) {
  const handleAnoMesChange = (event) => {
    const newAnoMes = parseInt(event.target.value, 10);
    onChangeAnoMes(newAnoMes);
  };

  return (
    <div className="center">
      <select
        style={{ maxWidth: '100px' }}
        className="browser-default"
        value={anoMesId}
        onChange={handleAnoMesChange}
      >
        {filtroAnoMes.map((anoMes) => {
          const { id, yearMonth } = anoMes;
          return (
            <option key={id} value={id}>
              {yearMonth}
            </option>
          );
        })}
      </select>
    </div>
  );
}
