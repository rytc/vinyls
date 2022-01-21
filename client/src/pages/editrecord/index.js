import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const EditRecord = (props) => {
    const navState = useLocation();
    const navigate = useNavigate();

    const [recordState,  setRecordState] = useState({
        data: null,
        albumart: [],
        albumList: []
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
            setRecordState({...recordState, albumart: art, albumList: []});
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

    const handleSearchUPC = (event) => {
        event.preventDefault();
        fetch(`/api/discogs/search/${recordState.data.upc}`)
            .then(res => res.json())
            .then(result => {
                console.log(result);
                setRecordState({
                    ...recordState,
                    albumart: [],
                    albumList: result.results,
                });
            },
            (err) => {
            });
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

    const RenderUPCList = (props) => {
        return (
            <>
                {recordState.albumList.map((record, index) => (
                <li key={index} className="list-group-item mb-2 p-4">
                    <img src={record.cover_image} alt={record.title} />
                    <h5>{record.title}</h5> 
                    <h6>{record.year} / {record.country}</h6>
                    <ul>
                        <li>UPC: {record.catno}</li>
                        <li>Master: {record.master_id}</li>
                    </ul>
                    <a className="link-dark" href={"https://discogs.com"+record.uri} target="_blank"> View on Discogs</a>
                </li>
            ))}
            </>
        )
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
                    <button className="btn btn-secondary m-2" onClick={handleChangeAlbumArt}>Change Album Art</button>
                    <button className="btn btn-secondary" onClick={handleSearchUPC}>Re-search by UPC</button>
                    {recordState.albumart.length > 0 &&
                        <><h3>Change Album Art</h3><RenderChangeAlbumArt /> </>}

                    {recordState.albumList.length > 0 && 
                        <><h3>UPC Search</h3> <RenderUPCList /></>}
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