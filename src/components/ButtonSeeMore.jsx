export function ButtonSeeMore({ id, clickedEvent, setClickedEvent }) {

    function handleClick(id) {
        if (clickedEvent === id) {
            setClickedEvent(null);
        } else {
            setClickedEvent(id);
        }
    }
    return (
        <button onClick={() => handleClick(id)}>
            {clickedEvent === id ? "Voir moins" : "Voir plus"}
        </button>
    );
}