import Records from './components/Records.js'
import VinylWindow from './components/VinylWindow';

/*
<div className="Search">
        <input
          type="search"
          placeholder='Search records'
        />
    </div>
*/

function Home() {
  return (
    <>
    <div className="Search">
        <p>List of all my records. Record data is pulled from <a href="https://discogs.com">Discogs</a>. Work in progress!</p>
    </div>
    <Records />
    <VinylWindow />
    </>
  )
}

export default Home