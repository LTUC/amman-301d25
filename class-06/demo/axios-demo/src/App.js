import React from 'react';
import axios from 'axios';
// npm install dotenv


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      cityData:{},
      searchQuery:'',
      showMap: false,
      showErrorMessage: false
    }
  }

  getLocation = async (e) => {
    e.preventDefault();

    await this.setState({
      searchQuery: e.target.city.value
    })

    console.log('aaaaaaaaaaaaaa',this.state.searchQuery)


    let url = `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.searchQuery}&format=json`;

    try {
      let resData = await axios.get(url);
      console.log(resData)
      console.log(resData.data)
      console.log(resData.data[0])
  
      this.setState({
        cityData: resData.data[0],
        showMap:true
      })
    } catch {
      this.setState({
        showErrorMessage: true
      })
    }

  }

  render() {
    return (
      <div>
        <h1>City Explorer</h1>
        {/* <button onClick={this.getLocation}>Get Location Data</button> */}
        <form onSubmit={this.getLocation}>
          <input type='text' placeholder='city name' name='city'/>
          <input type='submit' value='get City data'/>
        </form>

        <p>City Name: {this.state.cityData.display_name},{this.state.cityData.lat},{this.state.cityData.lon}</p>

        {this.state.showMap && 
        <img alt='' src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=15`} />
        }      

        {this.state.showErrorMessage &&
        <p>something went wrong in getting data from locationiq</p>
        }
        
      </div>
    )
  }
}

export default App;
