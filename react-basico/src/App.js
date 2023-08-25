import React, { Component } from 'react';
import './App.css';

import Comentario from './components/Comentario';

class App extends Component {
  
  state = {
    comentarios: [
      {
        nome: 'João',
        email: 'Joao@mail.com',
        data: new Date(2023, 7, 17, 17, 30, 0),
        mensagem: 'Olá, tudo bem?'
      },
      {
        nome: 'Pedro',
        email: 'pedro@mail.com',
        data: new Date(2023, 8, 10, 15, 45, 0),
        mensagem: 'Olá, sim tudo bem...'
      }
    ],
    novoComentario: {
      nome: '',
      email: '',
      mensagem: ''
    }
  }

  adicionarComentario = evento => {
    evento.preventDefault();
    console.log("Adicionando comentario...")

    const novoComentario = { ...this.state.novoComentario, data: new Date() }
  
    // modo antigo
    // let lista = this.state.comentarios;
    // lista.push(novoComentario);
    // this.setState({ comentarios: lista });
    this.setState({ comentarios: [ ...this.state.comentarios, novoComentario ] })
  }

  removerComentario = comentario => {
    let lista = this.state.comentarios;
    lista = lista.filter(c => c !== comentario)
    this.setState({ comentarios: lista })
  }

  digitacao = evento => {
    const { name, value } = evento.target;
    this.setState({ novoComentario: {...this.state.novoComentario, [name]: value}})
  }

  render() {
    return (
      <div className="App">
        <h1>Meu projeto</h1>

        {this.state.comentarios.map((comentario, indice) => (
          <Comentario 
            key={indice}
            nome={comentario.nome} 
            email={comentario.email} 
            data={comentario.data}
            onRemove={this.removerComentario.bind(this, comentario)}>
            {comentario.mensagem}
          </Comentario>
        ))}

        <form method='post' onSubmit={this.adicionarComentario} className="Novo-Comentario">
          <h2>Adicionar Comentários</h2>
          <div>
            <input 
              type='text' 
              name='nome' 
              value={this.state.novoComentario.nome}
              onChange={this.digitacao}
              required
              placeholder='Digite seu nome'/>
          </div>
          <div>
            <input 
              type='email' 
              name='email'
              value={this.state.novoComentario.email} 
              onChange={this.digitacao}
              required
              placeholder='Digite seu email'/>
          </div>
          <div>
            <textarea 
              name="mensagem" 
              value={this.state.novoComentario.mensagem}
              onChange={this.digitacao}
              required
              rows="4" />
          </div>
          <button type='submit'>Adicionar comentário</button>
        </form>
      </div>
    );
  }
}

export default App;
