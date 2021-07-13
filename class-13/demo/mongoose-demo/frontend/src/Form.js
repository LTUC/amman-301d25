import React, { Component } from 'react'

export class Form extends Component {
    render() {
        return (
            <form onSubmit={this.props.getCats}>
                <label>Enter your name</label>
                <input type="text" name='catOwner' />
                <input type="submit" value="get cats" />
            </form>
        )
    }
}

export default Form
