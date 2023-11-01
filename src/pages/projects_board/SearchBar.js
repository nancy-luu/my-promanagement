import { useState } from "react";
import { Link } from "react-router-dom";

// images
import SearchIcon from "../../assets/search-icon.svg";
import ExitIcon from "../../assets/exit-search-icon.svg";


const SearchBar = ({ data }) => {
  const [query, setQuery] = useState([]);
  const [inputValue, setInputValue] = useState("")
  const [isSearchVisible, setIsSearchVisible] = useState(false)

  const handleSearch = (event) => {
    const searchedWord = event.target.value.toLowerCase();
    setInputValue(searchedWord);
    const filteredWord = data.filter((d) => {
      return d.name.toLowerCase().includes(searchedWord);
    });
    
    if(searchedWord === ""){
        setQuery([]);
        setIsSearchVisible(false);
    } else {
        setQuery(filteredWord);
        setIsSearchVisible(true);
    }
  };

  const clearInput = () => {
    setQuery([])
    setInputValue("")
  }

  return (
    <div className="search-bar">
      <div className="search-inputs">
        <input
          type="text"
          placeholder="Search by project name.."
          value={inputValue}
          onChange={handleSearch}
          onFocus={()=> setIsSearchVisible(true)}
        />
        {query.length === 0 ?
            <img src={SearchIcon} alt="search icon" />
            :
            <img src={ExitIcon} alt="clear search icon" onClick={clearInput}/>
        }
      </div>
      <div className="search-result" style={{ display: isSearchVisible ? "block" : "none" }}>
        {query.length !== 0 && (
          <div className="search-option">
            {query &&
              query.slice(0, 15).map((value, key) => (
                <div className="search-item">
                  <Link to={`projects/${value.docId}`} key={key}>
                    {value.name}
                  </Link>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
