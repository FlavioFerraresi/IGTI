import React, { Component, Fragment } from 'react';
import Counter from './components/Counter/Counter';

//pode tirar o fragment e deixar <> </>

export default class App extends Component {
  render() {
    return (
      <Fragment>
        <Counter />
        <Counter />
        <Counter />
      </Fragment>
    );
  }
}
