import { EventEmitter } from 'events';

const eventEmitter = new EventEmitter();

eventEmitter.on('testeEvent', (obj) => {
  console.log(obj);
});

eventEmitter.on('testeEvent', (obj) => {
  console.log(obj + '2');
});

export default eventEmitter;
