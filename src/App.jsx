import { useState } from 'react';
import './App.css';
import Cards from './components/Cards.jsx';
import SearchBar from './components/SearchBar.jsx';
import useEventsData from './hooks/useEventsData';

function App() {
  const [searchText, setSearchText] = useState("");

  // Utilisation du hook: toute la logique est ici!
  const { events, isLoading } = useEventsData(searchText); 

  const handleSearch = (text) => {
    setSearchText(text);
  };
  
  return (
    <>
      <SearchBar onSearchChange={handleSearch} /> 
      {/* Gérer l'état de chargement */}
      {isLoading ? (
        <p>Chargement des événements...</p>
      ) : (
        <Cards events={events} /> 
      )}
    </>
  );
}

export default App;