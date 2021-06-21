import React from "react";
import { NavLink } from "react-router-dom";

// Post-MVP version
// const Header = () => {
//   return (
//     <>
//       <header>
//         <nav>
//           <ul>
//             <li>
//               <NavLink exact to="/">
//                 Home
//               </NavLink>
//             </li>
//             <li>
//               <NavLink to="/Wines">Wines</NavLink>
//             </li>
//             <li>
//               <NavLink to="/LogIn">Log In</NavLink>
//             </li>
//             <li>
//               <NavLink to="/SignUp">Sign Up</NavLink>
//             </li>
//           </ul>
//         </nav>
//       </header>
//     </>
//   );
// };

// MVP version
const Header = () => {
  return (
    <nav>
      <NavLink exact to="/">
        What the wine
      </NavLink>
    </nav>
  );
};

export default Header;

// This is the header including navbar