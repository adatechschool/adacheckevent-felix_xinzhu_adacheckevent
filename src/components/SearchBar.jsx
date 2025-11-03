function SearchBar({ onSearchChange, initialText = "" }) {

    const searchItems = (e) => {
        const textInput = e.target.value;
        onSearchChange(textInput);
    };

    return (
        <div id="searchBarContainer" className='flex flex-col m-0 mb-2 items-center'>
            <label name="searchBar" >Cherchez votre événement :</label>
            <input className='pt-1 pb-1 pl-5 pr-5 text-black bg-white text-center mt-2 mb-2 w-[300px] rounded-2xl'
                type="text"
                id="searchBar"
                name="searchBar"
                onInput={searchItems}
                defaultValue={initialText}
            />
        </div>
    );
}

export default SearchBar;