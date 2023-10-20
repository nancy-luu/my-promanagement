import { Link } from "react-router-dom";

// images
import SearchIcon from "../../assets/search-icon.svg";

const SearchBar = ({ query, setQuery, data }) => {

  return (
    <div className="search-bar">
        <div className="search-inputs">
            <input
                type="text"
                placeholder="Search by project name.."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <img src={SearchIcon} alt="search icon" />
        </div>
        <div className="search-result">
            {data && data.map((value, key) => {
                return <Link to={`projects/${value.docId}`} className="search-item" key={key}>{value.name}</Link>
            })}
        </div>
    </div>
  );
};

export default SearchBar;
