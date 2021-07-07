import React from 'react';
import axios from 'axios';

import Map from './components/Map';
import Weather from './components/Weather';


export class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      locData: '',
      searchQuery: '',
      show: false,
      errorMsg: false,
      moviesData: [],
      errorMsgMovie: false
    }
  }


  getLocation = async (e) => {
    e.preventDefault();
    
    await this.setState({
      searchQuery: e.target.cityName.value
    })
    
    let url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_CITY_KEY}&q=${this.state.searchQuery}&format=json`;

    try {
      let locResult = await axios.get(url);
      console.log(locResult.data[0].display_name);
      this.setState({
        locData: locResult.data[0],
        show: true,
        errorMsg: false
      })
      console.log(this.state.locData)
    }
    catch {
      this.setState({
        show: false,
        errorMsg: true
      })
    }

    console.log(this.state.searchQuery);
    this.displayMovies(this.state.searchQuery)
  }


  displayMovies = async (city) => {
    try {
      const movie = await axios.get(`${process.env.REACT_APP_SERVER}/movie`, { params: { searchQuery: city } });
      this.setState({
        moviesData: movie.data,
        errorMsgMovie: false
      })
    } catch (error) {
      this.setState({
        errorMsgMovie: true
      })
    }
  }


  render() {
    return (
      <div>
        <h1>City Explorer</h1>

        <form onSubmit={this.getLocation}>
          <input name='cityName' type='text' placeholder='city name' />
          <input type="submit" value='get city' />
        </form>


        {/* LOCATION */}
        <p>
          {this.state.locData.display_name}
        </p>

        <br />


        {this.state.errorMsg &&
          <p>Error in getting the location data</p>
        }

      
        {/* MOVIES */}
        <hr />
        {this.state.moviesData.map((movie, index) => (
          <div key={index}>
            <p>Movie Title: {movie.title}</p>
            {/* <p>description: {movie.description}</p> */}
          </div>
        ))}

        {this.state.errorMsgMovie &&
          <p>Error in getting the Movies data</p>
        }

      </div>
    )
  }
}

export default App;
