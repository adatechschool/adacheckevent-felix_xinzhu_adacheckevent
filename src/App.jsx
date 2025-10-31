import { useState } from "react";
import "./App.css";
import Cards from "./components/Cards.jsx";
import { ButtonLoadMore } from "./components/ButtonLoadMore";
import SearchBar from "./components/SearchBar.jsx";
import useEventsData from "./hooks/useEventsData";

const getInitialSearchText = () => {
  const path = window.location.pathname;
  const segments = path.split("/").filter(Boolean);

  if (segments.length >= 2 && segments[segments.length - 2] === "tag") {
    return decodeURIComponent(segments[segments.length - 1]);
  }
  return "";
};

function App() {
  const [searchText, setSearchText] = useState(getInitialSearchText);
  const { events, isLoading, setOffSet } = useEventsData(searchText);

  const handleSearch = (text) => {
    setSearchText(text);
    setOffSet(0); //remettre offset à zéro quand on fait une nouvelle recherche
  };

  const handleLoadMore = () => {
    setOffSet((value) => value + 5); // ajoute 5 de plus
  };

  return (
    <>
      <div class="logoContainer" className="w-[200px] h-[200px] mr-auto ml-auto">
        <img src="src/assets/logo.png" />
      </div>

      <SearchBar onSearchChange={handleSearch} initialText={searchText} />

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
