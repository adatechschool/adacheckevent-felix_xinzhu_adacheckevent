import { useState } from "react";
import "./App.css";
import Cards from "./components/Cards.jsx";
import { ButtonLoadMore } from "./components/ButtonLoadMore";
import SearchBar from "./components/SearchBar.jsx";
import useEventsData from "./hooks/useEventsData";

function App() {
  const [searchText, setSearchText] = useState("");
  const { events, isLoading, setOffset } = useEventsData(searchText);

  const handleSearch = (text) => {
    setSearchText(text);
  };


  return (
    <>
      <SearchBar onSearchChange={handleSearch} />
      {isLoading ? (
        <p>Chargement des événements...</p>
      ) : (
        <Cards events={events} />
      )}

      <ButtonLoadMore offset={setOffset} />
    </>
  );
}

export default App;
