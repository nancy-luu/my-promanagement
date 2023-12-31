
const filterList = ['all', 'assigned', 'design', 'development', 'marketing', 'product', 'research', 'sales']

export default function ProjectFilter({ currFilter, changeFilter }) {

    const handleClick = (newFilter) => {
        changeFilter(newFilter)
    }

  return (
    <div className="project-filter">
        <nav>
            {filterList.map((f) => (
                <button 
                    key={f} 
                    onClick={() => handleClick(f)}
                    className={currFilter === f ? 'active' : ''}
                >
                    {f.slice(0, 1).toUpperCase() + f.slice(1)}
                </button>
            ))}
        </nav>
    </div>
  )
}
