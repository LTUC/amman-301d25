import React, { Component } from 'react'

export class UpdateCatForm extends Component {
    render() {
        return (
            <div>
                <form onSubmit={this.props.updateCat}>
                    <input type="text" name='catName' defaultValue={this.props.catName}/>
                    <input type="text" name='catBreed' defaultValue={this.props.catBreed} />
                    <input type="submit" value="Update Cat" />
                </form>
            </div>
        )
    }
}

export default UpdateCatForm
