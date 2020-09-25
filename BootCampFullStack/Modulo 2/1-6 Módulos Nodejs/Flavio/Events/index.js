import ev from './events.js';

ev.on('testeEvent', (obj2) => {
  console.log('ouviu tb');
});

ev.emit('testeEvent', 'teste flavio de outro arquivo');
