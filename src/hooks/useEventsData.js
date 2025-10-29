import { useState, useEffect } from "react";

const useEventsData = (searchText) => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [offset, setOffset] = useState(0)

  const loadData = async (query = "") => {
    // 👉 Sauvegarde la position du scroll actuelle
    // const currentScroll = window.scrollY;

    setIsLoading(true);
    let url = `https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/que-faire-a-paris-/records?offset=${offset}&limit=5`;

    if (query.length >= 3) {
      url += `&where=title%20like%20%22${encodeURIComponent(query)}%22`; //permet de formater wheretitlelike en format url
    }

    try {
      const res = await fetch(url);
      const data = await res.json();
      setEvents(prev => [...prev, ...data.results]);
     // setEvents(data.results);
    } catch (error) {
      console.error("Erreur lors du chargement des données:", error);
      setEvents([]);
    } finally {
      setIsLoading(false);
      // 👉 Restaure la position du scroll après le rendu
    //   setTimeout(() => {
    //     window.scrollTo(0, currentScroll);
    //   }, 20);
    }
  };

  useEffect(() => {
    loadData(searchText);
  }, [searchText, offset]); //dépendances permettent de limiter et mettre à jour les éléments (ici l'url)

  return { events, isLoading, setOffset };
};

export default useEventsData;
