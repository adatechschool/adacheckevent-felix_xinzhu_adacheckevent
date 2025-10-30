import '../../src/style/SearchBar.css';

function SearchBar({ onSearchChange, initialText = "" }) {

    const searchItems = (e) => {
        const textInput = e.target.value;
        onSearchChange(textInput);
    };

    return (
        <div id="searchBarContainer">
            <label name="searchBar">Cherchez votre événement :</label>
            <input
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