import { useState, useEffect } from "react";

const useEventsData = (searchText, favArr, showFav) => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const limit = 20;
  const [offset, setOffSet] = useState(0);

  const loadData = async (query = "") => {
    const currentScroll = window.scrollY;
    setIsLoading(true);

    let url = `https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/que-faire-a-paris-/records?offset=${offset}&limit=${limit}`;

    if (showFav) {
      if (favArr.length === 0) {
        setEvents([]);
        setIsLoading(false);
        return;
      }

      // Supprimer les doublons avant d’appeler l’API
      const uniqueFav = Array.from(new Set(favArr));
      const favStrData = uniqueFav.map((id) => `"${id}"`).join(",");
      const whereClause = `id in (${favStrData})`;

      url = `https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/que-faire-a-paris-/records?where=${encodeURIComponent(
        whereClause
      )}`;

      console.log("URL favoris:", url);
    } else if (query.length >= 3) {
      url += `&where=title%20like%20%22${encodeURIComponent(query)}%22%20or%20qfap_tags%20like%20%22${encodeURIComponent(query)}%22%20or%20address_zipcode%20like%20%22${encodeURIComponent(query)}%22`;
    }

    try {
      const res = await fetch(url);
      const data = await res.json();
      const results = data.results || [];

      // Dédupliquer les résultats (id uniques)
      const uniqueResults = Object.values(
        results.reduce((acc, item) => {
          acc[item.id] = item;
          return acc;
        }, {})
      );

      if (showFav) {
        setEvents(uniqueResults);
      } else if (offset === 0) {
        setEvents(uniqueResults);
      } else {
        setEvents((prev) => {
          const merged = [...prev, ...uniqueResults];
          const deduped = Object.values(
            merged.reduce((acc, item) => {
              acc[item.id] = item;
              return acc;
            }, {})
          );
          return deduped;
        });
      }
    } catch (error) {
      console.error("Erreur lors du chargement des données:", error);
      setEvents([]);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        window.scrollTo(0, currentScroll);
      }, 20);
    }
  };

  useEffect(() => {
    if (showFav) {
      setOffSet(0);
    }
    loadData(searchText);
  }, [searchText, offset, showFav, favArr]);

  return { events, isLoading, setOffSet };
};

export default useEventsData;
