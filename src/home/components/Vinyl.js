import React from 'react';
import VinylWindow from './VinylWindow';

class Vinyl extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            data: props.data
        }
    }

    handleClick() {
        VinylWindow.show(this.state.data);
    }

    render() {
        const {data} = this.state;
        return (
            <div className="Vinyl-card" onClick={this.handleClick}>
                <img src={data.albumart} alt={data.title} />
            </div>
        );

    }
}

export default Vinyl;