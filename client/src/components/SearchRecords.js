import React from 'react'
import { Navigate } from 'react-router-dom'


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

    // Search by UPC
    handleSearch(event) {
        event.preventDefault();
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

    // Search by generic
    handleSearchQuery(event) {
        event.preventDefault();
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
            .then(res => res.json())
            .then(res => {
                if(res.error) {
                    Navigate({ to: "/login", replace: true});
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
                    <ul className="list-group">
                        {data.map((record, index) => (
                            <li key={index} className="list-group-item mb-2 p-4">
                                <img src={record.cover_image} alt={record.title} />
                                <h5>{record.title}</h5> 
                                <h6>{record.year} / {record.country}</h6>
                                <button className="btn btn-primary" onClick={this.handleAdd} data-url={"/api/discogs/add/"+search + "/" + record.master_id}>Add to collection</button>
                                <a className="link-dark" href={"https://discogs.com"+record.uri} target="_blank"> View on Discogs</a>
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
            <form>
                <div className="mb-2">
                    <input class="form-control" type="search" id="query" onChange={this.searchChanged}/>
                </div>
                <div>
                    <button className="btn btn-primary m-1" onClick={this.handleSearch}>Search by UPC</button>
                    <button className="btn btn-secondary" onClick={this.handleSearchQuery}>Search Generic</button>
                </div> 
            </form>
            <this.SearchList />
            </>
        )
    }
}

export default SearchRecords;