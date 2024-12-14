// import React, { useState, useEffect } from 'react';

// const IndianBanks = () => {
//   const [banks, setBanks] = useState([]);
//   const [city, setCity] = useState('MUMBAI');
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch(`https://indian-banks-api.vercel.app/api/banks?city=${city}`)
//       .then((res) => res.json())
//       .then((data) => {
//         setBanks(data || []);
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   }, [city]);

//   return (
//     <div>
//       <h1>Banks in {city}</h1>
//       <input
//         type="text"
//         placeholder="Enter City"
//         value={city}
//         onChange={(e) => setCity(e.target.value.toUpperCase())}
//       />
//       {loading ? <p>Loading...</p> : (
//         <ul>
//           {banks.map((bank, index) => (
//             <li key={index}>{bank.bank_name}</li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default IndianBanks;



// import React, { useState, useEffect } from "react";
// import "./IndianBanks.css";

// const IndianBanks = () => {
//   const [banks, setBanks] = useState([]);
//   const [city, setCity] = useState("MUMBAI");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchBanks = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await fetch(
//           `https://indian-banks-api.vercel.app/api/banks?city=${city}`
//         );
//         if (!response.ok) {
//           throw new Error("Failed to fetch data from the API");
//         }
//         const data = await response.json();
//         setBanks(data || []);
//       } catch (err) {
//         setError(err.message);
//         setBanks([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBanks();
//   }, [city]);

//   return (
//     <div className="indian-banks-container">
//       <h1 className="title">🏦 Banks in {city}</h1>
//       <p className="subtitle">
//         Explore a list of banks available in your city. Type a city name to get started!
//       </p>

//       {/* City Input */}
//       <div className="input-container">
//         <input
//           type="text"
//           className="city-input"
//           placeholder="Enter City (e.g., Mumbai)"
//           value={city}
//           onChange={(e) => setCity(e.target.value.toUpperCase())}
//         />
//       </div>

//       {loading ? (
//         <p className="loading-text">Loading banks...</p>
//       ) : error ? (
//         <p className="error-text">{error}</p>
//       ) : banks.length > 0 ? (
//         <div className="banks-list">
//           {banks.map((bank, index) => (
//             <div key={index} className="bank-card">
//               <h3 className="bank-name">{bank.bank_name}</h3>
//               <p className="bank-details">IFSC: {bank.ifsc}</p>
//               <p className="bank-details">Branch: {bank.branch}</p>
//               <p className="bank-details">City: {bank.city}</p>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="no-results">No banks found for the city "{city}". Try another!</p>
//       )}
//     </div>
//   );
// };

// export default IndianBanks;
