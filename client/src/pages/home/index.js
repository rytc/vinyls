import Records from '../../components/Records.js'
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
  return (
    <>
    <div className="Search">
    </div>
    <Records />
    <VinylWindow />
    </>
  )
}

export default Home