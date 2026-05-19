import React, { useState, useEffect } from 'react';
//import { useFetch } from './useFetch';
//import type { NasaResponse } from '.';
//import ImageCard from './imageCard';

const Home: React.FC = () => {
    const [query, setQuery] = useState('');
    const [searchTrigger, setSearchTrigger] = useState('Nebula')
    const [mediaType, setMediaType] = useState('image');
    const [page, setPage] = useState(1);
    const [history, setHistory] = useState<string[]>([]);

    const apiKey = import.meta.env.VITE_NASA_API_KEY || '';
    const url = `https://images-api.nasa.gov/search?q=${searchTrigger}&media_type=${mediaType}&page=${page}&api_key=${apiKey}`;
    //const { data, loading, error } = useFetch<NasaResponse>(url);

    useEffect(() => {
        const savedHistory = JSON.parse(localStorage.getItem('nasa_seach_history') || '[]');
        setHistory(savedHistory);
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;
        setSearchTrigger(query);
        setPage(1);

        const newHistory = [query, ...history.filter(h => h !== query)].slice(0, 5);
        setHistory(newHistory);
        localStorage.setItem('nasa_search_history', JSON.stringify(newHistory));
    };

    return (
        <div className="container">
            <header className='header'>
                <h1 className='title'> NASA Space Explorer</h1>
                <form onSubmit={handleSearch} className='search-form'>
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search for galaxies, stars, missions..."
                        className='search-input'
                    />
                    <button
                        type="submit"
                        className='btn'
                    >
                        Explore
                    </button>
                </form>
            </header>
        </div>
    );
};

export default Home;
