import { useEffect, useState } from 'react'
import './Cards.css'


function Cards() {

  const [events, setEvents] = useState([]);

  const loadData = async () => {
    const res = await fetch("https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/que-faire-a-paris-/records?limit=20");
    const data = await res.json();
    console.log(data)
    setEvents(data.results);
  };

  useEffect(() => {
    loadData();
  }, []);

  if (events === undefined) return "loading";
  return (
    <>
      {events.map((elem, id) => (
        <div class="eventCard" key={id}>
          {elem.cover_url && (
            <div class="cover">
              <a href={elem.access_link} target="_blank"><img src={elem.cover_url} alt={elem.cover_alt} /></a>
            </div>
          )}
          <div class="informations">
            <a href={elem.access_link} target="_blank"><h1>{cleanText(elem.title)}</h1></a>

            {elem.address_name && (
              <h2>{cleanText(elem.address_name)}</h2>
            )}
            {elem.date_description && (
              <h2>{cleanText(elem.date_description)}</h2>
            )}

{/*appeler le component ButtonSeeMore ici*/};

            {/* l'adresse complète doit aller dans la section "Voir plus" :
            {(elem.address_street && elem.address_zipcode) && (
              <p>
                {elem.address_name}, {elem.address_street}, {elem.address_zipcode}, {elem.address_city}
              </p>
            )}
            */}
          </div>
        </div>
      ))}
    </>
  );
}

export default Cards