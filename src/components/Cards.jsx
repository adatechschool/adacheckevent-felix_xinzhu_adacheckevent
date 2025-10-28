import './Cards.css'

// Reçoit les événements de App
function Cards({ events }) {

  return (
    <div id="cardsContainer">
      {events.map((elem, id) => (
        <div class="eventCard" key={id}>
          {elem.cover_url && (
            <div class="cover">
              <a href={elem.access_link} target="_blank"><img src={elem.cover_url} alt={elem.cover_alt} /></a>
            </div>
          )}
          <div class="informations">
            <a href={elem.access_link} target="_blank"><h1>{elem.title}</h1></a>

            {elem.address_name && (
              <h2>{elem.address_name}</h2>
            )}
            {elem.date_description && (
              <h2>{elem.date_description}</h2>
            )}

            {/*appeler le component ButtonSeeMore ici*/}

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