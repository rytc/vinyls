import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Record = (props) => {
    const navState = useLocation();
    const navigate = useNavigate();

    const [recordState, setRecordState] = useState({
        data: null,
        isLoaded: false
    })

    useEffect(() => {
        
        if(navState.state.data == null) {
            navigate('/', {replace: true});
        } else {
            fetch(`/api/discogs/get/${navState.state.data.master_id}`)
            .then(res => res.json())
            .then(result => {
                setRecordState({data: result, isLoaded: true});
            },
            (err) => {
                navigate('/', {replace: true});
            })
        }
    }, [])

    const TrackList = (props) => {
        return (
                <ol>
                    {props.tracklist.map((track, index) => (
                        <li key={index}>{track.title} - {track.duration}</li>
                    ))}
                </ol>
            );
    }
   
    const ArtistList = (props) => {
        return (
            <>
                {props.artists.map((artist, index) => (
                    <>{artist.name}</>
                ))}
            </>
        );
    }

    const AlbumData = (props) => {
        const data = recordState.data;

        return (
            <div className="row">
                <div className="col-lg-4">
                    <img src={data.images[0].uri} alt={data.title} />
                </div>
                <div className="col-lg-8">
                    <h1>{data.title}</h1>
                    <h2><ArtistList artists={data.artists} />, {data.year}</h2>
                    <p>View more <a href={data.uri}>album details here.</a></p>
                    <p>
                        Genre: {data.genres.join(', ')}
                    </p>
                    <h2>Track List</h2>
                    <TrackList tracklist={data.tracklist} />
                </div>
            </div>
        )
    }


    return (
        <div className="container mt-4">
            {recordState.isLoaded ? 
                <AlbumData />
                :
                <p>Loading...</p>
            }
        </div>
    )
}

export default Record