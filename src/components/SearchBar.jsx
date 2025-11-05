function SearchBar({ onSearchChange, initialText = "" }) {

    const searchItems = (e) => {
        const textInput = e.target.value.toLowerCase();
        onSearchChange(textInput);
    };

    return (
        <>
            <input className='pl-5 pr-5 mt-5 h-8 text-black bg-white text-center w-75 rounded-2xl'
                type="text"
                id="searchBar"
                name="searchBar"
                onInput={searchItems}
                defaultValue={initialText}
                placeholder="Cherchez votre événement"
            />
        </>
    );
}

export default SearchBar;