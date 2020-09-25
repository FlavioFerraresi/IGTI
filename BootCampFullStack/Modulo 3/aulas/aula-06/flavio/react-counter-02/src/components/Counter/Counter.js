import React, { Component } from 'react';
import css from './counter.module.css';
import IncrementButton from './IncrementButton';
import DecrementButton from './DecrementButton';
import Value from './Value';
import Steps from './Steps';

export default class Counter extends Component {
  constructor() {
    super();

    this.state = {
      currentCounter: 2,
      steps: 0,
    };
  }

  //tem q usar arrow function, se nao o this fica null
  handleButtonClick = (clickType) => {
    const { currentCounter, steps } = this.state;

    this.setState({
      currentCounter:
        clickType === '+' ? currentCounter + 1 : currentCounter - 1,
      steps: steps + 1,
    });
  };

  //precisa ser className, ao inves de class
  render() {
    const { currentCounter, steps } = this.state;

    return (
      /*<div>
        <img src="./img/teste.png" />
        <h2 className="minha-classe">Exemplo de JSX</h2>
        <ul>
          <li>Teste</li>
          <li>Teste</li>
        </ul>
        Counter
      </div>*/

      //no onclick apenas a referencia a funcao, nao utilizar arrow function
      <div className={css.counterContainer}>
        <DecrementButton onDecrement={this.handleButtonClick} />
        <Value value={currentCounter} />
        <IncrementButton onIncrement={this.handleButtonClick} />
        <Steps currentStep={steps} />
      </div>
    );
  }
}
