import React from 'react'

const VinylList = (props) => {
    return (
        <ul className="Admin-vinyl-list">
        {props.list.map((record, index) => (
            <li>
                <img src={record.albumart} alt={record.title} />
                <strong>{record.title}</strong> - {record.artist}
            </li>
        ))}
        </ul>
    );
}

class Records extends React.Component {
    constructor(props) {
        super(props);
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

export default Records;