import React from 'react';

export default function Inputs(props) {
  const { id, min, max, step, label, value, onChangeValue } = props;
  const { inputStyle } = styles;

  const handleInputChange = (event) => {
    const newValue = event.target.value;

    onChangeValue(newValue);
  };

  return (
    <div>
      <label style={inputStyle}>
        <span style={{ marginRight: '10px' }}>{label} </span>
        <input
          style={{
            //color: color,
            maxWidth: '300px',
            marginRight: '10px',
          }}
          id={id}
          type="number"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleInputChange}
        />
      </label>
    </div>
  );
}

//CSSInJS
const styles = {
  inputStyle: {
    width: '300px',
    //backgroundColor: 'yellow',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    //color: color,
  },
};
