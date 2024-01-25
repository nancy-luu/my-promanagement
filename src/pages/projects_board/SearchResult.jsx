import { Link } from "react-router-dom";


const SearchResult = ({ query, clearInput }) => {
  return (
      <div className="search-result" style={{ display: query.length > 0 ? 'block' : 'none', position: 'absolute', top: '100%', zIndex: 2 }}>
        {query.length !== 0 && (
          <div className="search-option">
            {query &&
              query.slice(0, 15).map((value, key) => (
                <div className="search-item">
                  <Link to={`projects/${value.docId}`} key={key} onClick={clearInput}>
                  • {value.name}
                  </Link>
                </div>
              ))}
          </div>
        )}
      </div>
  )
}

export default SearchResult
