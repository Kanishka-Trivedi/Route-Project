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





import React, { useState, useEffect } from "react";
import "./IndianBanks.css";

const IndianBanks = () => {
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [cities, setCities] = useState([]);
  const [centers, setCenters] = useState([]);
  const [branches, setBranches] = useState([]);
  const [branchDetails, setBranchDetails] = useState(null);

  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCenter, setSelectedCenter] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch data
  const fetchData = async (url, setData, resetStates = []) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch data.");
      const data = await response.json();
      setData(data || []);
      resetStates.forEach((reset) => reset([])); // Reset dependent states
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch states on mount
  useEffect(() => {
    fetchData("https://bank-apis.justinclicks.com/API/V1/STATE/", setStates);
  }, []);

  // Fetch districts when a state is selected
  useEffect(() => {
    if (selectedState) {
      fetchData(
        `https://bank-apis.justinclicks.com/API/V1/STATE/${selectedState}/`,
        setDistricts,
        [setCities, setCenters, setBranches, setBranchDetails]
      );
    }
  }, [selectedState]);

  // Fetch cities when a district is selected
  useEffect(() => {
    if (selectedDistrict) {
      fetchData(
        `https://bank-apis.justinclicks.com/API/V1/STATE/${selectedState}/${selectedDistrict}/`,
        setCities,
        [setCenters, setBranches, setBranchDetails]
      );
    }
  }, [selectedDistrict]);

  // Fetch centers when a city is selected
  useEffect(() => {
    if (selectedCity) {
      fetchData(
        `https://bank-apis.justinclicks.com/API/V1/STATE/${selectedState}/${selectedDistrict}/${selectedCity}/`,
        setCenters,
        [setBranches, setBranchDetails]
      );
    }
  }, [selectedCity]);

  // Fetch branches when a center is selected
  useEffect(() => {
    if (selectedCenter) {
      fetchData(
        `https://bank-apis.justinclicks.com/API/V1/STATE/${selectedState}/${selectedDistrict}/${selectedCity}/${selectedCenter}/`,
        setBranches,
        [setBranchDetails]
      );
    }
  }, [selectedCenter]);

  // Fetch branch details when a branch is selected
  useEffect(() => {
    if (selectedBranch) {
      fetchData(
        `https://bank-apis.justinclicks.com/API/V1/STATE/${selectedState}/${selectedDistrict}/${selectedCity}/${selectedCenter}/${selectedBranch}`,
        setBranchDetails
      );
    }
  }, [selectedBranch]);

  // Only display details when all options are selected
  const canDisplayDetails =
    selectedState &&
    selectedDistrict &&
    selectedCity &&
    selectedCenter &&
    selectedBranch &&
    branchDetails;

  return (
    <div className="indian-banks-container">
      <h1 className="title">🏦 Indian Banks</h1>
      <p className="subtitle">Select State, District, City, Center, and Branch</p>

      {error && <p className="error-text">{error}</p>}
      {loading && <p className="loading-text">Loading...</p>}

      {/* State Dropdown */}
      <select
        className="dropdown"
        value={selectedState}
        onChange={(e) => setSelectedState(e.target.value)}
      >
        <option value="">Select State</option>
        {states.map((state, index) => (
          <option key={index} value={state}>
            {state}
          </option>
        ))}
      </select>

      {/* District Dropdown */}
      {selectedState && (
        <select
          className="dropdown"
          value={selectedDistrict}
          onChange={(e) => setSelectedDistrict(e.target.value)}
        >
          <option value="">Select District</option>
          {districts.map((district, index) => (
            <option key={index} value={district}>
              {district}
            </option>
          ))}
        </select>
      )}

      {/* City Dropdown */}
      {selectedDistrict && (
        <select
          className="dropdown"
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
        >
          <option value="">Select City</option>
          {cities.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>
      )}

      {/* Center Dropdown */}
      {selectedCity && (
        <select
          className="dropdown"
          value={selectedCenter}
          onChange={(e) => setSelectedCenter(e.target.value)}
        >
          <option value="">Select Center</option>
          {centers.map((center, index) => (
            <option key={index} value={center}>
              {center}
            </option>
          ))}
        </select>
      )}

      {/* Branch Dropdown */}
      {selectedCenter && (
        <select
          className="dropdown"
          value={selectedBranch}
          onChange={(e) => setSelectedBranch(e.target.value)}
        >
          <option value="">Select Branch</option>
          {branches.length > 0 ? (
            branches.map((branch, index) => (
              <option key={index} value={branch}>
                {branch.replace(".json", "")} {/* Clean branch name */}
              </option>
            ))
          ) : (
            <option value="">No branches available</option>
          )}
        </select>
      )}

      {/* Display Branch Details */}
      {canDisplayDetails && (
        <div className="branch-details">
          <h2>Branch Details:</h2>
          <p>ADDRESS :- {branchDetails.ADDRESS}</p>
          <p>BANK :- {branchDetails.BANK}</p>
          <p>BANKCODE :- {branchDetails.BANKCODE}</p>
          <p>BRANCH :- {branchDetails.BRANCH}</p>
          <p>CENTRE :- {branchDetails.CENTRE}</p>
          <p>CITY :- {branchDetails.CITY}</p>
          <p>CONTACT :- {branchDetails.CONTACT}</p>
          <p>DISTRICT :- {branchDetails.DISTRICT}</p>
          <p>IFSC :- {branchDetails.IFSC}</p>
          <p>IMPS :- {branchDetails.IMPS}</p>
          <p>MICR :- {branchDetails.MICR}</p>
          <p>NEFT :- {branchDetails.NEFT == true ? "Yes" : "No"}</p>
          <p>RTGS :- {branchDetails.RTGS == true ? "Yes" : "No"}</p>
          <p>STATE :- {branchDetails.STATE}</p>
          <p>SWIFT :- {branchDetails.SWIFT}</p>
          <p>UPI :- {branchDetails.UPI == true ? "Yes" : "No"}</p> 
        </div>
      )}
    </div>
  );
};

export default IndianBanks;