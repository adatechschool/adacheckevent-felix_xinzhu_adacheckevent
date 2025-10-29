import { useState, useEffect } from 'react';

const useEventsData = (searchText) => {
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [eventsLimit, setEventsLimit] = useState(20)

    const loadData = async (query = "") => {
        setIsLoading(true);
        let url = `https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/que-faire-a-paris-/records?limit=${eventsLimit}`;

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
        }
    };

    useEffect(() => {
        loadData(searchText);
    }, [searchText, eventsLimit]); //dépendances permettent de limiter et mettre à jour les éléments (ici l'url)

    return { events, isLoading, setEventsLimit };
};

export default useEventsData;