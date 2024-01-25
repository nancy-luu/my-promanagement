import { useState, useRef, useEffect } from "react";
import { navbarImgs } from "../../util/images";
import SearchResult from "./SearchResult";


const SearchBar = ({ data, query, setQuery }) => {
  const [inputValue, setInputValue] = useState("")
  const searchRef = useRef(null);


  const handleSearch = (event) => {
    const searchedWord = event.target.value.toLowerCase();
    setInputValue(searchedWord);
    const filteredWord = data.filter((d) => {
      return d.name.toLowerCase().includes(searchedWord);
    });
    
    if(searchedWord === ""){
        setQuery([]);
    } else {
        setQuery(filteredWord);
    }
  };

  const clearInput = () => {
    setQuery([])
    setInputValue("")
  } 

  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      // Clicked outside the search bar, close the search results
      setInputValue("")
      setQuery([]);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="search-bar" ref={searchRef}>
      <div className="search-inputs">
        <input
          type="text"
          placeholder="Search"
          value={inputValue}
          onChange={handleSearch}
        />
        {query.length === 0 ?
            <img className="search-icon" src={navbarImgs.search} alt="search icon" />
            :
            <img className="search-icon" src={navbarImgs.exit} alt="clear search icon" onClick={clearInput}/>
        }
      </div>
        <SearchResult query={query} clearInput={clearInput}/>
    </div>
  );
};

export default SearchBar;
