// import React, { useEffect, useState } from "react";
// import "./Meals.css";

// function Meals() {
//   const [meals, setMeals] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");

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

//   const filteredMeals = meals?.filter((meal) =>
//     meal.strMeal.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="meals-container">
//       <h1 className="meals-title">🍽️ Explore Global Meals</h1>
//       <p className="meals-subtitle">
//         Discover delicious recipes from around the world. Search your favorites below!
//       </p>

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
//               <div className="meal-info">
//                 <h2 className="meal-name">{meal.strMeal}</h2>
//                 <p className="meal-category">{meal.strCategory}</p>
//                 <button
//                   className="meal-btn"
//                   onClick={() => window.open(meal.strSource, "_blank")}
//                 >
//                   View Recipe
//                 </button>
//               </div>
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
  const [selectedMeal, setSelectedMeal] = useState(null); // Track selected meal
  const [modalOpen, setModalOpen] = useState(false); // Track modal visibility

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

  const openModal = (meal) => {
    setSelectedMeal(meal);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedMeal(null);
    setModalOpen(false);
  };

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
                  onClick={() => openModal(meal)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">No meals found. Try a different search term!</p>
        )}
      </div>

      {modalOpen && selectedMeal && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-btn" onClick={closeModal}>
              &times;
            </button>
            <h2 className="modal-title">{selectedMeal.strMeal}</h2>
            <img
              src={selectedMeal.strMealThumb}
              alt={selectedMeal.strMeal}
              className="modal-image"
            />
            <h3>Ingredients:</h3>
            <ul className="ingredients-list">
              {Array.from({ length: 20 }, (_, i) => i + 1).map((index) => {
                const ingredient = selectedMeal[`strIngredient${index}`];
                const measure = selectedMeal[`strMeasure${index}`];
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
            <p className="modal-instructions">{selectedMeal.strInstructions}</p>
          </div>
          <div className="modal-overlay" onClick={closeModal}></div>
        </div>
      )}
    </div>
  );
}

export default Meals;
