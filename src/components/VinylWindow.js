import React from 'react';

class VinylWindow extends React.Component {

    constructor(props) {
        super(props)
        this.hide = this.hide.bind(this);
        this.state = {
            data: {},
            show: false
        };
        VinylWindow.__singleton = this;
    }

    static show(data) {
        VinylWindow.__singleton.show(data);
    }

    hide() {
        this.setState({show: false})
    }

    render() {
        if(this.state.show === false) {
            return null;
        } else {
            const {data} = this.state;
            return (
                <>
                <div className="Vinyl-modal-bg" onClick={this.hide}>
                    <div className="Vinyl-modal-window">
                        <img src={data.albumart} alt={data.tile} />
                        <h1>{data.title}</h1>
                        <h2>{data.artist}</h2>
                        <p>Released in {data.year}</p>
                    </div>
                </div>
                </>
            );
        }
    }

    show(data) {
        this.setState({data: data, show: true});
    }

    

}

export default VinylWindow