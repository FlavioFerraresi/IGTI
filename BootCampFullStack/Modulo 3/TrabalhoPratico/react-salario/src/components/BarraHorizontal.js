import React, { Component } from 'react';

export default class BarraHorizontal extends Component {
  render() {
    const { value, color = 'black' } = this.props;

    return (
      <div
        style={{
          marginTop: '40px',
          width: value + '%',
          height: '20px',
          backgroundColor: color,
        }}
      />
    );
  }
}
