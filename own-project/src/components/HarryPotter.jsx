// import React, { useState, useEffect } from 'react';

// const HarryPotter = () => {
//   const [characters, setCharacters] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch(`https://www.potterapi.com/v1/characters?key=$API_KEY`)
//       .then((res) => res.json())
//       .then((data) => {
//         setCharacters(data || []);
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   }, []);

//   return (
//     <div>
//       <h1>Harry Potter Characters</h1>
//       {loading ? <p>Loading...</p> : (
//         <ul>
//           {characters.map((char, index) => (
//             <li key={index}>{char.name}</li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default HarryPotter;



// import React, { useState, useEffect } from "react";
// import "./HarryPotter.css"; // Assuming you create a CSS file for styling

// const HarryPotter = () => {
//   const [characters, setCharacters] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState(""); // State for search input

//   useEffect(() => {
//     // Replace $API_KEY with your actual Potter API key
//     fetch(`https://www.potterapi.com/v1/characters?key=$API_KEY`)
//       .then((res) => res.json())
//       .then((data) => {
//         setCharacters(data || []);
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   }, []);

//   // Filter characters based on the search query
//   const filteredCharacters = characters.filter((char) =>
//     char.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="harry-potter-container">
//       <h1 className="harry-potter-title">⚡ Harry Potter Characters</h1>

//       {/* Search Bar */}
//       <div className="search-bar-container">
//         <input
//           type="text"
//           className="search-bar"
//           placeholder="Search for a character..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />
//       </div>

//       {loading ? (
//         <p className="loading-text">Loading characters...</p>
//       ) : (
//         <div className="characters-grid">
//           {filteredCharacters.length > 0 ? (
//             filteredCharacters.map((char, index) => (
//               <div key={index} className="character-card">
//                 <img
//                   src={char.imageUrl || "default-avatar.jpg"}  // Add fallback image if no image is available
//                   alt={char.name}
//                   className="character-image"
//                 />
//                 <h2 className="character-name">{char.name}</h2>
//                 <p className="character-role">{char.house}</p>
//               </div>
//             ))
//           ) : (
//             <p className="no-results">No characters found. Try a different search term!</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default HarryPotter;
