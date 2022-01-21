import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const EditRecord = (props) => {
    const navState = useLocation();
    const navigate = useNavigate();

    const [recordState,  setRecordState] = useState({
        data: null,
        albumart: []
    })

    useEffect(() => {
        if(navState.state.data == null) {
            navigate('/admin', {replace: true});
        } else {
            setRecordState({...recordState, data: navState.state.data});
        }
    }, [])

    const ArtistList = (props) => {
        const data = recordState.data;
        return (
            <h2>
                {data.artists.map((artist, index) => (
                    <>{artist}</>
                ))}
            </h2>
        );
    }

    const handleChangeAlbumArt = (event) => {
        event.preventDefault();

        if(recordState.albumart.length > 0) {
            let art = [];
            setRecordState({...recordState, albumart: art});
        } else {
            fetch(`/api/discogs/get/${recordState.data.master_id}`)
                .then(res => res.json()
                .then(res => {
                    let artlist = []
                    for(let i = 0; i < res.images.length; i++) {
                        artlist.push(res.images[i].resource_url);
                    }
                    setRecordState({...recordState, albumart: artlist});

                    }));
        }
    }

    const RenderChangeAlbumArt = (props) => {
        return (
            <div className="Vinyl-card-list">
                {recordState.albumart.map((art, index) => (
                    <div className="Vinyl-card">
                        <img src={art} alt="album art" />
                    </div>
                ))}
            </div>
        );
    }

    const Render = (props) => {
        const data = recordState.data;
        return (
            <div className="row">
                <div className="col-4">
                    <img src={data.albumart} alt={data.title} />
                </div>
                <div className="col-8">
                    <h1>{data.title}</h1>
                    <ArtistList />
                    <ul>
                        <li>UPC: {data.upc}</li>
                        <li>Master: {data.master_id}</li>
                    </ul>
                    <button className="btn btn-secondary" onClick={handleChangeAlbumArt}>Change Album Art</button>

                    {recordState.albumart.length > 0 &&
                        <><h3>Change Album Art</h3><RenderChangeAlbumArt /> </>}
                </div>
            </div>
        )
    }

    return (
        <div className="container mt-4">
            {recordState.data != null ? 
                <Render /> 
                :
                <p>Loading...</p>}
        </div>
    );
}

export default EditRecord;