// import React from "react";
// import { Routes, Route, Link } from "react-router-dom";
// import Meals from "./components/Meals";
// import Cocktails from "./components/Cocktails";
// import HarryPotter from "./components/HarryPotter";
// import IndianBanks from "./components/IndianBanks";
// import "./App.css"; // Import external CSS for better styling

// function App() {
//   return (
//     <div className="app-container">
//       <nav className="navbar">
//         <h1 className="navbar-title">API Explorer</h1>
//         <div className="nav-links">
//           <Link to="/Meals" className="nav-link">Meals</Link>
//           <Link to="/cocktails" className="nav-link">Cocktails</Link>
//           <Link to="/harrypotter" className="nav-link">Harry Potter Characters</Link>
//           <Link to="/indianbanks" className="nav-link">Indian Banks</Link>
//         </div>
//       </nav>
//       <main className="main-content">
//         <Routes>
//           <Route path="/Meals" element={<Meals />} />
//           <Route path="/cocktails" element={<Cocktails />} />
//           <Route path="/harrypotter" element={<HarryPotter />} />
//           <Route path="/indianbanks" element={<IndianBanks />} />
//         </Routes>
//       </main>
//       <footer className="footer">
//         <p>© 2024 API Explorer. All Rights Reserved.</p>
//       </footer>
//     </div>
//   );
// }

// export default App;

import React from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Meals from "./components/Meals";
import Cocktails from "./components/Cocktails";
import HarryPotter from "./components/HarryPotter";
import IndianBanks from "./components/IndianBanks";
import "./App.css";

function App() {
  const location = useLocation();

  return (
    <div className="app-container">
      
      <nav className="navbar">
        <h1 className="navbar-title">API Explorer 🌐</h1>
        <div className="nav-links">
          <Link
            to="/Meals"
            className={`nav-link ${
              location.pathname === "/Meals" ? "active-link" : ""
            }`}
          >
            Meals
          </Link>
          <Link
            to="/cocktails"
            className={`nav-link ${
              location.pathname === "/cocktails" ? "active-link" : ""
            }`}
          >
            Cocktails
          </Link>
          <Link
            to="/harrypotter"
            className={`nav-link ${
              location.pathname === "/harrypotter" ? "active-link" : ""
            }`}
          >
            Harry Potter
          </Link>
          <Link
            to="/indianbanks"
            className={`nav-link ${
              location.pathname === "/indianbanks" ? "active-link" : ""
            }`}
          >
            Indian Banks
          </Link>
        </div>
      </nav>

    
      <main className="main-content">
        <Routes>
          <Route path="/Meals" element={<Meals />} />
          <Route path="/cocktails" element={<Cocktails />} />
          <Route path="/harrypotter" element={<HarryPotter />} />
          <Route path="/indianbanks" element={<IndianBanks />} />
        </Routes>
      </main>

    
      <footer className="footer">
        <p>© 2024 API Explorer. Built with 💖</p>
      </footer>
    </div>
  );
}

export default App;
