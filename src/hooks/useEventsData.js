import { useState, useEffect } from "react";

const useEventsData = (searchText) => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [limit, setLimit] = useState(5);

  const loadData = async (query = "") => {
    const currentScroll = window.scrollY;
    setIsLoading(true);

    let url = `https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/que-faire-a-paris-/records?limit=${limit}`;

    if (query.length >= 3) {
      url += `&where=title%20like%20%22${encodeURIComponent(query)}%22`;
    }

    try {
      const res = await fetch(url);
      const data = await res.json();
      setEvents(data.results);
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
    loadData(searchText);
  }, [searchText, limit]);

  return { events, isLoading, setLimit };
};

export default useEventsData;