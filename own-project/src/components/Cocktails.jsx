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