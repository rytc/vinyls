import React from 'react'

const VinylList = (props) => {
    return (
        <ul className="Admin-vinyl-list">
        {props.list.map((record, index) => (
            <li>
                <img src={record.albumart} alt={record.title} />
                <b>UPC:</b> {record.upc} - <b>ID:</b> {record.master_id}
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
            records: [],
            jwt: props.jwt
        }
    }
    
    componentDidMount() {
        fetch("/api/records", {
            method: "GET",
            headers: {
                'Authorization': this.state.jwt
            }
        })
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