import { useState } from 'react';
import './App.css';
import Cards from './components/Cards.jsx';
import { ButtonLoadMore } from './components/ButtonLoadMore';
import SearchBar from './components/SearchBar.jsx';
import useEventsData from './hooks/useEventsData';

function App() {
  const [searchText, setSearchText] = useState("");
  const { events, isLoading, setEventsLimit } = useEventsData(searchText);

  const handleSearch = (text) => {
    setSearchText(text);
  };

  // La fonction pour incrémenter la limite
  const handleLoadMore = () => {
    setEventsLimit(prevLimit => prevLimit + 20);
  };

  return (
    <>
      <SearchBar onSearchChange={handleSearch} />
      {isLoading ? (
        <p>Chargement des événements...</p>
      ) : (
        <Cards events={events} />
      )}

      <ButtonLoadMore onLoadMore={handleLoadMore}/>
    </>
  );
}

export default App;