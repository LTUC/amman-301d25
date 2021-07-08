import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form,Button} from 'react-bootstrap';
import axios from 'axios';
import Photo from './components/Photo'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      photoData: []
    }
  }

  getPhotos = async (e) => {
    e.preventDefault();

    await this.setState({
      searchQuery: e.target.sQuery.value
    })
    console.log('inside the getPhotos function')
    //localhost:3001/getPhotos?searchQuery=book
    try {

      let photoRes = await axios.get(`http://localhost:3001/getPhotos?searchQuery=${this.state.searchQuery}`);
      this.setState({ photoData: photoRes.data })
      console.log(this.state.photoData)
    } catch(error) {
      console.log('error in sending axios request',error)
    }

  }

  render() {
    return (
      <>
        <Form onSubmit={this.getPhotos}>
          <Form.Group controlId="searchQuery">
            <Form.Label>Find Photos About...</Form.Label>
            <Form.Control type="text" placeholder="Enter a search term" name='sQuery' />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>

        {this.state.photoData.length &&
        // map
          <Photo
            photo = {this.state.photoData}
          />
        }
      </>
    )
  }
}

export default App;
