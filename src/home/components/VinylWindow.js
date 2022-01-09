import React from 'react';

class VinylWindow extends React.Component {

    constructor(props) {
        super(props)
        this.hide = this.hide.bind(this);
        this.AlbumData = this.AlbumData.bind(this);
        this.state = {
            data: {},
            show: false,
            isLoaded: false

        };
        VinylWindow.__singleton = this;
    }

    static show(request) {
        VinylWindow.__singleton.show(request);
    }

    hide() {
        this.setState({show: false, isLoaded: false})
        let body = document.getElementsByTagName('body')[0]
        body.style.overflow = 'unset'
    }

    TrackList(props) {
        return (
                <ol>
                    {props.tracklist.map(track => (
                        <li>{track.title} - {track.duration}</li>
                    ))}
                </ol>
            );
    }

    ArtistList(props) {
    return (
                <>
                    {props.artists.map(artist => (
                       <>{artist.name}</>
                    ))}
                </>
            );
    }

    AlbumData(props) {
        const {data} = this.state;
        return (
            <>
            <img src={data.images[0].uri} alt={data.title} />
            <button onClick={this.hide} className='Close-button'>Close</button>
            <h1>{data.title}</h1>
            <h2><this.ArtistList artists={data.artists} />, {data.year}</h2>
            <p>View more <a href={data.uri}>album details here.</a></p>
            <p>
                Genre: {data.genres.join(', ')}
            </p>
            <h2>Track List</h2>
            <this.TrackList tracklist={data.tracklist} />
            </>
        )
    }

    render() {

        if(this.state.show === false) {
            return null;
        } else {
            const {isLoaded} = this.state;
            if(isLoaded === false) {
                return (
                    <>
                    <div className="Vinyl-modal-bg">
                        <div className="Vinyl-modal-window">
                           <p>Loading album details...</p> 
                        </div>
                    </div>
                    </>
                )
            } else {
                return (
                    <>
                    <div className="Vinyl-modal-bg">
                        <div className="Vinyl-modal-window">
                            <this.AlbumData />
                        </div>
                    </div>
                    </>
                );
            }
            
        }
    }

    show(request) {
        this.setState({show: true});
        let body = document.getElementsByTagName('body')[0]
        body.style.overflow = 'hidden'


        fetch(`/api/discogs/get/${request.master_id}`)
            .then(res => res.json())
            .then(result => {
                this.setState({data: result, show: true, isLoaded: true});
                
            },
            (err) => {
                this.setState({show: false, isLoaded: false});
            })            
    }

    

}

export default VinylWindow