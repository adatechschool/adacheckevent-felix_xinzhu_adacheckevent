function SearchBar({ onSearchChange, initialText = "" }) {

    const searchItems = (e) => {
        const textInput = e.target.value;
        onSearchChange(textInput);
    };

    return (
        <div className="searchBarContainer flex flex-col m-0 mb-2 items-center">
            <label name="searchBar">Cherchez votre événement :</label>
            <input
                type="text"
                id="searchBar"
                className="searchBar pt-1 pb-1 pl-5 pr-5 text-black bg-white text-center mt-2 mb-2 w-[300px] rounded-[20px]"
                name="searchBar"
                onInput={searchItems}
                defaultValue={initialText}
            />
        </div>
    );
}

export default SearchBar;