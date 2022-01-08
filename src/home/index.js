import Records from './components/Records.js'
import VinylWindow from './components/VinylWindow';

function Home() {
  return (
    <>
    <div className="Search">
        <input
          type="search"
          placeholder='Search records'
        />
    </div>
    <Records />
    <VinylWindow />
    </>
  )
}

export default Home