import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VinylList from '../../components/VinylList';

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
    });

    const onItemClick = (event) => {
        navigate('/record', {state: {data: homeState.records[event.target.dataset.index]}});
    }

    useEffect(() => {
        fetch("/api/records")
            .then(res => res.json())
            .then(result => {
                setHomeState({
                    isLoaded: true,
                    records: result
                });
            },
                (err) => {
                    setHomeState({
                        isLoaded: false,
                        error: err
                    })
                });
    }, []);

    return (
        <>
            <div className="Search">
            </div>
            {homeState.isLoaded ?
                <VinylList items={homeState.records} onItemClick={onItemClick} /> :
                <p>Loading...</p>}
        </>
    )
}

export default Home