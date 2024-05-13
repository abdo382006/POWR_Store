// Font Awesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
// React Router Hooks & Components
import { useNavigate, useSearchParams } from "react-router-dom";
// React Hooks
import { useState } from "react";

export default function SearchBar() {
  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useSearchParams({ q: "" });
  const q = searchQuery.get("q") || "";
  const navigateTo = useNavigate();

  function goSearch(e) {
    // Prevent The Default
    e.preventDefault();
    // Locate to the search results page
    if (q !== "" && q != null) {
      navigateTo(`/search-results?q=${encodeURIComponent(q)}`);
    }
  }

  return (
    <form className="search-bar input-bar" onSubmit={goSearch}>
      <input
        placeholder="Search a product..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button
        onClick={() => {
          // Update Search Param
          setSearchQuery((p) => {
            p.set("q", inputValue.trim());
            return p;
          });
        }}
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
    </form>
  );
}
