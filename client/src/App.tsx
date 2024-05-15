import { useState } from 'react';
import SearchBar from './components/SearchBar';
import CombinationList from './components/CombinationList';

function App() {
    const [combinations, setCombinations] = useState([]);

    const handleSearch = async (searchTerm: string) => {
        try {
            const response = await fetch(`http://localhost:3000/search?term=${encodeURIComponent(searchTerm)}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            setCombinations(data);
        } catch (error) {
            console.error('Error fetching combinations:', error);
        }
    };

    return (
        <div>
            <h1>Smart Search</h1>
            <SearchBar onSearch={handleSearch} />
            <CombinationList combinations={combinations} />
        </div>
    );
}

export default App;