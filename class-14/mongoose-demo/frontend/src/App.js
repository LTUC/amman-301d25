import React, { Component } from 'react'
import Cats from './Cats'; // responsible for displaying the cats data
import Form from './Form'; // display the form for sending the data to the backend
import axios from 'axios';
import AddCatForm from './AddCatForm';
import UpdateCatForm from './UpdateCatForm';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cats: [],
      showCatsComponent: false,
      server: process.env.REACT_APP_SERVER_URL,
      ownerName: '',
      showUpdateForm: false,
      index: 0,
      catName: '',
      catBreed: ''
    }
  }

  getCats = async (event) => {
    event.preventDefault();

    try {
      // const ownerName = event.target.catOwner.value;
      await this.setState({
        ownerName: event.target.catOwner.value
      })
      // const cats = await axios.get(`${this.state.server}/cat?ownerName=${this.state.ownerName}`);

      let paramObj = {
        ownerName: this.state.ownerName
      }
      const cats = await axios.get(`${this.state.server}/cat`, { params: paramObj });

      this.setState({
        cats: cats.data,
        showCatsComponent: true
      });
    } catch (error) {
      console.log(error);
    }
  }

  // localhost:3001/addCat?catName=fluffy&catBreed=baldi&ownerName=razan
  addCat = async (event) => {
    event.preventDefault();
    let catName = event.target.catName.value;
    let catBreed = event.target.catBreed.value;
    let ownerName = this.state.ownerName

    const catFormData = {
      catName: event.target.catName.value,
      catBreed: event.target.catBreed.value,
      ownerName: this.state.ownerName
    }
    // let catsData = await axios.get(`${this.state.server}/addCat?catName=${catName}&catBreed=${catBreed}&ownerName=${ownerName}`)

    let catsData = await axios.post(`${this.state.server}/addCat`, catFormData)

    this.setState({
      cats: catsData.data
    })

  }


  // localhost:3001/deleteCat/1?ownerName=razan
  deleteCat = async (index) => {
    console.log(index);
    let paramsObj = {
      ownerName: this.state.ownerName
    }
    let catsData = await axios.delete(`${this.state.server}/deleteCat/${index}`, { params: paramsObj })
    // index: req.params >> ownerName:req.query

    // let catsData = await axios.delete(`${this.state.server}/deleteCat`,{params:paramsObj})
    // // index: req.query >> ownerName:req.query

    // let catsData = await axios.delete(`${this.state.server}/deleteCat?ownerName=${this.state.ownerName}&index=${index}`)
    // // index: req.query >> ownerName:req.query

    this.setState({
      cats: catsData.data
    })


  }

  showupdateCatForm = async (index) => {
    await this.setState({
      showUpdateForm: true,
      index: index,
      catName: this.state.cats[index].name,
      catBreed: this.state.cats[index].breed
    })

    // console.log('hhhhhhhhhhhh',this.state.catName)
  }

  updateCat = async (e) =>{
    e.preventDefault();
    let catFormData = {
      catName:e.target.catName.value,
      catBreed:e.target.catBreed.value,
      ownerName:this.state.ownerName
    }
    
    let catsData = await axios.put(`${this.state.server}/updateCat/${this.state.index}`, catFormData)

    this.setState({
      cats:catsData.data
    })
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
            deleteCat={this.deleteCat}
            showCatsComponent={this.state.showCatsComponent}
            showupdateCatForm={this.showupdateCatForm}
          />
          <AddCatForm
            addCat={this.addCat} />

          {this.state.showUpdateForm &&
          <UpdateCatForm
            catName={this.state.catName}
            catBreed={this.state.catBreed}
            updateCat = {this.updateCat}
          />
          }
        </div>
      </>
    )
  }
}

export default App;
