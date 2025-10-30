import { useState } from "react";
import "./App.css";
import Cards from "./components/Cards.jsx";
import { ButtonLoadMore } from "./components/ButtonLoadMore";
import SearchBar from "./components/SearchBar.jsx";
import useEventsData from "./hooks/useEventsData";

function App() {
  const [searchText, setSearchText] = useState("");
  const { events, isLoading, setLimit } = useEventsData(searchText);

  const handleSearch = (text) => {
    setSearchText(text);
    setLimit(5); // reset à 5 sur une nouvelle recherche
  };

  const handleLoadMore = () => {
    setLimit((prev) => prev + 5); // ajoute 5 de plus
  };

  return (
    <>
      <SearchBar onSearchChange={handleSearch} />

      {isLoading && events.length === 0 ? (
        <p>Chargement des événements...</p>
      ) : (
        <Cards events={events} />
      )}

      {!isLoading && events.length > 0 && (
        <ButtonLoadMore onClick={handleLoadMore} />
      )}
    </>
  );
}

export default App;
