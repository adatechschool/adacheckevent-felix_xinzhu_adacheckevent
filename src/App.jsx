import { useState, useEffect } from "react";
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
    const [favArr, setFavArr] = useState([]);
  // const [favData, setFavData] = useState([])
  const [showFav, setShowFav] = useState(false);
  const { events, isLoading, setOffSet } = useEventsData(
    searchText,
    favArr,
    showFav
  );


  const handleSearch = (text) => {
    setSearchText(text);
    setOffSet(0); //remettre offset à zéro quand on fait une nouvelle recherche
  };

  const handleLoadMore = () => {
    setOffSet((value) => value + 5); // ajoute 5 de plus
  };

    return (
      <>
        <div
          class="logoContainer"
          className="w-[200px] h-[200px] mr-auto ml-auto"
        >
          <img src="src/assets/logo.png" />
        </div>
        <button onClick={() => setShowFav(!showFav)}>
          {showFav ? "Retour" : "Voir mes favoris"}
        </button>
        <SearchBar onSearchChange={handleSearch} initialText={searchText} />
        {isLoading && events.length === 0 ? (
          <p>Chargement des événements...</p>
        ) : null}

        <Cards events={events} arr={favArr} setArr={setFavArr} />

        {!isLoading && events.length > 0 && (
          <ButtonLoadMore onClick={handleLoadMore} />
        )}
      </>
    );
  };

export default App;
