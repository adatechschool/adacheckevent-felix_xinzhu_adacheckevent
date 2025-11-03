import { useState } from "react";
import { ButtonSeeMore } from "./ButtonSeeMore";

const Cards = ({ events }) => {
  const [clickedEvent, setClickedEvent] = useState();

  const cleanText = (val) => {
    if (val !== null) {
      const target = val.replace(/<[^>]*>/g, "").trim();
      return target;
    } else {
      return "";
    }
  };

  const capitalizeFirstLetter = (val) => {
    return val.charAt(0).toUpperCase() + val.slice(1);
  };

  const reduceText = (string, limit) => {
    if (string.length > limit) {
      let newString = string.split("").slice(0, limit).join("") + "...";
      return newString;
    } else {
      return string
    }
  };

  const splitCategories = (tags) => {
    const tag = tags.split(";");
    return tag;
  };

  return (
    <div
      id="cardsContainer"
      className="flex flex-row flex-wrap justify-center gap-[20px]"
    >
      {events.map((elem) => (
        <div
          class="eventCard"
          key={elem.id}
          className="flex flex-col bg-white text-black items-center rounded-[20px] w-[300px] h-[600px] gap-[20px] p-4"
        >
          {elem.cover_url && (
            <div class="cover" className="w-full h-1/3 rounded-[10px]">
              <a href={elem.access_link} target="_blank">
                <img
                  src={elem.cover_url}
                  alt={elem.cover_alt}
                  className="w-full h-full object-cover rounded-[10px] object-center"
                />
              </a>
            </div>
          )}
          {clickedEvent !== elem.id ? (
            <div
              class="alwaysVisible"
              className="flex flex-col w-full text-left"
            >
              <a href={elem.access_link} target="_blank">
                <h1 className="text-2xl text-[#354bcf]">
                  {reduceText(cleanText(elem.title),50)}
                </h1>
              </a>
            </div>
          ) : (
            <div
              class="alwaysVisible"
              className="flex flex-col w-full text-left"
            >
              <a href={elem.access_link} target="_blank">
                <h1 className="text-2xl text-[#354bcf]">
                  {cleanText(elem.title)}
                </h1>
              </a>
            </div>
          )}

          {clickedEvent !== elem.id ? (
            <div class="shortInfos" className="flex flex-col w-full text-left">
              <p class="description">
                {reduceText(cleanText(elem.description),200)}
              </p>
            </div>
          ) : (
            <div
              class="seeMoreInfos"
              className="flex flex-col w-full text-left overflow-y-scroll"
            >
              <p class="description" className="text-left">
                {cleanText(elem.description)}
              </p>
              <br />
              {elem.contact_organisation_name && (
                <p>
                  <strong>Organisé par : </strong>
                  {cleanText(elem.contact_organisation_name)}
                </p>
              )}
              {elem.locations &&
                (elem.locations[0].text ||
                  elem.locations[0].address_name ||
                  elem.locations[0].address_street ||
                  elem.locations[0].address_zipcode ||
                  elem.locations[0].address_city) && (
                  <p>
                    <strong>Où : </strong>
                    {elem.locations[0].text && (
                      <span>{cleanText(elem.locations[0].text)}</span>
                    )}
                    {elem.locations[0].address_name && (
                      <span>{cleanText(elem.locations[0].address_name)}</span>
                    )}
                    {elem.locations[0].address_street && (
                      <span>
                        , {cleanText(elem.locations[0].address_street)}
                      </span>
                    )}
                    {elem.locations[0].address_zipcode && (
                      <span>
                        , {cleanText(elem.locations[0].address_zipcode)}
                      </span>
                    )}
                    {elem.locations[0].address_city && (
                      <span>, {cleanText(elem.locations[0].address_city)}</span>
                    )}
                  </p>
                )}

              {elem.date_description && (
                <p>
                  <strong>Quand : </strong>
                  {cleanText(elem.date_description)}
                </p>
              )}
              {!elem.date_description && (
                <>
                  {elem.date_start && (
                    <p>
                      <strong>Début : </strong>
                      {elem.date_start}
                    </p>
                  )}
                  {elem.date_end && (
                    <p>
                      <strong>Fin : </strong>
                      {elem.date_end}
                    </p>
                  )}
                </>
              )}
              {elem.contact_url && (
                <p>
                  <strong>Site : </strong>
                  <a href={elem.contact_url} target="_blank">
                    visiter
                  </a>
                </p>
              )}
              {elem.contact_phone && (
                <p>
                  <strong>Téléphone : </strong>
                  <a href={`tel:${elem.contact_phone.replace(/\s/g, "")}`}>
                    {elem.contact_phone}
                  </a>
                </p>
              )}
              {elem.contact_mail && (
                <p>
                  <strong>E-mail : </strong>
                  <a href={`mailto:${elem.contact_mail.replace(/\s/g, "")}`}>
                    {elem.contact_mail}
                  </a>
                </p>
              )}
              {elem.price_type !== "gratuit" && (
                <p>
                  <strong>
                    {capitalizeFirstLetter(cleanText(elem.price_type))} :{" "}
                  </strong>
                  {cleanText(elem.price_detail)}
                </p>
              )}
              {elem.price_type === "gratuit" && (
                <p>
                  <strong>
                    {capitalizeFirstLetter(cleanText(elem.price_type))}
                  </strong>
                </p>
              )}
              {elem.audience && (
                <p>
                  <strong>Audience : </strong>
                  {cleanText(elem.audience)}
                </p>
              )}
              {elem.qfap_tags && (
                <p>
                  <strong>Catégorie : </strong>
                  {splitCategories(elem.qfap_tags).map(
                    (category, index, array) => (
                      <span key={index} className="category-link">
                        <a href={`/tag/${cleanText(category)}`}>
                          {cleanText(category)}
                        </a>
                        {index < array.length - 1 && <span> ~ </span>}
                      </span>
                    )
                  )}
                </p>
              )}
            </div>
          )}
          <ButtonSeeMore
            id={elem.id}
            clickedEvent={clickedEvent}
            setClickedEvent={setClickedEvent}
          />
        </div>
      ))}
    </div>
  );
};

export default Cards;
