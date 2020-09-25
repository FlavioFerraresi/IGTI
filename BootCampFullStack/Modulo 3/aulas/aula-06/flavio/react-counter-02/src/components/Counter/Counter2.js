import React, { Component } from 'react';
import css from './counter.module.css';
import IncrementButton from './IncrementButton';
import DecrementButton from './DecrementButton';
import Value from './Value';
import Steps from './Steps';

export default class Counter2 extends Component {
  //tem q usar arrow function, se nao o this fica null
  handleButtonClick = (clickType) => {
    this.props.onCount(clickType);
  };

  //precisa ser className, ao inves de class
  render() {
    const { countValue, currentStep } = this.props;
    return (
      //no onclick apenas a referencia a funcao, nao utilizar arrow function
      <div className={css.counterContainer}>
        <DecrementButton onDecrement={this.handleButtonClick} />
        <Value value={countValue} />
        <IncrementButton onIncrement={this.handleButtonClick} />
        <Steps currentStep={currentStep} />
      </div>
    );
  }
}
