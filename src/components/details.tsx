import { useParams, useNavigate } from 'react-router-dom';
import { useFetch } from './useFetch';
import type { NasaResponse } from './index';

const Detail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    // We use the search endpoint targeting the exact nasa_id to get full metadata easily
    const url = `https://images-api.nasa.gov/search?nasa_id=${id}`;
    const { data, loading, error } = useFetch<NasaResponse>(url);

    if (loading) return <div className="loader">Retrieving data...</div>;
    if (error) return <div className="error">{error}</div>;

    const item = data?.collection.items[0];
    if (!item) return <div className="error">Image not found.</div>;

    const info = item.data[0];
    const imageUrl = item.links?.[0]?.href;

    return (
        <div className="detail-container">
            <button className="btn back-btn" onClick={() => navigate(-1)}>
                &larr; Back to Catalog
            </button>

            {imageUrl && <img src={imageUrl} alt={info.title} className="detail-img" />}

            <h1 className="detail-title">{info.title}</h1>

            <div className="detail-meta">
                <span><strong>Date:</strong> {new Date(info.date_created).toLocaleDateString()}</span>
                {info.photographer && <span><strong>Photographer:</strong> {info.photographer}</span>}
                <span><strong>NASA ID:</strong> {info.nasa_id}</span>
            </div>

            <p className="detail-desc">{info.description || 'No official description provided by NASA.'}</p>
        </div>
    );
};

export default Detail;