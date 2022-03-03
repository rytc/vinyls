import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VinylList from '../../components/VinylList';
import Fuse from 'fuse.js';
/*
<div className="Search">
        <input
          type="search"
          placeholder='Search records'
        />
    </div>
*/

function Home() {
    const navigate = useNavigate();
    const [homeState, setHomeState] = useState({
        records: [],
        isLoaded: false,
        error: null,
        search: []
    });

    const searchParameters = {
        includeScore: false,
        ignoreLocation: true,
        threshold: 0.0,
        keys: ['title', 'artists']
    }


    const onItemClick = (event) => {
        if(homeState.search.length > 0) {
            navigate('/record', {state: {data: homeState.search[event.target.dataset.index]}});
        } else {
            navigate('/record', {state: {data: homeState.records[event.target.dataset.index]}});
        }
    }

    const onSearchChange = (event) => {
        event.preventDefault();
        const value = event.target.value;
        console.log(value);
        const fuse = new Fuse(homeState.records, searchParameters)
        let searchResults = fuse.search(value);
        console.log(searchResults);
        searchResults = searchResults.map(result => result.item)
        setHomeState({...homeState, search: searchResults});
    }

    useEffect(() => {
        fetch("/api/records")
            .then(res => res.json())
            .then(result => {
                setHomeState({
                    ...homeState,
                    isLoaded: true,
                    records: result
                });
            },
                (err) => {
                    setHomeState({
                        ...homeState,
                        isLoaded: false,
                        error: err
                    })
                });
    }, []);


    return (
        <>
            <div className="Search">
                <input type="text" onChange={onSearchChange} placeholder="Search..." />
            </div>
            {homeState.isLoaded ?
                <VinylList items={homeState.search.length > 0 ? homeState.search : homeState.records} onItemClick={onItemClick} /> :
                <p>Loading...</p>}
        </>
    )
}

export default Home