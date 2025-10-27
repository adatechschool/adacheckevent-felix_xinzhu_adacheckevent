import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [events, setEvents] = useState([]);

  const loadData = async () => {
    const res = await fetch("https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/que-faire-a-paris-/records?limit=20");
    const data = await res.json();
    setEvents(data.results);
    console.log(data.results);
  };

  useEffect(() => {
    loadData();
  }, []);

  if (events === undefined) return "loading";
  return (
    <>
      <div id="container" className="grid-cols-[200px_minmax(900px,1fr)_100px]">
        {events.map((elem, id) => (
          <div key={id}>
            <h1>{elem.title}</h1>
            <p className="text-2xl font-bold underline">~ {elem.address_name}, {elem.address_street}, {elem.address_zipcode}, {elem.address_city} ~</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App