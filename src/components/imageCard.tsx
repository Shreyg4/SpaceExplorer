import { useNavigate } from "react-router-dom";
import type { NasaItem } from "./index.ts";

interface Props {
    item: NasaItem;
}

const ImageCard = ({ item }: Props) => {
    const navigate = useNavigate();
    const data = item.data[0];
    const imageUrl = item.links?.[0].href;

    if (!imageUrl || data.media_type !== 'image') return null;

    return (
        <div className="card" onClick={() => navigate(`/image/${data.nasa_id}`)}>
            <img src={imageUrl} alt={data.title} className="card-img" loading="lazy" />
            <div className="card-content">
                <h3 className="card-title">{data.title}</h3>
                <div className="card-meta">
                    <span>{new Date(data.date_created).getFullYear()}</span>
                    <span style={{ textTransform: 'capitalize' }}>{data.media_type}</span>
                </div>
            </div>
        </div>
    );
};

export default ImageCard;