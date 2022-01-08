import logo from './logo.svg';
import './App.css';
import VinylThumb from './components/Vinyl-Thumb.js'
import Records from './components/Records.js'

/*function VinylThumbList(props) {
  const thumbList = props.list.map(({record}) => 
    <VinylThumb title={record.title}></VinylThumb>
  )

  console.log(thumbList)

  return (
    {thumbList}
  );
}*/

const VinylThumbList = ({list}) => (
  <div className="Vinyl-card-list">
  {list.map((record, index) => (
    <VinylThumb key={index}
      title={record.title}
      artist={record.artist}
      year={record.year}
      albumart={record.albumart}
    />
  ))}
  </div>
  );

function App() {

  const list = [
    {
      title: "Discovery",
      artist: "Daft Punk",
      year: 1997,
      albumart: "https://img.discogs.com/mRSVUm4He6-nJrSMeCOsCQYejG4=/fit-in/600x608/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-2879-1236035472.jpeg.jpg"
    },
    {
      title: "Doom",
      artist: "Mick Gordon & id Software",
      year: 2016,
      albumart: "https://img.discogs.com/F1Q9XSDDErlBS2Q9jsGEIOzBtac=/fit-in/600x600/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-9128583-1476239597-9680.jpeg.jpg"
    },
    {
      title: "Homework",
      artist: "Daft Punk",
      year: 1996,
      albumart: "https://img.discogs.com/WKFUAUCUqUG37clXHdm4iSLzAFE=/fit-in/600x600/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-2947655-1372593375-3536.jpeg.jpg"
    },
    {
      title: "Random Access Memories",
      artist: "Daft Punk",
      year: 2013,
      albumart: "https://img.discogs.com/ktzQ3S3fCH0JdARDarptt0Ir55Y=/fit-in/600x600/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-4570366-1539295092-6087.png.jpg"
    }
  ];

  return (
    <div className="App">
      <header className="App-header">
        <h1>vinyl.rytc.io</h1>
      </header>
      <main className="App-main">
        <div className="Search">
          <input
            type="search"
            placeholder='Search records'
          />
        </div>
        <Records />
      </main>
    </div>
  );
}

export default App;
