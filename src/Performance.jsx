import React, { Component } from "react";
//importando biblioteca que faz requisições para a API
import axios from "axios";
//importando biblioteca de grafico
// http://recharts.org/en-US/
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";

export class Performance extends Component {
  constructor(props) {
    super(props);
    //definindo estagio inicial do objeto como um array vazio
    this.state = { performanceData: [] };
  }
  //Essa função é chamada assim que o componente tiver sido carregado
  componentDidMount() {
    //Chamando a função para fazer requisições na API
    this.getUserPerformance();
  }

  //Função que faz requisição na API e retorna a performance do usuário
  async getUserPerformance() {
    try {
      //Requisição na API
      const userPerformance = await axios.get(
        "http://localhost:8080/performance/1"
      );
      //populando o objeto com a resposta da API
      this.setState({ performanceData: userPerformance.data });
    } catch (e) {
      console.log(e);
    }
  }
  //Função que renderiza componentes na tela
  render() {
    //referenciando o objeto que irá preencher o gráfico
    const { performanceData } = this.state;
    //Renderizando o grafico
    return (
      <LineChart width={600} height={300} data={performanceData}>
        <Line type="monotone" dataKey="performance" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="date" />
        <YAxis />
      </LineChart>
    );
  }
}
