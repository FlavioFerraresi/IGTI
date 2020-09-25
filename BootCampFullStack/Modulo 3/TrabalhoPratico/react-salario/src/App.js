import React, { Component } from 'react';
import ReadOnlyInput from './components/ReadOnlyInput';
import { calculateSalaryFrom } from './helpers/salary';
import BarraHorizontal from './components/BarraHorizontal';
import { formatNumberMoney } from './helpers/formatHelpers';

function calculaValoresFrom(number) {
  const valores = calculateSalaryFrom(number);
  const {
    baseINSS,
    discountINSS,
    percentDiscountINSS,
    baseIRPF,
    discountIRPF,
    percentDiscountIRPF,
    netSalary,
    percentNetSalary,
  } = valores;

  return {
    baseInss: formatNumberMoney(baseINSS),
    descontoInss: `${formatNumberMoney(
      discountINSS
    )} (${percentDiscountINSS.toFixed(2)}%)`,
    percentualDescontoInss: percentDiscountINSS.toFixed(2),
    baseIrpf: formatNumberMoney(baseIRPF),
    descontoIrpf: `${formatNumberMoney(
      discountIRPF
    )} (${percentDiscountIRPF.toFixed(2)}%)`,
    percentualDescontoIpf: percentDiscountIRPF.toFixed(2),
    salarioLiquido: `${netSalary} (${percentNetSalary.toFixed(2)}%)`,
    percentualSalarioLiquido: percentNetSalary.toFixed(2),
  };
}

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      salarioBruto: 3900,

      calculos: {
        baseInss: 0,
        descontoInss: 0,
        percentualDescontoInss: 0,
        baseIrpf: 0,
        descontoIrpf: 0,
        percentualDescontoIpf: 0,
        salarioLiquido: 0,
        percentualSalarioLiquido: 0,
      },
    };
  }

  handleInputChange = (event) => {
    const inputText = event.target.value;
    this.setState({ salarioBruto: Number(inputText) });
  };

  componentDidMount() {
    const calculos = calculaValoresFrom(this.state.salarioBruto);
    this.setState({ calculos });
  }

  componentDidUpdate(_, previousState) {
    if (this.state.salarioBruto !== previousState.salarioBruto) {
      const calculos = calculaValoresFrom(this.state.salarioBruto);
      this.setState({ calculos });
    }
  }

  render() {
    const { salarioBruto, calculos, bar1, bar2 } = this.state;
    const {
      baseInss,
      descontoInss,
      percentualDescontoInss,
      baseIrpf,
      descontoIrpf,
      percentualDescontoIpf,
      salarioLiquido,
      percentualSalarioLiquido,
    } = calculos;

    return (
      <div
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          padding: '10px',
          marginRight: '10px',
          marginLeft: '10px',
        }}
      >
        <h1>React Salario - Trabalho Prático - Modulo 3</h1>

        <label>
          <span style={{ marginRight: '10px' }}>Salario Bruto:</span>
          <input
            type="text"
            value={salarioBruto}
            onChange={this.handleInputChange}
          />
        </label>

        <br />
        <br />

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'left',
          }}
        >
          <ReadOnlyInput label="Base INSS: " value={baseInss} color="black" />
          <ReadOnlyInput
            label="Desconto INSS: "
            value={descontoInss}
            color="#e67e22"
          />
          <ReadOnlyInput label="Base IRPF: " value={baseIrpf} color="black" />
          <ReadOnlyInput
            label="Desconto IRPF: "
            value={descontoIrpf}
            color="#c0392b"
          />
        </div>
        <ReadOnlyInput
          label="Salario Liquido: "
          value={salarioLiquido}
          color="#16a085"
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <BarraHorizontal value={percentualDescontoInss} color="#e67e22" />
          <BarraHorizontal value={percentualDescontoIpf} color="#c0392b" />
          <BarraHorizontal value={percentualSalarioLiquido} color="#16a085" />
        </div>

        <br />
        <br />
      </div>
    );
  }
}
