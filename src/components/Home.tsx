import React, { useState } from 'react';

const Home: React.FC = () => {
    const [query, setQuery] = useState('');

    return (
        <div className="container">
            <header className='header'>
                <h1 className='title'>
                    NASA Space Explorer
                </h1>
                <form className='search-form'>
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
