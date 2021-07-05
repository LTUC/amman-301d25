import React from 'react';
import axios from 'axios';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pokeData:{}
    }
  }

  getPokemon = async () =>{
    //localhost:3001/getPokeInfo?pokeName=charmander
    let pokemonData = await axios.get(`${process.env.REACT_APP_SERVER}/getPokeInfo?pokeName=charmander`);

    console.log(pokemonData.data);
    this.setState({
      pokeData: pokemonData.data
    })

  }


  render() {
    return (
      <div>
        <h1>City Explorer</h1>
        <button onClick={this.getPokemon}>get Pokemon Info</button>

        <p>{this.state.pokeData.name}</p>
        <p>{this.state.pokeData.url}</p>
      </div>
    )
  }
}

export default App
