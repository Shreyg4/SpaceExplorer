import React, { useState, useEffect } from 'react';
import { useFetch } from './useFetch';
import type { NasaResponse } from './index';
import ImageCard from './imageCard';

const Home: React.FC = () => {
    const [query, setQuery] = useState('');
    const [searchTrigger, setSearchTrigger] = useState('Nebula')

    const [page, setPage] = useState(1);
    const [history, setHistory] = useState<string[]>([]);

    const url = `https://images-api.nasa.gov/search?q=${searchTrigger}&media_type=image&page=${page}`;
    const { data, loading, error } = useFetch<NasaResponse>(url);

    useEffect(() => {
        const savedHistory = JSON.parse(localStorage.getItem('nasa_search_history') || '[]');
        setHistory(savedHistory);
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;
        setSearchTrigger(query);
        setPage(1);

        // Update history
        const newHistory = [query, ...history.filter(h => h !== query)].slice(0, 5);
        setHistory(newHistory);
        localStorage.setItem('nasa_search_history', JSON.stringify(newHistory));
    };

    const handlePillClick = (term: string) => {
        setQuery(term);
        setSearchTrigger(term);
        setPage(1);
    };

    const clearHistory = () => {
        setHistory([]);
        localStorage.removeItem('nasa_search_history');
    };

    return (
        <div className="container">
            <div className='header'>
                <h1 className='title'> NASA Space Explorer</h1>
                <form onSubmit={handleSearch} className='search-form'>
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search for galaxies, stars, missions..."
                        className='search-input'
                    />
                    <button type="submit" className='btn'>
                        Explore
                    </button>
                </form>

                {history.length > 0 && (
                    <div className='history-container'>
                        {history.map((term, idx) => (
                            <span key={idx} className="history-pill"
                                onClick={() => handlePillClick(term)}>
                                {term}
                            </span>
                        ))}
                        <button className="clear-history-btn" onClick={clearHistory}>
                            ✕ Clear
                        </button>
                    </div>
                )}

            </div>

            {loading && <div className="loader">Traversing the cosmos...</div>}
            {error && <div className="error">{error}</div>}

            {!loading && !error && data && (
                <>
                    <div className="grid">
                        {data.collection.items.map((item) => (
                            <ImageCard key={item.data[0].nasa_id} item={item} />
                        ))}
                    </div>

                    <div className="pagination">
                        <button
                            className="btn"
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            disabled={page === 1}
                        >
                            Previous
                        </button>
                        <span>Page {page}</span>
                        <button
                            className="btn"
                            onClick={() => setPage(p => p + 1)}
                            disabled={data.collection.items.length === 0}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Home;
