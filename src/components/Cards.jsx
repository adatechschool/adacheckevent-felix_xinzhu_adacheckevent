import { useState } from 'react';
import { ButtonSeeMore } from './ButtonSeeMore';
import '../../public/style/Cards.css';

function Cards({ events }) {

  const [clickedEvent, setClickedEvent] = useState();

  function cleanText(html) {
    //regex ci-dessous pour enlever toutes les balises html du texte 
    const target = html.replace(/<[^>]*>/g, "");
    return target;
  }

  function reduceText(string) {
    let newString = string.split("").slice(0, 200).join("") + " (...)";
    return newString;
  }

  return (
    <div id="cardsContainer">
      {events.map((elem) => (
        <div class="eventCard" key={elem.id}>
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

            {clickedEvent === elem.id ? (
              <p>{cleanText(elem.description)}</p>
            ) : (
              <p>{reduceText(cleanText(elem.description))}</p>
            )}

            <ButtonSeeMore
              id={elem.id}
              clickedEvent={clickedEvent}
              setClickedEvent={setClickedEvent}
            />

            {/* l'adresse complète doit aller dans la section "Voir plus" :
            {(elem.address_street && elem.address_zipcode) && (
              <p>
                {elem.address_name}, {elem.address_street}, {elem.address_zipcode}, {elem.address_city}
              </p>
            )}*/}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Cards;