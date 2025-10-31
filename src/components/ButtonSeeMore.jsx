
export function ButtonSeeMore({ id, clickedEvent, setClickedEvent }) {

    function handleClick(id) {
        if (clickedEvent === id) {
            setClickedEvent(null);
        } else {
            setClickedEvent(id);
        }
    }
    return (
        <button class="button" id="ButtonSeeMore" onClick={() => handleClick(id)} 
        className='w-24 m-0 p-2 mt-auto rounded-3xl bg-[#D3D3D3] hover:bg-[#354bcf] hover:text-white'>
            {clickedEvent === id ? "Voir moins" : "Voir plus"}
        </button>
    );
}