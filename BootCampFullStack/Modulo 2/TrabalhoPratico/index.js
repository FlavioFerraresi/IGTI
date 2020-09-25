import { promises as fs } from 'fs';

let estados = [];
let cidades = [];

async function CriaArquivosEstados() {
  try {
    estados = JSON.parse(await fs.readFile('Estados.json'));
    cidades = JSON.parse(await fs.readFile('Cidades.json'));

    //ordena array de cidade
    cidades = cidades.sort((a, b) => {
      return a.Nome.localeCompare(b.Nome);
    });

    //tentei fazer com foreach acima, mas da erro
    for (const estado of estados) {
      let cidadesDoEstado = cidades
        .filter((cidade) => {
          return cidade.Estado === estado.ID;
        })
        .sort((a, b) => {
          return a.Nome.localeCompare(b.Nome);
        });
      await fs.writeFile(
        `./UFs/${estado.Sigla}.json`,
        JSON.stringify(cidadesDoEstado)
      );

      //guarda no proprio array de estados, a qtde de cada cidade
      estado.qtdeCidades = await ContaCidadesPorEstados(estado.Sigla);
    }
  } catch (err) {
    console.log(err);
  }
}

async function OrdenaEstados(tipo) {
  try {
    if (tipo === 1) {
      //ordena do que tiver mais qtde pro menos
      estados.sort((a, b) => {
        return b.qtdeCidades - a.qtdeCidades;
      });
    } else {
      estados.sort((a, b) => {
        return a.Sigla.localeCompare(b.Sigla);
      });
    }
  } catch (err) {
    console.log(err);
  }
}

async function ContaCidadesPorEstados(uf) {
  try {
    const cidadesDoEstado = JSON.parse(
      await fs.readFile(`./UFs/${uf.toUpperCase()}.json`)
    );
    return cidadesDoEstado.length;
  } catch (err) {
    console.log(err);
  }
}

async function Busca5MaisCidadesPorEstados() {
  try {
    const topFive = [];

    //percorre os 5 mais e monta array final
    for (let index = 0; index < 5; index++) {
      const estado = estados[index];

      topFive.push(`${estado.Sigla} - ${estado.qtdeCidades}`);
    }

    console.log('item 3 - 5 Estados com mais cidades');
    console.log(topFive);
  } catch (err) {
    console.log(err);
  }
}

async function Busca5MenosCidadesPorEstados() {
  try {
    const bottomFive = [];

    //percorre os 5 menos e monta array final
    for (let index = estados.length - 5; index < estados.length; index++) {
      const estado = estados[index];

      bottomFive.push(`${estado.Sigla} - ${estado.qtdeCidades}`);
    }

    console.log('item 4 - 5 Estados com menos cidades');
    console.log(bottomFive);
  } catch (err) {
    console.log(err);
  }
}

async function BuscaMaiorMenorCidadePorEstado() {
  try {
    const cidadesMaiores = [];
    const cidadesMenores = [];

    //percorre todos os estados e busca array de cidades
    for (const estado of estados) {
      const cidadesDoEstado = JSON.parse(
        await fs.readFile(`./UFs/${estado.Sigla.toUpperCase()}.json`)
      );

      //compara cidade a cidade, e guarda nas variaveis
      let nomeCidadeMaiorPorEstado = '';
      let nomeCidadeMenorPorEstado = '';
      for (const cidade of cidadesDoEstado) {
        if (cidade.Nome.length > nomeCidadeMaiorPorEstado.length) {
          nomeCidadeMaiorPorEstado = cidade.Nome;
        }

        if (nomeCidadeMenorPorEstado.length === 0) {
          nomeCidadeMenorPorEstado = cidade.Nome;
        } else {
          if (cidade.Nome.length < nomeCidadeMenorPorEstado.length) {
            nomeCidadeMenorPorEstado = cidade.Nome;
          }
        }
      }

      //grava no array
      cidadesMaiores.push(`${nomeCidadeMaiorPorEstado} - ${estado.Sigla}`);
      cidadesMenores.push(`${nomeCidadeMenorPorEstado} - ${estado.Sigla}`);
    }

    console.log('item 5 - nome de cidade maior por estado');
    console.log(cidadesMaiores);
    console.log('item 6 - nome de cidade menor por estado');
    console.log(cidadesMenores);
  } catch (err) {
    console.log(err);
  }
}

async function BuscaMaiorMenorCidade() {
  try {
    let nomeCidadeMaior = '';
    let idEstadoCidadeMaior = '';
    let nomeCidadeMenor = '';
    let idEstadoCidadeMenor = '';

    //percorre array de cidades
    for (const cidade of cidades) {
      //compara cidade a cidade, e guarda nas variaveis
      if (cidade.Nome.length > nomeCidadeMaior.length) {
        nomeCidadeMaior = cidade.Nome;
        idEstadoCidadeMaior = cidade.Estado;
      }

      if (nomeCidadeMenor.length === 0) {
        nomeCidadeMenor = cidade.Nome;
        idEstadoCidadeMenor = cidade.Estado;
      } else {
        if (cidade.Nome.length < nomeCidadeMenor.length) {
          nomeCidadeMenor = cidade.Nome;
          idEstadoCidadeMenor = cidade.Estado;
        }
      }
    }

    const SiglaEstadoCidadeMaior = estados.find((estado) => {
      return estado.ID === idEstadoCidadeMaior;
    }).Sigla;

    const SiglaEstadoCidadeMenor = estados.find((estado) => {
      return estado.ID === idEstadoCidadeMenor;
    }).Sigla;

    console.log('item 7 - Maior nome de todas as cidades ');
    console.log(`${nomeCidadeMaior} - ${SiglaEstadoCidadeMaior}`);
    console.log('item 8 - Menor nome de todas as cidades ');
    console.log(`${nomeCidadeMenor} - ${SiglaEstadoCidadeMenor}`);
  } catch (err) {
    console.log(err);
  }
}

async function start() {
  try {
    await CriaArquivosEstados();
    await OrdenaEstados(1);
    await Busca5MaisCidadesPorEstados();
    await Busca5MenosCidadesPorEstados();
    await OrdenaEstados(2);
    await BuscaMaiorMenorCidadePorEstado();
    await BuscaMaiorMenorCidade();
  } catch (err) {
    console.log(err);
  }
}

start();
