import React, { Component } from 'react';
import css from './counter.module.css';

export default class Counter extends Component {
  constructor() {
    super();

    this.currentCounter = 2;
  }

  handleClick = () => {
    this.currentCounter--;
  };

  //precisa ser className, ao inves de class
  render() {
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
      <div className={css.counterContainer}>
        <button
          onClick={this.handleClick}
          className="waves-effect waves-light btn red darken-4"
        >
          -
        </button>
        <span className={css.counterValue}>{this.currentCounter}</span>
        <button
          onClick={this.handleClick}
          className="waves-effect waves-light btn green darken-4"
        >
          +
        </button>
      </div>
    );
  }
}
