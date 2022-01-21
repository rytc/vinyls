import VinylCard from "../VinylCard";

const VinylList = (props) => {
    const items = props.items;

    return (
        <div className="Vinyl-card-list">
            {items.map((item, index) => (
                <VinylCard key={index} index={index} data={item} onClick={props.onItemClick} />
            ))}
        </div>
    )
}

export default VinylList;