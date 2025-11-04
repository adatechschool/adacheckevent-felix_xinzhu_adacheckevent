import { useState, useEffect } from "react";

const useEventsData = (searchText, favArr, showFav) => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const limit = 5;
  const [offset, setOffSet] = useState(0);

  const loadData = async (query = "") => {
    const currentScroll = window.scrollY;
    setIsLoading(true);

    let url = `https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/que-faire-a-paris-/records?offset=${offset}&limit=${limit}`;

    if (showFav) {
      if (favArr.length === 0) {
        setFavData([]);
        return;
      }
      const baseUrl = "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/que-faire-a-paris-/records"
      let favStrData = favArr.map((id) => `"${id}"`).join(","); //transformer mon favArr en un tableau de string et ensuite en ("id","id") pour le format url     console.log(favStrData)
      let whereClause = `id in (${favStrData})`;
      url = `${baseUrl}?where=${encodeURIComponent(whereClause)}`;
      console.log(url)
    } 
    if (query.length >= 3) {
      url += `&where=title%20like%20%22${encodeURIComponent(
        query
      )}%22%20or%20qfap_tags%20like%20%22${encodeURIComponent(query)}%22`;
    }

    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log("😭", data)

      if (offset === 0) {
        setEvents(data.results);
      } else {
        setEvents((value) => [...value, ...data.results]);
      } //... => spread operator : copier ce qu'il y a dans value et ajouter des nouveaux éléments data.results
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
  }, [searchText, offset, showFav]);

  return { events, isLoading, setOffSet };
};

export default useEventsData;
