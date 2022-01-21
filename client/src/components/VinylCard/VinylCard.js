
const VinylCard = (props) => {
    const data = props.data;

    return (
        <div className="Vinyl-card" onClick={props.onClick}>
            

            <img src={data.albumart} alt="Album art" />
            <div className="Vinyl-info">
                <h4>{data.title}</h4>
                <h5>{data.artists[0]}</h5>
            </div>
        </div>
    );
}

export default VinylCard;