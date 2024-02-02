import { useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";

const filterList = [
  "all",
  "assigned",
  "design",
  "development",
  "marketing",
  "product",
  "research",
  "sales",
];

export default function ProjectFilter({ currFilter, changeFilter }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState();

  const handleClick = (newFilter) => {
    changeFilter(newFilter);
  };

  const selectOptions = filterList.map((f) => ({
    value: f,
    label: f.slice(0, 1).toUpperCase() + f.slice(1),
  }));

  return (
    <div className="project-filter">
      <div className="nav-wrapper">
        <nav>
          <Link to="/createProject" className="newproject-btn btn">
            New Project
          </Link>
          {filterList.map((f) => (
            <button
              key={f}
              onClick={() => handleClick(f)}
              className={currFilter === f ? "active" : ""}
            >
              {f.slice(0, 1).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </nav>
      </div>
      <div className="project-filter-drop-down-wrapper">
        <Link to="/createProject" className="newproject-btn-sm btn">+</Link>
        <Select
          className="project-filter-drop-down"
          value={{
            value: currFilter,
            label:
              currFilter &&
              currFilter.slice(0, 1).toUpperCase() + currFilter.slice(1),
          }}
          options={selectOptions}
          onChange={(option) => changeFilter(option.value)}
          theme={(theme) => ({
            ...theme,
            borderRadius: "5px",
            colors: {
              ...theme.colors,
              text: "orange",
              primary25: "#c3c3c3",
              primary: "orange",
            },
          })}
          styles={{ menuPortal: (base) => ({ ...base, zIndex: 0 }) }}
          placeholder="Assign To"
        />
      </div>
    </div>
  );
}
