import './SearchBar.css'

function SearchBar() {
    const searchItems = (e, id) => {
        console.log(e)
    }

    return (
        <div id="searchBarContainer">
            <label for="searchBar">Cherchez votre événement :</label>
            <input
                type="text"
                id="searchBar"
                name="searchBar"
                onInput={(e) => searchItems(e)} />
        </div>
    );
}

export default SearchBar;