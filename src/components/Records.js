import React, {useState} from 'react';

function VinylCard(props) {
    return (
        <div className="Vinyl-card">
            <img src={props.albumart} alt={props.title} />
            <h1>{props.title}</h1>
            <h2>{props.artist}</h2>
            <sub>{props.year}</sub>
        </div>
    );
}

const VinylList = (props) => {
    return (
        <div className="Vinyl-card-list">
        {props.list.map((record, index) => (
            <VinylCard key={index}
            title={record.title}
            artist={record.artist}
            year={record.year}
            albumart={record.albumart}
            />
        ))}
        </div>
    );
}


class Records extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            error: null,
            isLoaded: false,
            records: []
        }
    }

    componentDidMount() {
        fetch("/api/records")
            .then(res => res.json())
            .then(result => {
                this.setState({
                    isLoaded: true,
                    records: result
                });
            },
            (err) => {
                this.setState({
                    isLoaded: true,
                    error: err
                })
            });
    }

    render() {
        const {error, isLoaded, records} = this.state;
        if(error) {
            return <div>Error: {error}</div>
        } else if(!isLoaded) {
            return <div>Loading...</div>
        } else {
            return <VinylList list={records} />
        }
    }
}

export default Records