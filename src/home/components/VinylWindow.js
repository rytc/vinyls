import React from 'react';

class VinylWindow extends React.Component {

    constructor(props) {
        super(props)
        this.hide = this.hide.bind(this);
        this.state = {
            data: {},
            show: false

        };
        VinylWindow.__singleton = this;
    }

    static show(request) {
        VinylWindow.__singleton.show(request);
    }

    hide() {
        this.setState({show: false})
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
                <p>
                    {props.artists.map(artist => (
                       <>{artist.name}</>
                    ))}
                </p>
            );
    }

    render() {

        if(this.state.show === false) {
            return null;
        } else {
            const {data} = this.state;
            return (
                <>
                <div className="Vinyl-modal-bg" onClick={this.hide}>
                    <div className="Vinyl-modal-window">
                        <img src={data.images[0].uri} alt={data.title} />
                        <h1>{data.title}</h1>
                        <this.ArtistList artists={data.artists} />
                        <p>Released in {data.year}, more <a href={data.uri}>album details here.</a></p>
                        <p>
                            {data.genres.join(', ')}
                        </p>
                        <this.TrackList tracklist={data.tracklist} />
                    </div>
                </div>
                </>
            );
        }
    }

    show(request) {
        fetch(`/api/discogs/get/${request.master_id}`)
            .then(res => res.json())
            .then(result => {
                this.setState({data: result, show: true});
            },
            (err) => {
                this.setState({show: false});
            })            
    }

    

}

export default VinylWindow