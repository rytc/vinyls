import React from 'react'


class SearchRecords extends React.Component {
    constructor(props) {
        super(props);
        this.searchChanged = this.searchChanged.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSearchQuery = this.handleSearchQuery.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.SearchList = this.SearchList.bind(this);
        
        this.state = {
            error: null,
            isLoaded: false,
            data: [],
            search: null,
            jwt: props.jwt

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

    handleSearchQuery(event) {
        event.preventDefault();
        console.log("click " + this.state.search)
        fetch(`/api/discogs/search2/${this.state.search}`)
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

    handleAdd(event) {
        event.preventDefault();
        fetch(event.target.dataset.url, {
            headers: {
                "Authorization": this.state.jwt
            }
        })
    }

    SearchList() {
        const {error, data, isLoaded, search} = this.state;

        if(error && isLoaded) {
            return <div>Error loading from discogs: {error}</div>
        } else if(isLoaded) {
            return (
                <>
                    <h3>Search results:</h3>
                    <ul className="Admin-vinyl-list">
                        {data.map((record, index) => (
                            <li>
                                <img src={record.cover_image} alt={record.title} />
                                <strong>{record.title}</strong> - <sub>{record.year} / {record.country}</sub> - 
                                <a href={"https://discogs.com"+record.uri}> View on Discogs</a> - 
                                <button onClick={this.handleAdd} data-url={"/api/discogs/add/"+search + "/" + record.master_id}>Add to collection</button>
                            </li>
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
                <button onClick={this.handleSearch}>Search by UPC</button>
                <button onClick={this.handleSearchQuery}>Search</button>
                <this.SearchList />
            </>
        )
    }
}

export default SearchRecords;