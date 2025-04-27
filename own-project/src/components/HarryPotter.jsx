// import React, { useState, useEffect } from "react";
// import "./HarryPotter.css";

// const HarryPotter = () => {
//   const [characters, setCharacters] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [error, setError] = useState("");
//   const [visibleCards, setVisibleCards] = useState(10); // Number of visible cards
//   const [popupData, setPopupData] = useState(null); // Data for the popup

//   const API_URL = "https://hp-api.onrender.com/api/characters";

//   useEffect(() => {
//     const fetchCharacters = async () => {
//       try {
//         setLoading(true);
//         setError("");
//         const response = await fetch(API_URL);
//         if (!response.ok) {
//           throw new Error("Failed to fetch characters.");
//         }
//         const data = await response.json();
//         setCharacters(data || []);
//       } catch (err) {
//         setError(err.message || "Something went wrong!");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchCharacters();
//   }, []);

//   // Filter characters based on the search query
//   const filteredCharacters = characters.filter((char) =>
//     char.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   // Handle "Show More" toggle
//   const handleShowMore = () => {
//     setVisibleCards(visibleCards === 10 ? filteredCharacters.length : 10);
//   };

//   // Handle "View More" popup
//   const handleViewMore = (character) => {
//     setPopupData(character);
//   };

//   // Close the popup
//   const closePopup = () => {
//     setPopupData(null);
//   };

//   return (
//     <div className="harry-potter-container">
//       <h1 className="harry-potter-title">⚡ Harry Potter Characters</h1>
//       <p className="harry-potter-subtitle">Search and explore your favorite characters!</p>

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
//       ) : error ? (
//         <p className="error-text">{error}</p>
//       ) : (
//         <div>
//           {/* Characters Grid */}
//           <div className="characters-grid">
//             {filteredCharacters.slice(0, visibleCards).map((char, index) => (
//               <div key={index} className="character-card">
//                 <img
//                   src={char.image || "default-avatar.jpg"} // Add fallback image if none is available
//                   alt={char.name}
//                   className="character-image"
//                 />
//                 <h2 className="character-name">{char.name}</h2>
//                 {char.house && <p className="character-role">House: {char.house}</p>}
//                 <button
//                   className="view-more-button"
//                   onClick={() => handleViewMore(char)}
//                 >
//                   View More
//                 </button>
//               </div>
//             ))}
//           </div>

//           {/* Show More Button */}
//           {filteredCharacters.length > 10 && (
//             <button className="show-more-button" onClick={handleShowMore}>
//               {visibleCards === 10 ? "Show More" : "Show Less"}
//             </button>
//           )}
//         </div>
//       )}

//       {/* Popup for View More */}
//       {popupData && (
//         <div className="popup-overlay">
//           <div className="popup-content">
//             <button className="popup-close-button" onClick={closePopup}>
//               &times;
//             </button>
//             <h2>{popupData.name}</h2>
//             <img
//               src={popupData.image || "default-avatar.jpg"}
//               alt={popupData.name}
//               className="popup-image"
//             />
//             <p>
//               <strong>House:</strong> {popupData.house || "Unknown"}
//             </p>
//             <p>
//               <strong>Species:</strong> {popupData.species || "Unknown"}
//             </p>
//             <p>
//               <strong>Gender:</strong> {popupData.gender || "Unknown"}
//             </p>
//             <p>
//               <strong>Date of Birth:</strong> {popupData.dateOfBirth || "Unknown"}
//             </p>
//             <p>
//               <strong>Patronus:</strong> {popupData.patronus || "Unknown"}
//             </p>
//             <p>
//               <strong>Actor:</strong> {popupData.actor || "Unknown"}
//             </p>
//             <p>
//               <strong>Wand:</strong>{" "}
//               {popupData.wand?.wood
//                 ? `${popupData.wand.wood} wood, ${popupData.wand.core} core`
//                 : "Unknown"}
//             </p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default HarryPotter;





import { useState, useEffect } from 'react';
import "./HarryPotter.css";

