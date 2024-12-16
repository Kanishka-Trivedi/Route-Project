// import React, { useEffect, useState } from "react";

// function Cocktails() {
//   const [cocktails, setCocktails] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [query, setQuery] = useState("");

//   useEffect(() => {
//     const fetchCocktails = async () => {
//       try {
//         setLoading(true);
//         setError(""); // Reset error state
//         const response = await fetch(
//           "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail"
//         );
//         if (!response.ok) {
//           throw new Error("Error fetching cocktail data.");
//         }
//         const data = await response.json();
//         setCocktails(data.drinks || []);
//       } catch (err) {
//         setError("Error fetching cocktail data.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchCocktails();
//   }, []);

//   const handleSearch = async () => {
//     try {
//       setLoading(true);
//       setError(""); // Reset error state
//       const response = await fetch(
//         `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`
//       );
//       if (!response.ok) {
//         throw new Error("Search failed.");
//       }
//       const data = await response.json();
//       setCocktails(data.drinks || []);
//     } catch (err) {
//       setError("Search failed.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h2>Cocktails</h2>
//       <input
//         type="text"
//         placeholder="Search cocktails..."
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//       />
//       <button onClick={handleSearch}>Search</button>
//       {loading ? (
//         <p>Loading...</p>
//       ) : error ? (
//         <p style={{ color: "red" }}>{error}</p>
//       ) : (
//         <ul>
//           {cocktails.slice(0, 10).map((cocktail) => (
//             <li key={cocktail.idDrink}>{cocktail.strDrink}</li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

// export default Cocktails;





import React, { useEffect, useState, useRef } from "react";
import "./Cocktails.css";

function Cocktails() {
  const [cocktails, setCocktails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selectedCocktail, setSelectedCocktail] = useState(null); // Selected cocktail data
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 }); // Popup position
  const [popupLoading, setPopupLoading] = useState(false);

  useEffect(() => {
    const fetchCocktails = async () => {
      try {
        setLoading(true);
        setError(""); // Reset error state
        const response = await fetch(
          "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail"
        );
        if (!response.ok) {
          throw new Error("Error fetching cocktail data.");
        }
        const data = await response.json();
        setCocktails(data.drinks || []);
      } catch (err) {
        setError("Error fetching cocktail data.");
      } finally {
        setLoading(false);
      }
    };
    fetchCocktails();
  }, []);

  const handleSearch = async () => {
    try {
      setLoading(true);
      setError(""); // Reset error state
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`
      );
      if (!response.ok) {
        throw new Error("Search failed.");
      }
      const data = await response.json();
      setCocktails(data.drinks || []);
    } catch (err) {
      setError("Search failed.");
    } finally {
      setLoading(false);
    }
  };

  const openPopup = async (cocktailId, event) => {
    try {
      setPopupLoading(true);

      // Fetch cocktail details
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch cocktail details.");
      }
      const data = await response.json();
      setSelectedCocktail(data.drinks[0]);

      // Get clicked element's position
      const rect = event.target.getBoundingClientRect();
      setPopupPosition({
        top: rect.top + window.scrollY + rect.height + 10, // Position below the element
        left: rect.left + rect.width / 2 - 150, // Centered horizontally (assuming popup width ~300px)
      });
    } catch (err) {
      setError("Failed to fetch cocktail details.");
    } finally {
      setPopupLoading(false);
    }
  };

  const closePopup = () => {
    setSelectedCocktail(null);
  };

  return (
    <div className="cocktails-container">
      <h1 className="title">🍸 Explore Cocktails</h1>
      <p className="subtitle">Find your favorite cocktail recipes below!</p>

      {/* Search Bar */}
      <div className="search-bar-container">
        <input
          type="text"
          className="search-bar"
          placeholder="Search cocktails..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>

      {loading ? (
        <p className="loading-text">Loading cocktails...</p>
      ) : error ? (
        <p className="error-text">{error}</p>
      ) : (
        <div className="cocktail-grid">
          {cocktails.map((cocktail) => (
            <div key={cocktail.idDrink} className="cocktail-card">
              <img
                src={cocktail.strDrinkThumb}
                alt={cocktail.strDrink}
                className="cocktail-image"
              />
              <h2 className="cocktail-name">{cocktail.strDrink}</h2>
              <button
                className="view-details-btn"
                onClick={(e) => openPopup(cocktail.idDrink, e)}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Popup */}
      {selectedCocktail && (
        <div
          className="popup"
          style={{ top: popupPosition.top, left: popupPosition.left }}
        >
          <div className="popup-content">
            <button className="close-popup" onClick={closePopup}>
              &times;
            </button>
            {popupLoading ? (
              <p>Loading...</p>
            ) : (
              <>
                <h2>{selectedCocktail.strDrink}</h2>
                <img
                  src={selectedCocktail.strDrinkThumb}
                  alt={selectedCocktail.strDrink}
                  className="popup-image"
                />
                <h3>Ingredients:</h3>
                <ul>
                  {Array.from({ length: 15 }, (_, i) => i + 1)
                    .map((index) => {
                      const ingredient = selectedCocktail[`strIngredient${index}`];
                      const measure = selectedCocktail[`strMeasure${index}`];
                      return (
                        ingredient && (
                          <li key={index}>
                            {measure} {ingredient}
                          </li>
                        )
                      );
                    })}
                </ul>
                <h3>Instructions:</h3>
                <p>{selectedCocktail.strInstructions}</p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Cocktails;
