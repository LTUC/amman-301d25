import React, { Component } from 'react'
import Cats from './Cats'; // responsible for displaying the cats data
import Form from './Form'; // display the form for sending the data to the backend
import axios from 'axios';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cats: [],
      showCatsComponent: false,
      server: process.env.REACT_APP_SERVER_URL
    }
  }

  getCats = async (event) => {
    event.preventDefault();

    try {
      const ownerName = event.target.catOwner.value;
      const cats = await axios.get(`${this.state.server}/cat?ownerName=${ownerName}`);
      
      this.setState({
        cats: cats.data,
        showCatsComponent: true
      });
    } catch (error) {
      console.log(error);
    }
  }


  render() {
    return (
      <>
        <div>
         
          <Form
            getCats={this.getCats}
          />
           <Cats
            cats={this.state.cats}
            showCatsComponent={this.state.showCatsComponent}
          />
        </div>
      </>
    )
  }
}

export default App;
