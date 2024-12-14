
// import React, { useEffect, useState } from "react";
// import "./Meals.css";

// function Meals() {
//   const [meals, setMeals] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchQuery, setSearchQuery] = useState(""); // State for search input

//   useEffect(() => {
//     const fetchMeals = async () => {
//       try {
//         const response = await fetch(
//           "https://www.themealdb.com/api/json/v1/1/search.php?s="
//         );
//         if (!response.ok) {
//           throw new Error("Failed to fetch data from the API");
//         }
//         const data = await response.json();
//         setMeals(data.meals);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMeals();
//   }, []);

//   // Filter meals based on the search query
//   const filteredMeals = meals?.filter((meal) =>
//     meal.strMeal.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="meals-container">
//       <h1 className="meals-title">🍽️ Explore Global Meals</h1>
//       <p className="meals-subtitle">
//         Discover a world of flavors! Use the search bar to find your favorite dish.
//       </p>

//       {/* Search Bar */}
//       <div className="search-bar-container">
//         <input
//           type="text"
//           className="search-bar"
//           placeholder="Search for a meal..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />
//       </div>

//       {loading && <p className="meals-loading">Loading meals...</p>}
//       {error && <p className="meals-error">{error}</p>}

//       <div className="meals-grid">
//         {filteredMeals?.length > 0 ? (
//           filteredMeals.map((meal) => (
//             <div key={meal.idMeal} className="meal-card">
//               <img
//                 src={meal.strMealThumb}
//                 alt={meal.strMeal}
//                 className="meal-image"
//               />
//               <h2 className="meal-name">{meal.strMeal}</h2>
//               <p className="meal-category">{meal.strCategory}</p>
//               <button
//                 className="meal-btn"
//                 onClick={() => window.open(meal.strSource, "_blank")}
//               >
//                 View Recipe
//               </button>
//             </div>
//           ))
//         ) : (
//           <p className="no-results">No meals found. Try a different search term!</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Meals;



import React, { useEffect, useState } from "react";
import "./Meals.css";

function Meals() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch(
          "https://www.themealdb.com/api/json/v1/1/search.php?s="
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data from the API");
        }
        const data = await response.json();
        setMeals(data.meals);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, []);

  const filteredMeals = meals?.filter((meal) =>
    meal.strMeal.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="meals-container">
      <h1 className="meals-title">🍽️ Explore Global Meals</h1>
      <p className="meals-subtitle">
        Discover delicious recipes from around the world. Search your favorites below!
      </p>

      <div className="search-bar-container">
        <input
          type="text"
          className="search-bar"
          placeholder="Search for a meal..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {loading && <p className="meals-loading">Loading meals...</p>}
      {error && <p className="meals-error">{error}</p>}

      <div className="meals-grid">
        {filteredMeals?.length > 0 ? (
          filteredMeals.map((meal) => (
            <div key={meal.idMeal} className="meal-card">
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="meal-image"
              />
              <div className="meal-info">
                <h2 className="meal-name">{meal.strMeal}</h2>
                <p className="meal-category">{meal.strCategory}</p>
                <button
                  className="meal-btn"
                  onClick={() => window.open(meal.strSource, "_blank")}
                >
                  View Recipe
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">No meals found. Try a different search term!</p>
        )}
      </div>
    </div>
  );
}

export default Meals;
