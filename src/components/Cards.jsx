import { use, useState } from "react";
import { ButtonSeeMore } from "./ButtonSeeMore";
import placeholderCover from "../assets/logo.png";
import { FavorisIcon } from "./FavorisIcon";

const Cards = ({ events, arr, setArr }) => {
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
      return string;
    }
  };

  const splitCategories = (tags) => {
    const tag = tags.split(";");
    return tag;
  };


  return (
    <div
      id="cardsContainer"
      className="flex flex-row pl-5 pr-5 flex-wrap justify-center gap-[20px]"
    >
      {events.map((elem) => (
        <div
          class="eventCard"
          key={elem.id}
          className="flex flex-col bg-[#f8f7f3] text-black items-center rounded-[20px] w-[300px] h-[600px] gap-5 p-4"
        >
          {elem.cover_url && (
            <div class="cover" className="relative w-full h-1/3 rounded-[10px]">
              <FavorisIcon
                id={elem.id} arr={arr} setArr={setArr}
              />
              <img
                src={elem.cover_url}
                alt={elem.cover_alt}
                className="w-full h-full object-cover rounded-[10px] object-center"
              />
            </div>
          )}
          {clickedEvent !== elem.id ? (
            <div
              class="alwaysVisible"
              className="flex flex-col w-full text-left"
            >
              <h1 className="text-2xl text-[#354bcf]">
                {reduceText(cleanText(elem.title), 50)}
              </h1>
            </div>
          ) : (
            <div
              class="alwaysVisible"
              className="flex flex-col w-full text-left"
            >
              <h1 className="text-2xl text-[#354bcf]">
                {cleanText(elem.title)}
              </h1>
            </div>
          )}

          {clickedEvent !== elem.id ? (
            <div class="shortInfos" className="flex flex-col w-full text-left">
              {elem.description && (
                <p class="description">
                  {reduceText(cleanText(elem.description), 200)}
                </p>
              )}
              {!elem.description && (
                <p class="description">
                  Visitez notre site pour plus d'informations.
                </p>
              )}
            </div>
          ) : (
            <div
              class="seeMoreInfos"
              className="flex flex-col w-full text-left overflow-y-scroll"
            >
              {elem.description && (
                <p class="description" className="text-left">
                  {cleanText(elem.description)}
                </p>
              )}
              {!elem.description && (
                <p class="description" className="text-left">
                  Visitez notre site pour plus d'informations.
                </p>
              )}
              <br />
              {elem.contact_organisation_name && (
                <p>
                  <strong className="text-[#354bcf]">Organisé par : </strong>
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
                    <strong className="text-[#354bcf]">Où : </strong>
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
                  <strong className="text-[#354bcf]">Quand : </strong>
                  {cleanText(elem.date_description)}
                </p>
              )}
              {!elem.date_description && (
                <>
                  {elem.date_start && (
                    <p>
                      <strong className="text-[#354bcf]">Début : </strong>
                      {elem.date_start}
                    </p>
                  )}
                  {elem.date_end && (
                    <p>
                      <strong className="text-[#354bcf]">Fin : </strong>
                      {elem.date_end}
                    </p>
                  )}
                </>
              )}
              {elem.contact_url && (
                <p>
                  <strong className="text-[#354bcf]">Site : </strong>
                  <a className="underline" href={elem.contact_url} target="_blank">
                    visiter
                  </a>
                </p>
              )}
              {elem.contact_phone && (
                <p>
                  <strong className="text-[#354bcf]">Téléphone : </strong>
                  <a className="underline" href={`tel:${elem.contact_phone.replace(/\s/g, "")}`}>
                    {elem.contact_phone}
                  </a>
                </p>
              )}
              {elem.contact_mail && (
                <p>
                  <strong className="text-[#354bcf]">E-mail : </strong>
                  <a className="underline" href={`mailto:${elem.contact_mail.replace(/\s/g, "")}`}>
                    {elem.contact_mail}
                  </a>
                </p>
              )}
              {elem.price_type !== "gratuit" && (
                <p>
                  <strong className="text-[#354bcf]">
                    {capitalizeFirstLetter(cleanText(elem.price_type))} :{" "}
                  </strong>
                  {cleanText(elem.price_detail)}
                </p>
              )}
              {elem.price_type === "gratuit" && (
                <p>
                  <strong className="text-[#354bcf]">
                    {capitalizeFirstLetter(cleanText(elem.price_type))}
                  </strong>
                </p>
              )}
              {elem.audience && (
                <p>
                  <strong className="text-[#354bcf]">Audience : </strong>
                  {cleanText(elem.audience)}
                </p>
              )}
              {elem.qfap_tags && (
                <p>
                  <strong className="text-[#354bcf]">Catégorie : </strong>
                  {splitCategories(elem.qfap_tags).map(
                    (category, id, array) => (
                      <span key={id} className="category-link">
                        <a className="underline" href={`/tag/${cleanText(category)}`}>
                          {cleanText(category)}
                        </a>
                        {id < array.length - 1 && <span> ~ </span>}
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
