import React, { Component } from 'react'

export class AddCatForm extends Component {
    render() {
        return (
            <form onSubmit={this.props.addCat}>
                <input placeholder='Enter Cat name' type="text" name='catName' />
                <input placeholder='Enter Cat Breed' type="text" name='catBreed' />
                <input type="submit" value="Add Cat" />
            </form>
        )
    }
}

export default AddCatForm;
