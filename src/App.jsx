import { useState, useEffect } from "react";
import "./App.css";
import Cards from "./components/Cards.jsx";
import { ButtonLoadMore } from "./components/ButtonLoadMore";
import SearchBar from "./components/SearchBar.jsx";
import SideMenu from "./components/SideMenu.jsx"
import useEventsData from "./hooks/useEventsData";
import { Croissant } from 'lucide-react';
import { Bookmark } from 'lucide-react';

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
  const [showFav, setShowFav] = useState(false);
  const { events, isLoading, setOffSet } = useEventsData(
    searchText,
    favArr,
    showFav
  );


  const handleSearch = (text) => {
    setSearchText(text);
    setOffSet(0);
  };

  const handleLoadMore = () => {
    setOffSet((value) => value + 5);
  };



  return (
    <>
      <main className="flex">
        <SideMenu />
        <button className="fixed top-0 right-0 cursor-pointer h-11 bg-orange-400 p-2.5 rounded-bl-[10px] z-10" onClick={() => setShowFav(!showFav)}>
          {showFav ? "RETOUR" : <Bookmark />}
        </button>
        <div id="content" className="flex flex-col w-full items-center text-center">
          <a href={`/`} className="flex flex-col w-full items-center"><Croissant className=" h-[100px] w-[100px] m-5" /><h1 id="title" className="text-center text-5xl">Panam'Events</h1></a>
          <div id="searchBarContainer" className='flex flex-row m-0 mb-5 items-center justify-center flex-wrap gap-5'>
            <SearchBar onSearchChange={handleSearch} initialText={searchText} />
          </div >

          {isLoading && events.length === 0 && !showFav ? (
            <p>Chargement des événements...</p>
          ) : null}
          {showFav && events.length === 0 ? (
            <p>Commencez par ajouter des événements dans vos favoris</p>
          ) : null}

          <Cards events={events} arr={favArr} setArr={setFavArr} />


          {
            !isLoading && events.length > 0 && (
              <ButtonLoadMore onClick={handleLoadMore} />
            )
          }
        </div>
      </main>
    </>
  );
}

export default App;