import { useState } from "react";
import "./App.css";
import Cards from "./components/Cards.jsx";
import { ButtonLoadMore } from "./components/ButtonLoadMore";
import SearchBar from "./components/SearchBar.jsx";
import SideMenu from "./components/SideMenu.jsx"
import useEventsData from "./hooks/useEventsData";
import { Croissant } from 'lucide-react';

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
    setOffSet(0);
  };

  const handleLoadMore = () => {
    setOffSet((value) => value + 5);
  };

  return (
    <>
      <main className="flex">
        <SideMenu />
        <div id="content" className="flex flex-col w-full items-center text-center">
          <a href={`/`}><Croissant className="h-[100px] w-[100px] m-5" /><h1 className="text-center text-3xl">Panam'Events</h1></a>
          <div id="searchBarContainer" className='flex flex-row m-0 mb-5 items-center justify-center flex-wrap gap-5'>
            <SearchBar onSearchChange={handleSearch} initialText={searchText} />
          </div >

          {isLoading && events.length === 0 ? (
            <p>Chargement des événements...</p>
          ) : (
            <Cards events={events} />
          )
          }

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