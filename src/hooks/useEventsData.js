import { useState, useEffect } from 'react';

const useEventsData = (searchText) => {
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const loadData = async (query = "") => {
        setIsLoading(true);
        const limit = 20;
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
        }
    };

    useEffect(() => {
        loadData(searchText);
    }, [searchText]);

    return { events, isLoading };
};

export default useEventsData;