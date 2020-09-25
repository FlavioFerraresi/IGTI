import React, { Component } from 'react';

export default class ReadOnlyInput extends Component {
  render() {
    const { label, value, color } = this.props;

    //CSSInJS
    const styles = {
      inputStyle: {
        width: '300px',
        //backgroundColor: 'yellow',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: color,
      },
    };

    const { inputStyle } = styles;

    return (
      <div>
        <label style={inputStyle}>
          <span style={{ marginRight: '10px' }}>{label} </span>
          <input
            style={{
              color: color,
              maxWidth: '200px',
            }}
            type="text"
            readOnly
            disabled
            value={value}
          />
        </label>
      </div>
    );
  }
}
