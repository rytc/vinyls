import React from 'react'


class SearchRecords extends React.Component {
    constructor(props) {
        super(props);
        this.searchChanged = this.searchChanged.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.SearchList = this.SearchList.bind(this);
        this.state = {
            error: null,
            isLoaded: false,
            data: [],
            search: null
        }
    }
    
    searchChanged(event) {
        this.setState({search: event.target.value})
    }

    handleSearch(event) {
        event.preventDefault();
        console.log("click " + this.state.search)
        fetch(`/api/discogs/search/${this.state.search}`)
            .then(res => res.json())
            .then(result => {
                this.setState({
                    isLoaded: true,
                    data: result.results,
                    error: null
                });
                console.log("Got results");
            },
            (err) => {
                this.setState({
                    isLoaded: true,
                    error: err
                })
            });
    }

    SearchList() {
        const {error, data, isLoaded} = this.state;

        if(error && isLoaded) {
            return <div>Error loading from discogs: {error}</div>
        } else if(isLoaded) {
            return (
                <>
                    <ul>
                        {data.map((record, index) => (
                            <li>{record.title}</li>
                        ))}
                    </ul>
                </>
            )
        }
        return null;
    }


    render() {
        return (
            <>
                <input type="search" id="query" onChange={this.searchChanged}/>
                <button onClick={this.handleSearch}>Search</button>
                <this.SearchList />
            </>
        )
    }
}

export default SearchRecords;