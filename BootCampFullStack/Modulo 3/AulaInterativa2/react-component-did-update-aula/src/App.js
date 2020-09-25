import React from 'react';

export default function App() {
  const [paragraph1, setParagraph1] = React.useState('');
  const [paragraph2, setParagraph2] = React.useState('');
  const [paragraph2Length, setParagraph2Length] = React.useState(0);

  React.useEffect(() => {
    document.title = paragraph1.length;
  }, [paragraph1]);

  React.useEffect(() => {
    setParagraph2Length(paragraph2.length);
  }, [paragraph2]);

  // componentDidUpdate(_, previousState) {
  //   console.log('didUpdate');
  //   document.title = this.state.paragraph1.length;

  //   if (previousState.paragraph2 !== this.state.paragraph2) {
  //     this.setState({ sum: this.state.paragraph2.length });
  //   }
  // }

  const handleParagraph1 = ({ target }) => {
    //this.setState({ paragraph1: event.target.value });
    setParagraph1(target.value);
  };

  const handleParagraph2 = (event) => {
    //this.setState({ paragraph2: event.target.value });
    setParagraph2(event.target.value);
  };

  return (
    <div className='container'>
      <h1>React componentDidUpdate</h1>

      <input
        type='text'
        placeholder='Digite aqui'
        value={paragraph1}
        onChange={handleParagraph1}
      />

      <input
        type='text'
        placeholder='Digite aqui'
        value={paragraph2}
        onChange={handleParagraph2}
      />

      <p>Parágrafo 1: {paragraph1}</p>
      <p>Parágrafo 2: {paragraph2}</p>
      <p>Soma de caracteres do parágrafo 2: {paragraph2Length}</p>
    </div>
  );
}
