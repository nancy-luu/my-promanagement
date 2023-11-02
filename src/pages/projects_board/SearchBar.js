import { useState } from "react";
import { Link } from "react-router-dom";

// images
import SearchIcon from "../../assets/search-icon.svg";
import ExitIcon from "../../assets/exit-search-icon.svg";


const SearchBar = ({ data, query, setQuery }) => {
  const [inputValue, setInputValue] = useState("")

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

  console.log("This is the query:")
  console.log(query)
  console.log('\n')
  console.log(inputValue)

  return (
    <div className="search-bar">
      <div className="search-inputs">
        <input
          type="text"
          placeholder="Search"
          value={inputValue}
          onChange={handleSearch}
        />
        {query.length === 0 ?
            <img src={SearchIcon} alt="search icon" />
            :
            <img src={ExitIcon} alt="clear search icon" onClick={clearInput}/>
        }
      </div>
      <div className="search-result" style={{ display: query.length > 0 ? 'block' : 'none' }}>
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
