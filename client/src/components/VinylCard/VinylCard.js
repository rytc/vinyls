
const VinylCard = (props) => {
    const data = props.data;

    return (
        <div className="Vinyl-card" onClick={props.onClick}>
            <img src={data.albumart} alt="Album art" />
        </div>
    );
}

export default VinylCard;