import React, { Component } from 'react'

export class Cats extends Component {
    render() {
        return (
            <>
                { this.props.showCatsComponent &&
                    this.props.cats.map((cat, idx) => {
                        return (
                            <div key={idx}>
                                {cat.name}
                                ********
                                {cat.breed}
                                ********
                                <button onClick={()=>this.props.deleteCat(idx)}>Delete</button>
                                <button onClick={()=>this.props.showupdateCatForm(idx)}>show Update From</button>
                            </div>
                        )
                    })
                }
            </>
        );
    }
}

export default Cats
