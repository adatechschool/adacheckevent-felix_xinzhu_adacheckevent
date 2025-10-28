import './SearchBar.css'

function SearchBar() {


    return (
        <div id="searchBarContainer">
            <label>Cherchez votre événement</label>
            <input
                type="text"
                id="searchBar"
                name="name" />
        </div>
    )
}

export default SearchBar;