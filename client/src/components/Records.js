import React, {useState} from 'react';
import Vinyl from './Vinyl.js'

const VinylList = (props) => {
    return (
        <div className="Vinyl-card-list">
        {props.list.map((record, index) => (
            <Vinyl key={index} data={record} />
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
            return <div>Failed to load records from server</div>
        } else if(!isLoaded) {
            return <div>Loading...</div>
        } else {
            return <VinylList list={records} />
        }
    }
}

export default Records