import './SearchBar.css';

// Reçoit la fonction de mise à jour de App
function SearchBar({ onSearchChange }) { 

    const searchItems = (e) => {
        const textInput = e.target.value;
        onSearchChange(textInput); 
    };

    return (
        <div id="searchBarContainer">
            <label htmlFor="searchBar">Cherchez votre événement :</label>
            <input
                type="text"
                id="searchBar"
                name="searchBar"
                onInput={searchItems} 
            />
        </div>
    );
}

export default SearchBar;