import React from 'react';
import Names from './components/Names';
import Name from './components/Name';

const VOWELS = ['a', 'e', 'i', 'o', 'u'];

function onlyVowelsFrom(text) {
  const newText = text
    .split('')
    .filter((char) => VOWELS.includes(char.toLowerCase()))
    .join('');

  return newText;
}

function onlyConsonantsFrom(text) {
  const newText = text
    .split('')
    .filter((char) => !VOWELS.includes(char.toLowerCase()))
    .join('');

  return newText;
}

export default function App() {
  const [allNames, setAllNames] = React.useState([]);
  const [namesToShow, setNamesToShow] = React.useState([]);
  const [nameCount, setNameCount] = React.useState(0);

  // prettier-ignore
  const [options, setOptions] = 
    React.useState([
      {
        id: 'normal',
        description: 'Normal',
        toggled: true,
        callback: item => item
      },
      {
        id: 'vowels',
        description: 'Vogais',
        toggled: false,
        callback: (item) => onlyVowelsFrom(item),
      },
      {
        id: 'consonants',
        description: 'Consoantes',
        toggled: false,
        callback: (item) => onlyConsonantsFrom(item),
      },
      {
        id: 'normal_and_length',
        description: 'Normal e quantidade de caracteres',
        toggled: false,
        callback: (item) => `${item} (${item.length})`,
      },
    ]);

  React.useEffect(() => {
    const fetchNames = async () => {
      const resources = await fetch('http://localhost:3001/names');
      const json = await resources.json();

      setAllNames([...json.sort()]);
    };

    fetchNames();
  }, []);

  React.useEffect(() => {
    const checkedOption = options.find((option) => option.toggled);
    const callbackToRun = checkedOption.callback;

    const newNamesToShow = allNames
      .filter((_, index) => index < nameCount)
      .map(callbackToRun);

    setNamesToShow(newNamesToShow);
  }, [nameCount, allNames, options]);

  const handleRadioChange = ({ target }) => {
    const { id } = target;
    const newOptions = [...options];

    newOptions.forEach((option) => {
      //console.log(`${option.id} === ${id}`);
      option.toggled = option.id === id;
    });

    setOptions(newOptions);
  };

  return (
    <div className='container'>
      <h1 className='center'>React Names</h1>

      <div>
        <div className='input-field'>
          <input
            id='inputNameCount'
            type='number'
            value={nameCount}
            onChange={({ target }) => setNameCount(Number(target.value))}
          />
          <label htmlFor='inputNameCount' className='active'>
            Quantidade de nomes:
          </label>
        </div>

        {options.map(({ id, description, toggled }) => {
          return (
            <label key={id}>
              <input
                id={id}
                name='radioOptions'
                type='radio'
                checked={toggled}
                onChange={handleRadioChange}
              />
              <span>{description}</span>
            </label>
          );
        })}

        <Names>
          {namesToShow.map((name, index) => {
            return <Name key={`${name}_${index}`}>{name}</Name>;
          })}
        </Names>
      </div>
    </div>
  );
}
