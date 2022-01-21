import VinylCard from "../VinylCard";

const VinylList = (props) => {
    const items = props.items;

    return (
        <div className="Vinyl-card-list">
            {items.map((item, index) => (
                <VinylCard key={index} data={item} />
            ))}
        </div>
    )
}

export default VinylList;