const Harrypotter = () => {
    const [language, setLanguage] = useState('en');
    const [category, setCategory] = useState('books');
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null); // State to track the selected item for the popup

    useEffect(() => {
        if (language && category) {
            fetchData();
        }
    }, [language, category, searchTerm]);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        setResults([]);

        const url = `https://potterapi-fedeperin.vercel.app/${language}/${category}${searchTerm ?` ?search=${searchTerm}` : ''}`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (Array.isArray(data)) {
                setResults(data);
            } else {
                setResults([data]);
            }
        } catch (error) {
            setError('Error fetching data. Please try again later.', error);
        } finally {
            setLoading(false);
        }
    };

    const handleItemClick = (item) => {
        setSelectedItem(item); // Set the selected item for the modal
    };

    const handleCloseModal = () => {
        setSelectedItem(null); // Close the modal by resetting the selected item
    };

    return (
        <div className="harry-potter-container">
            <h1 className="harry-potter-title">⚡ Harry Potter Characters</h1>
            <p className="harry-potter-subtitle">Search and explore your favorite characters!</p>

            {/* Language Selector */}
            <label htmlFor="language">Select Language:</label>
            <select
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
            >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="pt">Portuguese</option>
                <option value="fr">French</option>
                <option value="de">German</option>
            </select>

            {/* Category Selector */}
            <label htmlFor="category">Select Category:</label>
            <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            >
                <option value="books">Books</option>
                <option value="characters">Characters</option>
                <option value="spells">Spells</option>
                <option value="houses">Houses</option>
            </select>

            {/* Search Input */}
            <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Enter Search Term"
            />
            <button onClick={fetchData}>Search</button>

            {/* Results Section */}
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {results.length > 0 && (
                <div>
                    <ul>
                        {results.map((item, index) => (
                            <li key={index} onClick={() => handleItemClick(item)}>
                                {/* For books */}
                                {category === 'books' && (
                                    <div>
                                        <h4>{item.title}</h4>
                                        <img src={item.cover} alt={item.title} />
                                        <p>{item.description}</p>
                                    </div>
                                )}

                                {/* For characters */}
                                {category === 'characters' && (
                                    <div>
                                        <h4>{item.fullName}</h4>
                                        <img src={item.image} alt={item.fullName} />
                                        <p>House: {item.hogwartsHouse}</p>
                                    </div>
                                )}

                                {/* For spells */}
                                {category === 'spells' && (
                                    <div>
                                        <h4>{item.spell}</h4>
                                        <p><strong>Use:</strong> {item.use}</p>
                                    </div>
                                )}

                                {/* For houses */}
                                {category === 'houses' && (
                                    <div>
                                        <h4>{item.house} {item.emoji}</h4>
                                        <p><strong>Founder:</strong> {item.founder}</p>
                                        <p><strong>Colors:</strong> {Array.isArray(item.colors) ? item.colors.join(', ') : 'No colors available'}</p>
                                        <p><strong>Animal:</strong> {item.animal}</p>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Modal Popup */}
            {selectedItem && (
                <div className="modal-overlay" onClick={handleCloseModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-btn" onClick={handleCloseModal}>✖</button>
                        {/* Render detailed info based on category */}
                        {category === 'books' && (
                            <div>
                                <h2>{selectedItem.title}</h2>
                                <img src={selectedItem.cover} alt={selectedItem.title} />
                                <p>{selectedItem.description}</p>
                            </div>
                        )}

                        {category === 'characters' && (
                            <div>
                                <h2>{selectedItem.fullName}</h2>
                                <img src={selectedItem.image} alt={selectedItem.fullName} />
                                <p>House: {selectedItem.hogwartsHouse}</p>
                                <p>Born: {selectedItem.dateOfBirth}</p>
                                <p>Patronus: {selectedItem.patronus}</p>
                            </div>
                        )}

                        {category === 'spells' && (
                            <div>
                                <h2>{selectedItem.spell}</h2>
                                <p><strong>Use:</strong> {selectedItem.use}</p>
                            </div>
                        )}

                        {category === 'houses' && (
                            <div>
                                <h2>{selectedItem.house}</h2>
                                <p><strong>Founder:</strong> {selectedItem.founder}</p>
                                <p><strong>Colors:</strong> {Array.isArray(selectedItem.colors) ? selectedItem.colors.join(', ') : 'No colors available'}</p>
                                <p><strong>Animal:</strong> {selectedItem.animal}</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Harrypotter;
