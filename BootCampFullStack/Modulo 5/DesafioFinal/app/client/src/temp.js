import React from 'react';

/**
 * Importante para o total funcionamento
 * do Materialize, incluindo as funcionalidades
 * que precisam de JavaScript
 */
import M from 'materialize-css';

import './styles.css';

const programmingLanguages = [
  {
    id: 1,
    name: 'JavaScript',
  },
  {
    id: 2,
    name: 'Java',
  },
  {
    id: 3,
    name: 'Python',
  },
];

const dataBases = [
  {
    id: 1,
    name: 'MongoDB',
  },
  {
    id: 2,
    name: 'MySQL',
  },
  {
    id: 3,
    name: 'Oracle',
  },
];

export default function App() {
  /**
   * Na minha experiência, os valores de <select>'s funcionam
   * melhor com primitivos. Neste caso, estou utilizando
   * os id's dos objetos
   */
  const [languageId, setLanguageId] = React.useState(
    programmingLanguages[0].id
  );
  const [languageName, setLanguageName] = React.useState(
    programmingLanguages[0].name
  );

  const [dataBaseId, setDataBaseId] = React.useState(dataBases[0].id);
  const [dataBaseName, setDataBaseNameName] = React.useState(dataBases[0].name);

  /**
   * Ativando o JavaScript
   * do Materialize
   */
  React.useEffect(() => {
    M.AutoInit();
  }, []);

  /**
   * Quando o id é alterado através da interação
   * no <select> reagimos para obter name com
   * useEffect
   */
  React.useEffect(() => {
    const languageObject = programmingLanguages.find(
      (language) => language.id === languageId
    );
    setLanguageName(languageObject.name);
  }, [languageId]);

  React.useEffect(() => {
    const dataBaseObject = dataBases.find(
      (dataBase) => dataBase.id === dataBaseId
    );
    setDataBaseNameName(dataBaseObject.name);
  }, [dataBaseId]);

  const handleLanguageChange = (event) => {
    const newLanguage = parseInt(event.target.value, 10);
    setLanguageId(newLanguage);
  };

  const handleDataBaseChange = (event) => {
    const newDataBase = parseInt(event.target.value, 10);
    setDataBaseId(newDataBase);
  };

  return (
    <div className="container">
      <h1 className="center">
        Alternativas de utilização da tag &lt;select&gt; com React e Materialize
      </h1>

      <h2>&lt;select&gt; puro, com className='browser-default'</h2>
      <select
        className="browser-default"
        value={languageId}
        onChange={handleLanguageChange}
      >
        {programmingLanguages.map((language) => {
          const { id, name } = language;
          return (
            <option key={id} value={id}>
              {name}
            </option>
          );
        })}
      </select>

      <p>
        Minha linguagem de programação preferida é{' '}
        <strong>{languageName}</strong>.
      </p>

      <br />
      <hr />

      <h2>
        &lt;select&gt; com Materialize (verifique useEffect com deps = [])
      </h2>
      <select value={dataBaseId} onChange={handleDataBaseChange}>
        {dataBases.map((dataBase) => {
          const { id, name } = dataBase;
          return (
            <option key={id} value={id}>
              {name}
            </option>
          );
        })}
      </select>

      <p>
        Meu banco de dados preferido é <strong>{dataBaseName}</strong>.
      </p>
    </div>
  );
}
