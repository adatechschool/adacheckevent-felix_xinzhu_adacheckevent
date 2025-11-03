export function ButtonSeeMore({ id, clickedEvent, setClickedEvent }) {

    function handleClick(id) {
        if (clickedEvent === id) {
            setClickedEvent(null);
        } else {
            setClickedEvent(id);
        }
    }
    return (
        <button class="button" id="ButtonSeeMore" className="cursor-pointer font-medium w-24 m-0 p-3 mt-auto rounded-[20px] bg-gray-300" onClick={() => handleClick(id)}>
            {clickedEvent === id ? "Voir moins" : "Voir plus"}
        </button>
    );
}