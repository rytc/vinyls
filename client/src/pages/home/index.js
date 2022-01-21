import { useEffect, useState } from 'react';
import VinylList from '../../components/VinylList';
import VinylWindow from '../../components/VinylWindow';

/*
<div className="Search">
        <input
          type="search"
          placeholder='Search records'
        />
    </div>
*/

function Home() {
  const [homeState, setHomeState] = useState({
    records: [],
    isLoaded: false,
    error: null,
  });

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
            <VinylList items={homeState.records} /> :
            <p>Loading...</p>}
        <VinylWindow />
    </>
  )
}

export default Home