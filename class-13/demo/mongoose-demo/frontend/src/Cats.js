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
                                <button onClick={()=>this.props.deleteCat(idx)}>Delete</button>
                                {/* {cat.breed} */}
                            </div>
                        )
                    })
                }
            </>
        );
    }
}

export default Cats
